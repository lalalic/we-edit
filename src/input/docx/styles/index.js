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
		docx.officeDocument.renderNode($("w\\:styles").get(0),parse=(type,{id,node})=>{
			if(type=="style")
				return
			if(!!id)
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
					styles[id]=new Numbering(node,styles,selector)
				break
				case "table":
					styles[id]=new Table(node,styles,selector)
				break
				}
				
				if(node.attribs["w:default"]=="1")
					styles[`*${type}`]=styles[id]
			}
		})
		
		
		this.rStyle=pr=>{
			let direct=pr ? new Character(pr) : styles['*Character']||styles['*']
			return "fonts,size,color,bold,italic,vanish".split(",").reduce((style,key)=>{
				style[key]=direct.get(`rPr.${key}`)
				return style
			},{})
		}
		
		this.pStyle=pr=>{
			let direct=pr ? new Paragraph(pr) : styles['*Paragraph']||styles['*']
			return "spacing,indent".split(",").reduce((style,key)=>{
				style[key]=direct.get(`pPr.${key}`)
				return style
			},{})
		}
		
		this.update=node=>docx.officeDocument.renderNode(node,parse)
	}
}

export default Styles