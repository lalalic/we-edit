import React from "react"
import Base from "../image"

export default class Image extends Base{
	render(){
		const {width,height,src}=this.props
		return (
			<img style={{width,height}} src={src}/>
		)
	}
}