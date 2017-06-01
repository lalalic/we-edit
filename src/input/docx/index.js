import docx4js from "docx4js"
import uuid from "tools/uuid"
import Base from "input/base"

import Style from "./styles"
import Transformers from "./model"

import * as changer from "./changer"

export default class extends Base{
	static support(file){
		switch(typeof(file)){
		case "string":
			return file.toLowerCase().endsWith(".docx")
		case "object":
			if(file.type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
				return true
			if(file instanceof docx4js)
				return true
		}
		return false
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

		const styles=this.styles=Base.createStyles()

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
				return createElement(domain.Text,{},children[0]||"",node)

			case "picture":{
				let style=selector.select($(node).find("a\\:xfrm").toArray())
				return createElement(domain.Image,{...style.xfrm,src:props.url},null,node)
			}
			case "drawing.inline":{
				let style=selector.select($(node).find("wp\\:extent").toArray())
				return createElement(Transformers.Wrapper(domain),style.extent,children,node)
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
				return createElement(Transformers.Anchor(domain),{...style.extent,wrap,margin},children,node)
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

				return createElement(domain.Shape,{...style,...others,...size,position, ...content.bodyPr},children,node)
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
		const identify=docx4js.OfficeDocument.identify

		function renderNode(node){
			return docx.officeDocument.renderNode(node,build,identify)
		}

		this.renderChanged=(node,createElement)=>{
			return docx.officeDocument.renderNode(node,buildFactory(createElement),identify)
		}

		return docx.render(build)
	}

	identify(node){
		if(node.attribs.id!=undefined)
			return node.attribs.id

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

	onChange(state,{type,payload},createElement){
		let renderChanged=changed=>this.renderChanged(changed,createElement)

		let params=[state,renderChanged]
		switch(type){
			case `text/RETURN`:
				return new changer.text(...params)
					.insert("\r")
					.state()
			case `text/INSERT`:
				return new changer.text(...params)
					.insert(payload)
					.state()
			case `text/REMOVE`:
				return new changer.text(...params)
					.remove(payload)
					.state()
			case "entity/RESIZE":
				return new changer.entity(...params)
					.resize(payload)
					.state()
			case "entity/ROTATE":
				return new changer.entity(...params)
					.rotate(payload)
					.state()
			case "selection/MOVE":
				return new changer.entity(...params)
					.move(payload)
					.state()
			case 'style/ADD':{
				const {type,id,name,isDefault=false,...others}=payload
				let $=docx.officeDocument.styles
				let styleNode=docx4js.parseXml(`
					<w:style w:type="${type}" ${isDefault ? 'w:default="1"' : ""} w:styleId="${id}">
						<w:name w:val="${name}"/>
						<w:uiPriority w:val="1"/>
						<w:semiHidden/>
						<w:unhideWhenUsed/>
					</w:style>`).root().children().get(0)
				$(styleNode).appendTo("w\\:styles")
				this.renderChanged(styleNode)
				return {styles: this.styles}
			}
			case `style/UPDATE`:{
				return {styles: this.styles}
			}
			case 'style/REMOVE':{
				delete this.styles[payload]
				return {styles: this.styles}
			}
		}
		return true
	}
}
