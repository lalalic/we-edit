import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, mapProps,getContext,setDisplayName} from "recompose"

import {ToolbarGroup} from "material-ui"
import CheckIconButton from "../components/check-icon-button"


import IconSave from "material-ui/svg-icons/content/save"
import IconSaveAs from "material-ui/svg-icons/content/save"
import IconClose from "material-ui/svg-icons/navigation/close"

import {Input,ACTION, Emitter, Stream, render} from "we-edit"
import OutputInput from "we-edit-output-input"

export class File extends PureComponent{
	render(){
		const {doc, dispatch, children}=this.props
		return (
			<ToolbarGroup>
				<CheckIconButton
					status={"checked"}
					onClick={()=>{
						save(dispatch,doc)({stream:{type:"browser", name:doc.name}})
					}}>
					<IconSave/>
				</CheckIconButton>
				{children}
			</ToolbarGroup>
		)
	}
}

export function create(dispatch){
	return (type=".docx")=>Input.create(type)
}

export function open(dispatch){
	return ()=>selectFile()
		.then(files=>files.map(file=>{
				Input.load(file)
					.then(doc=>dispatch(ACTION.ADD(doc)))
					.catch(e=>dispatch(ACTION.MESSAGE({type:"error", message:e.message})))
			})
		)
}

export const save=(dispatch,doc)=>({format, stream})=>{
	const supports=Emitter.supports
	let Format=!format||doc.type==format ? OutputInput : supports[format]
	return render(
		<doc.Store readonly={true} release={false}>
			<Emitter>
				<Stream {...stream}>
					<Format/>
				</Stream>
			</Emitter>
		</doc.Store>
	)
}

export default compose(
	setDisplayName("FileTool"),
	getContext({
		doc: PropTypes.object,
	}),
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
