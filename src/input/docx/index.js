import React, {Component, PropTypes} from "react"
import docx4js from "docx4js"
import Base from "../base"
import Editor from "../../editor"

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
		"paragraph":Paragraph,
		"inline":Inline,
		"text":Text,
		"table":Table,
		"row":Row,
		"cell":Cell,
		"list":List,
		"image":Image,
		"header":Header,
		"footer":Footer
	}
}

export default class extends Base{
	static support({type}){
		return type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	}

	load(data, domain){
		const Models=wordify(domain)
		const self=this
		return (class extends docx4js{
			onCreateElement(node, type){
				let {attributes, children, parent}=node
				if(Array.isArray(children))
					children=children.filter(a=>a)
				let Content=Models[type]
				let props=attributes

				if(Content){
					let docxType=node.name.split(':')[1]
					if((type=="row" || type=="cell") && !props.directStyle)
						props.directStyle=this.officeDocument.styles.createDirectStyle(null,`${docxType}Pr`)
					return self.createElement(Content, props, children)
				}else{
					console.warn(`${type} is not identified`)
					return null
				}
			}
		}).load(data).then(docx=>docx.parse())
	}

	create(){
		return this.load(EMPTY_DOCX,Editor)
	}
}

const EMPTY_DOCX=""
