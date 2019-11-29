import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"
import {Group} from "../../composed"
import Fixed from "./base"
import { Layout } from "../../composable"
import ColumnChildren from "./column-children"

export default class Columnable extends Fixed{
	static Columnable=Columnable
	
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
