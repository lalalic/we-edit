import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, mapProps,getContext,setDisplayName} from "recompose"

import Input from "we-edit/input"

import {ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui"
import CheckIconButton from "we-edit-ui/components/check-icon-button"


import IconSave from "material-ui/svg-icons/content/save"
import IconSaveAs from "material-ui/svg-icons/content/save"
import IconClose from "material-ui/svg-icons/navigation/close"

import {ACTION, getActive} from "we-edit"

export class File extends PureComponent{
	changed=false
	componentWillReceiveProps({content}){
		this.changed=this.props.content!=content
	}
	
	render(){
		const {save,saveAs}=this.props
		return (
			<ToolbarGroup>
				<CheckIconButton
					status={this.changed ? "uncheck" : "disabled"}
					onClick={save}>
					<IconSave/>
				</CheckIconButton>
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
	getContext({
		doc: PropTypes.object,
	}),
	mapProps(({doc})=>({
		save(){
			return doc.save()
		},

		saveAs(path){
			return doc.save(path)
		}
	})),
	connect(state=>({content:state.get('content')})),
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
