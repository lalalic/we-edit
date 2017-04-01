import Properties from "./properties"

import Default from "./default"
import Character from "./character"
import Paragraph from "./paragraph"
import Numbering from "./numbering"
import Table from "./table"
import Num from "./numbering/num"
import AbstractNum from "./numbering/abstractNum"

import {Record} from "immutable"
export class Styles{
	constructor(docx){
		let selector=new Properties(docx)
		let styles={}

		const parseStyle=node=>{
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
					styles[id]=new Numbering(node,styles,selector)
				break
				case "table":
					styles[id]=new Table(node,styles,selector)
				break
				}

				if(node.attribs["w:default"]=="1")
					styles[`*${type}`]=styles[id]
			}
		}

		docx.officeDocument.styles("w\\:styles")
			.children("w\\:style,w\\:docDefaults")
			.toArray().forEach(parseStyle)


		const parseNum=a=>{
			switch(a.name){
			case "w:num":
				styles[`_num_${a.attribs["w:numId"]}`]=new Num(a,styles,selector)
			break
			case "w:abstractNum":
				styles[`_abstractNum_${a.attribs["w:abstractNumId"]}`]=new AbstractNum(a,styles,selector)
			break
			}
		}

		if(docx.officeDocument.numbering){
			docx.officeDocument.numbering("w\\:numbering")
				.children("w\\:num, w\\:abstractNum")
				.toArray().forEach(parseNum)
		}

		this.resetNum=()=>{
			Object.keys(styles).filter(k=>k.startsWith("_num_"))
				.forEach(k=>styles[k].reset())
		}
		this.updateStyle=parseStyle
		this.updateList=parseNum

		this.select=function(){
			return selector.select(...arguments)
		}
		
		this.get=a=>styles[a]
	}
}

export default Styles
