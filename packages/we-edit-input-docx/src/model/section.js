import React, {Component} from "react"
import PropTypes from "prop-types"

import get from "lodash.get"

export default ({Template,Frame})=>{
	class Page extends Frame{
		constructor(){
			super(...arguments)
			const {width,height,margin,cols,named,i}=this.props
			const typed=type=>[(i==1 ? "first" :false),(i%2==0 ? "even" : "odd"),'default']
				.filter(a=>!!a)
				.reduce((found,a)=>found || named(`${type}.${a}`),null)

			const header=typed("header")
			const footer=typed("footer")

			var y0=margin.top
			if(header){
			  	this.computed.composed.push(
					React.cloneElement(header,{x:margin.left,y:margin.header, className:"header"})
				)
				y0=Math.max(y0, margin.header+header.props.height)
			}

			var y1=height-margin.bottom
			if(footer){
				let y=height-margin.footer-footer.props.height
				this.computed.composed.push(
					React.cloneElement(footer,{x:margin.left,y, className:"footer"})
				)
				y1=Math.min(y, y1)
			}

			this.cols=cols.reduce((state,a)=>{
					state.columns.push({x:state.x, y:state.y, width:a.width,height:state.height})
					state.x+=(a.space+a.width)
					return state
				},{x:margin.left,y:y0,height:y1-y0,columns:[]}).columns
			this.columns=[]
			this.createColumn()
		}

		nextAvailableSpace(required={}){
			const {width:minRequiredW=0,height:minRequiredH=0}=required
			if(minRequiredH-this.currentColumn.availableHeight>1){
				if(this.cols.length>this.columns.length){// new column
					this.createColumn()
				}else{
					return false
				}
			}

			const {width,x,y}=this.currentColumn
			return {
				width,
				height:minRequiredH||this.currentColumn.availableHeight,
				blocks:this.exclusive(),
				frame:this
			}
		}

		appendComposed(line){
			const {height:contentHeight, anchor, x, y}=line.props
			if(x!=undefined || y!=undefined){
				this.computed.composed.push(line)
			}else if(contentHeight-this.currentColumn.availableHeight>1){
				if(this.cols.length>this.columns.length){// new column
					this.createColumn()
				}else{
					return false
				}
			}

			return this.currentColumn.children.push(line)
		}

		createColumn(){
			const column={
				...this.cols[this.columns.length],
				children:[],
				className:"column"
			}
			Object.defineProperties(column,{
				availableHeight:{
					enumerable:false,
					configurable:false,
					get(){
						return column.children.reduce((h,a)=>h-a.props.height,column.height)
					}
				}
			})
			this.columns.push(column)
		}

		get content(){
			return [
				...this.computed.composed,
				...this.columns.map(({children,...props},i)=>(
					<Frame.Group {...props} key={i}>
						{children.reduce((state,a,key)=>{
							state.rows.push(React.cloneElement(a,{y:state.y,key}))
							state.y+=a.props.height
							return state
						},{rows:[],y:0}).rows}
					</Frame.Group>
				))
			]
		}

		get currentColumn(){
			return this.columns[this.columns.length-1]
		}

		createComposed2Parent(container){
			const {i:key,width,height,margin}=this.props
			return React.cloneElement(container,{key,children:this.content,width,height,margin})
		}

		paragraphY(id){
			return 0
		}

		recompose(){
			throw new Error("not support yet")
		}

		replaceComposedWith(recomposed){
			throw new Error("not support yet")
		}

		next(){
			this.context.parent.createPage()
		}
	}

	return class extends Component{
		static displayName="section"
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

		render(){
			var {pgSz:{width,height},  pgMar:margin, cols:{num=1, space=0, data}, ...props}=this.props
			var availableWidth=width-margin.left-margin.right
			var cols=data ? data : new Array(num).fill({width:(availableWidth-(num-1)*space)/num,space})
			return <Template createPage={(props,context)=>new Page({width,height,margin,cols,...props},context)} {...props}/>
		}
	}
}
