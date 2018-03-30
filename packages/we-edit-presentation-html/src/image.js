import React from "react"
import {models} from "we-edit"
const {Image:Base}=models

export default class Image extends Base{
	render(){
		const {width,height,src}=this.props
		return (
			<img style={{width,height}} src={src}/>
		)
	}
}
