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


		this.rStyle=pr=>pr ? new Character({children:[pr]}) : styles['*Character']||styles['*']

		this.pStyle=pr=>pr ? new Paragraph({children:[pr]}) : styles['*Paragraph']||styles['*']

		this.update=node=>docx.officeDocument.renderNode(node,parse)
	}
}

export default Styles
