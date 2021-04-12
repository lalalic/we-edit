import React, {Fragment, PureComponent as Component} from "react"
import PropTypes from "prop-types"
import Shape from "./shape"

export default class Text extends Component{
	static contextTypes={
		precision: PropTypes.number
	}

	render(){
		const {
			children, whiteSpace, color:fill="black", highlight,border,underline,strike,
			descent,minWidth, height, width, blockOffset,tokenizeOpportunity,mergeOpportunity,tabWidth,//ignore
			y=0,
			//["data-mergeid"]:_1,
			...others}=this.props
		const {precision=1}=this.context
		
		let background=null
		if(highlight || border){
			let props={
					width:Math.ceil(width),
					height:Math.ceil(height),
					fill:highlight||"none",
					x:0,y:y-height+descent
				}
			if(border){
				props.stroke="black"
				props.strokeWidth=0.5
			}
			background=(<rect {...props}/>)
		}
		let decoration=null
		if(underline){
			const {pos:y,thick:strokeWidth}=underline
			decoration=(<Shape y1={y} x2={width} y2={y} color={fill} width={strokeWidth*precision}/>)
		}

		let strikeline=null
		if(strike){
			let y=-descent
			strikeline=(<Shape y1={y} x2={width} y2={y} color={fill} width={0.5*precision}/>)
		}

		return (
			<Fragment>
				{background}
				<text y={y} 
					textLength={width}
					{...others}
					fill={fill}>
					{children}
				</text>
				{strikeline}
				{decoration}
			</Fragment>
		)
	}

	static Dynamic=({children, ...props})=><Text {...props} children={children()}/>
}