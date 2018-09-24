import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import Entity from "./entity"
import Range from "./range"

export default class SelectionShape extends Component{
	static propTypes={
		start:PropTypes.shape({
			id: PropTypes.string.isRequired,
			at: PropTypes.number.isRquired
		}),
		end:PropTypes.shape({
			id: PropTypes.string.isRequired,
			at: PropTypes.number.isRquired
		})
	}

	static contextTypes={
		query: PropTypes.func
	}

	render(){
		const {start, end}=this.props
		if(start.id==end.id && start.at==end.at)
			return null

		const {onResize, onMove, onRotate}=this.props
		const {type, path}=this.context.query().getRangePath(start,end)
		switch(type){
			case "image":{
				const asRect=d=>d.split(/[mlz]/gi).filter(a=>!!a.trim())
						.reduce((aa,a)=>aa.concat(a.trim().split(/\s+/g)),[])
						.map(a=>parseInt(a))
				const [left,top,right,,,bottom]=asRect(path)
				return (
					<Entity
							path={`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`}
							onMove={onMove}
							resizeSpots={[
									{x:left,y:top,resize:"nwse"},
									{x:(left+right)/2,y:top,resize:"ns",},
									{x:right,y:top,resize:"nesw"},
									{x:right,y:(top+bottom)/2,resize:"ew"},
									{x:right,y:bottom,resize:"-nwse"},
									{x:(left+right)/2,y:bottom,resize:"-ns"},
									{x:left,y:bottom,resize:"-nesw"},
									{x:left,y:(top+bottom)/2,resize:"-ew"},
								]}
							onResize={onResize}

							rotate={{
								r:12,
								x:(left+right)/2,
								y:top-20
							}}
							onRotate={onRotate}
							/>
						)
			}
			default:
				return (
					<Range onMove={onMove}>
						<path
							fill="#3297FD"
							style={{fillOpacity:0.5}}
							d={path}/>
					</Range>
				)
		}
	}
}
