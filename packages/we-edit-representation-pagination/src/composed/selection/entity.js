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
		const {path, resizeSpots, onResize, onMove, onRotate, rotate}=this.props
		let rotator=null
		if(onRotate){
			rotator=<Rotatable onRotate={onRotate} {...rotate}/>
		}

		return (
			<Group>
				<Movable onMove={onMove}>
					<path d={path} fill="white" fillOpacity={0.01} cursor="move"/>
				</Movable>
				<Resizable onResize={onResize}>
					{resizeSpots.map((a,i)=><Spot key={i} {...a}/>)}
				</Resizable>
				{rotator}
			</Group>
		)
	}
}
