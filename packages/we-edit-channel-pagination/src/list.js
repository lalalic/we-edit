import React from "react"
import PropTypes from "prop-types"


import {HasParentAndChild} from "./composable"
import Paragraph from "./paragraph"
import {models} from "we-edit"
const {List:Base}=models
import Text from "./text"
import Group from "./composed/group"
import ComposedText from "./composed/text"

const Super=HasParentAndChild(Base)

export default class List extends Paragraph{
	static displayName=Super.displayName

	static propTypes={
		...Paragraph.propTypes,
		...Super.propTypes
	}

	static contextTypes={
		...Paragraph.contextTypes,
		...Super.contextTypes,
		Measure: PropTypes.func,
	}

	_newLine(){
        let line=super._newLine()

		if(this.computed.composed.length==0){
			let {labelWidth, label}=this.props
			let {defaultStyle}=new this.context.Measure(label.props)
			line.children.push(
				<Group
					x={-labelWidth}
					descent={defaultStyle.descent}
					width={0}
					height={0}>
					<ComposedText {...defaultStyle}
						width={labelWidth}
						contentWidth={labelWidth}
						children={[label.props.children]}/>
				</Group>
			)
		}
		return line
	}
}
