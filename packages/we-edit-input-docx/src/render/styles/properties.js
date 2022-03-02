import getTheme from "./theme"

const clear=o=>{
	if(typeof(o)!="object"){
		return o
	}
	return Object.keys(o).reduce((o,k, i, all)=>{
		if(o[k]==undefined)
			delete o[k]
		if(i==all.length-1 && Object.keys(o).length==0)
			return 
		return o
	},o)
}

export class Properties{
	constructor(docx){
		this.docx=docx
		this.theme=docx && getTheme(docx)
		this.rStyle=this.pStyle=this.tblStyle=this.type=this._val
		this.wrapSquare=this.wrapTight=this.wrapThrough=this.wrapTopAndBottom=this.wrapNone=this.wrap
		this.vAlign=this.vertAlign
		this.ext=this.extent
		this.requireFonts=new Set()
	}
	_bool(){
		return true
	}
	
	select(nodes, keyMap={}){
		return nodes.reduce((props,x)=>{
			const name=x.name.split(":").pop()
			if(this[name]){
				const value=clear(this[name](x))
				if(typeof(value)!=='undefined'){
					props[keyMap[x.name]||keyMap[name]||name]=value
				}
			}
			return props
		},{})
	}

	selectValue(x){
		let name=x.name.split(":").pop()
		if(this[name]){
			return clear(this[name](x))
		}
	}

	$(props){
		const cloned=new this.constructor(this.docx)
		cloned.requireFonts=this.requireFonts
		cloned.theme=this.theme
		return Object.assign(cloned,props)
	}

	pgSz(x){
		return{
			width:this.docx.dxa2Px(x.attribs['w:w']),
			height:this.docx.dxa2Px(x.attribs['w:h']),
			orientation: x.attribs['w:orient'],
		}
	}
	pgMar(x){
		return Object.keys(x.attribs).reduce((value,a)=>{
			value[a.split(':').pop()]=this.docx.dxa2Px(x.attribs[a])
			return value
		},{})
	}
	pgNumType(x){
		return Object.keys(x.attribs).reduce((value,a)=>{
			value[a.split(':').pop()]=x.attribs[a]
			return value
		},{})
	}

	titlePg(x){
		return x.attribs["w:val"]!=="false"
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

		let data=this.docx.officeDocument.content(x).find("w\\:col").toArray()
			.map(col=>({
				width:this.docx.dxa2Px(col.attribs['w:w']),
				space:this.docx.dxa2Px(col.attribs['w:space'])
			}))
		if(data.length)
			cols.data=data

		return cols
	}

