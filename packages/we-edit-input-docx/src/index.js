
import {Input,dom} from "we-edit"
import {Readable} from "readable-stream"

import Workspace from "./office"
import Docx from "./docx"
import Style from "./render/styles"
import HOCs from "./render/dom"
import Reducer from "./event"

class DocxType extends Input.Editable{
	static Workspace=Workspace
	static FileType=Docx
	static support(file){
		if(arguments.length==0){//for installer
			return true
		}

		const {data, ext,name="",mimeType}=file
		const defaultProps=this.defaultProps
        return ext===defaultProps.ext 
            || mimeType===defaultProps.mimeType 
            || name.endsWith("."+defaultProps.ext)
            || (file instanceof this.FileType)
            || (data instanceof this.FileType)
	}

	static defaultProps={
		type: "docx",
		name: "Word Document",
		ext: "docx",
		mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	}

	static HOCs=HOCs

	parse({data, ...props}){
		this.props={...props,supportPagination:true}
		return this.constructor.FileType.load(data)
	}

	release(){
		this.doc.release()
	}

	stream(option){
		const data=this.doc.serialize(option)
			.generate({
				...option,
				type:"nodebuffer",
				mimeType:this.doc.mime,
			})
		const stream=new Readable({objectMode: true})
		stream.push(data)
		return stream
	}

	render(createElement,components){
		const self=this
		const identify=this.doc.constructor.OfficeDocument.identify.bind(this.doc.constructor.OfficeDocument)

		const docx=this.doc
		const selector=new Style.Properties(docx)
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
				return createElement(
					components.Document,
					{
						...selector.select(node.children.filter(a=>a.name!="w:body")),
						defaultTab:docx.dxa2Px(parseInt(settings("w\\:defaultTabStop").attr("w:val"))),
						evenAndOddHeaders:settings("w\\:evenAndOddHeaders").length>0,
						precision:docx.precision,
						styles,
						pilcrow:{
							fonts:"Arial",
							size:docx.pt2Px(11),
						}
					},
					children,
					node
				)
			}
			case "section":{
				const style=selector.select(node.children)
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

				const hf=(cat,HFType)=>node.children.filter(a=>a.name==`w:${cat}Reference`)
					.reduce((hfs, a)=>{
						const type=a.attribs["w:type"]
						const rId=a.attribs["r:id"]
						const root=docx.officeDocument.getRel(rId).root().children().get(0)
						if(!isEmpty(root)){
							self.part=rId

							children.splice(0,0,
								createElement(HFType,{xhref:`${cat}.${type}`,type:`${cat}.${type}`},
									root.children.map(a=>renderNode(a)),
									root
								)
							)

							delete self.part
						}
						return hfs
					},{})

				hf("header",components.Header)
				hf("footer",components.Footer)

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
				const style= !props.pr ? styles['*paragraph'] : new Style.Paragraph.Direct(props.pr,styles,selector);
				const sectPr=props.pr?.children.find(a=>a.name.endsWith("sectPr"))
				if(sectPr){
					pProps.sectionType=sectPr.children.find(a=>a.name.endsWith("type"))?.attribs["w:val"]||"Next Page"
				}
				return createElement(components.Paragraph,{style,...pProps},children,node)
			}
			case "hyperlink":
				return createElement(components.Hyperlink,{anchor:node.attribs["w:anchor"]},children,node)
			case "r":{
				const style= !props.pr ? styles['*character'] : new Style.Character.Direct(props.pr,  styles, selector)
				return createElement(components.Run,{style},children,node)
			}
			case "tab":
				return createElement(components.Text,{},dom.Text.Tab,node)
			case "br":{
				switch(node.attribs["w:type"]){
					case 'page':
						return createElement(components.Text,{},dom.Text.PageBreak,node)
					default:
						return createElement(components.Text,{},dom.Text.LineBreak,node)
				}
			}
			case "fldSimple":{
				const instr=node.attribs["w:instr"].trim()
				return createElement(components.Field,{instr,command:instr.split(" ")[0],display:$(node).text()},children,node)
			}
			case "begin":{
				const field=$(node)
				const instr=field.forwardUntil("w\\:fldChar[w\\:fldCharType=separate]","w\\:instrText").text().trim()
				const command=instr.split(" ")[0]
				if(command=="TOC")
					return null
				const display=field.forwardUntil("w\\:fldChar[w\\:fldCharType=end]","w\\:t").text()
				return createElement(components.FieldBegin,{instr,command,display},[],node)
			}
			case "end":{
				const field=$(node).backwardUntil("w\\:fldChar[w\\:fldCharType=begin]")
				const instr=field.forwardUntil("w\\:fldChar[w\\:fldCharType=separate]","w\\:instrText").text().trim()
				const command=instr.split(" ")[0]
				if(command=="TOC")
					return null
				this.makeId(node,undefined,`end${this.makeId(field.get(0))}`)
				return createElement(components.FieldEnd,{command},children,node)
			}
			case "instrText":
				return null
			case "t":
				return createElement(components.Text,{},children[0]||"",node)
			case "drawing.inline":
				return createElement(components.Inline,{},children,node)
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
			case "bookmarkStart":{
				const id=node.attribs["w:id"]
				this.makeId(node,undefined, 'bookmark'+id)
				return createElement(components.BookmarkBegin,{i:id, name:node.attribs["w:name"]},[],node)
			}
			case "bookmarkEnd":{
				const id=node.attribs["w:id"]
				this.makeId(node,undefined,'endbookmark'+id)
				return createElement(components.BookmarkEnd,{},[],node)
			}

