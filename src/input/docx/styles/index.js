import Properties from "./properties"

import Default from "./default"
import Character from "./character"
import Paragraph from "./paragraph"
import Numbering from "./numbering"
import Table from "./table"
import Num from "./numbering/num"
import AbstractNum from "./numbering/abstractNum"

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
				.reduce((o,key,t)=>{
						if((t=style.get(`r.${key}`))!=undefined)
							o[key]=!!t
						return o
					},
					"fonts,size,color".split(",")
					.reduce((o,key,t)=>{
						if((t=style.get(`r.${key}`))!=undefined)
							o[key]=t
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
				style=new Paragraph({attribs:{},children:[pr,basedOn]},styles,selector)
			}
			let namedStyle=style.id||style.basedOn

			let r="bold,italic,vanish".split(",")
				.reduce((o,key,t)=>{
						if((t=style.get(`r.${key}`))!=undefined)
							o[key]=!!t
						return o
					},
					"fonts,size,color".split(",")
					.reduce((o,key,t)=>{
						if((t=style.get(`r.${key}`))!=undefined)
							o[key]=t
						return o
					},{})
				)

			return "spacing,indent".split(",")
				.reduce((o,key,t)=>{
					if((t=style.get(`p.${key}`))!=undefined)
						o[key]=t
					return o
				},{namedStyle, r})
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
				.reduce((o,key,t)=>{
					if((t=style.get(`tbl.${key}`))!=undefined)
						o[key]=t
					return o
				},{namedStyle}),style]
		}

		this.tr=this.tc=pr=>{
			return pr ? selector.select(pr.children,{"w:tcBorders":"borders"}) : null
		}

		this.list=pr=>{
			let style=styles['*numbering']
			if(pr){
				let basedOn=pr.children.find(a=>a.name=="w:pStyle")
				if(!basedOn)
					basedOn={name:"w:basedOn",attribs:{"w:val":"*numbering"}}
				style=new Numbering({attribs:{},children:[pr,basedOn]},styles,selector)
			}
			let namedStyle=style.id||style.basedOn

			let numId=style.get("p.num.numId")

			let level=style.get("p.num.ilvl")

			let r="bold,italic,vanish".split(",")
				.reduce((o,key,t)=>{
						if((t=style.get(`r.${key}`))!=undefined)
							o[key]=!!t
						return o
					},
					"fonts,size,color".split(",")
					.reduce((o,key,t)=>{
						if((t=style.get(`r.${key}`))!=undefined)
							o[key]=t
						return o
					},{})
				)
			let indentList=styles[`_num_${numId}`].get(`${level}.p.indent`)
			
			return "spacing,indent".split(",")
				.reduce((o,key,t)=>{
					if((t=style.get(`p.${key}`))!=undefined)
						o[key]=t
					return o
				},{indentList, namedStyle, r, numId, level})
		}

		this.listLabel=(id,level)=>{
			let numStyle=styles[`_num_${id}`]
			let label=numStyle.level(level).invoke(`next`)
			return "fonts,size,color".split(",")
				.reduce((props,key, t)=>{
					if(t=numStyle.get(`${level}.r.${key}`)!=undefined)
						props[key]=t
					return props
				},"bold,italic,vanish".split(",")
					.reduce((o,key,t)=>{
						if((t=numStyle.get(`${level}.r.${key}`))!=undefined)
							o[key]=!!t
						return o
					},{children:label})
				)
		}

		this.resetNum=()=>{
			Object.keys(styles).filter(k=>k.startsWith("_num_"))
				.forEach(k=>styles[k].reset())
		}
		this.updateStyle=parseStyle
		this.updateList=parseNum

		this.select=a=>selector.select(a)
	}
}

export default Styles
