import React, {PropTypes} from "react"
import Component from "./component"


export default class Paragraph extends Component{
	static displayName="paragraph"
	static propTypes={
		spacing: PropTypes.shape({
			lineHeight:PropTypes.string,
			top:PropTypes.number,
			bottom:PropTypes.number
		}).isRequired,
		indent: PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			firstLine:PropTypes.number,
			hanging:PropTypes.number
		}).isRequired
	}
	
	static defaultProps={
		spacing:{},
		indent:{}
	}
}
