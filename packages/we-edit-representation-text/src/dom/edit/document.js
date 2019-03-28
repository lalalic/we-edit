import React,{Component,Fragment} from "react"
import PropTypes from "prop-types"
import {compose, setDisplayName,getContext} from "recompose"
import memoize from "memoize-one"

import {Editors} from "we-edit-representation-html"

export default class  extends Component{
	static displayName="text-document"
	static propTypes={
		colorful:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number,
		lineHeight: PropTypes.string,
		color: PropTypes.string,
		wrap: PropTypes.bool,
		background: PropTypes.string,
		activeColor: PropTypes.string,
		lineNo: PropTypes.bool
	}

	static childContextTypes={
		colorful:PropTypes.bool,
		fonts: PropTypes.string,
		size: PropTypes.number,
		lineHeight: PropTypes.string,
		color: PropTypes.string,
		wrap: PropTypes.bool,
		background: PropTypes.string,
		activeColor: PropTypes.string
	}

	static contextTypes={
		Measure: PropTypes.func
	}

	getMeasure=memoize((Measure, fonts, size)=>new Measure({fonts,size}))

	getChildContext(){
		const {
			colorful,
			fonts="arial",
			size=11,
			lineHeight="140%",
			background,
			activeColor="beige"
		}=this.props
		return {colorful, fonts, size, lineHeight, background,activeColor}
	}

	render(){
		const {wrap,lineNo=true, colorful, fonts, size, lineHeight, background,activeColor, ...props}=this.props
		var canvas=props.canvas
		var {left=0, ...margin}=props.margin||{left:Editors.Document.defaultProps.margin.left}
		if(lineNo){
			const childCtx=this.getChildContext()
			const measure=this.getMeasure(this.context.Measure, childCtx.fonts, childCtx.size)
			const lineNoWidth=measure.stringWidth("999")+2
			canvas=<TextCanvas wrap={wrap} canvas={props.canvas} width={lineNoWidth} measure={measure} activeColor={childCtx.activeColor}/>
			left+=lineNoWidth
		}
		return (<Editors.Document key={wrap} {...props} {...{canvas, wrap}} margin={{...margin, left}}/>)
	}
}

class TextCanvas extends Component{
	getPageWithLineNo(){
		const {width,measure,activeColor}=this.props
		const {viewport, pages, page=pages[0]}=this.props.content.props
		const {margin:{left=0,right=0,top=0,bottom=0}}=page.props
		const lines=page.columns[0].children
		const lineHeight=lines[0].props.height

		const render=page.render.bind(page)
		page.render=()=>{
			const raw=render()
			return React.cloneElement(raw, {children: [
				<Lines {...{activeColor, width,measure,lineHeight,key:"lines",count:lines.length}}/>,
				raw.props.children
			]})
		}
		return page
	}

	render(){
		var {content,canvas,wrap,...props}=this.props
		content=React.cloneElement(content, {pages:[this.getPageWithLineNo()]})
		return canvas ? React.cloneElement(canvas, {content,...props}) : content
	}
}

const Lines=({active=0, activeColor, count, lineHeight, width, measure,
	baseline=measure.defaultStyle.height-measure.defaultStyle.descent})=>(
	<g style={{opacity:0.5}}>
		<rect width={99999} height={lineHeight} fill={activeColor}/>
		<rect width={width} height={count*lineHeight} fill="lightgray"/>
		{new Array(count)
			.fill(0)
			.map((a,i)=>{
				const I=`${i+1}`
				return (
					<g key={i} transform={`translate(0 ${i*lineHeight+baseline})`}>
						<text x={width-measure.stringWidth(I)-2}>{I}</text>
					</g>
				)
			})}
	</g>
)
