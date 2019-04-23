import React from "react"
import Docx from "./docx"
import {Input} from "we-edit"
import {Readable} from 'stream'

import Style from "./styles"
import HOCs from "./dom"

export default class extends Input.Editable{
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

		const createStylesElement=()=>createElement(
			components.Styles,
			{styles, updatedAt: Date.now()},
			null,
			{id:"styles"}
		)

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
					},
					[
						createStylesElement(),
						...children
					],
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
			if(node.cheerio)
				node=node.get(0)
			return docx.officeDocument.renderNode(node,build,identify)
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
}
