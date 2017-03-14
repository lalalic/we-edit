import getTheme from "./theme"

export default class Selector{
	constructor(docx){
		this.docx=docx
		this.props=new Props(docx)
		this.$=this.docx.officeDocument.content.bind(this)
	}

	document({node}){
		return Object.assign(this.props.select(node.children.filter(a=>a.name!="w:body")))
	}

	section({node}){
		return Object.assign(this.props.select(node.children),{node})
	}

	table({node}){
		let props=this.props.select(this.$(node).find(">w\\:tblGrid").toArray())
		props.directStyle=Object.freeze(this.$(node).find(">w\\:tblPr"))
		return props
	}

	row({node}){
		let props={}
		props.directStyle=this.$(node).find(">w\\:trPr")
		return props
	}

	cell({node}){
		let props={}
		props.directStyle=this.$(node).find(">w\\:tcPr")
		return props
	}

	paragraph({node}){
		let props={}
		props.directStyle=this.$(node).find(">w\\:pPr")
		return props
	}

	inline({node}){
		let props={}
		props.directStyle=this.$(node).find(">w\\:rPr")
		return props
	}

	image({node}){
		return this.props.select(this.$(node).find("wp\\:extent").toArray())
	}
}

class Props{
	constructor(docx){
		this.docx=docx
		this.theme=getTheme(docx)
	}

	select(nodes){
		return nodes.reduce((props,x)=>{
			let name=x.name.split(":").pop()
			if(this[name])
				props[name]=this[name](x)
			return props
		},{})
	}

	selectValue(x){
		let name=x.name.split(":").pop()
		if(this[name])
			return this[name](x)
	}

	pgSz(x){
		return{
			width:this.docx.dxa2Px(x.attribs['w:w']),
			height:this.docx.dxa2Px(x.attribs['w:h'])
		}
	}
	pgMar(x){
		return Object.keys(x.attribs).reduce((value,a)=>{
			value[a.split(':').pop()]=this.docx.dxa2Px(x.attribs[a])
			return value
		},{})
	}

	cols(x){
		let cols={}
		x.attribs['w:num'] && (cols.num=parseInt(x.attribs['w:num']));
		x.attribs['w:space'] && (cols.space=this.docx.dxa2Px(x.attribs['w:space']));

		cols.data=this.docx.officeDocument.content(x).find("w\\:col").toArray()
			.map(col=>({
				width:this.docx.dxa2Px(col.attribs['w:w']),
				space:this.docx.dxa2Px(col.attribs['w:space'])
			}))
		return cols
	}

	_val(x){
		return x.attribs["w:val"]
	}

	jc(x){
		return this._val(x)
	}

	ind(x){
		return Object.keys(x.attribs)
		.reduce((props,a)=>{
			props[a.split(":").pop()]=this.docx.dxa2Px(x.attribs[a])
			return props
		},{})
	}
	spacing(x){
		return this.toSpacing(x)
	}
	pBdr(x){
		return Object.keys(x.attribs).reduce((props,a)=>{
			props[a.split(":").pop()]=this.toBorder(x[a][0])
			return props
		},{})
	}

	rFonts(x){
		let props={}, t
		if(t=x.attribs['w:ascii'])
			props.ascii=t
		else if(t=x.attribs['w:asciiTheme'])
			props.ascii=this.theme.font(t)
		
		if(t=x.attribs['w:eastAsia'])
			props.asia=t
		else if(t=x.attribs['w:eastAsiaTheme'])
			props.asia=this.theme.font(t)
		
		if(props.ascii || props.asia)
			return props
	}

	lang(x){
		return this._val(x)
	}

	vertAlign(x){
		return this._val(x)
	}

	sz(x){
		return this._val(x)/2
	}

	kern(x){
		return this._val(x)/2
	}

	w(x){
		return this._val(x)/100.0
	}

	position(x){
		return this.dxa2Px(this._val(x))
	}

	i(x){
		return this.asToggle(x)
	}

	u(x){
		return this.asToggle(x)
	}

	vanish(x){
		return this.asToggle(x)
	}

	smallCaps(x){
		return this.asToggle(x)
	}

	b(x){
		return this.asToggle(x)
	}

	background(x){
		return this.toColor(x,'w:color')
	}

	hightlight(x){
		return this.toColor(x)
	}

	color(x){
		return this.toColor(x)
	}

	bdx(x){
		return this.toBorder(x)
	}

	tblLook(x){
		return this._val(x)
	}

	tblGrid(x){
		return x.children.map(a=>this.docx.dxa2Px(a.attribs["w:w"]))
	}

	tcBorders(x){
		return x.children.reduce((p,a)=>{
			p[a.name.split(":").pop()]=this.toBorder(a)
		},{})
	}

	tblBorders(x){
		return this.tcBorders(x)
	}

	tblCellMar(x){
		return x.children.reduce((p,a)=>{
			p[a.name.split(":").pop()]=this.docx.dxa2Px(a.attribs["w:w"])
		},{})
	}

	tblLook(x){
		return Object.keys(x.attribs).reduce((props,a)=>{
			props[a.split(":").pop()]=x.attribs[a]
			return props
		},{})
	}
	
	tblInd(x){
		return this.docx.dxa2Px(x.attribs["w:w"])
	}

	tcW(x){
		return this.dxa2Px(x.attribs['w:w'])
	}

	shd(x){
		return this.docx.asColor(x.attribs["w:fill"])
	}

	extent(x){
		return {width:this.docx.cm2Px(x.attribs.cx),height:this.docx.cm2Px(x.attribs.cy)}
	}


	asToggle(x){
		if(x==undefined || x.val==undefined){
			return -1
		}else{
			return parseInt(this._val(x))
		}
	}

	toSpacing(x){
		let props={}, line, t

		if(!x.attribs['w:beforeAutospacing'] && (t=x.attribs['w:beforeLines']))
			props.top=this.docx.dxa2Px(t)
		else if(t=x.attribs['w:before'])
			props.top=this.docx.dxa2Px(t)

		if(!x.attribs['w:afterAutospacing'] && (t=x.attribs['w:afterLines']))
			props.bottom=this.docx.dxa2Px(t)
		else if(t=x.attribs['w:after'])
			props.bottom=this.docx.dxa2Px(t)

		if(!(line=x.attribs['w:line']))
			return props

		switch(props.lineRule=x.attribs['w:lineRule']){
		case 'atLeast':
		case 'exact':
			props.lineHeight=this.docx.dxa2Px(line)
			break
		case 'auto':
		default:
			props.lineHeight=(parseInt(line)*100/240)+'%'
		}

		return props
	}

	toBorder(x){
		let border={}, t
		border.val=x.attribs['w:val']
		if(border.val=="nil"){
			border.sz=0
			return 
		}
		
		if(t=x.attribs['w:sz'])
			border.sz=this.docx.pt2Px(t/8)
		
		if(t=x.attribs['w:color'])
			border.color=this.docx.asColor(t)
		else if(t=x.attribs['w:themeColor'])
			border.color=this.theme.color(t)
		
		
		if(t=x.attribs['w:space'])
			border.space=parseInt(t)
		
		
		return border
	}

	toColor(x){
		return this.docx.asColor(x.attribs['w:val']||x.attribs['w:color']|| this.theme.color(x.attribs['w:themeColor']))
	}
}
