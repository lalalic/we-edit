import React, {Component} from "react"
import TestRenderer from 'react-test-renderer'

import PropTypes from "prop-types"
import {ReactQuery, render} from  "we-edit"

import get from "lodash.get"

export default ({Template,Frame,Container})=>{
	class Flowable extends Frame{
		constructor(){
			super(...arguments)
			this.init()
			Object.defineProperties(this,{
				firstLine:{
					enumerable:true,
					configurable:true,
					get(){
						return this.columns[0].children[0]
					}
				},
				lastLine:{
					enumerable:true,
					configurable:true,
					get(){
						return this.currentColumn.children[this.currentColumn.children.length-1]
					}
				},
				totalLines:{
					enumerable:true,
					configurable:true,
					get(){
						return this.columns.reduce((count,a)=>count+a.children.length,0)
					}
				},
				currentColumn:{
					enumerable:true,
					configurable:true,
					get(){
						return this.columns[this.columns.length-1]
					}
				},
				content:{
					enumerable:true,
					configurable:true,
					get(){
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
				},
				composedHeight:{
					enumerable:false,
					configurable:false,
					get(){
						if(this.section.isAllChildrenComposed()){
							if(this==this.section.current){//last
								return Math.max(...this.columns.map(column=>column.y+(column.height-column.availableHeight)))
							}
						}
						return this.props.height
					}
				}
			})
		}

		init(){
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
			this.section=this.context.parent
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

			return {
				maxWidth:this.currentColumn.width,
				width:this.currentColumn.width,
				height:this.currentColumn.availableHeight,
				blocks:this.exclusive(minRequiredH),
				frame:this
			}
		}

		createComposed2Parent(container){
			const {i:key,width,height,margin}=this.props
			return React.cloneElement(container,{key,children:this.content,width,height,margin})
		}

		appendComposed(line){
			const {height:contentHeight, x, y,width}=line.props
			if(x!=undefined || y!=undefined){//anchored
				this.computed.composed.push(line)
				return
			}else if(contentHeight-this.currentColumn.availableHeight>1){
				if(this.cols.length>this.columns.length){// new column
					this.createColumn()
					return 0+1//recompose current line in case different available space, such as different column width, wrapper, etc
				}else{
					return false
				}
			}else{
				return this.appendLine(line)
			}
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

		appendLine(line){
			this.currentColumn.children.push(line)
		}

		paragraphY(id){
			let lastLine=this.columns.reduceRight((line,a)=>line ? line : a.children[a.children.length-1],null)

			const findLastLineNotBelongTo=(id)=>{
				for(let i=this.columns.length-1;i>=0;i--){
					let lines=this.columns[i].children
					for(let k=lines.length-1;k>=0;k--){
						let line=lines[k]
						if(!this.belongsTo(line,id)){
							return line
						}
					}
				}
			}

			if(lastLine && this.belongsTo(lastLine,id)){
				lastLine=findLastLineNotBelongTo(id)
			}

			if(!lastLine){
				return this.currentColumn.y
			}

			const lineEndY=line=>{
				var {y,children:lines}=this.columns.find(a=>a.children.includes(line))
				return y+lines.slice(0,lines.indexOf(line)+1).reduce((y,a)=>y+a.props.height,0)
			}

			return lineEndY(lastLine)
		}

		reset4Recompose(){
			const blocks=this.computed.composed
			const columns=this.columns

			this.columns=[]
			this.createColumn()
			this.computed.composed=[...blocks]
			return columns.reduce((lines,column)=>[...lines,...column.children],[])
		}
	}

	class PaginationControllable extends Flowable{
		get prev(){
			return this.section.prevPage
		}

		orphanCount(line=this.lastLine){
			const pid=this.getFlowableComposerId(line,'[data-type="paragraph"]')
			if(!pid)
				return 0
			let count=0
			for(let i=this.columns.length-1;i>-1;i--){
				let lines=this.columns[i].children
				for(let j=lines.length-1;j>-1;j--){
					if(this.getFlowableComposerId(lines[j])==pid){
						++count
					}else{
						return count
					}
				}
			}
			return count
		}

		appendLine(line){
			if(this.isEmpty() && this.prev){
				let rollbackLines=this.rollback4PaginationControl(line)
				if(Number.isInteger(rollbackLines))
					return rollbackLines
			}

			return super.appendLine(...arguments)
		}


		rollback4PaginationControl(line){
			const {pagination={}}=line.props
			const {widow,orphan,keepLines,last}=pagination
			if(keepLines){
				if(this.prev.shouldKeepLinesWith(line)){//i!=1
					let lineCount=this.prev.orphanCount()
					this.prev.rollbackLines(lineCount)
					return lineCount+1
				}
			}else{
				if(orphan){
					if(this.prev.orphanCount(line)==1){
						this.prev.rollbackLines(1)
						return 1+1
					}
				}

				if(widow){
					if(last){
						const orphanCount=this.prev.orphanCount(line)
						if(orphanCount>0){
							this.prev.rollbackLines(1)
							if(orphan){
								if(orphanCount==2){
									this.prev.rollbackLines(1)
									return 2+1
								}
							}
							return 1+1
						}
					}
				}
			}

			if(this.prev.shouldKeepWithNext(line)){
				let removedLines=this.prev.rollbackLines(this.prev.orphanCount())
				//re-submit last paragraph
				const pid=this.getFlowableComposerId(removedLines[0])
				this.section.context.getComposer(pid).recommit()
				return 0+1
			}
		}

		shouldKeepLinesWith(line){
			const pid=this.getFlowableComposerId(line)
			return this.getFlowableComposerId(this.lastLine)==pid &&
				this.getFlowableComposerId(this.firstLine)!=pid
		}

		shouldKeepWithNext(line){
			const should=
				(this.lastLine.props.pagination||{}).keepWithNext &&
				this.orphanCount(line)==0 &&
				this.getFlowableComposerId(this.firstLine)!==this.getFlowableComposerId(this.lastLine)
			return should
		}


		rollbackLines(n){
			var removedLines=[]
			for(let i=this.columns.length-1;i>-1;i--){
				let lines=this.columns[i].children
				if(n<lines.length){
					removedLines=removedLines.concat(lines.splice(-n))
					break
				}else if(n==lines.length){
					removedLines=removedLines.concat(this.columns.splice(i)[0].children)
					break
				}else{
					removedLines=removedLines.concat(this.columns.splice(i)[0].children)
					n=n-lines.length
				}
			}

			const anchors=(lines=>{
				const getAnchorId=a=>new ReactQuery(a).findFirst('[data-type="anchor"]').attr("data-content")
				const ids=Array.from(
					lines.reduce((ps, line)=>{
						ps.add(getAnchorId(line))
						return ps
					},new Set())
				).filter(a=>!!a)

				return this.computed.composed
					.filter(a=>ids.includes(getAnchorId(a)))
					.map(a=>{
						this.computed.composed.splice(this.computed.composed.indexOf(a),1)
						return a
					})
			})(removedLines);

			removedLines.anchors=anchors
			return removedLines
		}
	}

	class Anchorable extends PaginationControllable{
		isDirtyIn(rect){
			if(this.computed.composed.find(({props:{x,y,width,height}})=>
				this.isIntersect(rect,{x,y,width,height}))){
				return true
			}
			const columnIntersect=({x,y,width,height,availableHeight})=>this.isIntersect(rect,{x,y,width,height:height-availableHeight})

			if(columnIntersect(this.currentColumn)){
				return 1
			}

			return !!this.columns.find(columnIntersect)
		}

		exclusive(height, current){
			return super.exclusive(
				height,
				current||(({width,height,x,y})=>({x1:x,x2:x+width,y2:y+(height-this.currentColumn.availableHeight)}))(this.currentColumn)
			)
		}

		appendComposed(){
			const appended=super.appendComposed(...arguments)
			if(appended===false && //will create new page
				this.recomposing4Anchor &&
				!this.recomposing4Anchor.anchored){
				return Frame.IMMEDIATE_STOP
			}
			return appended
		}

		/*bad but faster*/
		composed(id){
			const composed=super.composed(id)
			if(this.recomposing4Anchor && this.recomposing4Anchor.anchor==id){
				this.recomposing4Anchor.anchored=true
			}
			return composed
		}

		/**
		* . can be placed in this page
			>current paragraph composing process should be terminated
		* . can't
			>current paragraph composing process should continue by rollback line, and start next page
		**/
		appendLine(line){
			if(!line.props.anchor){
				return super.appendLine(...arguments)
			}

			const lastComputed={
				composed:[...this.computed.composed],
				columns:this.columns.reduce((cloned,a)=>[...cloned,{...a,children:[...a.children]}],[]),
			}
			const {anchor:atom}=line.props
			const {anchor}=atom.props

			this.currentColumn.children.push(React.cloneElement(line,{anchor:undefined}))
			const {x,y}=anchor.xy(this)
			const {geometry,wrap,rect}=anchor.wrapGeometry({x,y},atom)

			this.appendComposed(
				<Frame.Group {...rect} wrap={wrap}>
					{React.cloneElement(atom,{x:x-rect.x,y:y-rect.y,anchor:undefined})}
				</Frame.Group>
			)

			if(wrap){
				if(this.isDirtyIn(geometry)){
					try{
						this.recomposing4Anchor=lastComputed
						this.recomposing4Anchor.anchor=anchor.props.id
						this.recompose()
						//then check if this anchor is in this page
						if(!this.recomposing4Anchor.anchored){
							//recover
							this.computed.composed=this.recomposing4Anchor.composed
							this.columns=this.recomposing4Anchor.columns
							this.recompose()
							return false
						}else{
							return 0+1
						}
					}finally{
						delete this.recomposing4Anchor
					}
				}else{

				}
			}else{
				return 0+1
			}
		}

		rollbackLines(n){
			const removedLines=super.rollbackLines(...arguments)
			if(removedLines.anchors){
				const anchors=removedLines.anchors
				const asRect=({x=0,y=0,width,height,wrap},a={})=>({x,y,width,height,...a})
				const intersectWithContent=!!anchors.find(a=>{
					if(!a.props.wrap)
					 	return false

					const wrapRect=asRect(a.props)
					return !!this.columns.find(b=>this.isIntersect(wrapRect, asRect(b,{height:b.height-b.availableHeight})))
				})

				if(intersectWithContent){
					this.recompose()
				}
			}
			return removedLines
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
			return <Template createPage={(props,context)=>new Anchorable({width,height,margin,cols,...props},context)} {...props}/>
		}
	}
}
