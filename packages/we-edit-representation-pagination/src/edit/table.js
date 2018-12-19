import React,{Fragment,PureComponent} from "react"

import {connect,ACTION} from "we-edit"
import editable from "./editable"
import {Cacheable} from "../composable"

import Base from "../table"
import Resizable from "../composed/selection/resizable"
import Top from "../composed/selection/top"
import {Group} from "../composed"

export default editable(class extends Base{
	createComposed2Parent(row){
		row=this.makeCellResizable(row)

		if(this.composedRows.length==1){
			row=this.makeColAdderNSelector(row)
		}

		row=this.makeRowAdderNSelector(row)

		return super.createComposed2Parent(row)
	}

	makeColAdderNSelector(firstRow){
		const {id}=this.props
		return React.cloneElement(firstRow, {children:firstRow.props.children.map((a,i)=>{
				return React.cloneElement(a,{children:(
					<Fragment>
						<Fragment>
							{a.props.children}
						</Fragment>
						<ColAdder
							x={a.props.width}
							y={0}
							onAdd={dispatch=>{
								dispatch(ACTION.Entity.UPDATE({id, col:{at:i}}))
							}}
							/>

						<ColSelector
							x1={0} x2={a.props.width} y1={0} y2={0}
							onSelect={dispatch=>{

							}}
							/>
					</Fragment>
				)})
			})})
	}

	makeRowAdderNSelector(row){
		const {id}=this.props
		const at=this.composedRows.length-1

		return React.cloneElement(row, {children:(
				<Fragment>
					<Fragment>
						{row.props.children}
					</Fragment>
					<RowAdder
						x={0}
						y={row.props.height}
						onAdd={dispatch=>{
							dispatch(ACTION.Entity.UPDATE({id, row:{at}}))
						}}
						/>
					<RowSelector
						x1={0} x2={0} y1={0} y2={row.props.height}
						onSelect={dispatch=>{

						}}/>
				</Fragment>
			)
		})
	}

	makeCellResizable(row){
		const {id, cols}=this.props
		const at=this.composedRows.length-1
		const {height,  contentHeight=height}=row.props
		const minCellWidth=i=>10
		const minRowHeight=()=>10
		let cells=row.props.children.map((a,i)=>{
			return React.cloneElement(a,{key:i,children:(
				<Fragment>
					<Fragment>
						{a.props.children}
					</Fragment>

					<ColResizer x1={a.props.width} y1={0}
						x2={a.props.width} y2={height}
						onResize={({x},dispatch)=>{
							let changed=[...cols]

							if(i<cols.length){
								if((changed[i]=cols[i]+x)<minCellWidth(i))
									return false
								if((changed[i+1]=cols[i+1]-x)<minCellWidth(i+1))
									return false
								//@TODO: test i+1: <min(spacing+margin+border)
							}else{
								if((changed[i]=cols[i]+x)<minCellWidth(i))
									return false
							}
							//@TODO: test i: <min(spacing+margin+border)


							dispatch(ACTION.Entity.UPDATE({id,cols:changed}))
						}}
						/>

					<RowResizer x1={0} x2={a.props.width}
						y1={height} y2={height}
						onResize={({y},dispatch)=>{
							if(height+y<contentHeight)
								return false
							dispatch(ACTION.Entity.UPDATE({id, rowHeight:{height:height+y,at}}))
						}}
						/>
				</Fragment>
			)})
		})

		return React.cloneElement(row, {children:cells})
	}
},{stoppable:true})

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
		let props={

		}

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
