import React, {Component,Fragment} from "react"
import {Editors} from "we-edit-representation-pagination"


export default class Document extends Editors.Document{
	render(){
		let rendered=super.render()
		if(!this.state.viewport)
			return rendered

		let content=React.Children.toArray(rendered.props.children).pop()
		const margin={top:0,bottom:0,left:5,right:5,header:0,footer:0}
		const {children:sections}=this.props
		const {width,height}=this.state.viewport
		const {pages}=content.props
		if(pages && pages.length>0){
			pages.forEach(page=>{
				let col=page.columns[0]
				page.height=col.children.reduce((h,a)=>h+a.props.height,0)
			})
		}
		return (
			<Fragment>
				{sections.map(a=>React.cloneElement(a,{
					pgSz:{height:9999,width:width-50},
					pgMar:margin, 
					cols:[Number.MAX_SAFE_INTEGER]
				}))}
				{content}
			</Fragment>
		)
	}
}
