import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"
import Group from "./group"

export default class Layer extends Component{
    static propTypes={
        z:PropTypes.number
    }

    static defaultProps={
        z:0
    }

    render(){
        return (
            <Group {...this.props} className="frame"/>
        )
    }
	
	static rect({width,height,rotate=0}){
		const radians=rotate*Math.PI/180
		return {
			width:width * Math.abs(Math.cos(radians)) + height * Math.abs(Math.sin(radians)),
			height:height * Math.abs(Math.cos(radians)) + width * Math.abs(Math.sin(radians)),
			rotate
		}
	}
}
