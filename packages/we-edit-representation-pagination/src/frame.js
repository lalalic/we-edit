import React, {Component} from "react"
import PropTypes from "prop-types"
import {Rect} from "./tool/geometry"


import composable,{HasParentAndChild} from "./composable"
import {models, ReactQuery} from "we-edit"
const {Frame:Base}=models

import {Frame as ComposedFrame, Group} from "./composed"

const Super=HasParentAndChild(Base)

class Flowable extends Super{
	static IMMEDIATE_STOP=Number.MAX_SAFE_INTEGER
	constructor(){
		super(...arguments)
		this.defineProperties()
	}

	defineProperties(){
		Object.defineProperties(this,{
			firstLine:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed.find(a=>a.props.y==undefined)
				}
			},
			lastLine:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed.findLast(a=>a.props.y==undefined)
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
			currentLine:{
				enumerable:true,
				configurable:true,
				get(){
					return (({x=0,y=0,width})=>({x1:x,x2:x+width,y2:y+this.currentY}))(this.props)
				}
			},
			currentY:{
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

	createComposed2Parent(lines=this.computed.composed) {
		let {width,height=this.contentHeight, x,y,z,named}=this.props
		return (
			<Group {...{width,height,x,y,z,named, className:"frame"}}>
				{lines.reduce((state,a,i)=>{
					if(a.props.y==undefined){
						state.positioned.push(React.cloneElement(a,{y:state.y,key:i}))
						state.y+=a.props.height
					}else{
						state.positioned.push(React.cloneElement(a,{key:i}))
					}
					return state
				},{y:0,positioned:[]}).positioned}
			</Group>
		)
    }

	belongsTo(a,id){
		return new ReactQuery(a).findFirst(`[data-content="${id}"]`).get(0)
	}

	isAnchorComposed(id){
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
		return this.lineY(this.lines.findLast(line=>!this.belongsTo(line,id)))
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

	isEmpty(){
		return this.totalLines==0
	}

	reset4Recompose(){
		const lines=this.lines
		this.lines=[]
		return lines
	}

	exclusive(height){
		const lines=[this.currentLine]
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
						currentParagraphLines=line
						continue
					}else{
						currentParagraphLines.push(line)
						continue
					}
				}
			}
		}
		this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
	}

	static Line=class extends Component{
		constructor({width,maxWidth,height,wrappees=[],frame}){
			super(...arguments)
			this.maxWidth=maxWidth
			this.content=[]
			this.wrappees=wrappees
			this.frame=frame
			Object.defineProperties(this,{
				height:{
					enumerable:true,
					configurable:true,
					get(){
						return this.content.reduce((h,{props:{height}})=>Math.max(h,height),0)
					}
				},
				children:{
					enumerable:true,
					configurable:true,
					get(){
						return this.content
					}
				},
				availableHeight:{
					enumerable:false,
					configurable:false,
					get(){
						return height
					}
				},
				availableWidth:{
					enumerable:false,
					configurable:false,
					get(){
						return width-this.currentX
					}
				},
				currentX:{
					enumerable:false,
					configurable:false,
					get(){
						return this.content.reduce((x,{props:{width,x:x0}})=>x0!=undefined ? x0+width : x+width,0)
					}
				},
				width:{
					enumerable:true,
					configurable:false,
					get(){
						return width
					}
				},
				first:{
					enumerable:false,
					configurable:false,
					get(){
						const first=this.content.find(a=>a.props.x===undefined)
						if(first.props.atom)
							return first.props.atom
						return first
					}
				},
				paragraph:{
					enumerable:false,
					configurable:false,
					get(){
						return this.context.parent
					}
				}
			})
		}

		appendComposed(atom,at){
			const {width,minWidth=parseInt(width),anchor}=atom.props
			if(anchor){
				this.content.push(React.cloneElement(
					new ReactQuery(atom).findFirst('[data-type="anchor"]').get(0),
					{children:null,width:0,height:0, atom}
				))
				if(!this.frame.isAnchorComposed(anchor.props.id)){
					this.anchor=atom
					return false
				}
			}else{
				const containable=()=>minWidth==0 || this.availableWidth>=minWidth || this.availableWidth==this.maxWidth
				if(containable()){
					this.wrappees=this.wrappees.map((a,i)=>{
						if((this.currentX+minWidth)>a.x){
							this.content.push(<Group {...a} height={0}/>)
							this.wrappees[i]=null
						}else{
							return a
						}
					}).filter(a=>!!a)

					if(containable()){
						let height=this.lineHeight()
						this.content.push(atom)
						let newHeight=this.lineHeight()
						if(height!=newHeight){
							const newBlocks=this.frame.exclusive(newHeight)
							if(this.shouldRecompose(newBlocks)){
								const flowCount=this.content.reduce((count,a)=>a.props.x==undefined ? count+1 : count,0)
								at=at-flowCount
								this.content=[]
								return at
							}
						}
						return
					}else{
						return false
					}
				}else{

					return false
				}
			}
		}

		lineHeight(){
			return this.paragraph.lineHeight(this.height)
		}

		shouldRecompose(newBlocks){
			const applied=this.content.filter(a=>a.props.x!==undefined)
			const notShould=applied.reduce((notShould,{props:{x,width}},i)=>{
				if(notShould){
					let a=newBlocks[i]
					return!!a && parseInt(Math.abs(a.x-x))==0 && a.width==width
				}
				return false
			}, true)
			if(notShould){
				let notApplied=newBlocks.slice(applied.length)
				if(notApplied.slice(0,1).reduce((should,a)=>a.x<this.currentX,false)){
					this.wrappees=newBlocks
					return true
				}else{
					this.wrappees=notApplied
				}
				return false
			}else{
				this.wrappees=newBlocks
				return true
			}
		}

		commit(){
			this.wrappees.forEach(a=>this.content.push(<Group {...a} height={0}/>))
			this.wrappees=[]
			return this
		}
	}
}

