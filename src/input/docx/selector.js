
export default class Selector{
	constructor(docx){
		this.docx=docx
		this.props=new Props(docx)
		this.$=this.docx.officeDocument.content.bind(this)
	}
	
	document({node}){
		return Object.assign(this.props.select(node.children.filter(a=>a.name!="w:body")),{docx:this.docx})
	}
	
	section({node}){
		return this.props.select(node.children)
	}
	
	table({node}){
		return this.props.select(this.$(node).find(">w\\:tblPr>*, >w\\:tblGrid").toArray())
	}
	
	paragraph({node}){
		return this.props.select(this.$(node).find(">w\\:pPr>*").toArray())
	}
	
	inline({node}){
		return this.props.select(this.$(node).find(">w\\:rPr>*").toArray())
	}
}

class Props{
	constructor(docx){
		this.docx=docx
	}
	
	select(nodes){
		return nodes.reduce((props,x)=>{
			let name=x.name.split(":").pop()
			if(this[name])
				props[name]=this[name](x)
			return props
		},{})
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
		let ascii=x['ascii']||this.officeDocument.fontTheme.get(x['asciiTheme'])
		let asia=x['eastAsia']||this.officeDocument.fontTheme.get(x['eastAsiaTheme'])

		if(ascii || asia)
			return {ascii, asia}
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
			p[a.name.split(":").pop()]=this.dxa2Px(a.attribs["w:w"])
		},{})
	}
	
	tcW(x){
		return this.dxa2Px(x.attribs['w:w'])
	}
	
	shd(x){
		return this.asColor(x.attribs["w:fill"])
	}
	
	extent(x){
		return {width:this.cm2Px(x.attribs.cx),height:this.cm2Px(x.attribs.cy)}
	}
	

	asToggle(x){
		if(x==undefined || x.val==undefined){
			return -1
		}else{
			return parseInt(this._val(x))
		}
	}

	toSpacing(x){
		var r=x, o={}

		if(!r.beforeAutospacing && r.beforeLines)
			o.top=this.dxa2Px((r.beforeLines))
		else if(r.before)
			o.top=this.dxa2Px((r.before))

		if(!r.afterAutospacing && r.afterLines)
			o.bottom=this.dxa2Px((r.afterLines))
		else if(r.after)
			o.bottom=this.dxa2Px((r.after))

		if(!r.line)
			return o

		switch(x.lineRule){
		case 'atLeast':
		case 'exact':
			o.lineHeight=this.dxa2Px((x.line))
			break
		case 'auto':
		default:
			o.lineHeight=(parseInt(r.line)*100/240)+'%'
		}
		o.lineRule=x.lineRule
		return o
	}

	toBorder(x){
		var border=x
		border.sz && (border.sz=this.pt2Px(border.sz/8));
		border.color && (border.color=this.asColor(border.color))
		return border
	}
	
	toColor(x){
		return this.docx.asColor(x.attribs['w:color'] || this.docx.officeDocument.themeColor(x.attribs['w:themeColor']))
	}
}