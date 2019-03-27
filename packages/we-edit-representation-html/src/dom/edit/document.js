import React, {PureComponent as Component,Fragment} from "react"
import PropTypes from "prop-types"
import {Editors} from "we-edit-representation-pagination"

const FixPageSize=({content, canvas, ...props})=>{
	const {height}=content.props.viewport
	const pages=content.props.pages.map(page=>{
		const {margin:{top=0,bottom=0}}=page.props
		return page.clone({height:page.columns[0].currentY+top+bottom})
	})

	const contentHeight=pages.reduce((h,a)=>h+a.props.height,0)
	if(contentHeight<height){
		const last=pages.pop()
		pages.push(last.clone({height:last.props.height+(height-contentHeight)}))
	}

	content=React.cloneElement(content,{pages})

	return canvas ? React.cloneElement(canvas, {content,...props}) : content
}

export default class HtmlDocument extends Component{
	static displayName="html-document"
	static defaultProps={
		margin:{
			left:10,
			right:10,
			top:10,
			bottom:10
		}
	}

	static childContextTypes={
		paper: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				border:PropTypes.bool
			})
		]),
		margin: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number
		})
	}

	constructor(){
		super(...arguments)
		this.state={}
		let resizeTimeout=null
		this.resizeViewPort=()=>{
			if(!resizeTimeout){
				resizeTimeout=setTimeout(()=>{
					resizeTimeout=null
					this.setState({resize:Date.now()})
				},66)
			}
		}
	}

	componentDidMount(){
		window.addEventListener("resize", this.resizeViewPort)
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.resizeViewPort)
	}

	getChildContext(){
		return {
			paper:{border:false},
			margin: this.props.margin,
		}
	}

	render(){
		const {canvas}=this.props
		return <PaginationDocument
			key={this.state.resize}
			{...this.props}
			pageGap={0}
			canvas={<FixPageSize canvas={canvas}/>}
			/>
	}
}

class PaginationDocument extends Editors.Document{
	composedY(){
		const {computed:{composed:pages}, props:{pageGap}}=this
		return pages.reduce((w,page)=>w+page.columns[0].currentY+pageGap,0)
	}
}
