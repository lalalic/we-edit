import React from "react"
import Docx from "./editable-doc"
import {Input} from "we-edit"
import {Readable} from 'stream'

import Style from "./styles"
import Transformers from "./model"

export default class DocxType extends Input.Editable{
	static support(file){
		if(arguments.length==0){//for installer
			return true
		}

		const {data, name, type}=file
		if(name && name.toLowerCase().endsWith(".docx"))
			return true

		if(type && type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
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

	parse({data, name, ...props}){
		if(name)
			this.name=name
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

	transform(components){
		return Object.keys(Transformers).reduce((transformed,k)=>{
			transformed[k]=Transformers[k](components)
			return transformed
		},{...components})
	}

	render(createElement,components){
		const self=this
		const identify=Docx.OfficeDocument.identify

		const docx=this.doc
		const selector=new Style.Properties(docx)
		const $=docx.officeDocument.content
		const settings=docx.officeDocument.settings

		const styles=this.styles=this.constructor.createStyles()

		const createStylesElement=()=>createElement(
			Transformers.Styles(components),
			{styles:{...styles}},
			null,
			{id:"styles"}
		)

		const buildFactory=createElement=>(type,props,children)=>{
			let node=props.node
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
					style=new Style.Default(node, selector)
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
					},
					[
						createStylesElement(),
						...children
					],
					node
				)
			}
			case "section":
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
					.forEach(a=>{
						let type=a.attribs["w:type"]
						let rId=a.attribs["r:id"]
						let root=docx.officeDocument.getRel(rId).root().children().get(0)
						if(!isEmpty(root)){
							self.part=rId
							children.splice(0,0,createElement(components[`${cat.charAt(0).toUpperCase()}${cat.substr(1)}`],{type},
								root.children.map(a=>renderNode(a)),
								root
							))
							delete self.part
						}
					})

				hf("header")
				hf("footer")

				return createElement(components.Section,style,children,node)
			case "tbl":{
				let cols=selector.select([node.children.find(a=>a.name=="w:tblGrid")]).tblGrid
				let width=cols.reduce((w,a)=>w+a,0)
				let style
				if(props.pr)
					style=selector.select(props.pr.children, {
						tblStyle:"namedStyle"
					})

				return createElement(components.Table,{cols,width,...style},children,node)
			}
			case "tr":{
				let style
				if(props.pr)
					style=selector.select(props.pr.children,{"w:tcBorders":"border", "w:trHeight":"height"})

				return createElement(components.Row,style,children,node)
			}
			case "tc":{
				let style
				if(props.pr)
					style=selector.select(props.pr.children,{"w:tcBorders":"border"})

				return createElement(components.Cell,style,children,node)
			}
			case "list":
			case "heading":
			case "p":{
				let style= !props.pr ? styles['*paragraph'] : new Style.Paragraph.Direct(props.pr,styles,selector);
				return createElement(components.Paragraph,{style},children,node)
			}
			case "r":{
				let style= !props.pr ? styles['*character'] : new Style.Character.Direct(props.pr,  styles, selector)

				return createElement(Transformers.Run(components),{style},children,node)
			}
			case "t":
				return createElement(components.Text,{},children[0]||"",node)

			case "picture":{
				let style=selector.select($(node).find("a\\:xfrm").toArray())
				return createElement(components.Image,{...style.xfrm,src:props.url},null,node)
			}
			case "drawing.inline":{
				let style=selector.select($(node).find("wp\\:extent").toArray())
				return createElement(Transformers.Wrapper(components),style.extent,children,node)
			}
			case "drawing.anchor":{
				let root=$(node)
				let style=selector.select(root.find("wp\\:extent,wp\\:positionH,wp\\:positionV").toArray())
				let wrap=selector.selectValue(
					root
					.find("TopAndBottom,Square,Tight,Through".split(",").map(a=>`wp\\:wrap${a}`).join(","))
					.get(0))
				let margin="Right,Left,Bottom,Top".split(",")
					.reduce((margin,a)=>{
						margin[a.toLowerCase()]=docx.cm2Px(root.attr(`dist${a[0]}`))
						return margin
					},{})
				return createElement(Transformers.Anchor(components),{...style.extent,wrap,margin},children,node)
			}
			case "shape":{
				let {xfrm:{size,position},...others}=selector.select($(node).find("wps\\:spPr").children().toArray(),{
						custGeom:"path",
						prstGeom:"shape",
						ln:"outline",
						solidFill:"fill",
						blipFill:"image"
					})
				let content=selector.select($(node).find("wps\\:bodyPr").toArray(),{})
				let style=selector.select($(node).find("wps\\:style").children().toArray(),{
						lnRef:"outline",
						fillRef:"fill",
						fontRef:"font",
						effectRef:"effect"
					})

				return createElement(components.Shape,{...style,...others,...size,position, ...content.bodyPr},children,node)
			}
			case "bookmarkStart":
			case "bookmarkEnd":
				return null
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
			return docx.officeDocument.renderNode(node,build,identify)
		}

		this.refreshStyles=createStylesElement

		this.getFontList=()=>Array.from(selector.requireFonts)

		return rendered
	}

	makeId(node){
		if(node && node.id)
			return node.id
		return Docx.prototype.makeId.call(this,...arguments)
	}

	renderNode(node, createElement){
		//injected implementation by render
	}

	getFontList(){
		//injected implementation by render
	}
}
