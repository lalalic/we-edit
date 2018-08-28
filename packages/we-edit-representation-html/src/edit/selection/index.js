import React,{Fragment, Component} from "react"
import PropTypes from "prop-types"
import Base from "we-edit-representation-pagination/edit/selection"


export default class SelectionShape extends Base{
	getRects(start, end){
		let range=document.createRange()
		const set=({id,at}, A)=>{
			let el=document.querySelector(`[data-content="${id}"]`)

			if(at==-1){
				range.selectNode(el)
			}else{
				range[`set${A}`](el.firstChild,at)
			}
		}
		set(start,"Start")
		set(end, "End")
		let rects=range.getClientRects()
		let data=[]
		for(let i=0,len=rects.length;i<len;i++){
			data.push(rects[i])
		}
		return data
	}

	renderEntity(id){
		let el=document.querySelector(`[data-content="${id}"]`)
		el.style.outline="1px solid red"
		return null
/*
		let position=this.context.query().getCanvasRect(id)
		if(position==null)
			return this.el
*/
	}

	renderRange(start, end, docId, store){
		let $=this.context.query()
		return (
			<Fragment>
				<div style={{position:"fixed",top:10,left:10,background:"red"}}>
					{JSON.stringify(start)} -- {JSON.stringify(end)}
				</div>
				{
					this.getRects(start, end).map(({top,left,width,height},i)=>{
						return <div key={i} className="notContent"
							style={{
								position:"absolute",
								cursor:"move",
								...$.toCanvasCoordintation({left,top}),
								width,height,background:"blue",opacity:0.5
							}}/>
					})
				}
			</Fragment>
		)
	}
}
