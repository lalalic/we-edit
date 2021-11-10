import React, {Fragment} from "react"
import PropTypes from "prop-types"

import {HasChild, Locatable,editable} from "../composable"
import {dom,getSelection,ACTION, createEmptyStore} from "we-edit"
import {Canvas} from "../composed"
import Responsible from "../composed/responsible-canvas"
import Measure from "../measure/font"

class Document extends Locatable.Locatorize(HasChild(dom.Document)){
    static propTypes={
        ...super.prototype,
        canvas: PropTypes.element,
    }
    static defaultProps={
        ...super.defaultProps,
        canvas:<Canvas/>,
    }

    static contextTypes={
        ...super.contextTypes,
        Measure: PropTypes.func,
        activeDocStore: PropTypes.any
    }

    static childContextTypes={
        ...super.childContextTypes,
        Measure: PropTypes.func,
        prevLayout: PropTypes.func,
        editable: PropTypes.any,
        precision: PropTypes.number,
        activeDocStore: PropTypes.any,
        hintMeasure: PropTypes.shape({
			defaultStyle: PropTypes.object.isRequired,
			stringWidth: PropTypes.func.isRequired
		})
    }

    constructor(){
        super(...arguments)
        Object.defineProperties(this,{
            pages:{
                enumerable:true,
                configurable:true,
                get(){
                    return this.computed.composed
                }
            }
        })
    }

    get activeDocStore(){
        return this.context.activeDocStore||this._emptyStore||(this._emptyStore=createEmptyStore())
    }

    get Measure(){
        return this.context.Measure||this.props.Measure
    }

    getComposed(){
        return <Canvas document={this}/>
    }

    getChildContext(){
        const self=this
        const {hintStyle={fonts:this.Measure.fallbackFonts.ascii,size:12}}=this.props
        return {
            ...super.getChildContext(),
            prevLayout(ref){
                const pages=self.computed.composed
                const i=pages.indexOf(ref)
                return pages[i-1]
            },
            editable: self.state.editable,
            precision: this.props.precision,
            activeDocStore: this.activeDocStore,
            Measure: this.Measure,
            numbering: this.numbering,
            hintMeasure:new this.Measure(hintStyle),
        }
    }

    render(){
        const {canvas, canvasProps}=this.props
        this.numbering?.reset?.()
        if(!canvas)
            return super.render()
        const {props:{__sequentialCompose=true}}=this
        const documentCanvas=React.cloneElement(canvas,{...canvasProps, document:this})
        if(__sequentialCompose){
            return (
                <Fragment>
                    {super.render()}
                    {documentCanvas}
                </Fragment>
            )
        }else{//canvas should know how to render document
            return documentCanvas
        }
    }

	appendComposed(page){
        if(this.computed.composed.indexOf(page)==-1){
            this.computed.composed.push(page)
        }
    }

    componentDidUpdate(){
        super.componentDidUpdate?.(...arguments)
        this.__statistics()
    }

    componentDidMount(){
        super.componentDidMount?.(...arguments)
        this.__statistics()
    }

    __statistics(){
        this.activeDocStore?.dispatch(ACTION.Statistics({
			pages:this.pages.length,
			allComposed:this.isAllChildrenComposed(),
            words: this.words,
            composerID: `${this.props.hash}_${this.computed.composedUUID}`,
		}))
    }
}


export default class extends editable(Document,{continuable:true}){
    static defaultProps={
		...super.defaultProps,
        canvas:<Responsible/>,
        editable: false,
        Measure,
    }

	static getDerivedStateFromProps({hash,editable},state){
		return {hash, editable, ...(hash!=state.hash && {mode:"content",y:0,composeAll:false})}
    }

    constructor(){
		super(...arguments)
        this.state={mode:"content", ...this.state}
        this.computed.shouldContinueCompose=true//cache for shouldContinueCompose
        this.composeAll=this.composeAll.bind(this)
    }
    
