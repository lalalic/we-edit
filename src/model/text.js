import React, {Component,PropTypes} from "react"
import merge from "tools/merge"

export default class Text extends Component{
	static displayName="text"
	static propTypes={
		fonts: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool
	}

	static contextTypes={
		fonts: PropTypes.string.isRequired,
		size: PropTypes.number.isRequired,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool
	}

    get style(){
        return merge("fonts,size,color,bold,italic,vanish".split(","),this.props,this.context)
    }
}