			case "control.docPartObj":{
				const $node=$(node)
				const type=$node.find("w\\:docPartGallery").attr("w:val").split(/\s+/g).map(a=>a.trim()[0]).join("")
				const Typed=components[type]
				if(Typed){
					if($node.find("w\\:docPartUnique").length){
						this.makeId(node, undefined, Typed.displayName)
					}
					return createElement(Typed,{},children,node)
				}
				return createElement(components.Container,{type},children,node)
			}
			case "Properties":
			case "coreProperties":
			case "property":
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
		const renderNode=node=>docx.officeDocument.renderNode(node,build,identify)

		const rendered=docx.render(build)


		/**
		 * implement loader.renderChangedNode
		 * what if node is in region element, such as Field, Bookmark
		 */
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
    makeId(node, root="w:document", nodeId){
        if(!node){
            return "null"
		}
        
	   node=this._unwrap(node)
	   
	   if(nodeId!=undefined){
			Object.defineProperty(node.attribs,"xxid",{
				enumerable: false,
				configurable: true,
				writable: false,
				value: nodeId
			})
			return nodeId
	   }

		if(node.attribs.xxid){
			return node.attribs.xxid
		}

        const id=node.name.endsWith(root) ? "root" : `${super.makeId(...arguments)}{${this.doc.$(node).part()}}`

        Object.defineProperty(node.attribs,"xxid",{
            enumerable: false,
            configurable: true,
            writable: false,
            value: id
        })
        return id
	}
	
	getNode(uid){
		const [id,part]=uid.split(/[\{\}]/g)
		let node=null

		if(!part)
			node=this.doc.officeDocument.content(`[xxid="${uid}"]`)
		else{
            const $=this.doc.getObjectPart(part)
            node=$(`[xxid="${uid}"]`)
        }

		if(node.length!=1){
			debugger
			throw new Error(`can't find node[id=${uid}]`)
		}
		return node
	}

	$(){
		return this.doc.officeDocument.content(...arguments)
	}

	get attacher(){
		if(!this._attacher){
			this._attacher=this.doc.officeDocument.content("<w:_attacher\>")
			this._attacher.prependTo(this.doc.officeDocument.content("w\\:body"))
		}

		return this._attacher
	}

	attach(xml){
		return this.attacher.append(xml).children()
	}

	serialize(id){
		if(typeof(id)=="string"){
			return this.doc.officeDocument.content.xml(this.getNode(id))
		}else{
			return this.doc.officeDocument.content.xml(id)
		}
	}

    px2dxa(w){
        return this.px2pt(w*20)
    }

	px2cm(px){
		return this.px2pt(px/28.3464567)
	}

	px2emu(a){
		return this.px2pt(a*12700)
	}
	
	px2pt(px){
		return px*72/96
	}

	cm2dxa(w){
		return this.px2dxa(this.doc.cm2Px(w))
	}

	static Reducer=Reducer
}