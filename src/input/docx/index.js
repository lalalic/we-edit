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
			return doc.createReactElement(domain)
		})
	}

	load(data, domain){
		const {Text}=domain
		class Inline extends domain.Inline{
			get defaultStyle(){
				return this.context.getDefaultStyle('character')
			}
		}
		class Paragraph extends domain.Paragraph{
			emptyContent(){
				return [<Inline><Text> </Text></Inline>]
			}
		}

		return (class extends docx4js{
			onCreateElement(node, type){
				let {attributes, children}=node
				if(Array.isArray(children))
					children=children.filter(a=>a)
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
					Content=Paragraph
				break
				case "r":
					Content=Inline
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
