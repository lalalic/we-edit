import React, {Component} from "react"
import PropTypes from "prop-types"
import {Rect} from "./tool/geometry"


import composable,{HasParentAndChild} from "./composable"
import {models, ReactQuery} from "we-edit"
const {Frame:Base}=models

import {Frame as ComposedFrame, Group} from "./composed"

const Super=HasParentAndChild(Base)

class Fixed extends Super{
	static IMMEDIATE_STOP=Number.MAX_SAFE_INTEGER
	constructor(){
		super(...arguments)
		if(this.props.REF)
			this.props.REF(this)
		this.defineProperties()
	}

	defineProperties(){
		Object.defineProperties(this,{
			firstLine:{
				enumerable:true,
				configurable:true,
				get(){
					return this.lines[0]
				}
			},
			lastLine:{
				enumerable:true,
				configurable:true,
				get(){
					const lines=this.lines
					return lines[lines.length-1]
				}
			},
			lines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed.filter(a=>a.props.y==undefined)
				},
				set(values){
					if(!values || values.length==0){
						return this.computed.composed=this.anchors
					}else{
						throw new Error("not support")
					}
				}
			},
			totalLines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.lines.length
				}
			},
			dividing:{//current exclusive bounds line
				enumerable:true,
				configurable:true,
				get(){
					return (({x=0,y=0,width})=>({x1:x,x2:x+width,y2:y+this.currentY}))(this.props)
				}
			},
			currentY:{//current composed y IN frame
				enumerable:false,
				configurable:true,
				get(){
					const {props:{height},computed:{composed:children}}=this
					return children.reduce((y, a)=>y+(a.props.y==undefined ? a.props.height : 0),0)
				}
			},
			anchors: {
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed.filter(a=>a.props.y!==undefined)
				}
			},
			wrappees: {
				enumerable:true,
				configurable:true,
				get(){
					return this.anchors.filter(({props:{wrap}})=>!!wrap)
				}
			},
			contentHeight:{
				enumerable:true,
				configurable:true,
				get(){
					return this.currentY
				}
			}
		})
	}

	nextAvailableSpace(required={}){
		const {width:maxWidth, height=Number.MAX_SAFE_INTEGER}=this.props
		const {height:minHeight}=required

		return {
			maxWidth,
			width:maxWidth,
			height:height-this.currentY,
			wrappees:this.exclusive(minHeight),
			frame:this,
		}
	}

	appendComposed(content){
		this.computed.composed.push(content)
	}

	onAllChildrenComposed(){
		this.context.parent.appendComposed(this.createComposed2Parent())
		super.onAllChildrenComposed()
	}

	createComposed2Parent() {
		let {width,height=this.contentHeight, x,y,z,named}=this.props
		return (
			<Group {...{width,height,x,y,z,named, className:"frame"}}>
				{this.positionLines(this.computed.composed)}
			</Group>
		)
    }

	positionLines(lines){
		return lines.reduce((state,a,i)=>{
			if(a.props.y==undefined){
				state.positioned.push(React.cloneElement(a,{y:state.y,key:i}))
				state.y+=a.props.height
			}else{
				state.positioned.push(React.cloneElement(a,{key:i}))
			}
			return state
		},{y:0,positioned:[]})
		.positioned
	}

	belongsTo(a,id){
		return new ReactQuery(a).findFirst(`[data-content="${id}"]`).get(0)
	}

	isAnchored(id){
		return !!this.anchors.find(a=>this.belongsTo(a,id))
	}

	isIntersect(A,B){
		return new Rect(A.x, A.y, A.width, A.height).intersects(new Rect(B.x, B.y, B.width, B.height))
	}

	isDirtyIn(rect){
		if(this.wrappees.find(({props:{x,y,width,height}})=>this.isIntersect(rect,{x,y,width,height}))){
			return true
		}

		return this.isIntersect(rect,{x:0,y:0,width,height:this.currentY})
	}

	paragraphY(id){
		const prevLineOfThisParagraph=this.lines.findLast(line=>this.getParagraph(line)!=id)
		if(prevLineOfThisParagraph){
			return this.lineY(prevLineOfThisParagraph)
		}
		return 0
	}

	lineY(line){
		return this.lines.slice(0,this.lines.indexOf(line)+1)
			.reduce((Y,a)=>Y+a.props.height,0)
	}

	getFlowableComposerId(line,filter){
		return new ReactQuery(line)
			.findFirst(`[data-type="paragraph"],[data-type="table"]`)
			.filter(filter)
			.attr("data-content")
	}
	getParagraph(line){
		return new ReactQuery(line)
			.findFirst(`[data-type="paragraph"]`)
			.attr("data-content")
	}

	isEmpty(){
		return this.totalLines==0
	}

	reset4Recompose(){
		const lines=this.lines
		this.lines=[]
		return lines
	}

	exclusive(height){
		const lines=[this.dividing]
		const x0=lines[0].x1
		if(height){
			lines.push({...lines[0], y2:lines[0].y2+height})
		}

		return this.wrappees.reduce((collected,{props:{wrap}})=>{
			lines.forEach(line=>collected.push(wrap(line)))
			return collected
		},[]).filter(a=>!!a)
		.sort((a,b)=>a.x-b.x)
		.reduce((all,{x,width},key)=>{
			all.push({key,pos:"start",x})
			all.push({key,pos:"end",x:x+width})
			return all
		},[])
		.sort((a,b)=>a.x-b.x)
		.reduce((state,a,i)=>{
			state[`${a.pos}s`].push(a)
			if(a.pos=="end"){
				if(state.ends.reduce((inclusive,end)=>inclusive && !!state.starts.find(start=>start.key==end.key),true)){
					let x0=state.starts[0].x
					let x1=a.x
					state.merged.push({x:x0, width:x1-x0})
					state.starts=[]
					state.ends=[]
				}
			}
			return state
		},{merged:[],starts:[], ends:[]})
		.merged
		.map(a=>(a.x-=x0,a))
		.map(({x,width})=>({x:Math.floor(x), width:Math.floor(width)}))
	}

	recompose(){
		const lines=this.reset4Recompose()
		var currentParagraph=null
		var currentParagraphLines=[]
		for(let i=0, line;i<lines.length;i++){
			line=lines[i]
			const linePID=this.getFlowableComposerId(line,`[data-type="paragraph"]`)
			if(!linePID){//not paragraph, then append directly
				if(currentParagraph){
					this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
					currentParagraph=null
					currentParagraphLines=[]
				}
				this.appendComposed(line)
			}else{
				if(!currentParagraph){
					currentParagraph=linePID
					currentParagraphLines.push(line)
				}else{
					if(linePID!==currentParagraph){
						this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
						currentParagraph=linePID
						currentParagraphLines=[line]
						continue
					}else{
						currentParagraphLines.push(line)
						continue
					}
				}
			}
		}
		if(currentParagraph){
			this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
		}
	}
}

