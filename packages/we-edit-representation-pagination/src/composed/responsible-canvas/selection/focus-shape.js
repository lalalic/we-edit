import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import Spot from "./spot"

import Movable from "./movable"
import AbsoluteMovable from "./absolute-movable"
import Resizable from "./resizable"
import Rotatable from "./rotatable"

import {Group} from "../.."
import Geometry from "../../../tool/path"

export default class FocusShape extends Component{
	static propTypes={
		path: PropTypes.string,
		resizeSpots: PropTypes.arrayOf(PropTypes.object),
		rotate: PropTypes.shape({
			r:PropTypes.number,
			x:PropTypes.number.isRequired,
			y:PropTypes.number.isRequired
		}),
		id:PropTypes.string,
		absolute:PropTypes.bool,
	}

	static contextTypes={
		onMove:PropTypes.func,
		onResize: PropTypes.func,
		onRotate: PropTypes.func,
		around: PropTypes.func,
	}

	render(){
		const {onResize, onMove, around, onRotate,asCanvasPoint}=this.context
		const {path, resizeSpots, rotate, x, y,transform=a=>a,id,absolute,
				movable=!!onMove,
				resizable=!!onResize,
				rotatable=!!onRotate,
				children,
				isAnchor,
			}=this.props
		const Mover=absolute ? AbsoluteMovable : Movable
		return(
			<Group x={x} y={y}>
				{transform(
					<Fragment>
						<path d={path} fill="none" stroke="lightgray"/>
						{movable && (
							<Mover onMove={e=>onMove({...e,id,absolute})} around={around} isAnchor={isAnchor}>
								<path d={path} fill="white" fillOpacity={0.01} cursor="move"/>
							</Mover>
						)}

						{resizable && (
							<Resizable onResize={e=>onResize({...e,id})}>
								{resizeSpots.map((a,i)=><Spot key={i} {...a}/>)}
							</Resizable>
						)}

						{rotatable && <Rotatable onRotate={({left,top})=>{
							const geometry=new Geometry(path)
							const center=geometry.center()
							center.x+=x
							center.y+=y
							const xy=asCanvasPoint({left,top})
							var degree=parseInt(Math.atan2(xy.x-center.x,-xy.y+center.y)*180/Math.PI)
							if(degree<0)
								degree+=360

							return onRotate({degree,id})
						}} {...rotate}/>}
						{children}
					</Fragment>
				)}
			</Group>
		)
	}
}
