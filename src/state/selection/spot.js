import React, {Component, PropTypes} from "react"

export default class Spot extends Component{
	static propTypes={
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		resize:PropTypes.string
	}
	
	render(){
		const {width=5,height=5,x,y,resize,onStartResize}=this.props
		const style={
			fill:"white",
			stroke:"lightgray",
			strokeWidth:1
		}
		let props={
			width,height,style,
			x:x-width/2,
			y:y-height/2
		}
		
		if(resize){
			props.cursor=`${resize.replace("-","")}-resize`
			props.onMouseDown=e=>onStartResize(resize,e)
		}
		
		return <rect {...props}/>
	}
}