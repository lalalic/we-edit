import React, {PureComponent, Component,Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "we-edit"

import {Group} from "../../../composed"
import Overlay from "./overlay"
import Top from "./top"

const NoShow="transparent"
const Resizer=connect()(class __$1 extends PureComponent{
	constructor(){
		super(...arguments)
		this.state={resizing:false}
		this.resize=a=>this.props.onResize(a,this.props.dispatch)
	}
	render(){
		const {resizing}=this.state
		const {dispatch,onResize,direction="ew", cursor="col-resize", top={x:0,y:0},...props}=this.props
		const y=direction=="ew" ? 'y' :'x'
		const topLine={[y+'1']:"-100%", [y+'2']:"100%"}
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
	
export default class Resizable extends Component{
	static propTypes={
		onResize: PropTypes.func.isRequired,
		direction: PropTypes.oneOf("ew,ns,nwse,nesw".split(",").reduce((all,a)=>(all.splice(0,0,a,"-"+a),all),[]))
	}

	static ColResizer=props=><Resizer {...props} direction="ew" cursor="col-resize"/>
	static RowResizer=props=><Resizer {...props} direction="-ns" cursor="row-resize"/>
	
	state={}
	onStartResize=this.onStartResize.bind(this)

	render(){
		const {resizing,cursor}=this.state
		const {children, onEnd}=this.props
		if(resizing){
			return (
				<Overlay
					onMouseUp={e=>{
						this.setState({resizing:undefined})
						if(onEnd)
							onEnd()
						e.stopPropagation()
					}}
					onMouseMove={e=>{
						this.resize(e.clientX, e.clientY)
						e.stopPropagation()
					}}
					style={{cursor}}
					>
					{children}
				</Overlay>
			)
		}else{
			let props={}
			const {direction}=this.props
			if(direction){
				props.onMouseMove=e=>{
					if(e.buttons&0x1){
						this.onStartResize(direction,e)
						e.stopPropagation()
					}
				}
			}else{
				props.onStartResize=this.onStartResize
			}
			return (
				<Group>
					{
						React.Children.map(children,a=>React.cloneElement(a,props))
					}
				</Group>
			)
		}
	}
	onStartResize(resizing,e){
		this.setState({resizing,cursor:e.target.style.cursor})
		this.left=e.clientX
		this.top=e.clientY
		const {onStart}=this.props
		if(onStart)
			onStart()
	}

	resize(left,top){
		const {onResize}=this.props
		const {resizing}=this.state
		let x=left-this.left
		let y=top-this.top
		switch(resizing){
		case "-ns":
			y*=-1
		case "ns":
			if(y){
				if(false===onResize({y:-y})){
					return
				}
			}
		break
		case "-ew":
			x*=-1
		case "ew":
			if(x){
				if(false===onResize({x})){
					return
				}
			}
		break

		case "-nwse":
			x*=-1
		case "nwse":
			if(x && y){
				if(false===onResize({x:-x,y})){
					return
				}
			}
		break

		case "-nesw":
			x*=-1
		case "nesw":
			if(x && y){
				if(false===onResize({x,y})){
					return
				}
			}
		break
		}
		this.left=left
		this.top=top
	}
}


