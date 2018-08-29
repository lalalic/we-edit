import React, {Component,Fragment} from "react"
import {Editors} from "we-edit-representation-pagination"


export default class Document extends Editors.Document{
	render(){
		let rendered=super.render()
		if(this.state.viewport){
			let content=React.Children.toArray(rendered.props.children).pop()
			const {children:sections}=this.props
			const {width,height}=this.state.viewport
			return (
				<Fragment>
					<Editors.Section 
						pgSz={{height:1000,width:width-50}} 
						pgMar={{top:30,bottom:30,left:5,right:5}}
						>
						{sections.map(a=><Fragment>{a.props.children}</Fragment>)}
					</Editors.Section>
					{content}
				</Fragment>
			)
		}else{
			return rendered
		}
	}
}
