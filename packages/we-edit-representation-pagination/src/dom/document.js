import React, {Fragment} from "react"
import PropTypes from "prop-types"

import {HasChild, Locatable,editable} from "../composable"
import {dom,getSelection} from "we-edit"
import {Canvas} from "../composed"
import Responsible from "../composed/responsible-canvas"

class Document extends Locatable.Locatorize(HasChild(dom.Document)){
    static propTypes={
        ...super.prototype,
        canvas: PropTypes.node,
    }
    static defaultProps={
        ...super.defaultProps,
        canvas:<Canvas/>,
    }

    static contextTypes={
        ...super.contextTypes,
        Measure: PropTypes.func,
    }

    static childContextTypes={
        ...super.childContextTypes,
        Measure: PropTypes.func,
        prevLayout: PropTypes.func,
        editable: PropTypes.any,
        precision: PropTypes.number,
    }

    get pages(){
        return this.computed.composed
    }

    getComposed(){
        return <Canvas document={this}/>
    }

    getChildContext(){
        const self=this
        return {
            ...super.getChildContext(),
            prevLayout(ref){
                const pages=self.computed.composed
                const i=pages.indexOf(ref)
                return pages[i-1]
            },
            editable:this.state&&this.state.editable,
            precision: this.props.precision,
        }
    }

    render(){
        const {canvas, children}=this.props
        if(!canvas)
            return super.render()
        const {props:{__sequentialCompose=true}}=this
        if(__sequentialCompose){
            return (
                <Fragment>
                    {super.render()}
                    {canvas && React.cloneElement(canvas, {document:this})}
                </Fragment>
            )
        }else{
            return React.cloneElement(canvas, {document:this, children})
        }
    }

	appendComposed(page){
        if(this.computed.composed.indexOf(page)==-1){
            this.computed.composed.push(page)
        }
    }
}


export default class extends editable(Document,{continuable:true}){
    static defaultProps={
		...Document.defaultProps,
		canvas:<Responsible/>,
    }
    
	static contextTypes={
		...Document.contextTypes,
        activeDocStore: PropTypes.any,
	}

	static getDerivedStateFromProps({hash,viewport,editable=true},state){
		return {viewport,hash, editable, ...(hash!=state.hash && {mode:"content",y:0,composeAll:false})}
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
        const history=new Map()
        this.mount=a=>{
            if(typeof(a)!="object"){
                if(history.has(a)){
                    composers.set(a, history.get(a))
                    history.delete(a)
                }
            }else{
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
        const {canvas:{type:Type,props}}=this.props
        const canvas=new Type({...props,document:this})
        canvas.state=Type.getDerivedStateFromProps(canvas.props,canvas.state)
        return canvas
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
            if(!this.isSelectionComposed(getSelection(this.context.activeDocStore.getState()))){//selection not composed yet
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
        const allComposed=id=>!id || !!this.__getCurrentLayoutComposer(id)?.isAllChildrenComposed()
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


