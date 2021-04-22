import React from "react"
import {Input} from "we-edit"
import EventHandler from "../../event"
import Dom from "../../render"


export default class JSXDocument extends Input.Editable{
	static Reducer=EventHandler
	static HOCs=Dom
	
    static support(file){
		if(!file)//for installer
			return true

		const {data, name, ext, type}=file
		if(ext && ext==".wejsx")
			return true

		if(name && name.endsWith(".wejsx"))
			return true

		if(type && type=="document")
			return true
		return false
	}

	static defaultProps={
		type:"wejsx",
		ext:"jsx",
		name:"We-Edit jsx document",
		mimeType:"application/wejsx"
    }

	parse({data,...props}){
		this.props={...props,supportPagination:true}
		if(React.isValidElement(data)){
			return Promise.resolve(data)
		}
		
		data=data instanceof Blob ? data.text() : Buffer.from(data).toString()
		return Promise.all([
				data,
				import(
					/* webpackChunkName: "plugin-compiler" */
					"./transform"
				),
			])
			.then(([raw, {transform}])=>{
				const {code}=transform(raw)
				const i=code.indexOf("React.createElement")
				const compiled=new Function("React",code.substring(0,i)+";return "+code.substring(i))
				const doc=compiled(React)
				return doc
			})
	}

    render(createElement, Types){
        this.renderNode=(node,createElement)=>{
			if(node.isQuery){
				return {id:node.attr('id'),...node.toJS()}
			}
			if(!node || !React.isValidElement(node))
				return node
			const {props:{children=[], ...props},type}=node
			return createElement(
				Types[type]||{displayName:type}, 
				props,
				type=="text" ? children||"" : React.Children.map(children,a=>this.renderNode(a,createElement)),
				node
			)
		}

		return this.renderNode(this.doc, createElement)
    }

	makeId(node){
		if(node?.type=="document")
			return "root"
		if(node?.isQuery)
			return node.attr('id')
		return super.makeId(...arguments)
	}
}