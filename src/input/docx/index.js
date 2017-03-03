import React, {Component, PropTypes} from "react"
import docx4js from "docx4js"
import Base from "../base"
import uuid from "../../tools/uuid"

export default class extends Base{
	static support({type}){
		return type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	}

	create(){
		return docx4js.create()
	}
	
	load(data, domain){
		return docx4js.load(data).then(docx=>{
			return docx.render((type,props,children)=>{
				let id=uuid()
				switch(type){
				case "document":
					return React.createElement(domain.Document,{...props,key:id},children)
				break
				case "section":
					return React.createElement(domain.Section,{...props,key:id},children)
				break
				
				case "p":
					return React.createElement(domain.Paragraph,{...props,key:id},children)
				}
			})
		})
	}
}
