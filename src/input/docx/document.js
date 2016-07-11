import Model from "./any"
import React from "react"
import Style from "./style"
import immutable from "immutable"

export default class extends Model{
	constructor(){
		super(...arguments)
		this.contentProps.documentStyles=new Styles()
	}

	addStyle(wordModel){
		let styleVisitor=new Style(wordModel, this)
		if(wordModel.id)
			this.contentProps.documentStyles[wordModel.id]=styleVisitor.style
		else
			this.contentProps.contentStyle=styleVisitor.style

		return styleVisitor
	}

	createStyle(){
		return this.contentProps.documentStyles.createStyle(...arguments)
	}

	getTypeDefaultStyleId(type){
		return this.contentProps.documentStyles.getDefault(type).metadata.id
	}
}

class Styles{
	getDefault(type){
		let styles=this
		let id=Object.keys(styles).find(a=>{
			let meta=styles[a].metadata
			if(!meta)
				return false
			else
				return meta.type==type && meta.isDefault
		})
		return styles[id]
	}

	createStyle(type){
		switch(type){
		case 'style.table':
		case 'table':
			return new TableStyleInfo(this)
		break
		default:
			return new StyleInfo(this)
		}
	}
}

class StyleInfo{
	constructor(styles){
		this.styles=styles
	}

	get(path){
		let value=path.split(".").reduce((p,key)=>p ? p[key] : p,this)
		if(value==undefined){
			const {basedOn}=this.metadata||{}
			if(basedOn){
				switch(typeof(basedOn)){
				case 'string':
					return this.styles[basedOn].get(...arguments)
				case 'object':
					return basedOn.get(...arguments)
				}
			}
		}
		return value
	}
}
/**
 * conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 * The conditional formats are applied in the following order:
	>Whole table/table
	>Banded columns/band1Vert , even column banding/band2Vert 
	>Banded rows/band1Horz , even row banding/band2Horz
	>First row/firstRow , last row/lastRow
	>First column/firstCol, last column/lastCol
	>Top left/nwCell, top right/neCell, bottom left/swCell, bottom right/seCell
 */
class TableStyleInfo extends StyleInfo{
	get(path, conditions=[]){
		let conditionStyles=this.conditions
		let value=conditions.reduce((found, condition)=>{
			if(found!=undefined)
				return found
			if(conditionStyles){
				let conditionStyle=conditionStyles[condition]
				if(conditionStyle)
					return conditionStyle.get(path)
			}
			return found
		},undefined)
		
		if(value==undefined)
			return super.get(...arguments)
	}
}