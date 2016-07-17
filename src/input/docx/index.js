import docx4js from "docx4js"
import Base from "../base"
import React, {Component} from "react"
import {PassThrough} from "stream"

export default class Docx extends Base{
	static support(file){
		return true
	}

	load(data){
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
		})
	}

	load2(data, domain){
		return docx4js.load(data).then(docx=>{

			function createComponent(type){
				let [,name]=type.split(':')
				if(name='section')
					return domain.Section
				else if(name=='p')
					return domain.Paragraph
				else if(name=='r')
					return domain.Inline
				else if(name=='t')
					return domain.Text
				else if(name=='tbl')
					return domain.Table
				else if(name=='tr')
					return domain.Row
				else if(name=='tc')
					return domain.Cell
				else if(name.substr(-2)=='Pr'){
					return class extends Component{
						static displayName=type
						render(){
							return null
						}

					}
				}

				return class extends domain['*']{
					static displayName=type
				}
			}

			return new Promise((resolve, reject)=>{
				let doc=null
				let current=null, section=null, sections=[]
				let data=docx.parts[docx.rels.officeDocument]
				let stream=new PassThrough()
				stream.end(new Buffer(data.asUint8Array()))
				stream.pipe(require("sax").createStream(true,{xmlns:false})
					.on("error", e=>{
						console.error(e)
					}).on("opentag", node=>{
						switch(node.name){
						case 'w:body':
							doc.attributes.body=node.attributes
						break
						case 'w:document':
							doc=node
						break
						default:
							if(!current){
								if(section){
									sections.pop()
									sections.push(React.createElement(createComponent(section.name), section.attributes, section.children))
								}
								section=current={name:'w:section', children:[], attributes:{}}
								sections.push(section)
							}

							current.children.push(node)
							node.parent=current
							current=node
							node.children=[]
						}
					}).on("closetag",tag=>{
						switch(tag){
							case 'w:body':
							break
							case 'w:document':
								sections.pop()
								sections.push(React.createElement(createComponent(section.name), section.attributes, section.children))
								current=React.createElement(createComponent(doc.name), doc.attributes, sections)
							break
							case 'w:t':
								current.children=current.children.join('')
							default:
								const {attributes, parent, children, local,name}=current
								let index=parent.children.indexOf(current)
								attributes.key=index

								let element=React.createElement(createComponent(name), attributes, children)
								parent.children.splice(index,1,element)
								current=parent

								if(name=='w:sectPr')
									section.attributes.pr=element

								if(current==section && section.attributes.pr)
									current=null
							break
						}
					}).on("end", a=>{
						resolve({
							createReactElement(){
								return React.createElement(class Docx extends Component{
									render(){
										return <div>{this.props.children}</div>
									}
								}, null, current)
							}
						})
					}).on("text", text=>{
						current && current.children.push(text)
					})
				)
			})
		})
	}
}

import Document from "./document"
import Section from "./section"
import Image from "./image"
import Text from "./text"
import Table from "./table"

export let Models={
	Document
	,Section
	,Image
	,Text
	,Table
}
