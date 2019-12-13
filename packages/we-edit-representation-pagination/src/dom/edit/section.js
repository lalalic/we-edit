import React, {Children} from "react"
import PropTypes from "prop-types"

import {Cacheable,editable} from "../../composable"
import Base from "../section"

const Super=editable(Base,{stoppable:true})

export default Cacheable(class __$1 extends Super{
	static childContextTypes={
		...Super.childContextTypes,
		shouldContinueCompose:PropTypes.func,
	}

	getChildContext(){
		const ctx=super.getChildContext()
		ctx.shouldContinueCompose=this.shouldContinueCompose.bind(this)
		return ctx
	}

	shouldContinueCompose(){
		if(this.computed.allComposed===false){
			return false
		}
		return this.context.parent.shouldContinueCompose(...arguments)
	}

	keepUntilLastAllChildrenComposed(){
        const {id,pageIndex,lineIndex}=(id=>{
			let pageIndex=-1, lineIndex=-1
			this.computed.lastComposed.findLast(({lines},i)=>{
				pageIndex=i
				return lines.findLast((line,i)=>{
					lineIndex=i
					if(id=this.findContentId(line)){
						const composer=this.context.getComposer(id)
						if(composer && composer.isAllChildrenComposed()){
							return true
						}
					}
					return false
				})
			})
			return {id,pageIndex,lineIndex}
		})();

		if(id){
			this.keepComposedUntil(pageIndex,lineIndex+1)
			return Children.toArray(this.props.children).findIndex(a=>a.props.id===id)
		}
		return -1
	}

	removeChangedPart(removedChildren){
		const findChangedContentId=line=>{
			const id=this.findContentId(line)
			return (id!==undefined && removedChildren.includes(id))
		}

		let pageIndex=-1, lineIndex=-1
		if((pageIndex=this.computed.lastComposed.findIndex(({lines})=>{
			return (lineIndex=lines.findIndex(line=>findChangedContentId(line)))!=-1
		}))!=-1){
			this.keepComposedUntil(pageIndex,lineIndex)
			return true
		}

		return false
	}

	keepComposedUntil(pageIndex,lineIndex){
		this.computed.lastComposed=this.computed.lastComposed.slice(0,pageIndex+1)
		this.computed.lastComposed[pageIndex].removeFrom(lineIndex)
	}

	appendLastComposed(){
		this.computed.composed=[...this.computed.lastComposed]
		this.computed.composed.forEach(a=>this.context.parent.appendComposed(a))
	}
},true)//numbering can't work
