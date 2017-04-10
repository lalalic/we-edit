import docx4js from "docx4js"
import uuid from "tools/uuid"
import Base from "input/base"

import Style from "./styles"
import Transformers from "./model"

export default class extends Base{
	static support({type}){
		return type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	}

	load(file){
		return docx4js.load(file)
	}

	create(){
		return docx4js.create()
	}

	save(docx,name,option){
		return docx.save(name,option)
	}

	transform(domain){
		return Object.keys(Transformers).reduce((transformed,k)=>{
			transformed[k]=Transformers[k](domain)
			return transformed
		},{...domain})
	}

	render(docx,domain,createElement){
		const self=this
		const selector=new Style.Properties(docx)
		const $=docx.officeDocument.content
		const settings=docx.officeDocument.settings

		const styles=Base.createStyles()

		function build(type,props,children){
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
				let id=props.id
				if(!id){
					styles['*']=new Style.Default(node, selector)
				}else{
					let type=node.attribs["w:type"]
					switch(type){
					case "paragraph":
						styles[id]=new Style.Paragraph(node,styles,selector)
					break
					case "character":
						styles[id]=new Style.Character(node,styles,selector)
					break
					case "numbering":
						styles[id]=new Style.Numbering(node,styles,selector)
					break
					case "table":
						styles[id]=new Style.Table(node,styles,selector)
					break
					}

					if(node.attribs["w:default"]=="1")
						styles[`*${type}`]=styles[id]
				}
				return null
			}
			case "num":
				styles[`_num_${node.attribs["w:numId"]}`]=new Style.Num(node,styles,selector)
				return null
			case "abstractNum":
				styles[`_abstractNum_${node.attribs["w:abstractNumId"]}`]=new Style.AbstractNum(node,styles,selector)
				return null
			case "document":
				let evenAndOddHeaders=settings("w\\:evenAndOddHeaders").length>0
				return createElement(
					domain.Document,
					{styles, evenAndOddHeaders, ...selector.select(node.children.filter(a=>a.name!="w:body"))},
					children,
					node
				)
			case "section":
				let style=selector.select(node.children)

				const hf=cat=>node.children.filter(a=>a.name==`w:${cat}Reference`)
					.forEach(a=>{
						let type=a.attribs["w:type"]
						let rId=a.attribs["r:id"]
						let root=docx.officeDocument.getRel(rId).root().children().get(0)
						self.part=rId
						children.splice(0,0,createElement(domain[`${cat.charAt(0).toUpperCase()}${cat.substr(1)}`],{type},
							root.children.map(a=>renderNode(a)),
							root
						))
						delete self.part
					})

				hf("header")
				hf("footer")

				return createElement(domain.Section,style,children,node)
			case "tbl":{
				let cols=selector.select([node.children.find(a=>a.name=="w:tblGrid")]).tblGrid
				let width=cols.reduce((w,a)=>w+a,0)
				let style
				if(props.pr)
					style=selector.select(props.pr.children, {
						tblStyle:"namedStyle"
					})

				return createElement(domain.Table,{cols,width,...style},children,node)
			}
			case "tr":{
				let style
				if(props.pr)
					style=selector.select(props.pr.children,{"w:tcBorders":"border"})

				return createElement(domain.Row,style,children,node)
			}
			case "tc":{
				let style
				if(props.pr)
					style=selector.select(props.pr.children,{"w:tcBorders":"border"})

				return createElement(domain.Cell,style,children,node)
			}
			case "list":{
				let style=selector.select(props.pr.children,{
					spacing:"spacing",
					ind:"indent",
					numPr:"num",
					pStyle:"namedStyle"
				})
				return createElement(domain.List,style,children,node)
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

				return createElement(domain.Paragraph,style,children,node)
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

				return createElement(Transformers.Run(domain),style,children,node)
			}
			case "t":
				return children[0] ? createElement(domain.Text,{},children[0],node) : null
			case "control.picture":
			case "inline.picture":{
				let style=selector.select($(node).find("wp\\:extent").toArray())
				return createElement(domain.Image,{...style.extent, src:props.url},null,node)
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

		function renderNode(node){
			return docx.officeDocument.renderNode(node,build)
		}

		return docx.render(build)
	}

	identify(node){
		if(node.attribs.id!=undefined)
			return node.atrribs.id

		let id=uuid()
		Object.defineProperty(node.attribs,"id",{
			enumerable: false,
			configurable: false,
			writable: false,
			value: id
		})

		if(this.part)
			return `${id}[${this.part}]`

		return id
	}

	getRaw(docx, id){
		var part
		[id,part]=id.split(/[\[\]]/g)
		if(!part)
			return docx.officeDocument.content(`#${id}`)
		else
			return docx.officeDocument.getRel(part)(`#${id}`)
	}

	onChange(docx, selection,action){
		const {type,payload}=action
		const {start:{id,at}, end}=selection

		const target=this.getRaw(docx,id)
		if(target.length!=1){
			console.dir(docx.officeDocument.content.xml(target))
			throw new Error(`[content.id=${id}].length=${target.length}`)
		}

		switch(type){
			case `text/INSERT`:{
				let text=target.text()
				target.text(text.substring(0,at)+payload+text.substr(end.at))
				break
			}
			case `text/REMOVE`:{
				let text=target.text(), n=payload
				target.text(text.substring(0,at-n)+text.substr(end.at))
				break
			}
			case `style/UPDATE`:{

			}
		}
		return true
	}
}