class Columnable extends Flowable{
	defineProperties(){
		super.defineProperties()

		this.columns=[]
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
			lines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.columns.reduce((lines,a)=>[...lines,...a.children],[])
				}
			},
			totalLines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.columns.reduce((count,a)=>count+a.children.length,0)
				}
			},
			currentLine:{
				enumerable:true,
				configurable:true,
				get(){
					return (({width,x,y})=>({x1:x,x2:x+width,y2:y+this.currentY}))(this.currentColumn)
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
					if(this.columns.length==1){
						return this.currentY
					}else{
						return Math.max(...this.columns.slice(0,-1).map(a=>a.height||a.currentY))
					}
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
				configurable:false,
				get(){
					const {width,cols=[{x:0,width}]}=this.props
					return cols
				}
			},
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
				...this.columns.map(({children,...props},i)=>(
					<Group {...props} key={i}>
						{children.reduce((state,a,key)=>{
							state.rows.push(React.cloneElement(a,{y:state.y,key}))
							state.y+=a.props.height
							return state
						},{rows:[],y:0}).rows}
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
			if(this.props.cols.length>this.columns.length){// new column
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
		this.columns=[]
		return super.reset4Recompose(...arguments)
	}

	isDirtyIn(rect){
		if(this.wrappees.find(({props:{x,y,width,height}})=>this.isIntersect(rect,{x,y,width,height}))){
			return true
		}

		return !!this.columns.find(({x=0,y=0,width,currentY:height})=>this.isIntersect(rect,{x,y,width,height}))
	}
}

class PaginationControllable extends Columnable{
	defineProperties(){
		super.defineProperties()
		Object.defineProperties(this,{
			prev:{
				enumerable:true,
				configurable:true,
				get(){
					var parent=this.context.parent
					while(parent){
						if(parent.hasOwnProperty("prev")){
							return parent.prev
						}else if(parent.context){
							parent=parent.context.parent
						}else{
							throw new Error("not here")
						}
					}
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
