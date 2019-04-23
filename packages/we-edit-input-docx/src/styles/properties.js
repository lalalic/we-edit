import getTheme from "./theme"

export class Properties{
	constructor(docx,precision=1){
		this.docx=docx
		this.theme=getTheme(docx)
		this.rStyle=this.pStyle=this.tblStyle=this.type=this._val
		this.wrapSquare=this.wrapTight=this.wrapThrough=this.wrapTopAndBottom=this.wrap
		this.vAlign=this.vertAlign
		this.ext=this.extent
		this.requireFonts=new Set()
		this.precision=precision
	}

	emu2Px(emu){
		return parseInt(this.docx.pt2Px(parseInt(emu)/12700)*this.precision)
	}

	dxa2Px(){
		return parseInt(this.docx.dxa2Px(...arguments)*this.precision)
	}

	pt2Px(){
		return parseInt(this.docx.pt2Px(...arguments)*this.precision)
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
			width:this.dxa2Px(x.attribs['w:w']),
			height:this.dxa2Px(x.attribs['w:h'])
		}
	}
	pgMar(x){
		return Object.keys(x.attribs).reduce((value,a)=>{
			value[a.split(':').pop()]=this.dxa2Px(x.attribs[a])
			return value
		},{})
	}

	titlePg(x){
		return a.atrribs["w:val"]!=="false"
	}

	cnfStyle(x){
		return parseInt(x.attribs["w:val"],2)
	}

	cols(x){
		let cols={num:1}, t
		if(t=x.attribs['w:num'])
			cols.num=parseInt(x.attribs['w:num'])

		if(t=x.attribs['w:space'])
			cols.space=this.dxa2Px(x.attribs['w:space'])

		let data=this.docx.officeDocument.content(x).find("w\\:col").toArray()
			.map(col=>({
				width:this.dxa2Px(col.attribs['w:w']),
				space:this.dxa2Px(col.attribs['w:space'])
			}))
		if(data.length)
			cols.data=data

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
			props[a.split(":").pop()]=this.dxa2Px(x.attribs[a])
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

		if(fonts.length){
			fonts=fonts.join(",")
			fonts.split(",")
				.forEach(a=>this.requireFonts.add(a))
			return fonts
		}
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
		return x.children.map(a=>this.dxa2Px(a.attribs["w:w"]))
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
			p[a.name.split(":").pop()]=this.dxa2Px(a.attribs["w:w"])
			return p
		},{})
	}

	tblLook(x){
		return Object.keys(x.attribs).reduce((props,a)=>{
			props[a.split(":").pop()]=x.attribs[a]
			return props
		},{})
	}

	tblStyleColBandSize(x){
		return parseInt(this._val(x))
	}

	tblStyleRowBandSize(x){
		return parseInt(this._val(x))
	}

	tblInd(x){
		return this.dxa2Px(x.attribs["w:w"])
	}

	tcW(x){
		return this.dxa2Px(x.attribs['w:w'])
	}

	shd(x){
		return this.docx.asColor(x.attribs["w:fill"])
	}

	trHeight(x){
		return this.dxa2Px(x.attribs['w:val'])
	}

	cantSplit(x){
		return true
	}

	cnfStyle(x){
		return this._val(x)
	}

/**************drawingML********************/
	positionH(x){
		return {
			base:x.attribs["relativeFrom"],
			...x.children.reduce((props,a)=>{
				switch(a.name.split(":").pop()){
				case "posOffset":
					props.offset=this.emu2Px(a.children[0].data)
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
				offset:this.emu2Px(x.attribs.x),
			},
			y:{
				base:"page",
				offset:this.emu2Px(x.attribs.y)
			}
		}
	}
	extent(x){
		return {width:this.emu2Px(x.attribs.cx),height:this.emu2Px(x.attribs.cy)}
	}

	off(x){
		return {x:this.emu2Px(x.attribs.x),y:this.emu2Px(x.attribs.y)}
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
		let px=x=>this.emu2Px(x)

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
		props.width=this.emu2Px(x.attribs.w)
		return props
	}


	bodyPr(x){
		let props={}
		props.margin="bottom,top,right,left".split(",").reduce((margin,a,t)=>{
			if(t=x.attribs[`${a[0]}Ins`])
				margin[a]=this.emu2Px(t)
			return margin
		},{})

		return props
	}

	wrapPolygon(x){
		const xy=({attribs:{x,y}})=>({x:this.emu2Px(x),y:this.emu2Px(y)})
		return x.children.map(a=>xy(a))
	}

	wrap(x){
		var props={
			mode:x.name.substring("wp:wrap".length),
			wrapText: x.attribs.wrapText,
			distance: this.toDist(x),
			...this.select(x.children,{wrapPolygon:"polygon"})
		}

		if(props.mode=="Square" && !props.distance){
			let dt=this.emu2Px(36000)
			props.distance={left:dt,right:dt,top:dt,bottom:dt}
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
		return parseInt(x.attribs['w:val'])
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
	            dist[a.toLowerCase()]=this.emu2Px(x.attribs[`${pre}${a[0]}`])
			}
            return dist
        },{})

		if(Object.keys(dist).length>0)
			return dist
	}


	toSpacing(x){
		let props={}, line, t

		if(!x.attribs['w:beforeAutospacing'] && (t=x.attribs['w:beforeLines']))
			props.top=this.dxa2Px(t)
		else if(t=x.attribs['w:before'])
			props.top=this.dxa2Px(t)

		if(!x.attribs['w:afterAutospacing'] && (t=x.attribs['w:afterLines']))
			props.bottom=this.dxa2Px(t)
		else if(t=x.attribs['w:after'])
			props.bottom=this.dxa2Px(t)

		if(!(line=x.attribs['w:line']))
			return props

		switch(props.lineRule=x.attribs['w:lineRule']){
		case 'atLeast':
		case 'exact':
			props.lineHeight=this.dxa2Px(line)
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
			border.sz=this.pt2Px(t/8)

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

/*

				docx.officeDocument
					.$(node)
					.props({
						tidy_docDefaults:({rPrDefault:{rPr},pPrDefault:{pPr}})=>({rPr,pPr}),
						...same("ascii,eastAsia,hAnsi".split(",").map(a=>a+'Theme'),v=>officeDocument.theme.font(v)),
						...same("sz,szCs,kern".split(","),({val})=>parseInt(val)/2),
						
						//themeShade:v=>officeDocument.theme.
						themeColor:v=>officeDocument.theme.color(v),
						tidy_color:({themeColor,val,...effects})=>docx.asColor(val||themeColor,...effects),
						
						
						...same("beforeLines,before,afterLines,after".split(","),v=>docx.dxa2px(v)),
						tidy_spacing:({beforeAutospacing,beforeLines,before,afterAutospacing,afterLines,after,line,lineRule,val})=>{
							if(val!=undefined){
								return vale
							}
							const props={
								top:!beforeAutospacing&&beforeLines||before,
								bottom:!afterAutospacin&&afterLines||after,
							}
							if(line){
								props.lineHeight=lineRule
							}
							return props
						},
						names:{
							asciiTheme:"ascii",
							eastAsiaTheme:"eastAsia",
							hAnsiTheme:'hAnsi',
							themeShade:'shade',
						},
					})
*/


export default Properties
