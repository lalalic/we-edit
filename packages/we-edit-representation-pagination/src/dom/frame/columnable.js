import React, {Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"
import {Group} from "../../composed"
import Fixed from "./base"
import { Layout } from "../../composable"

//<Frame cols={[{x,width},{x,width}]}/>
export default class Columnable extends Fixed{
	static Columnable=Columnable
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
			block:{
				enumerable:true,
				configurable:true,
				get(){
					return (({width,x=0,y=0})=>({x1:x,x2:x+width,y2:this.blockOffset}))(this.currentColumn)
				}
			},
			blockOffset:{
				enumerable:false,
				configurable:true,
				get(){
					return (this.currentColumn.y||0)+this.currentColumn.blockOffset
				}
			},
			contentHeight:{
				enumerable:false,
				configurable:true,
				get(){
					return Math.max(...this.columns.map(a=>a.height||a.blockOffset))
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
					const {
						width,
						cols=[{x:0,y:0,width}]
					}=this.props
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
					return this.height-this.blockOffset
				}
			},
			blockOffset:{
				enumerable:true,
				configurable:false,
				get(){
					return this.children.reduce((Y,{props:{height,y=Y}})=>Y+height,0)
				}
			}
		})
		this.columns.push(column)
		return column
	}

	isEmpty(){
		return this.totalLines==0 && this.anchors.length==0
	}

	lineY(line){
		var {y:y0=0,children:lines}=this.columns.find(a=>a.children.includes(line))||this.currentColumn
		return lines.slice(0,lines.indexOf(line)+1).reduce((Y,{props:{height,y=Y}})=>y+height,y0)
	}

	createComposed2Parent(){
		const alignY=contentHeight=>{
			const {height=contentHeight, vertAlign}=this.props
			switch(vertAlign){
				case "bottom":
					return height-contentHeight
				case "center":
				case "middle":
					return (height-contentHeight)/2
				default:
					return 0
			}
		};
		const element=super.createComposed2Parent([])
		return React.cloneElement(element,{
			children:[
				...this.anchors,
				...this.columns.map((column,i)=>{
					const {children:lines,blockOffset,
						"data-content":_1, "data-type":_2,id:_3, 
						...props}=column
					return (
						<Group {...props} key={i}>
							<Group y={alignY(column.blockOffset)}>
								{this.positionLines(lines)}
							</Group>
						</Group>
					)
				})
			]
		})
	}

	inlineOpportunities(wrappees){
		return wrappees.reduce((ops,{x,width})=>{
				const [last]=ops.splice(-1)
				return [...ops, {x:last.x,width:x-last.x},{x:x+width,width:x2-x-width}]
			},[{x:x1,width:x2-x1}])
	}

	nextAvailableSpace(required={}){
		const {height:minRequiredH=0,blockOffset=this.blockOffset}=required
		if((blockOffset+minRequiredH)-(this.currentColumn.height+(this.currentColumn.y||0))>1){//can't hold
			if(this.currentColumn.children.length>0){//is not empty
				if(this.cols.length>this.columns.length){// new column
					this.createColumn()
					return this.nextAvailableSpace({...required,blockOffset:undefined})
				}else{
					return false
				}
			}
		}
		const exclusive=this.exclusive.bind(this)
		const isAnchored=id=>this.isAnchored(id)
		const {height,width,x}=this.currentColumn
		const wrappees=this.exclusive(blockOffset, blockOffset+minRequiredH, x, x+width)
		if(typeof(wrappees)=="number"){
			return this.nextAvailableSpace({...required,blockOffset:wrappees})
		}

		return {
			width,
			height,
			blockOffset:this.blockOffset,
			top:blockOffset-this.blockOffset,
			frame:this,
			wrappees,
			exclude:(blockOffset=blockOffset,height=minRequiredH)=>this.nextAvailableSpace({blockOffset,height}),
			getInlineSegments(blockOffset,minRequiredH=0){
				const wrappees=exclusive(blockOffset, blockOffset+minRequiredH)
				return Layout.InlineSegments.create([...wrappees,{x:this.currentColumn.width}])
			},
			isAnchored
		}
	}

	appendComposed(line){
		const {height:contentHeight, x, y,width}=line.props
		if(x!=undefined && y!=undefined){//anchored
			this.computed.composed.push(line)
			return
		}else if(contentHeight-this.currentColumn.availableHeight>1){//can't hold
			if(this.currentColumn.children.length>0){//is not empty
				if(this.cols.length>this.columns.length){// new column
					this.createColumn()
					return 0+1//recompose current line in case different available space, such as different column width, wrapper, etc
				}else{
					return false
				}
			}
		}

		return this.appendLine(line)
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

		return !!this.columns.find(({x=0,y=0,width,blockOffset:height})=>this.isIntersect(rect,{x,y,width,height}))
	}

	columnIndexOf(line){
		return this.columns.reduce((c,column,i)=>{
			if(c.count>0){
				c.count-=column.children.length
				c.i=i
			}
			return c
		},{count:line+1,i:0}).i
	}

	layoutOf(){
		return Object.assign(super.layoutOf(),{cols:this.cols})
	}

	includeContent(id){
		if(!!this.columns.find(a=>a.id==id)){
			return true
		}
		return !![...this.lines,...this.anchors].find(a=>this.belongsTo(a,id))
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
