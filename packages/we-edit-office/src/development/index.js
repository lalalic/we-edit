import React, {Component,Fragment} from "react"
import {connect} from "react-redux"
import {Toggle,TextField} from "material-ui"

import {compose, setDisplayName} from "recompose"

export const Development=compose(
	setDisplayName("Development"),
	connect(state=>({...state.office}),(dispatch,{dev})=>({
		toggle(){
			dispatch({type:"DEV",payload:!dev})
		},
		setMain(changed){
			dispatch({type:"Dev.Main",payload:changed})
		}
	}))
)(class extends Component{
	render(){
		const {dev, main, toggle, setMain}=this.props
		return (
			<Fragment>
				<div>
					<Toggle label="Development Mode" 
						defaultValue={dev} onToggle={toggle}/>
				</div>
				<div>
					<TextField floatingLabelText="main file path" 
						defaultValue={main} 
						disabled={!dev}
						onBlur={({target:{value}})=>{
							if(dev && value!=main){
								setMain(value)
							}
						}}
						/>
				</div>
			</Fragment>
		)
	}
})

export function reducer(state={dev:false, main:""},{type,payload}){
	switch(type){
		case "DEV":
			return {...state, dev:payload}
		case "Dev.Main":
			watchMain(payload)
			return {...state, main: payload}
	}
	return state
}

import * as weedit from "we-edit"
import * as react from "react"
import * as materialui from "material-ui"
import * as Pagination from "we-edit-representation-pagination"
import * as Html from "we-edit-representation-html"
import * as Text "we-edit-representation-text"

function watchMain(path){
	path=path.replace(/\\/g, "/")
	const fs=require("fs")
	const Path=require('path')
	const apply=()=>{
		try{
			const module={exports:{}}
			const content=fs.readFileSync(path, 'utf8')
			require("vm").runInNewContext(content||"",{
				require(a){
					switch(a){
					case "we-edit":
						return weedit
					case "react":
						return react
					case "material-ui":
						return materialui
					case "we-edit-representation-html":
						return Html
					case "we-edit-representation-pagination":
						return Pagination
					case "we-edit-representation-text":
						return Text
					default:
						return require(a)
					}
				},
				exports:module.exports,
				module,
				__dirname: Path.resolve(Path.dirname(path)),
				__filename: Path.basename(path),
				root: null
			})
		}catch(e){
			console.error(e)
		}
	}
	
	apply()
	
	fs.watchFile(path,function(){
		apply()
	})
}