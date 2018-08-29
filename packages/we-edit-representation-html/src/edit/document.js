import React, {Component,Fragment} from "react"
import {Editors} from "we-edit-representation-pagination"


export default class Document extends Editors.Document{
	render(){
		let rendered=super.render()
		if(!this.state.viewport)
			return rendered

		let content=React.Children.toArray(rendered.props.children).pop()
		const margin={top:30,bottom:30,left:5,right:5,header:0,footer:0}
		const {children:sections}=this.props
		const {width,height}=this.state.viewport
		const {pages:[page]}=content.props
		if(page){
			const [col]=page
			page.height=col.children.reduce((h,a)=>h+a.props.height,0)+margin.top+margin.bottom
		}
		return (
			<Fragment>
				<Editors.Section id="fake-section"
					pgSz={{height:1000,width:width-50}}
					pgMar={margin}
					>
					{sections.map(a=><Fragment key={a.props.id}>{a.props.children}</Fragment>)}
				</Editors.Section>
				{content}
			</Fragment>
		)
	}
}