class Columnable extends Fixed{
	defineProperties(){
		super.defineProperties()

		this.computed.columns=[]
		Object.defineProperties(this,{
			lines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.columns.reduce((lines,a)=>[...lines,...a.children],[])
				}
			},
			dividing:{
				enumerable:true,
				configurable:true,
				get(){
					return (({width,x=0,y=0})=>({x1:x,x2:x+width,y2:y+this.currentY}))(this.currentColumn)
				}
			},
			currentY:{
				enumerable:false,
				configurable:true,
				get(){
					return this.currentColumn.currentY
				}
			},
			contentHeight:{
				enumerable:false,
				configurable:true,
				get(){
					return Math.max(...this.columns.map(a=>a.height||a.currentY))
				}
			},
			anchors: {
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed
				}
			},
			currentColumn:{
				enumerable:true,
				configurable:true,
				get(){
					if(this.columns.length==0)
						this.createColumn()
					return this.columns[this.columns.length-1]
				}
			},
			cols:{
				enumerable:false,
				configurable:true,
				get(){
					const {width,cols=[{x:0,width}]}=this.props
					return cols
				}
			},
			columns:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.columns
				},
				set(value){
					return this.computed.columns=[]
				}
			}
		})
	}

	createColumn(){
		const column=Object.defineProperties({
			height:this.props.height,
			...this.cols[this.columns.length],
			children:[],
			className:"column"
		},{
			availableHeight:{
				enumerable:false,
				configurable:false,
				get(){
					if(this.height==undefined)
						return Number.MAX_SAFE_INTEGER
					return this.children.reduce((h,a)=>h-a.props.height,this.height)
				}
			},
			currentY:{
				enumerable:true,
				configurable:false,
				get(){
					return this.children.reduce((y,a)=>y+a.props.height,0)
				}
			}
		})
		this.columns.push(column)
		return column
	}

	lineY(line){
		var {y,children:lines}=this.columns.find(a=>a.children.includes(line))||this.currentColumn
		return lines.slice(0,lines.indexOf(line)+1).reduce((y,a)=>y+a.props.height,y)
	}

	createComposed2Parent(){
		const element=super.createComposed2Parent([])
		return React.cloneElement(element,{
			children:[
				...this.anchors,
				...this.columns.map(({children:lines,...props},i)=>(
					<Group {...props} key={i}>
						{this.positionLines(lines)}
					</Group>
				))
			]
		})
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
			...super.nextAvailableSpace(...arguments),
			maxWidth:this.currentColumn.width,
			width:this.currentColumn.width,
			height:this.currentColumn.availableHeight,
		}
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

	appendLine(line){
		this.currentColumn.children.push(line)
	}

	reset4Recompose(){
		const lines=super.reset4Recompose(...arguments)
		this.columns=[]
		return lines
	}

	isDirtyIn(rect){
		if(this.wrappees.find(({props:{x,y,width,height}})=>this.isIntersect(rect,{x,y,width,height}))){
			return true
		}

		return !!this.columns.find(({x=0,y=0,width,currentY:height})=>this.isIntersect(rect,{x,y,width,height}))
	}
}

