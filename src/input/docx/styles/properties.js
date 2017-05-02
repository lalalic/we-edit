import getTheme from "./theme"

export class Properties{
	constructor(docx){
		this.docx=docx
		this.theme=getTheme(docx)
		this.rStyle=this.pStyle=this.tblStyle=this._val
		this.wrapTopAndBottom=this.wrapSquare=this.wrapTight=this.wrapThrough=this.wrap
	}

	select(nodes, keyMap={}){
		return nodes.reduce((props,x)=>{
			let name=x.name.split(":").pop()
			if(this[name])
				props[keyMap[x.name]||keyMap[name]||name]=this[name](x)
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

	titlePg(x){
		return true
	}

	cnfStyle(x){
		return parseInt(x.attribs["w:val"],2)
	}

	cols(x){
		let cols={num:1}, t
		if(t=x.attribs['w:num'])
			cols.num=parseInt(x.attribs['w:num'])

		if(t=x.attribs['w:space'])
			cols.space=this.docx.dxa2Px(x.attribs['w:space'])

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
		let fonts=[], t
		if(t=x.attribs['w:ascii'])
			fonts.push(t)
		else if(t=x.attribs['w:asciiTheme'])
			fonts.push(this.theme.font(t))

		if(t=x.attribs['w:eastAsia'])
			fonts.push(t)
		else if(t=x.attribs['w:eastAsiaTheme'])
			fonts.push(this.theme.font(t))

		if(fonts.length)
			return fonts.join(",")
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
			return p
		},{})
	}

	tblBorders(x){
		return this.tcBorders(x)
	}

	tblCellMar(x){
		return x.children.reduce((p,a)=>{
			p[a.name.split(":").pop()]=this.docx.dxa2Px(a.attribs["w:w"])
			return p
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
		return this.docx.dxa2Px(x.attribs['w:w'])
	}

	shd(x){
		return this.docx.asColor(x.attribs["w:fill"])
	}

	extent(x){
		return {width:this.docx.cm2Px(x.attribs.cx),height:this.docx.cm2Px(x.attribs.cy)}
	}

	xfrm(x){
		return this.extent(x.children.find(a=>a.name=="a:ext"))
	}

	prstGeom(x){
		return x.attribs.prst
	}

	custGeom(x){
		let path=[]
		let px=x=>this.docx.cm2Px(x)
		
		for(let a, children=x.children.find(a=>a.name=="a:pathLst").children[0].children, len=children.length,i=0;i<len;i++){
			a=children[i]
			switch(a.name.split(":").pop()){
			case 'moveTo':
				path.push('M '+px(a.children[0].attribs.x)+' '+px(a.children[0].attribs.y))
				break
			case 'lnTo':
				path.push('L '+px(a.children[0].attribs.x)+' '+px(a.children[0].attribs.y))
				break
			break
			case 'cubicBezTo':
				path.push('L '+px(a.children[0].attr('x'))+' '+px(a.children[0].attr('y')))
				path.push('Q '+px(a.children[1].attr('x'))+' '+px(a.children[1].attr('y'))
					+' '+px(a.children[2].attr('x'))+' '+px(a.children[2].attr('y')))
			break
			}
		}
		return path.join(" ")
	}
		
	bodyPr(x){
		let props={}
		props.margin="bottom,top,right,left".split(",").reduce((margin,a,t)=>{
			if(t=x.attribs[`${a[0]}Ins`])
				margin[a]=this.docx.cm2Px(t)
			return margin
		},{})
		
		return props
	}
	
	fillRef(x){
		let color=x.children.find(a=>a.name=="a:schemeClr")
		if(color)
			color=this.theme.color(color.attribs.val)
		
		//this.theme.format("fill",x.attribs.idx)
		return {fill:color}
	}
	

	wrap(x){
		return {mode:x.name.substring("wp:wrap".length)}
	}

	numPr(x){
		return x.children.reduce((p,a)=>{
			p[a.name.split(":").pop()]=a.attribs["w:val"]
			return p
		},{})
	}

	asToggle(x){
		if(x==undefined || x.val==undefined){
			return !!-1
		}else{
			return !!parseInt(this._val(x))
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

export default Properties
