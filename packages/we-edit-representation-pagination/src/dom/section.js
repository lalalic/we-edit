import React,{Children} from "react"
import {HasParentAndChild,Fissionable, editable} from "../composable"
import {dom} from "we-edit"
import memoize from "memoize-one"

const Super=Fissionable(HasParentAndChild(dom.Section))
class Section extends Super{
	static defaultProps={
		...Super.defaultProps,
		createLayout(props,context){
			const {layout}=this.props
			if(layout){
				return new this.Fission({...layout, ...props},context)
			}else{
				throw new Error("section has no createLayout")
			}
		}
	}

    getDocument=memoize(()=>{
		var current=this.context.parent
		while(current){
			if(current.getComposeType()=="document")
				return current
            current=current.context.parent
		}
		return current
	})

	get totals(){
		return this.getDocument().computed.composed.length
	}

    create(){
        return super.create({I:this.totals})
    }
}

export default class EditableSection extends editable(Section,{stoppable:true}){
	/**
	 * lastComposed==composed
	 */
	cancelUnusableLastComposed(nextProps){
		const changed=nextProps.hash!=this.props.hash
		if(changed){
			this._cancelChangedPart(...arguments)
		}
		this._cancelUntilLastAllChildrenComposed(...arguments)
	}

	/**
	 * both composed and lastComposed refer to fissions, check createComposed2Parent
	 * 
	 */
	appendLastComposed(){
		const lastComposed=this.computed.lastComposed
		//clear last composed
		this.computed.composed=[]
		this.computed.lastComposed=[]
		
		//append last composed fissions one by one
		const spaceChangedAt=lastComposed.findIndex((fission,i,_,$,isLast=i==lastComposed.length-1)=>{
			if(isLast&&fission.isEmpty()){
				//last empty fission is useless for cache
				return true
			}
				
			const current=this.createLayout(false)
			if(fission.getSpace().equals(current.getSpace())){
				this.computed.composed.splice(i,1,fission)
				this.context.parent.appendComposed(this.createComposed2Parent(fission))
				return false
			}
			return true
		})


		if(spaceChangedAt==0){
			//clear all computed
			this.anchors=[]
			super.cancelUnusableLastComposed()
			return false
		}else if(spaceChangedAt==-1){
			if(this.isAllChildrenComposed()){
				return true
			}
			//continue from last
		}else{
			delete this.computed.allComposed
			//continue from last
		}

		//is it possible that this.current is empty? last empty fission is removed, so not possible
		const lastId=this.current.lastLine.props["data-content"]
		return Children.toArray(this.props.children).findIndex(a=>a && a.props.id==lastId)
	}

	_cancelChangedPart(next){
		var lineIndex=-1
		const childrenNeedRecompose=this.childrenNeedRecompose(next,this.props)
		const fissionIndex=this.computed.lastComposed.findIndex(({lines})=>{
			return (lineIndex=lines.findIndex(a=>childrenNeedRecompose.includes(this.childIdOf(a))))!=-1
		})

		this._keepLastComposedUntil(fissionIndex,lineIndex)
	}

	
    /**
     * cacheable API
     * compose rule: always compose all children, and content composing is stoppable 
     * both composed and lastComposed refer to fissions
     */
	_cancelUntilLastAllChildrenComposed(){
		var lineIndex=-1
        const fissionIndex=this.computed.lastComposed.findLastIndex(({lines})=>{
			return (lineIndex=lines.findLastIndex((a,i,_,$,id=this.childIdOf(a))=>{
				const composer=this.context.getComposer(id)
				return composer && composer.isAllChildrenComposed()
			}))!=-1
		})
		this._keepLastComposedUntil(fissionIndex,lineIndex+1)
	}

	_keepLastComposedUntil(fissionIndex,lineIndex){
		const {lastComposed}=this.computed
		if(fissionIndex==-1 || 
			(fissionIndex==lastComposed.length-1 && lineIndex>=lastComposed[fissionIndex].lines.length)){
			return 
		}
		delete this.computed.allComposed
		this.computed.lastComposed=lastComposed.slice(0,fissionIndex+1)
		this.computed.lastComposed[fissionIndex].removeFrom(lineIndex)
	}
}
