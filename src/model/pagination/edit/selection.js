import React, {Component} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {getSelection,getNode} from "state/selector"

import {Text} from "model/pagination"

import offset from "mouse-event-offset"

import Entity from "state/selection/entity"
import Range from "state/selection/range"

export class Selection extends Component{
	static displayName="selection"
	static propTypes={
		start:PropTypes.shape({
			id: PropTypes.string.isRequired,
			at: PropTypes.number.isRquired
		}).isRequired,
		end:PropTypes.shape({
			id: PropTypes.string.isRequired,
			at: PropTypes.number.isRquired
		}).isRequired
	}

	static defaultProps={
		start:{id:"",at:0},
		end:{id:"",at:0}
	}

	static contextTypes={
		docId: PropTypes.any,
		store: PropTypes.any,
		query: PropTypes.func
	}

	el=null
	render(){
		return this.el
	}

	image(node){
		let {top,left,bottom,right}=this.context.query().getClientRectInSVG(node)
		const {onResize, onMove, onRotate}=this.props
		return <Entity
					path={`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`}
					onMove={onMove}

					spots={[
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
	}

	range(start,end,docId,store){
		let state=store.getState()
		let $=this.context.query()

		const inSVG=pos=>{
			const {left,top}=$.svg
			pos.left-=left
			pos.top-=top
			return pos
		}
		
		start.pos=inSVG($.position(start.id, start.at,1))
		end.pos=inSVG($.position(end.id, end.at,1))

		let posNotCorrect=((start,end)=>(end.page<start.page ||
				(end.page==start.page && end.column<start.column) ||
				(end.page==start.page && end.column==start.column && end.line<start.line) ||
				(end.page==start.page && end.column==start.column && end.line==start.line && end.left<start.left))
			)(start.pos, end.pos)
		if(posNotCorrect){
			let t=start
			start=end
			end=t
		}

		let paths=[]
		if(start.pos.top==end.pos.top){
			let x0=start.pos.left, x1=end.pos.left
			let {top,height}=start.pos
			paths.push(`M${x0} ${top} L${x1} ${top} L${x1} ${top+height} L${x0} ${top+height} L${x0} ${top}`)
		}else{
			let lines=$.lineRects(start.pos, end.pos)
			lines.reduce((paths, {left,top,right,bottom}, i, t)=>{
				switch(i){
				case 0:
					paths.push(`M${start.pos.left} ${top} L${right} ${top} L${right} ${bottom} L${start.pos.left} ${bottom} Z`)
				break
				case lines.length-1:
					paths.push(`M${end.pos.left} ${top} L${end.pos.left} ${bottom} L${left} ${bottom} L${left} ${top} Z`)
				break
				default:
					paths.push(`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`)
				break
				}
				return paths
			},paths)
		}
		return (
			<Range onMove={this.props.onMove}>
				{
					paths.map((a,i)=>(<path key={i}
						fill="lightblue"
						style={{fillOpacity:0.5}}
						d={a}/>
					))
				}
			</Range>
		)
	}

	componentWillReceiveProps({start,end},{docId,store,getRatio}){
		this.el=null
		if(start.id==end.id && start.at==end.at){
			let node=getNode(docId,start.id,start.at)
			if(!node)
				return

			switch(node.tagName){
			case "image":
				this.el=this.image(node)
			break
			}
		}else{
			this.el=this.range(start,end,docId,store,getRatio)
		}
	}
}

export default connect(state=>{
	return getSelection(state)
})(
class extends Component{
	static propTypes={
		onRef:PropTypes.func.isRequired
	}
	render(){
		const {onRef,...others}=this.props
		return <Selection {...others} ref={onRef}/>
	}
})
