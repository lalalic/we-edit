import React, {PureComponent as Component,Fragment} from "react"
import PropTypes from "prop-types"
import {Editors} from "we-edit-representation-pagination"

const Canvas=({content, canvas, ...props})=>{
	let pages=content.props.pages.map(page=>{
		page={...page,size:{...page.size}}
		let col=page.columns[0]
		page.size.height=col.children.reduce((h,a)=>h+a.props.height,0)
		return page
	})

	content=React.cloneElement(content,{pages})

	return canvas ? React.cloneElement(canvas, {content,...props}) : content
}

export default class Document extends Component{
	static displayName="html-document"
	static defaultProps={
		margin:{
			left:10,
			right:10
		}
	}

	static childContextTypes={
		paper: PropTypes.bool,
		margin: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number
		})
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
			paper:false,
			margin: this.props.margin,
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
