import React from "react"
import {dom} from "we-edit"
const {Image:Base}=dom

export default class Image extends Base{
	render(){
		const {width,height,src}=this.props
		return (
			<img style={{width,height}} src={src}/>
		)
	}
}
