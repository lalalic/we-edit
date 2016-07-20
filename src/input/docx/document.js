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
			this.contentProps.directStyle=styleVisitor.style

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
		case 'table':
		case 'style.table':
			return new TableStyleInfo(this)
		case 'seCell':case 'swCell': case 'neCell': case 'nwCell':
			return new CellStyleInfo(this)
		case 'firstRow':
			return new FirstRowStyleInfo(this)
		case 'lastRow':
			return new LastRowStyleInfo(this)
		case 'firstCol':
			return new FirstColStyleInfo(this)
		case 'lastCol':
			return new LastColStyleInfo(this)
		case 'band2Horz':
			return new Band2HStyleInfo(this)
		case 'band1Horz':
			return new Band1HStyleInfo(this)
		case 'Band2Vert':
			return new Band2VStyleInfo(this)
		case 'Band1Vert':
			return new Band1VStyleInfo(this)
		case 'row':
			return new RowStyleInfo(this)
		case 'cell':
			return new CellStyleInfo(this)
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
		if(value==undefined)
			value=this.getFromBasedOn(...arguments)
		return value
	}
	
	getBasedOn(){
		const {basedOn}=this.metadata||{}
		if(basedOn){
			switch(typeof(basedOn)){
			case 'string':
				return this.styles[basedOn]
			case 'object':
				return basedOn
			}
		}
	}
	
	getFromBasedOn(path){
		let basedOn=this.getBasedOn()
		if(basedOn)
			return basedOn.get(...arguments)
		return undefined
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
let PRIORIZED='seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert'.split(',')


class StyleWithTableBorderInfo extends StyleInfo{
	getBorder(conditions){
		return {
			right:this._right(...arguments)||{sz:0},
			left: this._left(...arguments)||{sz:0},
			top: this._top(...arguments)||{sz:0},
			bottom: this._bottom(...arguments)||{sz:0}
		}
	}
	_get(path){
		return path.split(".").reduce((p,key)=>p ? p[key] : p,this)
	}
	
	_1border(type){
		let value=this._get(type)
		if(value!=undefined){
			if(value.val=='nil')
				return {sz:0}
			return value
		}
	}
	
	_right(conditions){
		let v=this._1border('border.right')
		if(v!=undefined)
			return v
		let basedOn=this.getBasedOn()
		if(basedOn && basedOn._right)
			return basedOn._right(...arguments)
	}
	
	_left(conditions){
		let v=this._1border('border.left')
		if(v!=undefined)
			return v
		let basedOn=this.getBasedOn()
		if(basedOn && basedOn._left)
			return basedOn._left(...arguments)
	}
	
	_top(){
		let v=this._1border('border.top')
		if(v!=undefined)
			return v
		let basedOn=this.getBasedOn()
		if(basedOn && basedOn._top)
			return basedOn._top(...arguments)
	}
	
	_bottom(){
		let v=this._1border('border.bottom')
		if(v!=undefined)
			return v
		let basedOn=this.getBasedOn()
		if(basedOn && basedOn._bottom)
			return basedOn._bottom(...arguments)
	}
}

class TableStyleInfo extends StyleWithTableBorderInfo{
	constructor(){
		super(...arguments)
		this.conditions={}
	}
	get(path, conditions=[]){
		let conditionStyles=this.conditions
		let value=this.priorize(conditions).reduce((found, condition)=>{
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
		else
			return value
	}
	
	priorize(conditions){
		conditions.sort((a,b)=>PRIORIZED.indexOf(a)-PRIORIZED.indexOf(b))
		return conditions
	}
	
	_right(conditions){
		let value=this.priorize(conditions).reduce((found, cond)=>{
			if(found!=undefined)
				return found
			let condStyle=this.conditions[cond]
			if(condStyle && condStyle._right)
				return condStyle._right(...arguments)
		},undefined)
		
		if(value==undefined){
			if(conditions.includes('lastCol'))
				value=super._right(...arguments)
			else
				value=this._1border('border.insideV')
		}
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._right)
				value=basedOn._right(...arguments)
		}
		
		return value
	}
	
	_left(conditions){
		let value=this.priorize(conditions).reduce((found, cond)=>{
			if(found!=undefined)
				return found
			let condStyle=this.conditions[cond]
			if(condStyle && condStyle._left)
				return condStyle._left(...arguments)
		},undefined)
		
		if(value==undefined){
			if(conditions.includes('firstCol'))
				value=super._left(...arguments)
			else
				value=this._1border('border.insideV')
		}
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._left)
				value=basedOn._left(...arguments)
		}
		
		return value
	}
	
	_top(conditions){
		let value=this.priorize(conditions).reduce((found, cond)=>{
			if(found!=undefined)
				return found
			let condStyle=this.conditions[cond]
			if(condStyle && condStyle._top)
				return condStyle._top(...arguments)
		},undefined)
		
		if(value==undefined){
			if(conditions.includes('firstRow'))
				value=super._top(...arguments)
			else
				value=this._1border('border.insideH')
		}
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._top)
				value=basedOn._top(...arguments)
		}
		
		return value
	}
	
	_bottom(conditions){
		let value=this.priorize(conditions).reduce((found, cond)=>{
			if(found!=undefined)
				return found
			let condStyle=this.conditions[cond]
			if(condStyle && condStyle._bottom)
				return condStyle._bottom(...arguments)
		},undefined)
		
		
		if(value==undefined){
			if(conditions.includes('lastRow'))
				value=super._bottom(...arguments)
			else
				value=this._1border('border.insideH')
		}
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._bottom)
				value=basedOn._bottom(...arguments)
		}
		
		return value
	}
	
}

class RowStyleInfo extends StyleWithTableBorderInfo{
	_right(conditions){
		let value
		if(conditions.includes('lastCol'))
			value=super._right(...arguments)
		else
			value=this._1border('border.insideV')
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._right)
				value=basedOn._right(...arguments)
		}
		
		return value
			
	}
	
	_left(conditions){
		let value
		if(conditions.includes('firstCol'))
			value=super._right(...arguments)
		else
			value=this._1border('border.insideV')
		
		if(value==undefined){
			let basedOn=this.getBasedOn()
			if(basedOn && basedOn._left)
				value=basedOn._left(...arguments)
		}
		
		return value
	}
}

class FirstRowStyleInfo extends RowStyleInfo{
	
}

class LastRowStyleInfo extends RowStyleInfo{
	
}
class CellStyleInfo extends StyleWithTableBorderInfo{

}

class ColStyleInfo extends StyleWithTableBorderInfo{
	_top(conds){
		if(conds.includes('firstRow'))
			return super._top(...arguments)
	}
	
	_bottom(conds){
		if(conds.includes('lastRow'))
			return super._bottom(...arguments)
	}
}

class FirstColStyleInfo extends ColStyleInfo{
	
}

class LastColStyleInfo extends ColStyleInfo{
	
}
class BandHStyleInfo extends RowStyleInfo{
	
}

class Band1HStyleInfo extends BandHStyleInfo{
	
}

class Band2HStyleInfo extends BandHStyleInfo{
	
}

class BandVStyleInfo extends ColStyleInfo{
	
}

class Band1VStyleInfo extends BandVStyleInfo{
	
}

class Band2VStyleInfo extends BandVStyleInfo{
	
}