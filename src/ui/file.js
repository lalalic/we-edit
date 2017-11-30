import React, {Component} from "react"
import PropTypes from "prop-types"

import {ToolbarGroup, ToolbarSeparator, ToolbarTitle,IconButton, } from "material-ui"

import IconOpen from "material-ui/svg-icons/file/folder-open"
import IconCreate from "material-ui/svg-icons/content/create"
import IconSave from "material-ui/svg-icons/content/save"

import {ACTION} from "."

export class File extends Component{
	render(){
		return (
			<ToolbarGroup>	
				<IconButton onClick={()=>this.create()}><IconCreate/></IconButton>
				<IconButton onClick={()=>this.open()}><IconOpen/></IconButton>
				<IconButton onClick={()=>this.save()}><IconSave/></IconButton>
			</ToolbarGroup>
		)
	}
	
	create(){
		
	}
	
	open(){
		return selectFile()
			.then(files=>files.map(file=>Input.load(file)))
			.then(docs=>docs.map(doc=>this.context.store.dispatch(ACTION.ADD(doc))))
	}
	
	save(){
		return this.context.store.dispatch(ACTION.SAVE())
	}
}

var input=null
export function selectFile(){
	if(input==null){
        input=document.createElement('input')
        input.type="file"
        input.style.position='fixed'
		input.style.left='-9999px'
        document.body.appendChild(input)
    }	
	return new Promise((resolve, reject)=>{
		input.onchange=function(){
			resolve(this.files)
		}
		input.click()
	})
}