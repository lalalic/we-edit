import React, {Component,Fragment} from "react"

import PropTypes from "prop-types"
import memoize from "memoize-one"
import {shallowEqual} from "recompose"


export default ({Section,Frame})=>class __$1 extends Component{
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

	static childContextTypes={
		headerFooterWidth: PropTypes.number
	}

	getChildContext(){
		const {pgSz:{width},  pgMar:{left=0,right=0}={}}=this.props
		return {
			headerFooterWidth:width-left-right
		}
	}

	getLayout=memoize((width,margin,{num=1, space=0, data},id)=>{
		const availableWidth=width-margin.left-margin.right
		const cols=(data ? data : new Array(num).fill({width:(availableWidth-(num-1)*space)/num,space}))
			.reduce((state,{width,space})=>{
				state.columns.push({x:state.x, width,"data-content":id, "data-type":"section"})
				state.x+=(space+width)
				return state
			},{x:margin.left,columns:[]}).columns
		return {id,cols,margin,}
	}, (a,b)=>a===b||shallowEqual(a,b))

	getCreate=memoize((layout,type,width,height)=>{
		return (props,context)=>{
			if(type=="continuous"){
				if(props.i==0){
					if(props.I!=0){
						const pages=context.parent.getDocument().computed.composed
						return pages[pages.length-1].appendLayout(layout)
					}
				}
			}

			return new this.constructor.Page({width,height,...layout,...props},context)
		}
	},(a,b)=>a===b||shallowEqual(a,b))

	render(){
		const {pgSz:{width,height},  pgMar, cols, ...props}=this.props
		const layout=this.getLayout(width,pgMar,cols,this.props.id)
		const create=this.getCreate(layout,this.props.type,width,height)

		return(<Section create={create} {...props}/>)
	}

	static get Page(){
		return memoize(()=>Section.fissureLike(class Page extends Frame{
			static displayName="page"
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
					}
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
				  	this.header=React.cloneElement(header,{x:margin.left,y:margin.header, className:"header"})
					y0=Math.max(y0, margin.header+header.props.height)
				}

				var y1=height-margin.bottom
				if(footer){
					let y=height-margin.footer-footer.props.height
					this.footer=React.cloneElement(footer,{x:margin.left,y, className:"footer"})
					y1=Math.min(y, y1)
				}
				this.y0=y0
				this.y1=y1
			}

			createComposed2Parent(){
				const content=super.createComposed2Parent(...arguments)
				if(!this.footer && !this.header)
					return content
				const {type:Group}=content
				return (
					<Fragment>
						<Group z={-1}>
							{this.header}
							{this.footer}
						</Group>
						{content}
					</Fragment>
				)
			}

			createColumn(){
				const id=this.layout.id
				const i=this.columns.findIndex(a=>a.id==id)
				const y=i==-1 ? Math.max(this.y0, ...this.columns.map(a=>a.y+a.composedHeight)) : this.columns[i].y
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

			layoutOf(columnIndex,i=0){
				return Object.assign(super.layoutOf(columnIndex),this.layouts.find(a=>(i+=a.cols.length)>=columnIndex)||{})
			}

			removeFrom(lineIndex){
				//remove content
				const done=super.removeFrom(...arguments)
				//remove layout
				const i=this.columns.length==0 ? 0 : this.layouts.findIndex(a=>a.id==this.currentColumn.id)
				this.layouts.splice(i+1)

				//delete all pages in following continuous sections
				/*
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
				*/
				return done
			}

			clone(){
				const {layouts,y0,y1}=this
				return Object.assign(super.clone(...arguments),{layouts,y0,y1})
			}
		}))();
	}
}
