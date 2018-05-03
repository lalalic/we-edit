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

(function(me){
    if(!me)
        return
	me.addEventListener("load", ()=>{
		let container=document.querySelector('#OfficeContainer')
		if(container)
			create(container)
	})
})(window);
