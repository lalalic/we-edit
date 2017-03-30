import React, {Component, PropTypes} from "react"
import docx4js from "docx4js"
import Base from "../base"
import uuid from "tools/uuid"

import Styles from "./styles"

import {getFile, getSelection} from "state/selector"

import Transformers from "./model"

export default class extends Base{
	static support({type}){
		return type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	}

	create(){
		return docx4js.create()
	}

	_loadFile(file){
		return docx4js.load(file)
	}

	_render(docx,domain,createElement, cloneElement){
		const styles=new Styles(docx)
		const $=docx.officeDocument.content

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
				return createElement(
					domain.Document,
					{styles, ...styles.select(node.children.filter(a=>a.name!="w:body"))},
					children,
					node
				)
			case "section":
				return createElement(domain.Section,styles.select(node.children),children,node)
			case "tbl":{
				let cols=styles.select([node.children.find(a=>a.name=="w:tblGrid")]).tblGrid
				let width=cols.reduce((w,a)=>w+a,0)
				let [direct,style]=styles.tbl(props.pr)

				children=children.map((row,i)=>{
					let children=row.children.map((cell,j)=>{
						let cellStyle=style.merge(cell.props,i,j)

						return cloneElement(cell,{...cellStyle,cnfStyle:undefined})
					})
					return cloneElement(row,{children})
				})

				return createElement(domain.Table,{cols,width,...direct},children,node)
			}
			case "tr":{//direct style only
				if(props.pr){
					let style=styles.tr(props.pr)
					const {cnfStyle,...others}=style

					if(style.cnfStyle)
						children=children.map(a=>cloneElement(a,{cnfStyle: style.cnfStyle | a.props.cnfStyle}))
					return createElement(domain.Row,others,children,node)
				}
				return createElement(domain.Row,{},children,node)
			}
			case "tc":{//direct style only
				let style=styles.tc(props.pr)||{}
				return createElement(domain.Cell,style,children,node)
			}
			case "list":{
				let style=styles.list(props.pr)||{}
				return createElement(domain.List,style,children,node)
			}
			case "heading":
			case "p":{
				let style=styles.p(props.pr), rStyle
				if(children.length==0){
					let r=$("<w:r><w:t> </w:t></w:r>").appendTo(node).get(0)
					let t=r.children[0]
					if(props.pr){
						let rPr=props.pr.children.find(a=>a.name=="w:rPr")
						if(rPr){
							$(rPr).clone().prependTo(r)
							rStyle=styles.r(rPr.get(0))
						}
					}
					children.push(createElement(domain.Text,{...rStyle, ...style.r}," ",t))
				}
				return createElement(domain.Paragraph,style,children,node)
			}
			case "r":{
				let style=styles.r(props.pr)
				return children.map(a=>{
					if(a.type==domain.Text)
						return cloneElement(a,style)
					return a
				})
			}
			case "t":
				return children[0] ? createElement(domain.Text,{},children[0],node) : null
			case "control.picture":
			case "inline.picture":{
				let style=styles.select($(node).find("wp\\:extent").toArray())
				return createElement(domain.Image,{...style.extent, src:props.url},null,node)
			}
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
		if(raw.attribs.id!=undefined)
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

	_onChange(state,action){
		const {type,payload}=action
		const doc=getFile(state)
		const {start:{id,at}, end}=getSelection(state)

		switch(type){
			case `text/insert`:{
				let target=doc.officeDocument.content(`#${id}`)
				let text=target.text()
				target.text(text.substring(0,at)+payload+text.substr(end.at))
				break
			}
			case `text/remove`:{
				let target=doc.officeDocument.content(`#${id}`)
				let text=target.text(), n=payload
				target.text(text.substring(0,at-n)+text.substr(end.at))
				break
			}
			case `style/UPDATE`:{

			}
		}
	}

	_transform(Models){
		return Object.keys(Transformers).reduce((transformed,k)=>{
			transformed[k]=Transformers[k](Models)
			return transformed
		},{...Models})
	}
}