	_val(x){
		return x.attribs ? x.attribs["w:val"] : x
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

	widowControl(x){
		return this._val(x)!=="0"
	}

	keepNext(x){
		return true
	}

	keepLines(x){
		return true
	}

	pBdr(x){
		return Object.keys(x.attribs).reduce((props,a)=>{
			props[a.split(":").pop()]=this.toBorder(x[a][0])
			return props
		},{})
	}

	tabs(x){
		return x.children.map(a=>this.tab(a))
	}

	tab(x){
		return Object.keys(x.attribs).reduce((props,a)=>{
			const k=a.split(":").pop()
			switch(k){
				case "pos":
					props.pos=this.docx.dxa2Px(x.attribs[a])
				break
				case "val":
					props.align=x.attribs[a]
				break
				case "leader":
					props.leader=({
						middleDot:String.fromCharCode(0xB7),
						dot: String.fromCharCode(0x2024),
						hyphen: String.fromCharCode(0x2010),
						underscore: String.fromCharCode(0x5F),
					})[props.leader]
				break
			}
			
			return props
		},{})
	}

	rFonts(x){
		let {
			'w:hint':hint,
			'w:asciiTheme':ascii0,'w:cstheme':cs0, 'w:eastAsiaTheme':ea0, 'w:hAnsiTheme':high0,
			'w:ascii':ascii=ascii0 && this.theme.font(ascii0),
			'w:cs':cs=cs0 && this.theme.font(cs0), 
			'w:eastAsia':ea=ea0 && this.theme.font(ea0), 
			'w:hAnsi':hansi=high0 && this.theme.font(high0),
		}=x.attribs;

		([ascii,cs,ea,hansi]=[ascii,cs,ea,hansi].map(a=>a ? a.replace(/(\(.*\))/g,"").trim() : a));

		[ascii,cs,ea,hansi].forEach(a=>this.requireFonts.add(a))
		if(hint=="eastAsia")
			hint="ea"

		if(ea=="Times New Roman" && ascii && ascii==hansi){
			ea=ascii
		}

		if(hint=="default")
			hint=undefined

		return {ascii,cs,ea,hansi,hint}
	}

	lang(x){
		return this._val(x)
	}

	vertAlign(x){
		return this._val(x)
	}

	sz(x){
		return this.docx.pt2Px(this._val(x)/2)
	}

	kern(x){
		return this._val(x)/2
	}

	w(x){
		return this._val(x)/100.0
	}

	position(x){
		return this.docx.dxa2Px(this._val(x))
	}

	i(x){
		return this.asToggle(x)
	}

	strike(x){
		return this.asToggle(x)
	}

	u(x){
		return this._val(x)
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

	highlight(x){
		return this.toColor(x)
	}

	color(x){
		return this.toColor(x)
	}

	bdr(x){
		return this.toBorder(x)
	}

/************table********************/
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

	tblLayout(x){
		return x.attribs["w:type"]
	}

	tblStyleColBandSize(x){
		return parseInt(this._val(x))
	}

	tblStyleRowBandSize(x){
		return parseInt(this._val(x))
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

	trHeight(x){
		return this.docx.dxa2Px(x.attribs['w:val'])
	}

	cantSplit(x){
		return true
	}

	cnfStyle(x){
		return this._val(x)
	}

	vMerge(x){
		return x.attribs["w:val"]||"continue"
	}

	gridSpan(x){
		return parseInt(x.attribs["w:val"])
	}

/**************drawingML********************/
	positionH(x){
		return {
			base:x.attribs["relativeFrom"],
			...x.children.reduce((props,a)=>{
				switch(a.name.split(":").pop()){
				case "posOffset":
					props.offset=this.docx.emu2Px(a.children[0].data)
				break
				case "align":
					props.align=a.children[0].data
				break
				}
				return props
			},{})
		}
	}

	positionV(){
		return this.positionH(...arguments)
	}

	simplePos(x){
		return {
			x:{
				base:"page",
				offset:this.docx.emu2Px(x.attribs.x),
			},
			y:{
				base:"page",
				offset:this.docx.emu2Px(x.attribs.y)
			}
		}
	}
	extent(x){
		return {width:this.docx.emu2Px(x.attribs.cx),height:this.docx.emu2Px(x.attribs.cy)}
	}

	effectExtent({attribs:{l,r,t,b}}){
		return {
			left:this.docx.emu2Px(l),
			right:this.docx.emu2Px(r),
			top:this.docx.emu2Px(t),
			bottom:this.docx.emu2Px(b),
		}
	}

	off(x){
		return {x:this.docx.emu2Px(x.attribs.x),y:this.docx.emu2Px(x.attribs.y)}
	}

	xfrm(x){
		const props=this.select(x.children,{off:"position",ext:"size",})
		if(x.attribs.rot){
			props.rotate=Math.ceil(parseInt(x.attribs.rot)/60000)
		}
		if(x.attribs.flipH==="1"){
			props.flipH=true
		}
		if(x.attribs.flipV==="1"){
			props.flipV=true
		}
		return props
	}

	prstGeom(x){
		return x.attribs.prst
	}

	custGeom(x){
		let path=[]
		let px=x=>this.docx.emu2Px(x)

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
			case 'arcTo':
				path.push(`A`)

			break
			case 'close':
				path.push('Z')
			break
			}
		}
		return path.join(" ")
	}

	solidFill(x){
		return this.toColor(x.children[0])
	}

	blip(x){
		let rid=x.attribs["r:embed"]
		return {...officeDocument.getRel(rid)}
	}

	stretch(x){
		return this.fillRect(x.children[0])
	}

	fillRect(x){
		return "left,right,bottom,top".split(",").reduce((fill,a)=>{
			fill[a]=parseInt(x.attribs[a[0]])/100000
			return fill
		},{})
	}

	srcRect(x){
		return this.fillRect(x)
	}

	tile(x){
		return {...x.attribs}
	}

	blipFill(x){
		return this.select(x.children,{
			blip:"src",
			stretch:"stretch",
			srcRect:"portion",
			tile:"tile"
		})
	}

	ln(x){
		let props=this.select(x.children,{prstDash:"dash"})
		props.width=this.docx.emu2Px(x.attribs.w)
		return props
	}


	bodyPr(x){
		let props={}
		props.margin="bottom,top,right,left".split(",").reduce((margin,a,t)=>{
			if(t=x.attribs[`${a[0]}Ins`])
				margin[a]=this.docx.emu2Px(t)
			return margin
		},{})

		return props
	}

	wrapPolygon(x){
		const xy=({attribs:{x,y}})=>({x:this.docx.emu2Px(x),y:this.docx.emu2Px(y)})
		const [start,...points]=x.children.map(a=>xy(a))
		return points.reduce((segs,{x,y})=>{
			segs.push(`L${x} ${y}`)
			return segs
		},[`M${start.x} ${start.y}`]).join("")
	}

	wrap(x){
		var props={
			mode:x.name.substring("wp:wrap".length),
			sides: x.attribs.wrapText,
			distance: this.toDist(x),
			...this.select(x.children,{wrapPolygon:"path"})
		}

		return props
	}
/********************************/


	numPr(x){
		return x.children.reduce((p,a)=>{
			p[a.name.split(":").pop()]=a.attribs["w:val"]
			return p
		},{})
	}

	outlineLvl(x){
		return parseInt(x.attribs['w:val'])+1
	}

	asToggle(x){
		if(x==undefined || x.attribs['w:val']==undefined){
			return !!-1
		}else{
			return !!parseInt(this._val(x))
		}
	}

	toDist(x,pre="dist"){
		const dist="Right,Left,Bottom,Top".split(",").reduce((dist,a)=>{
			if(x.attribs[`${pre}${a[0]}`]){
	            dist[a.toLowerCase()]=this.docx.emu2Px(x.attribs[`${pre}${a[0]}`])
			}
            return dist
        },{})

		if(Object.keys(dist).length>0)
			return dist
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
			border.width=0
			return
		}

		if(t=x.attribs['w:sz'])
			border.width=this.docx.pt2Px(t/8)

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
