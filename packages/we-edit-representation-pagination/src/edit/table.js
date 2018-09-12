import React,{Fragment,PureComponent} from "react"

import {editify,connect,ACTION} from "we-edit"
import recomposable from "./recomposable"
import Base from "../table"
import Resizable from "./selection/resizable"
import Top from "./selection/top"
import Group from "../composed/group"


export default class extends editify(recomposable(Base)){
	createComposed2Parent(){
		const {id}=this.props
		let row=super.createComposed2Parent(...arguments)
		row=this.makeCellResizable(row)

		if(this.computed.children.length==1){//first row
			row=React.cloneElement(row, {children:row.props.children.map((a,i)=>{
				return React.cloneElement(a,{children:(
					<Fragment>
						<Fragment>
							{a.props.children}
						</Fragment>
						<ColAdder
							x={a.props.width}
							y={-a.props.height}
							onAdd={dispatch=>{
								dispatch(ACTION.Selection.SELECT(id))
								dispatch(ACTION.Entity.UPDATE({col:{at:i}}))
							}}
							/>

						<ColSelector
							x1={0} x2={a.props.width} y1={-a.props.height} y2={-a.props.height}
							onSelect={dispatch=>{

							}}
							/>
					</Fragment>
				)})
			})})
		}

		return React.cloneElement(row, {children:(
				<Fragment>
					<Fragment>
						{row.props.children}
					</Fragment>
					<RowAdder
						x={0}
						y={row.props.height}
						onAdd={dispatch=>{
							dispatch(ACTION.Selection.SELECT(id))
							dispatch(ACTION.Entity.UPDATE({row:{at:this.computed.children.length}}))
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
		let cells=row.props.children.map((a,i)=>{
			return React.cloneElement(a,{key:i,children:(
				<Fragment>
					<Fragment>
						{a.props.children}
					</Fragment>

					<ColResizer x1={a.props.width} y1={0}
						x2={a.props.width} y2={a.props.height}
						onResize={({x},dispatch)=>{
							let changed=[...cols]

							if(i<cols.length){
								changed[i]=cols[i]+x
								changed[i+1]=cols[i+1]-x
							}else{
								changed[i]=cols[i]+x
							}

							dispatch(ACTION.Selection.SELECT(id))
							dispatch(ACTION.Entity.UPDATE({cols:changed}))
						}}
						/>

					<RowResizer x1={0} x2={a.props.width}
						y1={a.props.height} y2={a.props.height}
						onResize={({y},dispatch)=>{
							dispatch(ACTION.Selection.SELECT(id))
							dispatch(ACTION.Entity.UPDATE({rowHeight:{height:row.props.height+y,at:this.computed.children.length}}))
						}}
						/>
				</Fragment>
			)})
		})

		return React.cloneElement(row, {children:cells})
	}
}

const Resizer=connect()(class extends PureComponent{
	state={resizing:false}
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

					onResize={a=>onResize(a,dispatch)}>
					<line {...props}
						stroke="transparent"
						strokeWidth={5}
						style={{cursor}}
						/>
				</Resizable>
			</Fragment>
		)
	}
})
const ColResizer=props=><Resizer {...props} direction="ew" cursor="col-resize"/>
const RowResizer=props=><Resizer {...props} direction="ns" cursor="row-resize"/>


const Selector=connect()(class extends PureComponent{
	render(){
		const {dispatch, onSelect, cursor, size=5,...props}=this.props
		return <line {...props}
				stroke="transparent"
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
		let {x,y, dispatch,size=5,onAdd,type}=this.props
		let props={
			stroke:show ? "black" : "red",
			strokeWidth:size,
			onMouseOver:e=>this.setState({show:true}),
			onMouseLeave:e=>this.setState({show:false}),
			onClick:()=>onAdd(dispatch),
			style:{cursor:"cell"}
		}

		props[`${type=="row" ? 'x' : 'y'}2`]=-size

		return (
			<Group x={x} y={y}>
				<line x1={0} y1={0} x2={0} y2={0} {...props}/>
			</Group>
		)
	}
})
const RowAdder=props=><Adder {...props} type="row"/>
const ColAdder=props=><Adder {...props} type="col"/>
