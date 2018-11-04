import React, {Component} from "react"
import PropTypes from "prop-types"

import get from "lodash.get"

export default ({Section,Template,Frame})=>{

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
			return <Section {...this.props} cols={this.cols}/>
		}
	}
/*
	class Section extends Frame{
		render(){
			const {
				pgSz:{width,height},
				pgMar:{left, right,top,bottom,top,gutter},
				cols:{num=1, space=0, data},
				children,
				header:{
					first,even,odd,default,
				},
				footer:{
					first,even,odd,default,
				}
			}=this.props
			return (
				<Template {...{width,height}}>
					<Frame><Header/></Frame>
					<Frame><Footer/></Frame>
					<Template>
						{children}
					</Template>
				</Template>
			)
		}

		template(i){
			const {
				pgSz:{width,height},
				pgMar:{left, right,top,bottom,top,gutter},
				cols=[{space:0,width:width-left-right}]
			}=this.props
			const {header:headers, footer:footers}=this.computed
			const type=i==0 ? "first" : (i%2==0 ? "even" : "odd")
			const header=headers[type]||headers.default
			const footer=footers[type]||footers.default
			const contentWidth=width-left-right
			const contentHeight=height-top-bottom
			return (
				<Frame {...{width,height}}>
					<Frame x={left} y={top} width={contentWidth} height={contentHeight}>
						<header/>
					</Frame>
					<Frame x={left} y={-bottom} width={contentWidth} height={contentHeight}>
						<footer/>
					</Frame>
					<Frame x={left} y={top} width={contentWidth} height={contentHeight}>
						{
							cols.reduce((state,a)=>{
								all.push(<Frame x={state.lastX} width={a.width} margin={{right:a.space}}/>)
								state.lastX+=(a.width+a.space)
								return all
							},{frames:[],lastX:0}).frames
						}
					</Frame>
				</Frame>
			)
		}
	}
	*/
}
