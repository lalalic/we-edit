export {default as WeEditUI} from "./we-edit-ui"
export {default as Workspace} from "./workspace"
export {default as StatusBar} from "./status"
export {default as Canvas} from "./canvas"
export *  from "./ribbon"

export {default as DefaultOffice} from "./office"






import React from "react"
import ReactDOM from "react-dom"
import Office from "./office"

export function create(container, office=<Office/>){
	if(!container || container==document.body){
		container=document.createElement("div")
		document.body.style="margin:0px;padding:0px;border:0px"
		document.body.appendChild(container)
	}
	return ReactDOM.render(office, container)
}

(function(me){//magic
	me && me.addEventListener("load", ()=>{
		let container=document.querySelector('#OfficeContainer')
		if(container || document.title=="test"){
			create(container)
		}
	})
})(window);