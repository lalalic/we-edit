import React from "react"
import ReactDOM from "react-dom"
import {Input,Editor,Representation} from "we-edit"
import iDocx from "we-edit-input-docx"
import "we-edit-representation-pagination"
import "fetch-any"

window.addEventListener("load",function(){
	iDocx.install()
	const container=document.createElement("div")
	document.body.appendChild(container)
	
	fetch("chinese.docx").then(res=>res.blob()).then(data=>{
		const docx={data,name:"basic.docx"}
		Input
			.parse(docx)
			.then(doc=>{
				const representation=React.createElement(Representation,{type:"pagination", fonts:"http://localhost:9091/fonts"})
				const editor=React.createElement(Editor,{representation})
				const store=React.createElement(doc.Store,{},editor)
				ReactDOM.render(store,container)
			})
	})
})