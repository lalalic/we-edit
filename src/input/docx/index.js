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
			case "control.picture":
			case "inline.picture":{
				let style=styles.select($(node).find("wp\\:extent").toArray())
				return createElement(domain.Image,{...style, src:props.url},null,node)
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

	_onChange(state,action,createElement, cloneElement){
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
		class Document extends Component{
			static displayName="docx-document"
			static childContextTypes={
				label: PropTypes.func
			}

			getChildContext(){
				let self=this
				return {
					label(id,level){
						return self.props.styles.listLabel(id,level)
					}
				}
			}

			render(){
				const {styles,...others}=this.props
				styles.resetNum()
				return <Models.Document {...others}/>
			}
		}

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

		class List extends Paragraph{
			static displayName="docx-list"
			static propTypes={
				numId: PropTypes.string,
				level: PropTypes.string,
				indentList: PropTypes.shape({
					left: PropTypes.number.isRequired,
					hanging: PropTypes.number.isRequired
				}).isRequired
			}

			static contextTypes={
				label: PropTypes.func
			}

			componentWillReceiveProps(next,context){
				super.componentWillReceiveProps(...arguments)
				this.label=this.context.label(next.numId,next.level)
				this.label={...this.label,...this.getChildContext().r}
				delete this.style.indentList
				if(this.style.indent){
					const {left=0,hanging=0}=this.style.indent
					this.style.indent.left=Math.max(left+hanging,this.props.indentList.left)
				}else {
					this.style.indent=this.props.indentList
				}
				this.style.labelWidth=Math.max(this.style.indent.hanging||0,this.props.indentList.hanging)
				delete this.style.indent.hanging
			}

			render(){
				return <Models.List {...this.style}
					label={<Models.Text {...this.label} id={`${this.props.numId}_${this.props.level}`}/>}/>
			}
		}

		return {...Models, Document, List, Cell, Paragraph, Text}
	}
}
