import docx4js from "docx4js"
import Base from "../base"
import React, {Component} from "react"
import {PassThrough} from "stream"

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
		})
	}
	
	load(data){
		return docx4js.load(data).then(docx=>{
			
			function createComponent(type){
				return class Content extends Component{
					static displayName=type
					render(){
						return <div>{this.props.children}</div>
					}
				}
			}
			
			
			let root={name:"docx",children:[]}
			let current=root
			return new Promise((resolve, reject)=>{
				let partName=docx.rels.officeDocument
				let data=docx.parts[partName]
				let stream=new PassThrough()
				stream.end(new Buffer(data.asUint8Array()))
				stream.pipe(require("sax").createStream(true,{xmlns:true})
					.on("error", e=>{
						console.error(e)
					}).on("opentag", node=>{
						current.children.push(node)
						node.parent=current
						current=node
						node.children=[]
						if(node.local=="document")
							node.attributes=null
					}).on("closetag",tag=>{
						const {attributes, parent, children, local,name}=current
						let element=React.createElement(createComponent(local||name), attributes, children)
						let index=parent.children.indexOf(current)
						parent.children.splice(index,1,element)
						current=parent
					}).on("end", a=>{
						resolve({
							createReactElement(){
								return React.createElement(createComponent("docx"), null, root.children)
							}
						})
					}).on("text", text=>{
						if(current!==root)
							current.children.push(text)
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
