
import {Input} from "we-edit"
import {Readable} from 'stream'

import Docx from "./docx"
import Style from "./render/styles"
import HOCs from "./render/dom"
import Reducer from "./event"

class DocxType extends Input.Editable{
	static support(file){
		if(arguments.length==0){//for installer
			return true
		}

		const {data, name, type}=file
		if(name && name.toLowerCase().endsWith("."+this.defaultProps.ext))
			return true

		if(type && type==this.defaultProps.mimeType)
			return true

		if(arguments[0] instanceof Docx || data instanceof Docx)
			return true

		return false
	}

	static defaultProps={
		type: "docx",
		name: "Word Document",
		ext: "docx",
		mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	}

	static HOCs=HOCs

	parse({data, ...props}){
		this.props=props
		return Docx.load(data)
	}

	release(){
		this.doc.release()
	}

	stream(option){
		let data=this.doc.serialize(option)
			.generate({
				...option,
				type:"uint8array",
				mimeType:this.doc.mime,
			})
		let stream=new Readable({objectMode: true})
		stream.push(data,"uint8array")
		return stream
	}

	style(officeDocument, node){
		const same=(keys,fx)=>keys.reduce((props,k)=>(props[k]=fx,props),{})
		const eachAttrib=({attribs},fx)=>Object.keys(attribs).reduce((props,a)=>{
			props[a.split(":").pop()]=fx(attribs[a])
			return props
		},{})

		return officeDocument.$(node).props({
			tidy_pPrDefault:({pPr})=>pPr,
			...same("keepNext,keepLines,contextualSpacing,cantSplit".split(","),()=>true),
			tidy_outlineLvl:({val})=>parseInt(val),
			...same("w,h,space,trHeight".split(","),v=>officeDocument.doc.dxa2Px(v)),
			titlePg:({"w:val":val})=>val!="false",
			widowControl:({"w:val":val})=>val!="0",
			cnfStyle:({"w:val":val})=>parseInt(val,2),
			ind:x=>eachAttrib(x,a=>officeDocument.doc.dxa2Px(a)),
			//...same("tblInd,tcW,left,right,top,bottom".split(","),({"w:w":val})=>officeDocument.doc.dxa2Px(val)),

			...same("jc,tblStyleColBandSize,tblStyleRowBandSize".split(","),({"w:val":val})=>val),

			tidy_rPrDefault:({rPr})=>rPr,
			...same("ascii,eastAsia,hAnsi,cs".split(",").map(a=>a+'Theme'),v=>officeDocument.theme.fontx(v)),
			...same("sz,szCs,kern".split(",").map(a=>'tidy_'+a),({val})=>parseInt(val)/2),
			tidy_rFonts:({ascii,eastAsia,hAnsi,cs})=>[ascii,eastAsia,hAnsi,cs].filter(a=>a).join(","),

			//themeShade:v=>officeDocument.theme.
			themeColor:v=>officeDocument.theme.colorx(v),
			tidy_color:({themeColor,val,...effects})=>officeDocument.doc.asColor(val||themeColor,...effects),


			...same("beforeLines,before,afterLines,after".split(","),v=>officeDocument.doc.dxa2Px(v)),
			tidy_spacing:({beforeAutospacing,beforeLines,before,afterAutospacing,afterLines,after,line,lineRule,val,...props})=>{
				if(val!=undefined){
					return val
				}

				props.top=!beforeAutospacing&&beforeLines||before
				props.bottom=!afterAutospacing&&afterLines||after

				if(line){
					switch (lineRule) {
						case 'atLeast':
						case 'exact':
							props.line=officeDocument.doc.dxa2Px(line)
							break
						default:
							props.line=parseInt(line)*100/240.0
					}
				}
				return props
			},
			...same("basedOn,name,link".split(",").map(a=>'tidy_'+a),({val})=>val),

			names:{
				asciiTheme:"ascii",
				eastAsiaTheme:"eastAsia",
				hAnsiTheme:'hAnsi',
				themeShade:'shade',
				rFonts:"fonts",
				rPrDefault:"rPr",
				pPrDefault:"pPr",
				w:"width",
				h:"height",
			},
		})
	}

