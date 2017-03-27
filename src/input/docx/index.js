import React, {Component, PropTypes} from "react"
import docx4js from "docx4js"
import Base from "../base"
import uuid from "tools/uuid"

import Styles from "./styles"

import {getFile, getSelection} from "state/selector"

export default class extends Base{
	static support({type}){
		return type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	}

	create(){
		return docx4js.create()
	}

	load1(data, domain){
		return docx4js.load(data).then(docx=>{
			const selector=new Selector(docx)

			return docx.render((type,props,children)=>{
				let node=props.node
				let id=node.attribs['id']||uuid()
				let keyProps={id, key:id}
				children=children.reduce((merged,a)=>{
					if(Array.isArray(a))
						merged.splice(merged.length-1, ...a)
					else
						merged.push(a)
					return merged
				},[])
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
				case "list":
				case "heading":
				case "p":
					return React.createElement(domain.Paragraph,{...selector.paragraph(props),...keyProps},children||[])
				case "r":
					if(children.length)
						return React.createElement(domain.Inline,{...selector.inline(props),...keyProps},children)
					else
						return null
				case "t":
					return React.createElement(domain.Text,keyProps,children[0])
				case "control.picture":
				case "inline.picture":
					return React.createElement(domain.Image,{...selector.image(props),...keyProps, src:props.url})
				case "bookmarkStart":
				case "bookmarkEnd":
					return null
				default:
					if(children.length==0)
						return children[0]
					return children
				}
			})
		})//.then(tree=>{console.dir(tree);return tree})
	}


	_loadFile(file){
		return docx4js.load(file)
	}

	_render(docx,domain,createElement, cloneElement){
		const styles=new Styles(docx)
		
		return docx.render((type,props,children)=>{
			let node=props.node
			children=children.reduce((merged,a)=>{
				if(Array.isArray(a))
					merged.splice(merged.length,0, ...a)
				else
					merged.push(a)
				return merged
			},[])
			switch(type){
			case "document":
				return createElement(domain.Document,{styles},children, node)
			case "section":
				return createElement(domain.Section,{},children,node)
			case "p":{
				let style=styles.pStyle(props.pr)
				return createElement(domain.Paragraph,style,children||[],node)
			}
			case "r":{
				let style=styles.rStyle(props.pr)
				return children.map(a=>cloneElement(a,style))	
			}
			case "t":
				return children[0] ? createElement(domain.Text,{},children[0],node) : null
			case "bookmarkStart":
			case "bookmarkEnd":
				return null
			default:
				if(children.length==1)
					return children[0]
				return children
			}
		})
	}

	_identify(raw){
		if(raw.atrribs.id!=undefined)
			return raw.atrribs.id
		
		let id=uuid()+""
		Object.defineProperty(raw.attribs,"id",{
			enumerable: false,
			configurable: false,
			writable: false,
			value: id
		})
		return id
	}

	_onChange(state,action,createElement, cloneElement){
		const {type,payload}=action
		const doc=getFile(state)
		const {start:{id,at}, end}=getSelection(state)
		
		switch(type){
			case `selection/INSERT`:{
				let target=doc.officeDocument.content(`#${id}`)
				let text=target.children
				target.children=text.substring(0,at)+payload+text.substr(end.at)
				
				break
			}
			case `selection/REMOVE`:{
				let target=doc.officeDocument.content(`#${id}`)
				let text=target.children, n=payload
				target.children=text.substring(0,at-n)+text.substr(end.at)
				break
			}
			case `style/UPDATE`:{
				
			}
		}
	}
	
	_transform(Models){
		return Models
	}
}

function resolveStyle(Wrapped){
	return class extends Component{
		
		render(){
			let {namedStyle}=this.props
			return <Wrapped/>
		}
	}
}
