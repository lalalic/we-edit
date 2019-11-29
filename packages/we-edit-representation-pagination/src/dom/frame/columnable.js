import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"
import {Group} from "../../composed"
import Fixed from "./base"
import { Layout } from "../../composable"
import ColumnChildren from "./column-children"

export default class Columnable extends Fixed{
	static Columnable=Columnable
	defineProperties(){
		super.defineProperties()
		if(!this.props.cols)
			return
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
					return this.currentColumn.availableBlockSize
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
					const columns=this.columns
					if(columns.length==0)
						this.createColumn()
					return columns[columns.length-1]
				}
			},
			cols:{
				enumerable:true,
				configurable:true,
				get(){
					return this.props.cols
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
			},
			composedHeight:{
				enumerable:true,
				configurable:true,
				get(){
					return Math.max(...this.columns.map(a=>a.y+(a.height-a.availableBlockSize)))
				}
			}
		})
	}

	createColumn(){
		const column={
			...this.cols[this.columns.length],
			children:ColumnChildren.create(this),
			get isEmpty(){
				return this.children.length==0
			},
			get availableBlockSize(){
				const {height=Number.MAX_SAFE_INTEGER,y=0}=this
				return height-(this.blockOffset-y)
			},
			get blockOffset(){
				const {y=0}=this
				return this.children.reduce((Y,{props:{height=0}})=>Y+height,y)
			}
		}
		this.columns.push(column)
		return column
	}

	positionLines(){
		if(!this.cols)
			return super.positionLines(...arguments)
		return (
			<Fragment>
				{this.columns.map(({x,y,width,children:lines},i)=>{
					return React.cloneElement(super.positionLines(lines),{x,y,width,key:i,className:"column"})
				})}
			</Fragment>
		)
	}

	getSpace(){
		if(!this.cols)
			return super.getSpace(...arguments)
		const {width,x}=this.currentColumn
		return {
			left:x,
			right:x+width,
		}
	}

	nextAvailableSpace(){
		const space=super.nextAvailableSpace(...arguments)
		if(space==false && this.cols){
			if(this.currentColumn.isEmpty){
				/** not allow empty column, so ignore required*/
				return super.nextAvailableSpace()
			}
			const hasMoreColumn=this.cols.length>this.columns.length
			if(hasMoreColumn){
				this.createColumn()
				/** ignore required for a new column*/
				return super.nextAvailableSpace()
			}
		}
		return space
	}

	lineY(line){
		if(!this.cols)
			return super.lineY(...arguments)
		var {y:y0=0,children:lines}=this.columns.find(a=>a.children.includes(line))||this.currentColumn
		return lines.slice(0,lines.indexOf(line)+1).reduce((Y,{props:{height=0}})=>Y+height,y0)
	}

	lineX(line){
		if(!this.cols)
			return 0
		return this.columns.find(a=>a.children.includes(line)).x
	}

	isDirtyIn(rect){
		const dirty=super.isDirtyIn(...arguments)
		if(this.cols && !dirty){
			return !!this.columns
				.filter(a=>a!=this.currentColumn)//current block has already checked in super as normal space
				.find(({x=0,y=0,width,blockOffset:height})=>this.isIntersect(rect,{x,y,width,height}))
		}

		return dirty
	}

	columnIndexOf(line){
		if(!this.cols)
			return 0
		return this.columns.reduce((c,column,i)=>{
			if(c.count>0){
				c.count-=column.children.length
				c.i=i
			}
			return c
		},{count:line+1,i:0}).i
	}

	layoutOf(){
		if(!this.cols)
			return super.layoutOf(...arguments)
		return Object.assign(super.layoutOf(...arguments),{cols:this.cols})
	}

	includeContent(id){
		if(this.cols && !!this.columns.find(a=>a.id==id)){
			return true
		}
		return !![...this.lines,...this.anchors].find(a=>this.belongsTo(a,id))
	}
}