    /**
     * in order to make isSelectionComposed correct and quick
     * composers hold current layout
     * history hold cached layout
     * @param {*} composers 
     */
    locatorize(composers){
        super.locatorize(...arguments)
        this.composers=composers
        const history=new Map()
        this.mount=a=>{
            if(typeof(a)=="object"){
                composers.set(a.props.id,a)
            }else if(a=history.get(a)){
                composers.set(a.props.id,a)
                history.delete(a.props.id)
            }
        }

        this.getComposer=id=>composers.get(id)||history.get(id)

        this.__getCurrentLayoutComposer=id=>composers.get(id)
        
        /**
         * clear all current composer, and save in history
         */
        this.__delocaterize=()=>{
            const {content}=this.props
            if(content){
                for(const [id] of history){
                    if(!content.has(id)){
                        history.delete(id)
                    }
                }
            }

            for(const [id, composer] of composers){
                if(content && content.has(id)){
                    history.set(id,composer)
                }
            }
            composers.clear()
            this.mount(this)
        }

        Object.defineProperties(this,{
            words:{
                get(){
                   return  [...Array.from(composers.values()),...Array.from(history.values())]
                    .filter(a=>!!a)
				    .reduce((words,a)=>words+=(a.atoms?.length||0),0)
                }
            }
        })
    }
    
    get canvas(){
        if(!this.props.canvas)
            return {availableBlockSize:()=>Number.MAX_SAFE_INTEGER}

        const {canvas:{type:Type,props}, canvasProps}=this.props
        const canvas=new Type({...canvasProps, ...props, document:this})
        
        if('availableBlockSize' in canvas){
            canvas.state && (canvas.state={...canvas.state, ...Type.getDerivedStateFromProps?.(canvas.props,canvas.state)})
            return canvas
        }

        return {availableBlockSize:()=>Number.MAX_SAFE_INTEGER}
    }

    shouldComponentUpdate(nextProps, nextState){
        this.__delocaterize()
        return super.shouldComponentUpdate(...arguments)
    }

    /**
     * @continuable
	 * 1. selection end
	 * 2. viewport: viewporter.scrollTop+viewporter.height
     * 
     * computed.shouldContinueCompose as cache, since frequently called
     * 
	 **/
	shouldContinueCompose(composer){
        if(this.state.composeAll){
            return true
        }
        if(this.computed.shouldContinueCompose===false){
            composer && this.notifyNotAllComposed(composer)
            return false
        }
        if(!this.state.editable)
            return true

        let should=this.canvas.availableBlockSize() //has block space
        if(!should){
            if(!this.isSelectionComposed(getSelection(this.activeDocStore.getState()))){//selection not composed yet
                should=true
            }
        }
        if(!should){
            this.computed.shouldContinueCompose=false
            composer && this.notifyNotAllComposed(composer)
		}
		return should
    }
    
    //no cache on document level
    cancelUnusableLastComposed(){
        this.computed.templates=[]
        this.computed.shouldContinueCompose=true
        super.cancelUnusableLastComposed(...arguments)
    }

    isSelectionComposed({start, end}){
        const allComposed=id=>{
            while(id){
                if(this.__getCurrentLayoutComposer(id)?.isAllChildrenComposed()){
                    return true
                }
                id=this.props.content?.getIn([id,'parent'])
            }
        }
		return allComposed(start.id) && (start.id==end.id || allComposed(end.id))
    }

	compose4Scroll(y,x){
		this.setState({mode:"scroll",y,x, composeAll:false})
	}

	compose4Selection(selection){
		this.setState({mode:"selection",selection,composeAll:false})
    }
    
    composeAll(){
        return new Promise(resolve=>{
            this.setState((state,props)=>{
                if(state.composeAll || this.isAllChildrenComposed()){
                    return {}
                }
                return {composeAll:true}
            },resolve)
        })
    }
}


