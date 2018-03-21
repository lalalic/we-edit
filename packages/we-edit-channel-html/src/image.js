import React from "react"
import Base from "we-edit/model/image"

export default class Image extends Base{
	render(){
		const {width,height,src}=this.props
		return (
			<img style={{width,height}} src={src}/>
		)
	}
}
