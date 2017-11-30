import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import Input from "we-edit/input"

import {ToolbarGroup, ToolbarSeparator, ToolbarTitle,IconButton, } from "material-ui"

import IconOpen from "material-ui/svg-icons/file/folder-open"
import IconCreate from "material-ui/svg-icons/content/create"
import IconSave from "material-ui/svg-icons/content/save"

import {ACTION} from "we-edit-ui"

export class File extends Component{
	render(){
		const {create,open,save}=this.props
		return (
			<ToolbarGroup>
				<IconButton onClick={create}><IconCreate/></IconButton>
				<IconButton onClick={open}><IconOpen/></IconButton>
				<IconButton onClick={save}><IconSave/></IconButton>
			</ToolbarGroup>
		)
	}
}

export default connect(state=>({}),(dispatch,{})=>({
		create(){

		},

		open(){
			return selectFile()
				.then(files=>files.map(file=>Input.load(file).then(doc=>dispatch(ACTION.ADD(doc)))))
		},

		save(){
			return dispatch(ACTION.SAVE())
		}
}))(File)

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
			resolve(Array.from(this.files))
		}
		input.click()
	})
}
