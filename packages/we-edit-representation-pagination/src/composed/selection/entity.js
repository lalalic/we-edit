import React, {Component} from "react"
import PropTypes from "prop-types"

import Spot from "./spot"

import Movable from "./movable"
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
		})
	}

	render(){
		const {path, resizeSpots, onResize, onMove, around, onRotate, rotate, x, y,transform=a=>a}=this.props
		return transform(
			<Group x={x} y={y}>
				{onMove && (
					<Movable onMove={onMove} around={around}>
						<path d={path} fill="white" fillOpacity={0.01} cursor="move"/>
					</Movable>
				)}

				{onResize && (
					<Resizable onResize={onResize}>
						{resizeSpots.map((a,i)=><Spot key={i} {...a}/>)}
					</Resizable>
				)}

				{onRotate && <Rotatable onRotate={onRotate} {...rotate}/>}
			</Group>
		)
	}
}
