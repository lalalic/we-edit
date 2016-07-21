import docx4js from "docx4js"
import Base from "../base"
import React from "react"


export default class Docx extends Base{
	static support(file){
		return true
	}

	load1(data){
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
		}).then(a=>{
			console.log(a.toTag())
			return a
		})
	}
	
	load(data, domain){
		return (class extends docx4js{
			onCreateElement(node, type){
				let Content=domain.Any
				switch(type){
				case 'document':
					Content=domain.Document
				case 'section':
					Content=domain.Section
				break
				case "r":
					Content=domain.Inline
				break
				case "t":
					Content=domain.Text
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
				}
				
				const {attributes, children}=node
				return React.createElement(Content, attributes, children)
			}
		
		}).load(data).then(docx=>{
			return docx.parse().then(docx=>{
				return {
					createReactElement(){
						console.log(docx)
						return docx.children[0]
					}
				}
			})
		})
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
