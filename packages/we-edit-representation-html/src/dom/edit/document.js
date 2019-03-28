import React, {PureComponent as Component,Fragment} from "react"
import PropTypes from "prop-types"
import {Editors} from "we-edit-representation-pagination"

const {Document, Section, Frame}=Editors
const FixPageSize=({content, canvas, ...props})=>{
	const {height}=content.props.viewport
	const pages=content.props.pages.map(page=>{
		const {margin:{top=0,bottom=0}}=page.props
		return page.clone({height:Math.max(page.columns[0].currentY+top+bottom,height)})
	})

	content=React.cloneElement(content,{pages})

	return canvas ? React.cloneElement(canvas, {content,...props}) : content
}

export default class extends Component{
	static displayName="html-document"
	static defaultProps={
		margin:{
			left:10,
			right:10,
			top:10,
			bottom:10
		}
	}
	static contextTypes={
		wrap: PropTypes.bool
	}

	static childContextTypes={
		paper: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				border:PropTypes.bool
			})
		])
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
		}
	}

	render(){
		const {wrap=true}=this.context
		const {canvas, children, margin, ...props}=this.props
		return 	<Document key={this.state.resize} {...props} pageGap={0}
					canvas={<FixPageSize canvas={canvas}/>}>
					<Section id="section" key="section"
						changed={!!React.Children.toArray(children).find(a=>a.props.changed)}
						create={(a,b)=>{
							const {width}=b.parent.getDocument().viewport
							return new this.constructor.Page({
								...a,margin,
								width:wrap ? width : Number.MAX_SAFE_INTEGER,
								height:Number.MAX_SAFE_INTEGER
							},b)
						}}>
						{children}
					</Section>
				</Document>
	}

	static Page=class extends Section.fissureLike(Frame.editableLike(Frame.Columnable)){
		defineProperties(){
			super.defineProperties()
			Object.defineProperties(this,{
				composedHeight:{
					enumerable:false,
					configurable:true,
					get(){
						return this.columns[0].currentY
					}
				}
			})
		}
	}
}
