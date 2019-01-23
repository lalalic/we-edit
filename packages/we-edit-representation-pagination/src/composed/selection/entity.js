import React, {Component} from "react"
import PropTypes from "prop-types"

import Spot from "./spot"

import Movable from "./movable"
import AbsoluteMovable from "./absolute-movable"
import Resizable from "./resizable"
import Rotatable from "./rotatable"

import {Group} from "../../composed"

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
		const {path, resizeSpots, onResize, onMove, around, onRotate, rotate, x, y,transform=a=>a,id,absolute}=this.props
		const Mover=absolute ? AbsoluteMovable : Movable
		return transform(
			<Group x={x} y={y}>
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

				{onRotate && <Rotatable onRotate={e=>onRotate({...e,id})} {...rotate}/>}
			</Group>
		)
	}
}
