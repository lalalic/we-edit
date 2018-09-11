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
			let cells=row.props.children.map((a,i)=>{
				return React.cloneElement(a,{children:(
					<Fragment>
						<Adder x={a.props.width} y={-a.props.height} height={a.props.height+5} 
							at={i} table={id}/>
						<Fragment>
							{a.props.children}
						</Fragment>
					</Fragment>
				)})
			})
			row=React.cloneElement(row, {children:cells})
		}
		return React.cloneElement(row, {
			children:(
				<Fragment>
					<Fragment>
						{row.props.children}
					</Fragment>
					<Adder x={0} y={row.props.height} width={row.props.width+5} 
						at={this.computed.children.length} table={id}/>
				</Fragment>
			)
		})
	}
	
	makeCellResizable(row){
		let cells=row.props.children.map(a=>{
			return React.cloneElement(a,{children:(
				<g>
					<Fragment>
						{a.props.children}
					</Fragment>
					<RightSizable x1={a.props.width} y1={0} x2={a.props.width} y2={a.props.height}/>
					<BottomSizable x1={0} x2={a.props.width} y1={a.props.height} y2={a.props.height}/>
				</g>
			)})
		})
		
		return React.cloneElement(row, {children:cells})
	}
}

const RightSizable=connect()(class extends PureComponent{
	render(){
		const {...props}=this.props
		return <line {...props} stroke="red" strokeWidth={1} style={{cursor:"ew-resize"}}/>
	}
})

const BottomSizable=connect()(class extends PureComponent{
	render(){
		const {...props}=this.props
		return <line {...props} stroke="red" strokeWidth={1} style={{cursor:"ns-resize"}}/>
	}
})

const Adder=connect()(class extends PureComponent{
	state={show:false}
	render(){
		const {show}=this.state
		let {x,y, width, height,dispatch,size=5,at, table}=this.props
		let props={}
		if(show){
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
					onMouseOver={e=>this.setState({show:true})}
					onMouseLeave={e=>this.setState({show:false})}
					onClick={e=>{
						dispatch(ACTION.Selection.SELECT(table))
						dispatch(ACTION.Entity.UPDATE({type:"table",id:table,insert:{type:width ? "row" : "col", at}}))
					}}
					fill="red" 
					style={{cursor:"crosshair"}}/>
					
			</Fragment>
		)
	}
})