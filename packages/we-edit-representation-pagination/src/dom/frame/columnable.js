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
					/*
					const cols=this.cols
					const indexes=this.lines.reduce((cs,{props:{colEnd}},i)=>(colEnd ? [...cs,i+1] : cs),[0])
					return indexes.map((startIndex,i)=>{
							return Object.defineProperties({
								height:this.props.height,
								...cols[i],
								children:ColumnChildren.create(this,startIndex)
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
						})
						*/
				},
				set(values){
					return this.computed.columns=values
				}
			},
			lines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed
				},
				set(values){
					if(values.length==0){
						/**to Normalize clean of this.columns */
						this.columns=[]
					}
					this.computed.composed=values
				}
			},
			isMultiBlocks:{
				enumerable:true,
				configurable:true,
				get(){
					return this.cols.length>1
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
		/**@TODO: remove column object to normalize columnable
		const last=this.lines.pop()
		if(last){
			this.lines.push(React.cloneElement(last, {colEnd:true}))
		}
		*/
		const column=Object.defineProperties({
			height:this.props.height,
			...this.cols[this.columns.length],
			children:ColumnChildren.create(this)
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

	lineX(line){
		return this.columns.find(a=>a.children.includes(line)).x
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

	getSpace(){
		const {height,width,x,y}=this.isMultiBlocks ? this.currentColumn : this.cols[0]
		const left=x, right=x+width
		return {
			x,y,
			width,
			height,
			left,
			right,
		}
	}

	nextAvailableSpace(){
		const space=super.nextAvailableSpace(...arguments)
		if(space==false && this.isMultiBlocks){
			const isCurrentColumnEmpty=this.currentColumn.children.length==0
			if(isCurrentColumnEmpty){
				/** not allow empty column, so ignore required*/
				return super.nextAvailableSpace()
			}
			const hasMoreColumn=this.cols.length>this.columns.length
			if(hasMoreColumn){
				this.createColumn()
				/** ignore required on a new column*/
				return super.nextAvailableSpace()
			}
		}
		return space
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
