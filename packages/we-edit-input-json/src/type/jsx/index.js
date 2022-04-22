import React from "react"
import {Input} from "we-edit"
import { transform } from "./transform"
import EventHandler from "../../event"
import Dom from "../../render"


export default class JSXDocument extends Input.Editable{
	static Reducer=EventHandler
	static HOCs=Dom
	
    static support(file){
		if(!file)//for installer
			return true

		return file.name?.toLowerCase().endsWith(".wed.jsx")
	}

	static defaultProps={
		type:"wejsx",
		ext:"jsx",
		name:"We-Edit jsx document",
		mimeType:"application/wejsx"
    }

	static Font_Props={
		...super.Font_Props,
		document:"defaultStyles.text.fonts"
	}

	parse({data,...props}){
		this.props={...props,supportPagination:true}
		if(React.isValidElement(data)){
			return Promise.resolve(data)
		}
		
		return Promise.resolve(this._loadString(data))
			.then(data=>{
				const {code}=transform(data)
				const i=code.indexOf("React.createElement")
				const compiled=new Function("React",code.substring(0,i)+";return "+code.substring(i))
				return compiled(React)
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