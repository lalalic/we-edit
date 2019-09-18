import Paragraph from "./paragraph"
import get from "lodash.get"

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
const PRIORIZED='seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert'.split(',')
const CNF='firstRow,lastRow,firstCol,lastCol,band1Vert,band2Vert,band1Horz,band2Horz,nwCell,neCell,swCell,seCell'.split(",")
class WithBorder extends Paragraph{
	constructor(node,styles,selector){
		super(node, styles, selector)
		this.tbl=this._convert(node,"w:tcPr",{
			"w:tcMargin":"margin",
			"w:tcBorders":"border",
			"w:shd":"background"
		},selector)
	}

	right(){
		return this.get('tbl.border.right')
	}

	left(){
		return this.get('tbl.border.left')
	}

	top(){
		return this.get('tbl.border.top')
	}

	bottom(){
		return this.get('tbl.border.bottom')
	}
}

class RowStyle extends WithBorder{
	right(conditions){
		let value
		if(conditions.includes('lastCol'))
			value=super.right(...arguments)
		else
			value=this.get('tbl.border.insideV')

		return value
	}

	left(conditions){
		let value
		if(conditions.includes('firstCol'))
			value=super.right(...arguments)
		else
			value=this.get('tbl.border.insideV')

		return value
	}
}

class CellStyle extends WithBorder{

}

class ColStyle extends WithBorder{
	top(conditions){
		if(conditions.includes('firstRow'))
			return super.top(...arguments)
	}

	bottom(conditions,edges){
		if(conditions.includes('lastRow'))
			return super.bottom(...arguments)
	}
}


class BandHStyle extends RowStyle{

}
class BandVStyle extends ColStyle{

}


let types={}
types.seCell=CellStyle
types.swCell=CellStyle
types.neCell=CellStyle
types.nwCell=CellStyle
types.lastCol=ColStyle
types.firstCol=ColStyle
types.lastRow=RowStyle
types.firstRow=RowStyle
types.band2Horz=BandHStyle
types.band1Horz=BandHStyle
types.band2Vert=BandVStyle
types.band1Vert=BandVStyle
types.row=RowStyle
types.cell=CellStyle

const attribs={
	tbl:{
		"w:tblInd":"indent",
		"w:tblCellMar":"margin",
		"w:tblBorders":"border",
		"w:tblW":"width",
		"w:shd":"background",
		"w:jc":"align",
		"w:tblStyleColBandSize":"cellSpan",
		"w:tblStyleRowBandSize":"rowSpan",
		"w:tblLook":"conditional",
	},

	tr:{
		"w:tblInd":"indent",
		"w:tblCellMar":"margin",
		"w:tblBorders":"border",
		"w:cnfStyle":"conditional",
		"w:trHeight":"height",
		"w:cantSplit":"keepLines",
	},

	tc:{
		"w:tblInd":"indent",
		"w:tblCellMar":"margin",
		"w:tblBorders":"border",
		"w:cnfStyle":"conditional",
		"w:vAlign": "vertAlign",
	}
}
export default class TableStyle extends WithBorder{
	constructor(node,styles,selector){
		super(...arguments)

		this.tbl=this._convert(node,"w:tblPr",attribs.tbl,selector)

		this.tc=this._convert(node,"w:tcPr",attribs.tc,selector)

		this.tr=this._convert(node,"w:tblPrEx",attribs.tr,selector)

		node.children.filter(a=>a.name=="w:tblStylePr").forEach(a=>{
			let type=a.attribs["w:type"]
			this[type]=new types[type](a,styles,selector)
		})
	}

	static Direct=class __$1 extends TableStyle{
		constructor(node,styles,selector){
			super(node, styles, selector)
			const type=node.name.split(":").pop().replace("Pr","")
			this[type]=this._convert(node, null, attribs[type],selector)
		}
	}

	flat4Table(...inherits){
		let targets=[this,...inherits]
		return "indent,background,width,conditional".split(",")
			.reduce((props,k)=>{
				targets.find(a=>(props[k]=a.get(`tbl.${k}`))!==undefined)
				return props
			},{})
	}

	flat4Row(...inherits){
		let targets=[this,...inherits]
		return "height,cantSplit,keepLines,conditional".split(",")
			.reduce((props,k)=>{
				targets.find(a=>(props[k]=a.get(`tr.${k}`))!==undefined)
				return props
			},{})
	}

