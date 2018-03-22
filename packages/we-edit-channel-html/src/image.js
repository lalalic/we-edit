import React from "react"
import {Image as Base} from "we-edit/model"

export default class Image extends Base{
	render(){
		const {width,height,src}=this.props
		return (
			<img style={{width,height}} src={src}/>
		)
	}
}
