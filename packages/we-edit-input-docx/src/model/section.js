import React, {Component} from "react"
import TestRenderer from 'react-test-renderer'

import PropTypes from "prop-types"
import {ReactQuery, render} from  "we-edit"

import get from "lodash.get"

export default ({Template,Frame, Container})=>{
	class Page extends Frame{
		defineProperties(){
			this.section=this.context.parent
			super.defineProperties()
			Object.defineProperties(this,{
				layout:{
					enumerable:false,
					configurable:false,
					get(){
						return this.layouts[this.layouts.length-1]
					}
				},
				cols:{
					enumerable:false,
					configurable:true,
					get(){
						return this.layouts.reduce((cols,a)=>[...cols,...a.cols],[])
					}
				},
				composedHeight:{
					enumerable:false,
					configurable:false,
					get(){
						if(this==this.section.current){//last
							if(!this.section.isAllChildrenComposed()){
								return Math.max(...this.columns.map(column=>column.y+(column.height-column.availableHeight)))
							}
						}
						return this.props.height
					}
				},
			})

			const {width,height,margin, cols,named,i,id}=this.props
			this.layouts=[{cols,margin,id}]

			const typed=type=>[(i==0 ? "first" :false),(i%2==0 ? "even" : "odd"),'default']
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
			this.y0=y0
			this.y1=y1
		}

		createColumn(){
			const id=this.layout.id
			const i=this.columns.findIndex(a=>a.id==id)
			const y=i==-1 ? Math.max(this.y0, ...this.columns.map(a=>a.y+a.currentY)) : this.columns[i].y
			return Object.assign(super.createColumn(),{
				height:this.y1-y,
				y,
				id,
			})
		}

		appendLayout(layout){
			const {cols, margin,id}=layout
			const lastLayout=this.layout
			function doLayout(page){
				page.layouts.push(layout)
				page.createColumn()
				return page
			}

			if(lastLayout.cols.length>1){
				const total=this.context.parent.totals
				this.balance()
				if(total!=this.context.parent.totals){
					//new page created during balancing
					const current=this.context.getComposer(lastLayout.id).current
					current.cols.slice(-current.columns.length).forEach(a=>current.createColumn())
					return doLayout(current)
				}
			}

			return doLayout(this)
		}

		balance(){
			const {cols,id}=this.layout
			const columns=this.columns.filter(a=>a.id===id)
			const lines=columns.reduce((lines,a)=>[...lines,...a.children],[])
			const balanced=((heights, min)=>{
				return columns.length==cols.length && (Math.max(...heights)-Math.min(...heights))<min
			})(columns.map(a=>a.currentY), Math.min(...lines.map(a=>a.props.height)))

			if(balanced){
				return
			}

			this.columns.splice(-columns.length)
			if(!cols.find(a=>a.width!=cols[0].width)){
				this.equalBalance(lines,cols)
			}else{
				this.anyBalance(lines, cols)
			}
		}

		anyBalance(lines, cols){
			const createColumn=this.createColumn
			const reset4Recompose=this.reset4Recompose

			try{
				//recompose into col with totalWidth to get total height
				const totalWidth=cols.reduce((w,a)=>w+a.width,0)
				this.createColumn=()=>Object.assign(createColumn.call(this),{width:totalWidth,height:Number.MAX_SAFE_INTEGER})
				this.reset4Recompose=()=>{
					this.createColumn()
					return lines
				}
				this.recompose()
				const totalHeight=this.currentColumn.currentY

				this.createColumn=()=>Object.assign(createColumn.call(this),{height:totalHeight})
				this.reset4Recompose=()=>{
					const [fakeCol]=this.columns.splice(-1)
					this.createColumn()
					return fakeCol.children
				}
				this.recompose()
			}finally{
				this.createColumn=createColumn
				this.reset4Recompose=reset4Recompose
			}
		}

		render(){
			const {props:{i:key,width,height,margin}}=this
			return React.cloneElement(super.createComposed2Parent(),{key,width,height,margin,className:"page frame"})
		}

		removeFrom(lineIndex){
			//remove content
			const done=super.removeFrom(...arguments)
			//remove layout
			const i=this.columns.length==0 ? 0 : this.layouts.findIndex(a=>a.id==this.currentColumn.id)
			this.layouts.splice(i+1)

			//delete all pages in following continuous secions
			const siblings=this.section.getDocument().props.children
			const j=siblings.findIndex(a=>a.props.id==this.section.id)
			siblings.slice(j+1).reduce((continuing,a)=>{
				if(continuing &&
					a.type.displayName=="section" &&
					a.props.type=="continuous"){
					this.context.getComposer(a.props.id)//Template
						.clearComposed()
					return true
				}
				return false
			},true)
			return done
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

		getLayout(section=this){
			const {children, pgSz:{width,height},  pgMar:margin, cols:{num=1, space=0, data}, id,...props}=section.props
			const availableWidth=width-margin.left-margin.right
			const cols=(data ? data : new Array(num).fill({width:(availableWidth-(num-1)*space)/num,space}))
				.reduce((state,{width,space})=>{
					state.columns.push({x:state.x, width,"data-content":section.props.id, "data-type":"section"})
					state.x+=(space+width)
					return state
				},{x:margin.left,columns:[]})
				.columns
			return {
				id,
				cols,
				margin,
			}
		}

		render(){
			const {pgSz:{width,height},  pgMar:{left,right}, cols:{num=1, space=0, data},children, ...props}=this.props

			const layout=this.getLayout(this)

			const create=(props,context)=>{
				if(this.props.type=="continuous"){
					if(props.i==0){
						if(props.I!=0){
							const pages=context.parent.getDocument().computed.composed
							return pages[pages.length-1].appendLayout(layout)
						}
					}
				}

				return new Page({width,height,...layout,...props},context)
			}

			return(
				<Template create={create} {...props}>
					{React.Children.toArray(children).map(a=>{
						if(a.props.named){//header or footer
							return <Frame {...a.props} width={width-left-right} key={a.props.id}/>
						}else{
							return a
						}
					})}
				</Template>
			)
		}
	}
}