	flat4Cell(conditional, edges=[]){
		const conditions=Array.from(("000000000000"+(conditional>>>0).toString(2)).substr(-12))
				.map((a,i)=>a=="1"&&CNF[i]).filter(a=>a)
				.sort((a,b)=>PRIORIZED.indexOf(a)-PRIORIZED.indexOf(b))

		let margin="left,right,top,bottom".split(",").reduce((margin,a)=>{
			let v=this.get(`margin.${a}`)
			if(v==undefined)
				v=this.get(`tbl.margin.${a}`,conditions)
			if(v!==undefined)
				margin[a]=v
			return margin
		},{})

		let border="left,right,top,bottom".split(",").reduce((border,a)=>{
			let v=this.get(`border.${a}`)
			if(v==undefined)
				v=this[a](conditions,edges)

			if(v!==undefined)
				border[a]=v
			else
				border[a]={sz:0}
			return border
		},{})

		let p="spacing,indent".split(",").reduce((p,k)=>{
			let v=this.get(`p.${k}`,conditions)
			if(v!==undefined)
				p[k]=v
			return p
		},{})

		let r="fonts,size,color".split(",").reduce((r,k)=>{
			let v=this.get(`r.${k}`,conditions)
			if(v!==undefined)
				r[k]=v
			return r
		},"bold,italic,vanish".split(",").reduce((r,k)=>{
			let v=this.get(`r.${k}`,conditions)
			if(v!==undefined)
				r[k]=!!v
			return r
		},{}))

		let background=this.get('tbl.background',conditions)

		const clean=a=>Object.keys(a).length==0 ? undefined : a

		[margin,border,p,r]=[clean(margin),clean(border),clean(p),clean(r)]

		return {margin,border,background,p,r}
	}

	get(path, conditions=[]){
		let value=conditions.reduce((found, condition)=>{
			if(found!=undefined)
				return found
			return super.get(`${condition}.${path}`)
		},undefined)

		if(value==undefined)
			value=super.get(path)

		return value
	}
	/**
	 * 1. conditional formatting
	 * 2. table.tcPr
	 * 3. table.trPr=tblPrEx
	 * 4. table.tblPr
	 */
	right(conditions,edges){
		let value=conditions.reduce((found, cond)=>{//1. conditional
			if(found!=undefined)
				return found
			return this.invoke(`${cond}.right`,conditions)
		},undefined)

		if(value==undefined)
			value=this.get('tc.border.right')//2. table.tcPr

		if(value==undefined){//3.table.trPr
			if(conditions.includes('lastCol'))
				value=this.get('tr.border.right')
			else
				value=this.get('tr.border.insideV')
		}

		if(value==undefined){//4.
			if(conditions.includes('lastCol')||edges.includes("lastCol"))
				value=this.get('tbl.border.right')
			else
				value=this.get('tbl.border.insideV')
		}

		return value
	}

	left(conditions,edges){
		let value=conditions.reduce((found, cond)=>{//1. conditional
			if(found!=undefined)
				return found
			return this.invoke(`${cond}.left`, conditions)
		},undefined)

		if(value==undefined)
			value=this.get("tc.border.left")//2. table.tcPr

		if(value==undefined){//3.table.trPr
			if(conditions.includes('firstCol'))
				value=this.get('tr.border.left')
			else
				value=this.get('tr.border.insideV')
		}

		if(value==undefined){//4.
			if(conditions.includes('firstCol')||edges.includes("firstCol"))
				value=this.get('tbl.border.left')
			else
				value=this.get('tbl.border.insideV')
		}

		return value
	}

	top(conditions,edges){
		let value=conditions.reduce((found, cond)=>{
			if(found!=undefined)
				return found
			return this.invoke(`${cond}.top`,conditions)
		},undefined)

		if(value==undefined)
			value=this.get("tc.border.top")//2. table.tcPr

		if(value==undefined){//3.table.trPr
			if(conditions.includes('firstRow'))
				value=this.get('tr.border.top')
			else
				value=this.get('tr.border.insideH')
		}

		if(value==undefined){//4.
			if(conditions.includes('firstRow')||edges.includes("firstRow"))
				value=this.get('tbl.border.top')
			else
				value=this.get('tbl.border.insideH')
		}

		return value
	}

	bottom(conditions, edges){
		let value=conditions.reduce((found, cond)=>{
			if(found!=undefined)
				return found
			return this.invoke(`${cond}.bottom`,conditions)
		},undefined)


		if(value==undefined)
			value=this.get("tc.border.top")//2. table.tcPr

		if(value==undefined){//3.table.trPr
			if(conditions.includes('lastRow'))
				value=this.get('tr.border.bottom')
			else
				value=this.get('tr.border.insideH')
		}

		if(value==undefined){//4.
			if(conditions.includes('lastRow')||edges.includes('lastRow'))
				value=this.get('tbl.border.bottom')
			else
				value=this.get('tbl.border.insideH')
		}

		return value
	}
}
