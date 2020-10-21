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
        let should=this.canvas.availableBlockSize() //has block space
        if(!should){
            if(!this.isSelectionComposed(getSelection(this.context.activeDocStore.getState()),true)){//selection not composed yet
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

    /**
     * 1. self fully composed
     * 2. prior content fully composed
     * @param {*} param0 
     */
    isSelectionComposed({start, end}, removeLastCache){
        const allComposed=id=>{
            if(id==undefined)
                return true
            if(id && this.composers.has(id)){
                const composer=this.getComposer(id)
                /**
                 * 1. 
                 */
                if(composer.isAllChildrenComposed()){
                    /**
                     * cached composers make it complicated, so make sure all prior content are all composed
                     */
                    if(hasPartiallyComposedPriorContent(id)){
                        if(removeLastCache){
                            this.unmount(composer)
                        }
                    }else{
                        return true
                    }
                }
            } 
            return false
        }

        const hasPartiallyComposedPriorContent=id=>{
            const $=ContentQuery.fromContent(this.props.content)
            const parents=$.find('#'+id).parents().toArray()//[..., root]
            const i=parents.findIndex(a=>!this.getComposer(a).isAllChildrenComposed())
            const partiallyComposed=parents.slice(0,i+1).findLast((a,i)=>{
                const prevPartiallyComposed=$.find('#'+a).prevAll(b=>!this.getComposer(b.get('id')).isAllChildrenComposed())
                if(prevPartiallyComposed.length>0){
                    console.warn(`${id} fully composed, but ${prevPartiallyComposed.attr('id')} not`)
                    return true
                }
            })
            return partiallyComposed
        }

		return allComposed(start.id) && (start.id==end.id || allComposed(end.id))
    }

	compose4Scroll(y,x){
		this.setState({mode:"scroll",y,x})
	}

	compose4Selection(selection){
		this.setState({mode:"selection",selection})
	}
}


