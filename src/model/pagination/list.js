import React, {PropTypes} from "react"

import {HasParentAndChild} from "./composable"
import Paragraph from "./paragraph"
import Base from "../list"
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

	_newLine(){
        let line=super._newLine()

		if(this.computed.composed.length==0){
			let {labelWidth, label}=this.props
			let {defaultStyle}=new Text.WordWrapper(label.props)
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
