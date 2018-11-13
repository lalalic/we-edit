import React, {PureComponent as Component,Fragment} from "react"
import PropTypes from "prop-types"
import Group from "./group"
import SVGPath from "../tool/svg-path"
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

    get geometry(){
        return new SVGPath(this.props.geometry)
    }

    intersects({x1,y1,x2,y2}){
        const {x=0,y=0,width, height,rotate,geometry}=this.props
        if(!geometry){
            console.assert(y1===y2)
            if(y1>y-height && y1<y){
                return {x,width}
            }
        }else{
            const points=this.geometry.intersects(arguments[0])
            if(points.length>0){
                let {x}=points[0]
                let {x:x1}=points.pop()
                return {x:Math.min(x,x1), width:Math.abs(x1-x)}
            }
        }
    }

	static rect({width,height,rotate=0}){
		const radians=rotate*Math.PI/180
		const props={
			width:width * Math.abs(Math.cos(radians)) + height * Math.abs(Math.sin(radians)),
			height:height * Math.abs(Math.cos(radians)) + width * Math.abs(Math.sin(radians)),
		}

		props.y=-props.height
        props.x=height*Math.abs(Math.sin(radians))
		return props
	}
}
