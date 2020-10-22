import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {HasChild, Locatable,editable} from "../composable"
import {dom,getSelection,ContentQuery} from "we-edit"
import Template from "./template"
import {Canvas} from "../composed"
import Responsible from "../composed/responsible-canvas"


const Super=Locatable.Locatorize(HasChild(dom.Document))

class Document extends Super{
    static propTypes={
        ...Super.prototype,
        canvas: PropTypes.node,
    }
    static defaultProps={
        ...Super.defaultProps,
        canvas:<Canvas/>,
    }

    static contextTypes={
        ...Super.contextTypes,
        Measure: PropTypes.func,
    }

    static childContextTypes={
        ...Super.childContextTypes,
        Measure: PropTypes.func,
        getComposedTemplate:PropTypes.func,
        prevLayout: PropTypes.func,
        editable: PropTypes.any,
        precision: PropTypes.number,
    }

    constructor(){
        super(...arguments)
        this.computed.templates=[]
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
            getComposedTemplate(xhref){
                return self.computed.templates.find(a=>a.props.xhref===xhref)
            },
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
        if(Template.isTemplate(page)){
            this.computed.templates.push(page)
        }else if(this.computed.composed.indexOf(page)==-1){
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
		return {viewport,hash, editable, ...(hash!=state.hash && {mode:"content",y:0})}
    }

    constructor(){
		super(...arguments)
        this.state={mode:"content", ...this.state}
        this.computed.shouldContinueCompose=true//cache for shouldContinueCompose
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

    shouldComponentUpdate(){
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
    
    isAtomCollector(){
        return false
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
		this.setState({mode:"scroll",y,x})
	}

	compose4Selection(selection){
		this.setState({mode:"selection",selection})
	}
}


