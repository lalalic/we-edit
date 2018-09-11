import React,{Fragment,PureComponent} from "react"

import {editify,connect,ACTION} from "we-edit"
import recomposable from "./recomposable"
import Base from "../table"


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
						<Adder
							x={a.props.width}
							y={-a.props.height}
							height={a.props.height+5}
							at={i} table={id}/>

						<ColSelector x1={0} x2={a.props.width}
							y1={-a.props.height} y2={-a.props.height}
							at={i} table={id}
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
					<Adder
						x={0} y={row.props.height} width={row.props.width+5}
						at={this.computed.children.length} table={id}/>
					<RowSelector x1={0} x2={0} y1={0} y2={row.props.height}
						at={this.computed.children.length} table={id}/>
				</Fragment>
			)
		})
	}

	makeCellResizable(row){
		let cells=row.props.children.map(a=>{
			return React.cloneElement(a,{children:(
				<Fragment>
					<Fragment>
						{a.props.children}
					</Fragment>

					<ColResizer x1={a.props.width} y1={0}
						x2={a.props.width} y2={a.props.height}/>

					<RowResizer x1={0} x2={a.props.width}
						y1={a.props.height} y2={a.props.height}/>
				</Fragment>
			)})
		})

		return React.cloneElement(row, {children:cells})
	}
}

const ColResizer=connect()(class extends PureComponent{
	render(){
		const {dispatch,...props}=this.props
		return <line {...props}
				stroke="transparent"
				strokeWidth={5}
				style={{cursor:"col-resize"}}
				/>
	}
})

const RowResizer=connect()(class extends PureComponent{
	render(){
		const {dispatch,...props}=this.props
		return <line {...props}
				stroke="transparent"
				strokeWidth={5}
				style={{cursor:"row-resize"}}
				/>
	}
})

const RowSelector=connect()(class extends PureComponent{
	render(){
		const {dispatch, ...props}=this.props
		return <line {...props}
				stroke="transparent"
				strokeWidth={5}
				style={{cursor:"e-resize"}}
				/>
	}
})

const ColSelector=connect()(class extends PureComponent{
	render(){
		const {dispatch, ...props}=this.props
		return <line {...props}
				stroke="transparent"
				strokeWidth={5}
				style={{cursor:"s-resize"}}
				/>
	}
})

const Adder=connect()(class extends PureComponent{
	state={show:false}
	render(){
		const {show}=this.state
		let {x,y, width, height,dispatch,at, table,type=width ? "row" : "col",size=5}=this.props
		let props={
			stroke:"transparent",
			strokeWidth:1,
			onMouseOver:e=>this.setState({show:true}),
			onMouseLeave:e=>this.setState({show:false}),
			onClick:e=>{
				dispatch(ACTION.Selection.SELECT(table))
				dispatch(ACTION.Entity.UPDATE({type:"table",id:table,insert:{type, at}}))
			},
			style:{cursor:"cell"}
		}
		if(show){
			props.stroke="black"
			if(width){
				props.width=width+size
				props.x=x
			}else if(height){
				props.height=height+size
				props.y=y
			}
		}

		if(width){
			props.x=x-size
		}else if(height){
			props.y=y-size
		}

		return (
			<Fragment>
				<rect width={size} height={size} y={y-size/2} x={x-size/2} {...props}
					fill="none"/>
			</Fragment>
		)
	}
})
