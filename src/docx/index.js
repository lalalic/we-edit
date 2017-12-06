import React from "react"
import Docx from "./editable-doc"
import Input from "we-edit/input"
import {Map} from "immutable"

import Style from "./styles"
import Transformers from "./model"
import * as reducer from "./reducer"

export default class extends Input.Type{
	static support(file){
		switch(typeof(file)){
		case "string":
			return file.toLowerCase().endsWith(".docx")
		case "object":
			if(file.type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
				return true
			if(file instanceof Docx)
				return true
		}
		return false
	}

	load(file){
		if(file.name)
			this.name=file.name
		return Docx.load(file)
	}

	release(){
		this.doc.release()
	}

	create(){
		return Docx.create()
	}

	serialize(option){
		return this.doc.serialize(option).generate({
			...option,
			mimeType:this.doc.mime,
			type: typeof(document)!="undefined" && window.URL && window.URL.createObjectURL ? "blob": "nodebuffer"
			})
	}

	transform(components){
		return Object.keys(Transformers).reduce((transformed,k)=>{
			transformed[k]=Transformers[k](components)
			return transformed
		},{...components})
	}

	buildUp(state,Transformed){
		let doc=super.buildUp(state,Transformed)
		return React.cloneElement(doc,{}, this.refreshStyles(), doc.props.children)
	}

	render(createElement,components){
		const self=this
		const docx=this.doc
		const selector=new Style.Properties(docx)
		const $=docx.officeDocument.content
		const settings=docx.officeDocument.settings

		const styles=this.styles=Input.Type.createStyles()

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

				const hf=cat=>node.children.filter(a=>a.name==`w:${cat}Reference`)
					.forEach(a=>{
						let type=a.attribs["w:type"]
						let rId=a.attribs["r:id"]
						let root=docx.officeDocument.getRel(rId).root().children().get(0)
						self.part=rId
						children.splice(0,0,createElement(components[`${cat.charAt(0).toUpperCase()}${cat.substr(1)}`],{type},
							root.children.map(a=>renderNode(a)),
							root
						))
						delete self.part
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
					style=selector.select(props.pr.children,{"w:tcBorders":"border"})

				return createElement(components.Row,style,children,node)
			}
			case "tc":{
				let style
				if(props.pr)
					style=selector.select(props.pr.children,{"w:tcBorders":"border"})

				return createElement(components.Cell,style,children,node)
			}
			case "list":{
				let style=selector.select(props.pr.children,{
					spacing:"spacing",
					ind:"indent",
					numPr:"num",
					pStyle:"namedStyle"
				})
				return createElement(components.List,style,children,node)
			}
			case "heading":
			case "p":{
				let style=null
				if(props.pr)
					style=selector.select(props.pr.children,{
						spacing:"spacing",
						ind:"indent",
						numPr:"num",
						pStyle:"namedStyle"
					})

				if(children.length==0){
					let r=$("<w:r><w:t> </w:t></w:r>").appendTo(node).get(0)
					let t=r.children[0]
					if(props.pr){
						let rPr=props.pr.children.find(a=>a.name=="w:rPr")
						if(rPr)
							$(rPr).clone().prependTo(r)
					}
					children.push(renderNode(r))
				}

				return createElement(components.Paragraph,style,children,node)
			}
			case "r":{
				let style=null
				if(props.pr)
					style = selector.select(props.pr.children, {
							rFonts: "fonts",
							sz: "size",
							b: "bold",
							i: "italic",
							rStyle: "namedStyle"
						})

				return createElement(Transformers.Run(components),style,children,node)
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

		const build=buildFactory(createElement)
		const identify=Docx.OfficeDocument.identify

		function renderNode(node){
			return docx.officeDocument.renderNode(node,build,identify)
		}

		//implement loader.renderChangedNode
		this.renderNode=(node,createElement)=>{
			try{
				node=node.get(0)
			}catch(e){

			}
			return docx.officeDocument.renderNode(node,buildFactory(createElement),identify)
		}

		this.refreshStyles=createStylesElement

		return docx.render(build)
	}

	makeId(node){
		if(node && node.id)
			return node.id
		return Docx.prototype.makeId.call(this,...arguments)
	}

	renderNode(node, createElement){
		//injected implementation by render
	}

	/**
	*return:
	- false: no state change
	- {
		selection: change of selection,
		updated: updated content,
		undoables: saved changed content for history
	}: all these changes will be applied on state
	- any else: reduce selection action
	*/
	onChange(state,{type,payload},createElement){
		let params=[state]
		switch(type){
			case 'we-edit/style/ADD':
				return new reducer.style(...params)
					.create(payload)
					.state()
			case `we-edit/style/UPDATE`:
				return new reducer.style(...params)
					.update(payload)
					.state()
			case 'we-edit/style/REMOVE':
				return new reducer.style(...params)
					.remove(payload)
					.state()
		}
		return super.onChange(...arguments)
	}


}