class Balanceable extends Columnable{
	onAllChildrenComposed(){
		if(this.props.height==undefined && this.props.balance){
			this.balance()
		}
		super.onAllChildrenComposed(...arguments)
	}

	balance(){
		const width=this.cols[0].width
		const lines=this.lines
		if(!this.cols.find(a=>width!==a.width)){
			this.columns=[]
			this.equalBalance(lines, this.cols)
		}else{
			this.anyBalance(lines, this.cols)
		}
	}

	equalBalance(lines,cols){
		const totalHeight=lines.reduce((h,a)=>h+a.props.height,0)
		const colHeight=totalHeight/cols.length-10
		lines.reduce((state,line)=>{
			if(state.h<colHeight){
				state.cols[state.cols.length-1].push(line)
				state.h+=line.props.height
			}else{
				state.cols.push([line])
				state.h=line.props.height
			}
			return state
		},{cols:[[]],h:0})
			.cols
			.forEach(lines=>Object.assign(this.createColumn(),{
				children:lines
			}))
	}

	anyBalance(lines, cols){
		const createColumn=this.createColumn
		const reset4Recompose=this.reset4Recompose
		try{
			//recompose into col with totalWidth to get total height
			const totalWidth=cols.reduce((w,a)=>w+a.width,0)
			this.createColumn=()=>Object.assign(createColumn.call(this),{width:totalWidth,height:Number.MAX_SAFE_INTEGER})
			this.recompose()
			const totalHeight=this.currentColumn.currentY

			this.createColumn=()=>Object.assign(createColumn.call(this),{height:totalHeight})
			this.recompose()
		}finally{
			this.createColumn=createColumn
			this.reset4Recompose=reset4Recompose
		}
	}
}

class PaginationControllable extends Balanceable{
	defineProperties(){
		super.defineProperties()
		Object.defineProperties(this,{
			prev:{
				enumerable:false,
				configurable:true,
				get(){
					const siblings=this.context.parent.computed.composed
					return siblings[siblings.indexOf(this)-1]
				}
			}
		})
	}

	orphanCount(line=this.lastLine){
		const pid=this.getFlowableComposerId(line,'[data-type="paragraph"]')
		if(!pid)
			return 0
		return Math.max(this.lines.reverse().findIndex(a=>this.getFlowableComposerId(a)!==pid),0)
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
			this.context.getComposer(pid).recommit()
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
		if(n==0){
			removedLines.anchors=[]
			return removedLines
		}
		for(let i=this.columns.length-1;i>-1;i--){
			let lines=this.columns[i].children
			if(n<=lines.length){
				removedLines=removedLines.concat(lines.splice(-n))
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

class AnchorWrappable extends PaginationControllable{
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
	isAnchored(id){
		const composed=super.isAnchored(id)
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
			<Group {...rect} wrap={wrap}>
				{React.cloneElement(atom,{x:x-rect.x,y:y-rect.y,anchor:undefined})}
			</Group>
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

	rollbackLines(n,handleAnchor=true){
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

export default AnchorWrappable
