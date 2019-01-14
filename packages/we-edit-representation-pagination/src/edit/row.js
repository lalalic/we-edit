import React from "react"
import {ReactQuery} from "we-edit"
import {Cacheable} from "../composable"
import editable from "./editable"
import Base from "../row"

export default class extends editable(Base,{stoppable:false}){
	clearComposed(){
		this.computed.spaces=[]
		super.clearComposed()
	}

	injectEmptyCellIntoRank(rank,parents,frame){
		super.injectEmptyCellIntoRank(...arguments)
		const cells=rank.attr("children")
		//render cell into composed for positioning
		cells.forEach((a,j)=>{
			const {first:cell,parents}=new ReactQuery(a).findFirstAndParents(n=>n.props["data-type"]=="cell"||undefined)
			cells[j]=parents.reduceRight(
				(child,parent)=>React.cloneElement(parent,{},child),
				(({type,props})=>new type(props).render())(cell.get(0))
			)
		})

		//render rank to composed for positioning
		const renderedRank=parents.reduceRight(
			(child,parent)=>React.cloneElement(parent,{},child),
			(({type,props})=>new type(props).render())(rank.get(0))
		)
		frame.currentColumn.children.splice(-1,1,renderedRank)
	}

	composeFrames(){
        return [...super.composeFrames(),this.props.id]
    }
}
