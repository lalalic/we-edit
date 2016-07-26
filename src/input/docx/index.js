import docx4js from "docx4js"
import Base from "../base"
import React from "react"


export default class Docx extends Base{
	static support(file){
		return true
	}

	load(data, domain){
		const Models=wordify(domain)

		return (class extends docx4js{
			onCreateElement(node, type){
				let {attributes, children}=node
				if(Array.isArray(children))
					children=children.filter(a=>a)
				let Content=Models[type]
				let props=attributes
				delete props.isSelfClosing
				if(Content){
					if((type=="tr" || type=="tc") && !props.directStyle)
						props.directStyle=this.officeDocument.styles.createDirectStyle({},`${type}Pr`)
					return React.createElement(Content, props, children)
				}else{
					console.warn(`${type} is not identified`)
					return null
				}
			}

		}).load(data).then(docx=>docx.parse().then(docx=>{
			console.log(docx)
			return docx
		}))
	}
}

function wordify(domain){
	class Document extends domain.Document{
		getChildContext(){
			const ctx=super.getChildContext()
			let _getDefaultStyle=ctx.getDefaultStyle
			return Object.assign(ctx,{
				getDefaultStyle(type){
					switch(type){
					case 'inline':
						type="character"
					break
					}
					return _getDefaultStyle(type)
				}
			})
		}
	}
	const {Any,
		Section,
		Paragraph,
		Inline,
		Text,
		Frame,
		Image,
		Table,
		Row,
		Cell,
		List,
		Header,
		Footer}=domain
	return {
		"docx":Any,
		"document":Document,
		"section":Section,
		"p":Paragraph,
		"r":Inline,
		"t":Text,
		"tbl":Table,
		"tr":Row,
		"tc":Cell,
		"list":List,
		"image":Image,
		"hdr":Header,
		"ftr":Footer
	}
}
