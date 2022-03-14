
import {Input,dom} from "we-edit"
import {Readable} from "readable-stream"

import Docx from "./docx"
import Style from "./render/styles"
import HOCs from "./render/dom"
import Reducer from "./event"

class DocxType extends Input.Editable{
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
		const doc=this.doc
		return new Readable({
			read(){
				this.push(doc.serialize(option).generate({...option, type:"nodebuffer",mimeType:doc.mime,}))
				this.push(null)
			}
		})
	}

	render(createElement,components){
		const self=this
		const ignores=["w:style", "w:num", "w:abstractNum"]
		const identify=(identify=>(node,officeDocument)=>{
			if(ignores.includes(node.parent?.name) || node.name=="w:del"){
				return 
			}
			return identify(node,officeDocument)
		})(this.doc.constructor.OfficeDocument.identify.bind(this.doc.constructor.OfficeDocument));

		const docx=this.doc
		const selector=new Style.Properties(docx)
		const officeDocument=docx.officeDocument
		const $=officeDocument.content
		const settings=officeDocument.settings

		const styles=this.styles=new (class{
			toJSON(){
				return {}
			}

			get all(){
				return Object.keys(this).filter(a=>this.hasOwnProperty(a))
			}

			getNumberingList(){
				return officeDocument.numbering("w\\:num").filter((i,el)=>{
					const abstractNumId=officeDocument.numbering(el).children("w\\:abstractNumId").attr("w:val")
					const a=officeDocument.numbering(`w\\:abstractNum[w\\:abstractNumId=${abstractNumId}]`)
						.has("w\\:multiLevelType[w\\:val=singleLevel],w\\:multiLevelType[w\\:val=hybridMultilevel]")
						.find("[w\\:ilvl=0]>w\\:numFmt[w\\:val!=bullet]")
					return a.length==1
				}).map((i,el)=>{
					const numId=el.attribs["w:numId"]
					return styles.Normal.applyNumbering({num:{numId,level:0}})
				}).toArray()
			}

			getBulletList(){
				return officeDocument.numbering(`w\\:lvl:has(w\\:numFmt[w\\:val=bullet])`)
					.map((i,el)=>{
						const abstractNumId=el.parent.attribs["w:abstractNumId"]
						return styles.Normal.applyNumbering({num:{abstractNumId,ilvl:el.attribs["w:ilvl"]}})
					}).toArray()
			}

			getOutlineList(){
				const styleList=officeDocument.numbering('w\\:abstractNum>w\\:styleLink').map((i,a)=>a.attribs["w:val"]).toArray()
					.map(styleId=>officeDocument.styles(`w\\:style[w\\:styleId=${styleId}] w\\:numId`).attr('w:val'))

				const docList=officeDocument.numbering(`w\\:abstractNum`)
					.has("w\\:multiLevelType[w\\:val=multilevel]")
					.filter((i,a)=>officeDocument.numbering(a).children("w\\:styleLink").length==0)
					.map((i,a)=>a.attribs["w:abstractNumId"]).toArray()
				return {
					styleList:styleList.map(numId=>({id:numId, levels:styles[`_num_${numId}`].flat()})), 
					docList:docList.map(abstractNumId=>({abstractNumId,levels:styles[`_abstractNum_${abstractNumId}`].flat()}))
				}
			}
		})();//keep as raw object in state


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
				}
				return null
			}
			case "num":{
				const style=new Style.Num(node,styles,selector)
				styles[style.id]=style
				return null
			}
			case "abstractNum":{
				const style=new Style.AbstractNum(node,styles,selector)
				styles[style.id]=style
				return null
			}
			case "numPicBullet":{
				const $node=officeDocument.numbering(node)
				const rid=$node.find("v\\:imagedata").attr('r:id')
				const numRid=officeDocument.rels(`Relationship[Type$="numbering"]`).attr('Id')
				const numberingPart=officeDocument.getRelPart(numRid)
				const {url}=numberingPart.getRel(rid);
				const {UnitShape}=dom.Unknown
				
				const prop={}
				$node.find("v\\:shape").attr('style').split(";").forEach(a=>{
					const [key,value]=a.split(":")
					if(key=="width" || key=="height"){
						prop[key]=UnitShape.normalize(value)
					}
				})

				;(styles.picBullets||(styles.picBullets={}))[$node.attr("w:numPicBulletId")]={url,...prop}
				return null
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
						hintStyle:{
							fonts:"Times New Roman",
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

							hfs.push(
								createElement(
									HFType,
									{xhref:`${cat}.${type}`},
									root.children.map(a=>renderNode(a)),
									root
								).id
							)

							delete self.part
						}
						return hfs
					},[])

				const headers=hf("header",components.Header)
				const footers=hf("footer",components.Footer)

				return createElement(components.Section,{...style, headers,footers},children,node)
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
				const style=!props.pr ? undefined : new Style.Table.Direct(props.pr,styles,selector)
				const vMerge=style.tc?.vMerge
				return createElement(components.Cell,{style, vMerge},children,node)
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
			case 'txbx':
				return createElement(components.Frame,{width:1},children,node)
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
				return createElement(components.Image,props,null,node)
			case "shape":
				return createElement(components.Shape,props,children,node)
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

		const rendered=docx.render(build, identify)


		/**
		 * implement loader.renderChangedNode
		 * what if node is in region element, such as Field, Bookmark
		 */
		this.renderNode=(node,createElement)=>{
			build=buildFactory(createElement)
			return docx.officeDocument.renderNode(this._unwrap(node),build,identify)
		}

		this.getFontList=()=>Array.from(selector.requireFonts).filter(a=>!!a)

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
	static Reducer=Reducer
	makeId(node, root="w:document", nodeId){
        if(!node){
            return "null"
		}
        
	   node=this._unwrap(node)
	   
	   if(nodeId!=undefined){
			if('xxid' in node.attribs){
				delete node.attribs.xxid
			}
			Object.defineProperty(node.attribs,"xxid",{
				enumerable: false,
				configurable: true,
				writable: false,
				value: nodeId
			})
			return nodeId
	   }

		if(node.attribs.xxid){
			if('xxid' in node.attribs){
				const xxid=node.attribs.xxid
				delete node.attribs.xxid
				Object.defineProperty(node.attribs,"xxid",{
					enumerable: false,
					configurable: true,
					writable: false,
					value: xxid
				})
			}
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

	getPatch(last){
		globalThis.xxid=true
		try{
			const doc=this.doc.serialize(), files=doc.files
			const current=this._crc32(Object.keys(files).map(k=>files[k]._data.crc32||this._crc32(files[k]._data)).join(","))

			if(last!==current){
				return {status:current, patch:[{target:'*',data:doc.generate({type:"nodebuffer",mimeType:this.doc.mime})}]}
			}
		}finally{
			delete globalThis.xxid
		}
	}

	_partPatch(last){
		globalThis.xxid=true
		try{
			const doc=this.doc.serialize(), files=doc.files, current={}
			const patch=Object.keys(files).map(k=>{
				current[k]=files[k]._data.crc32||this._crc32(files[k]._data);
				if(!last)
					return 
				if(!(k in last) ||last[k]!==current[k]){
					return {target:k, data:files[k].asUint8Array()}
				}
			}).filter(a=>!!a);

			if(!last){
				patch.push({target:'*',data:doc.generate({type:"nodebuffer",mimeType:this.doc.mime})})
			}else{
				if(patch.length==0)
					return
				Object.keys(last).forEach(k=>!(k in current) && patch.push({target:k, op:"remove"}))
			}

			return {status:current, patch, __patch__:"part"}
		}finally{
			delete globalThis.xxid
		}
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
}