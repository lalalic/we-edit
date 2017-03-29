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
			case "p":{
				let style=styles.p(props.pr)
				return createElement(domain.Paragraph,style,children||[],node)
			}
			case "r":{
				let style=styles.r(props.pr)
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
		class Cell extends Component{
			static displayName="docx-cell"
			static childContextTypes={
				p: PropTypes.object,
				r: PropTypes.object
			}

			getChildContext(){
				const {p,r}=this.props
				return {p,r}
			}

			render(){
				const {p,r,...others}=this.props
				return <Models.Cell {...others}/>
			}
		}
		class Paragraph extends Component{
			static displayName="docx-paragraph"
			static contextTypes={
				p: PropTypes.object,
				r: PropTypes.object,
			}

			static childContextTypes={
				r: PropTypes.object
			}

			constructor(){
				super(...arguments)
				this.componentWillReceiveProps(this.props,this.context)
			}

			getChildContext(){
				return {
					r: {...this.context.r,...this.props.r}
				}
			}

			componentWillReceiveProps(next,context){
				this.style={...context.p,...next}
			}

			render(){
				return <Models.Paragraph {...this.style}/>
			}
		}

		class Text extends Component{
			static displayName="docx-text"
			static contextTypes={
				r: PropTypes.object
			}
			constructor(){
				super(...arguments)
				this.componentWillReceiveProps(this.props,this.context)
			}

			componentWillReceiveProps(next,context){
				this.style={...context.r,...next}
			}

			render(){
				return <Models.Text {...this.style}/>
			}
		}
		return {...Models, Cell, Paragraph, Text}
	}
}
