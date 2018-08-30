import React, {PureComponent as Component,Fragment} from "react"
import PropTypes from "prop-types"
import {Editors} from "we-edit-representation-pagination"

const Canvas=({pages, content, canvas, ...props})=>{
	pages.forEach(page=>{
		let col=page.columns[0]
		page.size.height=col.children.reduce((h,a)=>h+a.props.height,0)
	})
	return canvas ? React.cloneElement(canvas, {pages,content,...props}) : content
}

export default class Document extends Component{
	static childContextTypes={
		paper: PropTypes.bool
	}
	constructor(){
		super(...arguments)
		this.state={}
		this.resizeViewPort=this.resizeViewPort.bind(this)
	}
	
	componentDidMount(){
		window.addEventListener("resize", this.resizeViewPort)
	}
	
	componentWillUnmount(){
		window.removeEventListener("resize", this.resizeViewPort)
	}
	
	resizeViewPort(){
		this.setState({resize:Date.now()})
	}
	
	getChildContext(){
		return {
			paper:false
		}
	}
	
	render(){
		const {canvas}=this.props
		return <Editors.Document key={this.state.resize}
			{...this.props} 
			pageGap={0}
			canvas={<Canvas canvas={canvas}/>}
			/>
	}
}



