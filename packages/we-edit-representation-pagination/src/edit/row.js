import React, {Component,  PureComponent, Fragment} from "react"
import {ReactQuery,connect, ACTION} from "we-edit"
import {Cacheable} from "../composable"
import editable from "./editable"
import Base from "../row"

import Resizable from "../composed/selection/resizable"
import Top from "../composed/selection/top"
import {Group} from "../composed"

export default Cacheable(class extends editable(Base,{stoppable:true,continuable:true}){
	clearComposed(){
		this.computed.spaces=[]
		this.computed.composed=[]
		super.clearComposed()
	}

	appendLastComposed(){
		if(this.computed.spaces.length!=this.computed.lastComposed.length){
			console.warn("something wrong for this row")
			return false
		}
		const space=this.context.parent.nextAvailableSpace()
		if(this.computed.spaces.length==1){
			const rank=this.computed.lastComposed[0]
			if(space.height>=rank.props.height){
				this.context.parent.appendComposed(rank)
				this.computed.spaces=[space]
				return
			}
		}else if(this.computed.spaces.length>1){
			if(space.height==this.computed.spaces[0].height){
				this.computed.spaces=[]
				this.computed.lastComposed.forEach(rank=>{
					this.computed.spaces.push(this.context.parent.nextAvailableSpace({height:rank.props.height}))
					this.context.parent.appendComposed(rank)
				})
				return
			}
		}
		return false
	}

	injectEmptyCellIntoRank(rank,parents,frame){
		if(this.computed.spaces[0].frame==frame
			&& this.computed.lastComposed.length>0){//the initial rank can't be used as cache
			this.computed.lastComposed=[]
		}
		super.injectEmptyCellIntoRank(...arguments)
		this.render2Composed(...arguments)
	}

	render2Composed(rank,parents,frame){
		const cells=rank.attr("children")
		//render cell into composed for positioning
		cells.forEach((a,j)=>{
			const {first:cell,parents}=new ReactQuery(a).findFirstAndParents(n=>n.props["data-type"]=="cell"||undefined)
			cells[j]=parents.reduceRight(
				(child,parent)=>React.cloneElement(parent,{},child),
				(({type,props})=>new type(props).render())(cell.get(0))
			)
		})

		const isFirstRow=(()=>{
			return false
		})();

		const table=parents.find(a=>a.props["data-type"]=="table").props["data-content"]
		const isLastRankOfRow=!!rank.attr("last")

		cells.forEach((cell,i)=>{
			const $cell=new ReactQuery(cell)
			const border=$cell.findFirst(".border").attr("children")
			const edges=[...border]
			border.splice(0,1,
				<EditableEdges key="edges"
					{...{
						table,
						row:this.props.id,
						cell:$cell.attr("data-content"),
						i,
						isFirstRowInPage:false,
						children:edges,
						height:cell.props.height,
						width:cell.props.width,
						isLastRankOfRow,
					}}
					/>
			)
		})

		//render rank to composed for positioning
		const renderedRank=(({type,props})=>new type(props).render())(rank.get(0));
		const tableRow=parents.reduceRight(
			(child,parent)=>React.cloneElement(parent,{},child),
			renderedRank
		)
		frame.currentColumn.children.splice(-1,1,tableRow)
		this.computed.lastComposed.push(renderedRank)
	}

	shouldContinueCompose(a){
		return true
	}

	composeFrames(){
        return [...super.composeFrames(),this.props.id]
    }
})


class EditableEdges extends PureComponent{
	render(){
		var {children:[top,bottom,right,left], isFirstRow, isLastRankOfRow, table,row, cell,i,width,height,dispatch}=this.props
		return (
			<Fragment>
				{top}
				{isFirstRow && <ColSelector/>}

				{bottom}

				{isLastRankOfRow && <RowResizer x1={0} x2={width} y1={height} y2={height}
					onResize={({y},dispatch)=>{
						dispatch(ACTION.Entity.UPDATE({id:table, height:{value:height+y,row,cell,i}}))
					}}
					/> || null
				}

				{right}
				{i==0  && <RowSelector x1={0} x2={0} y1={0} y2={height}
					onSelect={dispatch=>dispatch(ACTION.Selection.SELECT(row))}/>}

				<ColResizer x1={width} y1={0} x2={width} y2={height}
					onResize={({x},dispatch)=>{
						dispatch(ACTION.Entity.UPDATE({id:table,width:{value:width+x, row, cell,i}}))
					}}
					/>
				{left}
			</Fragment>
		)
	}
}

const NoShow="transparent"
const Resizer=connect()(class extends PureComponent{
	constructor(){
		super(...arguments)
		this.state={resizing:false}
		this.resize=a=>this.props.onResize(a,this.props.dispatch)
	}
	render(){
		const {resizing}=this.state
		const {dispatch,onResize,direction="ew", cursor="col-resize", ...props}=this.props
		let y=direction=="ew" ? 'y' :'x'
		let top={[y]:0}
		let topLine={[y+'1']:"-100%", [y+'2']:"100%"}
		return (
			<Fragment>
				{resizing &&
					<Top {...top}>
						<line {...props} {...topLine}
							stroke="lightgray"
							strokeWidth={1}
							strokeDasharray="5,5"/>
					</Top>
				}
				<Resizable
					direction={direction}
					onStart={e=>this.setState({resizing:true})}
					onEnd={e=>this.setState({resizing:false})}

					onResize={this.resize}>
					<line {...props}
						stroke={NoShow}
						strokeWidth={5}
						style={{cursor}}
						/>
				</Resizable>
			</Fragment>
		)
	}
})
const ColResizer=props=><Resizer {...props} direction="ew" cursor="col-resize"/>
const RowResizer=props=><Resizer {...props} direction="-ns" cursor="row-resize"/>


const Selector=connect()(class extends PureComponent{
	render(){
		const {dispatch, onSelect, cursor, size=5,...props}=this.props
		return <line {...props}
				stroke={NoShow}
				strokeWidth={size}
				style={{cursor}}
				onClick={e=>onSelect(dispatch)}
				/>
	}
})
const RowSelector=props=><Selector {...props} cursor="e-resize"/>
const ColSelector=props=><Selector {...props} cursor="s-resize"/>

const Adder=connect()(class extends PureComponent{
	state={show:false}
	render(){
		const {show}=this.state
		let {x,y, dispatch,onAdd,type}=this.props
		return (
			<Group x={x} y={y}>
				<Group x={-12} y={-22}>
					<Group rotate={`${type=="row" ? "-90 12 22" : ""}`}>
						<use xlinkHref="#table.adder"
							stroke={show ? "black" : NoShow}
							onMouseOver={e=>this.setState({show:true})}
							onMouseLeave={e=>this.setState({show:false})}
							onClick={()=>onAdd(dispatch)}
							/>
				   	</Group>
				</Group>
			</Group>
		)
	}
})
const RowAdder=props=><Adder {...props} type="row"/>
const ColAdder=props=><Adder {...props} type="col"/>