	render(createElement,components){
		const self=this
		const identify=this.doc.constructor.OfficeDocument.identify.bind(this.doc.constructor.OfficeDocument)

		const precision=1
		const docx=this.doc
		const selector=new Style.Properties(docx,precision)
		const officeDocument=docx.officeDocument
		const $=officeDocument.content
		const settings=officeDocument.settings

		const styles=new (class{})();//keep as raw object in state

		const createStylesElement=()=>{
			return null
			createElement(
				components.Styles,
				{styles, updatedAt: Date.now()},
				null,
				{id:"styles"}
			)
		}

		const buildFactory=createElement=>(type,{node,key:_1,type:_2, ...props},children)=>{
			children=children.reduce((merged,a)=>{
				if(Array.isArray(a))
					merged.splice(merged.length,0, ...a)
				else
					merged.push(a)
				return merged
			},[])

			switch(type){
			case "style":{
				let style=null
				if(!props.id){
					style=new Style.Default(node, styles,selector)
				}else{
					let type=node.attribs["w:type"]
					switch(type){
					case "paragraph":
						style=new Style.Paragraph(node,styles,selector)
					break
					case "character":
						style=new Style.Character(node,styles,selector)
					break
					case "numbering":
						style=new Style.Numbering(node,styles,selector)
					break
					case "table":
						style=new Style.Table(node,styles,selector)
					break
					}

					if(node.attribs["w:default"]=="1")
						styles[`*${type}`]=style
				}
				if(style){
					styles[style.id]=style
					return createStylesElement()
				}
				return null
			}
			case "num":{
				let style=new Style.Num(node,styles,selector)
				styles[style.id]=style
				return createStylesElement()
			}
			case "abstractNum":{
				let style=new Style.AbstractNum(node,styles,selector)
				styles[style.id]=style
				return createStylesElement()
			}
			case "document":{
				let evenAndOddHeaders=settings("w\\:evenAndOddHeaders").length>0
				return createElement(
					components.Document,
					{
						...selector.select(node.children.filter(a=>a.name!="w:body")),
						evenAndOddHeaders,
						precision,
						styles,
					},
					children,
					node
				)
			}
			case "section":{
				let style=selector.select(node.children)
				const isEmpty=a=>{
					if(a.children.length==1){
						const p=a.children[0]
						if(!p.children
							|| p.children.length==0
							|| (p.children.length==1 && p.name=="w:p" && p.children[0].name=="w:pPr")){
							return true
						}
					}
					return false
				}

				const hf=cat=>node.children.filter(a=>a.name==`w:${cat}Reference`)
					.reduce((hfs, a)=>{
						let type=a.attribs["w:type"]
						let rId=a.attribs["r:id"]
						let root=docx.officeDocument.getRel(rId).root().children().get(0)
						if(!isEmpty(root)){
							self.part=rId

							children.splice(0,0,
								createElement(components.Container,{named:`${cat}.${type}`,type:`${cat}.${type}`},
									root.children.map(a=>renderNode(a)),
									root
								)
							)

							delete self.part
						}
						return hfs
					},{})

				hf("header")
				hf("footer")

				return createElement(components.Section,style,children,node)
			}
			case "tbl":{
				let cols=selector.select([node.children.find(a=>a.name=="w:tblGrid")]).tblGrid
				let style=!props.pr ? styles['*table'] : new Style.Table.Direct(props.pr,styles,selector)
				return createElement(components.Table,{cols,style},children,node)
			}
			case "tr":{
				let style=!props.pr ? undefined : new Style.Table.Direct(props.pr,styles,selector)
				return createElement(components.Row,{style},children,node)
			}
			case "tc":{
				let style=!props.pr ? undefined : new Style.Table.Direct(props.pr,styles,selector)
				return createElement(components.Cell,{style},children,node)
			}
			case "list":
			case "heading":
			case "p":{
				const {pr, ...pProps}=props
				let style= !props.pr ? styles['*paragraph'] : new Style.Paragraph.Direct(props.pr,styles,selector);
				return createElement(components.Paragraph,{style,...pProps},children,node)
			}
			case "r":{
				let style= !props.pr ? styles['*character'] : new Style.Character.Direct(props.pr,  styles, selector)
				return createElement(components.Run,{style},children,node)
			}
			case "t":
				return createElement(components.Text,{},children[0]||"",node)

			case "drawing.inline":{
				return createElement(components.Container,{},children,node)
			}
			case "drawing.anchor":{
				const style=new Style.Anchor(node,styles,selector)
				return createElement(components.Anchor,style.flat(),children,node)
			}
			case "picture":
				return createElement(components.Image,components.Image.asStyle(props),null,node)
			case "shape":{
				const {textStyle, ...style}=components.Shape.asStyle(props)
				const prStyle=new Style.Paragraph.Direct(undefined,styles,selector)
				prStyle.r=textStyle
				return createElement(components.Shape,{...style, textStyle:prStyle},children,node)
			}
			case "bookmarkStart":
			case "bookmarkEnd":
				return null
			case "inline":
			case "block":
				return createElement(components.Container,{},children,node)
			default:
				if(children.length==1)
					return children[0]
				return children
			}
		}

		let build=buildFactory(createElement)
		let renderNode=node=>docx.officeDocument.renderNode(node,build,identify)

		let rendered=docx.render(build)


		//implement loader.renderChangedNode
		this.renderNode=(node,createElement)=>{
			build=buildFactory(createElement)
			return docx.officeDocument.renderNode(this._unwrap(node),build,identify)
		}

		this.refreshStyles=createStylesElement

		this.getFontList=()=>Array.from(selector.requireFonts)

		return rendered
	}

