import {edit,preview,compose} from "./src"

Object.assign(window, {edit,preview,compose})

fetch("basic.docx").then(res=>res.blob()).then(docx=>{
	docx.name="basic.docx"
	let app=document.querySelector('#app')
	edit(docx,app).then(a=>window.doc=a)
})
