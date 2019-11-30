import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import Spot from "./spot"

import Movable from "./movable"
import AbsoluteMovable from "./absolute-movable"
import Resizable from "./resizable"
import Rotatable from "./rotatable"

import {Group} from "../../../composed"
import Geometry from "../../../tool/path"

export default class Extent extends Component{
	static propTypes={
		onResize: PropTypes.func,
		path: PropTypes.string,
		resizeSpots: PropTypes.arrayOf(PropTypes.object),
		onMove: PropTypes.func,
		onRotate: PropTypes.func,
		rotate: PropTypes.shape({
			r:PropTypes.number,
			x:PropTypes.number.isRequired,
			y:PropTypes.number.isRequired
		}),
		id:PropTypes.string,
		absolute:PropTypes.bool,
	}

	render(){
		const {path, resizeSpots, onResize, onMove, around, onRotate, rotate, positioning, x, y,transform=a=>a,id,absolute}=this.props
		const Mover=absolute ? AbsoluteMovable : Movable
		return(
			<Group x={x} y={y}>
				{transform(
					<Fragment>
						<path d={path} fill="none" stroke="lightgray"/>
						{onMove && (
							<Mover onMove={e=>onMove({...e,id,absolute})} around={around}>
								<path d={path} fill="white" fillOpacity={0.01} cursor="move"/>
							</Mover>
						)}

						{onResize && (
							<Resizable onResize={e=>onResize({...e,id})}>
								{resizeSpots.map((a,i)=><Spot key={i} {...a}/>)}
							</Resizable>
						)}

						{onRotate && <Rotatable onRotate={({left,top})=>{
							const geometry=new Geometry(path)
							const center=geometry.center()
							center.x+=x
							center.y+=y
							const xy=positioning.asCanvasPoint({left,top})
							var degree=parseInt(Math.atan2(xy.x-center.x,-xy.y+center.y)*180/Math.PI)
							if(degree<0)
								degree+=360

							return onRotate({degree,id})
						}} {...rotate}/>}
					</Fragment>
				)}
			</Group>
		)
	}
}
