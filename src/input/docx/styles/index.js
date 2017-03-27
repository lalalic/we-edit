import Selector from "../selector"

import Default from "./default"
import Character from "./character"
import Paragraph from "./paragraph"
import Numbering from "./numbering"
import Table from "./table"

export class Styles{
	constructor(docx){
		let selector=new Selector(docx)
		let styles={}
		let $=docx.officeDocument.styles
		let parse
		$("w\\:styles").children("w\\:style,w\\:docDefaults").toArray().forEach(parse=node=>{
			let id=node.attribs["w:styleId"]
			if(!id)
				styles['*']=new Default(node, selector)
			else{
				let type=node.attribs["w:type"]
				switch(type){
				case "paragraph":
					styles[id]=new Paragraph(node,styles,selector)
				break
				case "character":
					styles[id]=new Character(node,styles,selector)
				break
				case "numbering":
					//styles[id]=new Numbering(node,styles,selector)
				break
				case "table":
					//styles[id]=new Table(node,styles,selector)
				break
				}

				if(node.attribs["w:default"]=="1")
					styles[`*${type}`]=styles[id]
			}
		})


		this.rStyle=pr=>{
			let style=pr ? new Character({attribs:{},children:[pr]},styles,selector) : styles['*character']||styles['*']
			return "bold,italic,vanish".split(",")
				.reduce((o,key)=>{
						o[key]=!!style.get(`rPr.${key}`)
						return o
					},
					"fonts,size,color".split(",")
					.reduce((o,key)=>{
						o[key]=style.get(`rPr.${key}`)
						return o
					},{namedStyle:style.id||style.basedOn})
				)
		}

		this.pStyle=pr=>{
			let style=pr ? new Paragraph({attribs:{},children:[pr]},styles,selector) : styles['*paragraph']||styles['*']
			return "spacing,indent".split(",")
				.reduce((o,key)=>{
					o[key]=style.get(`pPr.${key}`)
					return o
				},{namedStyle:style.id||style.basedOn})
		}

		this.update=parse
	}
}

export default Styles
