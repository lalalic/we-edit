import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"
import {Group} from "../../composed"
import Fixed from "./base"
import { Layout } from "../../composable"
import ColumnChildren from "./column-children"

//<Frame cols={[{x,width},{x,width}]}/>
export default class Columnable extends Fixed{
	static Columnable=Columnable
	defineProperties(){
		super.defineProperties()

		this.computed.columns=[]
		Object.defineProperties(this,{
			blockOffset:{
				enumerable:false,
				configurable:true,
				get(){
					return this.currentColumn.blockOffset
				}
			},
			availableBlockSize:{
				enumerable:true,
				configurable:true,
				get(){
					this.currentColumn.availableBlockSize
				}
			},
			contentHeight:{
				enumerable:false,
				configurable:true,
				get(){
					return Math.max(...this.columns.map(a=>a.height))
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
				set(values){
					return this.computed.columns=values
				}
			}
		})
	}

	createColumn(){
		const column=Object.defineProperties({
			height:this.props.height,
			...this.cols[this.columns.length],
			children:ColumnChildren.create(this),
			className:"column"
		},{
			availableBlockSize:{
				enumerable:false,
				configurable:false,
				get(){
					if(this.height==undefined)
						return Number.MAX_SAFE_INTEGER
					return this.height-(this.blockOffset-this.y||0)
				}
			},
			blockOffset:{
				enumerable:true,
				configurable:false,
				get(){
					return this.children.reduce((Y=0,{props:{height=0}})=>Y+height,this.y)
				}
			}
		})
		this.columns.push(column)
		return column
	}

	lineY(line){
		var {y:y0=0,children:lines}=this.columns.find(a=>a.children.includes(line))||this.currentColumn
		return lines.slice(0,lines.indexOf(line)+1).reduce((Y,{props:{height=0}})=>Y+height,y0)
	}

	positionLines(){
		return (
			<Fragment>
				{this.columns.map(({x,y,width,children:lines},i)=>{
					return React.cloneElement(super.positionLines(lines),{x,y,width,key:i,className:"column"})
				})}
			</Fragment>
		)
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
		const isAnchored=id=>this.isAnchored(id)
		const {height,width,x}=this.currentColumn
		const left=x, right=x+width
		const wrappees=this.exclusive(blockOffset, blockOffset+minRequiredH, left, right)
		if(typeof(wrappees)=="number"){
			return this.nextAvailableSpace({...required,blockOffset:wrappees})
		}

		return {
			width,
			height,
			blockOffset:this.blockOffset,
			top:blockOffset-this.blockOffset,
			left,
			right,
			wrappees,
			frame:this,
			findInlineSegments:(height,left,right)=>{
				const space=this.nextAvailableSpace({blockOffset:this.blockOffset,height})
				if(space){
					const {top,wrappees}=space
					return {
						top,
						segments:wrappees.reduce((ops,{x,width})=>{
							const [last]=ops.splice(-1)
							return [...ops, {x:last.x,width:x-last.x},{x:x+width,width:right-x-width}]
						},[{x:left,width:right-left}])
					}
				}
				return space
			},
			isAnchored
		}
	}

	appendComposed(line){
		const {height:requiredBlockSize, y}=line.props
		if(y!=undefined){//anchored
			return super.appendComposed(line)
		}

		const space=this.nextAvailableSpace({height:requiredBlockSize})
		if(space==false){
			return false
		}

		return this.appendLine(line)
	}

	appendLine(line){
		this.currentColumn.children.push(line)
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
}
