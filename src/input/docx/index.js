import docx4js from "docx4js"
import Base from "../base"
import React from "react"


export default class Docx extends Base{
	static support(file){
		return true
	}

	load1(data, domain){
		return docx4js.load(data).then(docx=>{
			let doc
			return docx.parse(docx4js.createVisitorFactory((wordModel, targetParent)=>{
				if(wordModel.type && wordModel.type.substr(0,6)=='style.'){
					return targetParent.addStyle(wordModel,doc)
				}else if(targetParent)
					return targetParent.appendChild(wordModel,doc)
				else
					return doc=new Document(wordModel)
			}))
		}).then(doc=>{
			console.log(doc.toTag())
			return doc.createReactElement(domain)
		})
	}
	
	load(data, domain){
		return (class extends docx4js{
			onCreateElement(node, type){
				let {attributes, children}=node
				let Content=null
				switch(type){
				case 'docx':
					Content=domain.Any
				break	
				case 'document':
					Content=domain.Document
				break
				case 'section':
					Content=domain.Section
				break
				case 'p':
					Content=domain.Paragraph
				break
				case "r":
					Content=class extends domain.Inline{
						get defaultStyle(){
							return this.context.getDefaultStyle('character')
						}
					}
				break
				case "t":
					Content=class extends domain.Text{
						
					}
				break
				case "tbl":
					Content=domain.Table
				break
				case "tr":
					Content=domain.Row
				break
				case 'tc':
					Content=domain.Cell
				break
				case 'list':
					Content=domain.Cell
				break
				}
				
				if(Content){
					return React.createElement(Content, attributes, children)
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

import Document from "./document"
import Section from "./section"
import Image from "./image"
import Text from "./text"
import Table from "./table"
import List from "./list"

export let Models={
	Document
	,Section
	,Image
	,Text
	,Table
	,List
}
