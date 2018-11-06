import React, {Component} from "react"
import PropTypes from "prop-types"

import get from "lodash.get"

export default ({Section,  Template,Frame})=>{

	return class extends Component{
		static displayName=`docx-section`
		static propTypes={
			cols: PropTypes.shape({
				num: PropTypes.number.isRequired,
				space: PropTypes.number,
				data: PropTypes.arrayOf(PropTypes.shape({
					width: PropTypes.number,
					space: PropTypes.number
				}))
			}),
			titlePg:PropTypes.bool
		}

		static defaultProps={
			cols:{
				num:1
			}
		}

		static contextTypes={
			evenAndOddHeaders: PropTypes.bool
		}

		constructor(){
			super(...arguments)
			this.componentWillReceiveProps(this.props)
		}

		componentWillReceiveProps({pgSz:{width},  pgMar:{left, right}, cols:{num=1, space=0, data}}){
			let availableWidth=width-left-right
			this.cols=data ? data : new Array(num).fill({width:(availableWidth-(num-1)*space)/num,space})
		}

		render(){
			const {headers, footers, pagMar:margin, pgSz:size, ...props}=this.props
			
			return (
				<Section {...this.props} cols={this.cols} />
			)
		}
		
		template({pageNo, named}){
			const {pgSz:size,  pgMar:margin}=this.props
			const {header:headerStartAt=0, footer:footerEndAt=0,left,right,top,bottom}=margin
			const header=named('header',pageNo)
			const footer=named('footer',pageNo)
			const headerAvailableHeight=top-margin.header
			const footerAvailableHeight=bottom-margin.footer
			const headerContentHeight=header ? header.props.height : 0
			const footerContentHeight=footer ? footer.props.height : 0
			const padding={top:0, bottom:0}
			if(headerContentHeight>headerAvailableHeight){
				padding.top=margin.header+headerContentHeight-margin.top
			}

			if(footerContentHeight>footerAvailableHeight){
				padding.bottom=margin.footer+footerContentHeight-margin.bottom
			}
			
			const contentSize={
				width:size.width-left-right,
				height:size.height-margin.top-margin.bottom-padding.top-padding.bottom
			}
			
			const template=(
				<Frame {...{size,margin}}>
					<Frame className="header" x={left} y={margin.header}>
						{header}
					</Frame>
					<Frame className="footer" x={left} y={size.height-footerEndAt-footerContentHeight}>
						{footer}
					</Frame>
					<Frame className="content" x={left} y={size.height-margin.top-padding.top} 
						size={content}
						>
						{this.cols.reduce((state, col)=>{
							state.x+=col.space
							state.frames.push(<Frame x={state.x-col.space} size={{width:col.width,height:contentSize.height}}/>)
							state.x+=col.width
							return state
						},{x:0, frames:[]})}
					</Frame>
				</Frame>
			)

			const info={
				size,
				margin,
				padding,
				columns:[],
				header,
				footer,
			}
			info.columns[0]=this._newColumn(info)
			this.context.parent.appendComposed(this.createComposed2Parent(info))
			return info
		}
	}
}
