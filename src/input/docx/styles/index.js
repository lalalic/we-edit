import Properties from "./properties"

import Default from "./default"
import Character from "./character"
import Paragraph from "./paragraph"
import Numbering from "./numbering"
import Table from "./table"

export class Styles{
	constructor(docx){
		let selector=new Properties(docx)
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
					styles[id]=new Table(node,styles,selector)
				break
				}

				if(node.attribs["w:default"]=="1")
					styles[`*${type}`]=styles[id]
			}
		})


		this.r=pr=>{
			let style=styles['*character']
			if(pr){
				let basedOn=pr.children.find(a=>a.name=="w:rStyle")
				if(!basedOn)
					basedOn={name:"w:basedOn",attribs:{"w:val":"*character"}}
				style=new Character({attribs:{},children:[pr,basedOn]},styles,selector)
			}
			let namedStyle=style.id||style.basedOn
			return "bold,italic,vanish".split(",")
				.reduce((o,key)=>{
						o[key]=!!style.get(`r.${key}`)
						return o
					},
					"fonts,size,color".split(",")
					.reduce((o,key)=>{
						o[key]=style.get(`r.${key}`)
						return o
					},{namedStyle})
				)
		}

		this.p=pr=>{
			let style=styles['*paragraph']
			if(pr){
				let basedOn=pr.children.find(a=>a.name=="w:pStyle")
				if(!basedOn)
					basedOn={name:"w:basedOn",attribs:{"w:val":"*paragraph"}}
				style=new Character({attribs:{},children:[pr,basedOn]},styles,selector) 
			}
			let namedStyle=style.id||style.basedOn
			return "spacing,indent".split(",")
				.reduce((o,key)=>{
					o[key]=style.get(`p.${key}`)
					return o
				},{namedStyle})
		}
		
		this.tbl=pr=>{
			let style=styles['*table']
			if(pr){
				let basedOn=pr.children.find(a=>a.name=="w:tblStyle")
				if(!basedOn)
					basedOn={name:"w:basedOn",attribs:{"w:val":"*table"}}
				style=new Table({attribs:{},children:[pr,basedOn]},styles,selector)
			}
			let namedStyle=style.id||style.basedOn
			return ["indent,margin".split(",")
				.reduce((o,key)=>{
					o[key]=style.get(`tbl.${key}`)
					return o
				},{namedStyle}),style]
		}
		
		this.tr=this.tc=pr=>{
			return pr ? selector.select(pr.children,{"w:tcBorders":"borders"}) : null
		}

		this.update=parse
		
		this.select=a=>selector.select(a)
	}
}

export default Styles
