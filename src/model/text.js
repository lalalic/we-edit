import React, {PropTypes} from "react"
import Component from "./component"

export default class Text extends Component{
	static displayName="text"
	static propTypes={
		fonts: PropTypes.string.isRequired,
		size: PropTypes.number.isRequired,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool
	}
	
	static defaultProps={
		fonts:"Arial",
		size:11
	}
}
