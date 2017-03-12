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
				let node=props.node
				let id=node.attribs['id']||uuid()
				let keyProps={id, key:id}
				console.log(type)
				switch(type){
				case "document":
					return React.createElement(domain.Document,
						{...selector.document(props),key:id,styles:getStyles(selector)},
						children
					)
				case "section":
					return React.createElement(domain.Section,{...selector.section(props),...keyProps},children)
				case "tbl":
					return React.createElement(domain.Table,{...selector.table(props),...keyProps},children)
				case "tr":
					return React.createElement(domain.Row,{...selector.row(props),...keyProps},children)
				case "tc":
					return React.createElement(domain.Cell,{...selector.cell(props),...keyProps},children)
				case "p":
					return React.createElement(domain.Paragraph,{...selector.paragraph(props),...keyProps},children||[])
				case "r":
					return React.createElement(domain.Inline,{...selector.inline(props),...keyProps},children)
				case "t":
					return React.createElement(domain.Text,keyProps,children[0])
				case "inline.picture":
					return React.createElement(domain.Image,{...selector.image(props),...keyProps, src:props.url})

				default:
					if(children.length==1)
						return children[0]
				}
			})
		})//.then(tree=>{console.dir(tree);return tree})
	}
}
