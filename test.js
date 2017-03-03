import {preview} from "./src"

window.preview=preview
fetch("basic.docx").then(res=>res.blob()).then(docx=>{
	docx.name="basic.docx"
	let app=document.querySelector('#app')
	preview(docx,app)
})