	renderNode(node, createElement){
		//injected implementation by render
	}

	getFontList(){
		//injected implementation by render
	}

    refreshStyles(){
        //injected implementation by render
    }

	_unwrap(n){
		return n && ("cheerio" in n) && n.get(0) || n
	}
}

export default class Editable extends DocxType{
	makeId(node, uid){
		if(!node){
			debugger
		}

		node=this._unwrap(node)

		if(uid){
			defineId(node.attribs,uid)
			return uid
		}

		if(node.attribs.xxid){
			return node.attribs.xxid
		}

		let id=uid||(node.name=="w:document"&&"root")||super.makeId()
		defineId(node.attribs,id)

		if(this.doc.part)
			return `${id}[${this.doc.part}]`

		return id
	}

	getNode(uid){
		let [id,part]=uid.split(/[\[\]]/g)
		let node=null

		if(!part)
			node=this.doc.officeDocument.content(`[xxid="${id}"]`)
		else
			node=this.doc.officeDocument.getRel(part)(`[xxid="${id}"]`)

		if(node.length!=1){
			debugger
			throw new Error(`can't find node[id=${uid}]`)
		}
		return node
	}

	$(){
		return this.doc.officeDocument.content(...arguments)
	}

	attach(xml, needRender=true){
		xml=this.doc.officeDocument.content(xml)
		this.doc.officeDocument.content("w\\:body").append(xml)
		return needRender ? this.renderChanged(xml).id : this.makeId(xml.get(0))
	}

    toString(id){
		return this.doc.officeDocument.content.xml(this.getNode(id))
	}

	toXml(node){
		return this.doc.officeDocument.content.xml(node)
	}

    px2dxa(w){
        return w*72*20/96
    }

	px2cm(px){
		return Math.ceil(px*72/96*360000/28.3464567)
	}

	px2Pt(px){
		return px*72/96
	}

	static Reducer=Reducer
}

const defineId=(target,id)=>Object.defineProperty(target,"xxid",{
	enumerable: false,
	configurable: true,
	writable: false,
	value: id
})