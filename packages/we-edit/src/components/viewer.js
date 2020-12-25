import React from "react"
import Editor from "./editor"

export class Viewer extends Editor{
	static displayName="viewer"
	static defaultProps={
		...super.defaultProps,
		editable:{
			cursor:false
		},
	}

	render(){
		const {editable}=this.props
		if(!editable){
			return React.cloneElement(super.render(),{domain:"view"})
		}
		return super.render()
	}
}

export default Viewer