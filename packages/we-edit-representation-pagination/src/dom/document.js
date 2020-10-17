import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {HasChild, Locatable,editable} from "../composable"
import {dom,getSelection} from "we-edit"
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
    
    get canvas(){
        const {canvas:{type:Type,props}}=this.props
        const canvas=new Type({...props,document:this})
        canvas.state=Type.getDerivedStateFromProps(canvas.props,canvas.state)
        return canvas
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
        const should=this.canvas.availableBlockSize() || //has block space
            !this.isSelectionComposed(getSelection(this.context.activeDocStore.getState()));//selection not composed yet
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

    isSelectionComposed({start,end}){
        return this._isSelectionComposed(this.computed.composedUUID, start.id, end.id)
    }

    _isSelectionComposed=memoize((composedUUID, start, end)=>{
        const allComposed=id=>{
            if(id==undefined)
                return true
            if(id && this.composers.has(id)){
                const composer=this.getComposer(id)
                if(composer.isAllChildrenComposed()){
                    return allPrevSiblingsComposed(composer)
                }
            } 
            return false
        }

        const allPrevSiblingsComposed=composer=>{
            let directChildOfClosestPartialComposed
            const closestPartialComposed=composer.closest(a=>{
                if(!a.isAllChildrenComposed()){
                    return true
                }
                directChildOfClosestPartialComposed=a
            })
            if(!closestPartialComposed)
                return true
            const siblings=this.context.activeDocStore.getState().getIn(['content',closestPartialComposed.props.id,'children']).toJS()
            if(siblings){
                const i=siblings.indexOf(directChildOfClosestPartialComposed.props.id)
                for(let k=i-1,id;k>-1;k--){
                    if(!(this.composers.has(id=siblings[k]) && this.getComposer(id).isAllChildrenComposed())){
                        return false
                    }
                }
            }
            return true
        }

		return allComposed(start) && (start==end || allComposed(end))
    })

	compose4Scroll(y,x){
		this.setState({mode:"scroll",y,x})
	}

	compose4Selection(selection){
		this.setState({mode:"selection",selection})
	}
}


