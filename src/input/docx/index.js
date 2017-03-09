import React, {Component, PropTypes} from "react"
import docx4js from "docx4js"
import Base from "../base"
import uuid from "../../tools/uuid"

import Selector from "./selector"
import getStyles from "./style"

export default class extends Base{
	static support({type}){
		return type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	}

	create(){
		return docx4js.create()
	}
	
	load(data, domain){
		return docx4js.load(data).then(docx=>{
			const selector=new Selector(docx)
			
			return docx.render((type,props,children)=>{
				let id=uuid()
				switch(type){
				case "document":
					return React.createElement(domain.Document,
						{...selector.document(props),key:id,styles:getStyles(selector)},
						children
					)
				case "section":
					return React.createElement(domain.Section,{...selector.section(props),key:id},children)
				case "tbl":
					return React.createElement(domain.table,{...selector.table(props),key:id},children)
				case "p":
					return React.createElement(domain.Paragraph,{...selector.paragraph(props),key:id},children)
				case "r":
					return React.createElement(domain.Inline,{...selector.inline(props),key:id},children)
				case "t":
					return React.createElement(domain.Text,{key:id},children[0])
				}
			})
		})//.then(tree=>{console.dir(tree);return tree})
	}
}

