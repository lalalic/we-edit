import React, {PureComponent as Component,Fragment} from "react"
import PropTypes from "prop-types"
import Group from "./group"
import memoize from "memoize-one"

export default class extends Component{
    static propTypes={
        z:PropTypes.number
    }

    static defaultProps={
        z:0
    }

    render(){
        const {width,height,debug}=this.props
        return (
            <Group {...{className:"frame", ...this.props}}>
                {debug && <rect width={width} height={height} fill="red"/>}
                {this.props.children}
            </Group>
        )
    }

	static rect({width,height,rotate=0}){
		const radians=rotate*Math.PI/180
		const props={
			width:width * Math.abs(Math.cos(radians)) + height * Math.abs(Math.sin(radians)),
			height:height * Math.abs(Math.cos(radians)) + width * Math.abs(Math.sin(radians)),
		}
		
        props.x=height*Math.abs(Math.sin(radians))
		return props
	}
}
