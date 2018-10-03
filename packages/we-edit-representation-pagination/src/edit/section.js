import React, {Fragment,Children} from "react"
import PropTypes from "prop-types"

import {Cacheable} from "../composable"
import Base from "../section"

import editable from "./editable"

export default Cacheable(class Section extends editable(Base,{stoppable:true}){
	onAllChildrenComposed(){
		super.onAllChildrenComposed()
		let last=this.computed.composed[this.computed.composed.length-1]
		last && (last.lastSectionPage=true);
	}

	findLastChildIndexOfLastComposed(){
		const id=(id=>{
			this.computed.composed.findLast(({columns})=>{
				return columns.findLast(({children:lines})=>{
					return lines.findLast(line=>!!(id=this.findContentId(line)))
				})
			})
			return id
		})();

		if(id){
			return Children.toArray(this.props.children).findIndex(a=>a.props.id===id)
		}
		return -1
	}

	findContentId(content){
		return ((line,id)=>{
			const extract=a=>{
				if((id=a.props["data-content"])!==undefined)
					return true
				return Children.toArray(a.props.children).findIndex(extract)!=-1
			}
			extract(line)
			return id
		})(content)
	}
	removeChangedPart(changedChildIndex){
		const children=Children.toArray(this.props.children)
		const changed=children[changedChildIndex]
		if(changed.props.id===undefined)
			return false

		const removedChildren=children.slice(changedChildIndex).map(a=>a.props.id).filter(a=>a!==undefined)

		const findChangedContentId=line=>{
			const id=this.findContentId(line)
			return (id!==undefined && removedChildren.includes(id))
		}

		let pageIndex=-1, columnIndex=-1, lineIndex=-1
		if((pageIndex=this.computed.composed.findIndex(({columns})=>{
			return (columnIndex=columns.findIndex(({children:lines})=>{
				return (lineIndex=lines.findIndex(line=>findChangedContentId(line)))!=-1
			}))!=-1
		}))!=-1){
			const page=this.computed.composed[pageIndex]
			this.computed.composed=this.computed.composed.slice(0,page)

			const column=page.columns[columnIndex]
			column.children=column.children.slice(0,lineIndex)

			page.columns=page.columns.slice(0,column)
			page.columns.push(column)

			this.computed.composed.push(page)
			return true
		}

		return false
	}
},true)
