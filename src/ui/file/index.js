import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, mapProps,getContext,setDisplayName} from "recompose"

import Input from "we-edit/input"

import {ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui"
import {IconButton} from "we-edit-ui/components/with-no-doc"


import IconSave from "material-ui/svg-icons/content/save"
import IconSaveAs from "material-ui/svg-icons/content/save"
import IconClose from "material-ui/svg-icons/navigation/close"

import {ACTION} from "we-edit-ui"

export class File extends Component{
	render(){
		const {save,saveAs,changed,}=this.props
		return (
			<ToolbarGroup>
				<IconButton
					disabled={!changed}
					onClick={save}>
					<IconSave/>
				</IconButton>
			</ToolbarGroup>
		)
	}
}

export function create(dispatch){
	return (type=".docx")=>Input.create(type)
}

export function open(dispatch){
	return ()=>selectFile()
		.then(files=>files.map(file=>Input.load(file)
		.then(doc=>dispatch(ACTION.ADD(doc)))))
}

export default compose(
	setDisplayName("FileTool"),
	getContext({store:PropTypes.object}),
	mapProps(({store:{dispatch}})=>({
		save(){
			return dispatch(ACTION.SAVE())
		},

		saveAs(path){
			return dispatch(ACTION.SAVEAS(path))
		}
	})),
	connect(({changed,noDoc})=>({changed,noDoc})),
)(File)

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
			input.value=""
		}
		input.click()
	})
}
