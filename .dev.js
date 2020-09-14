import Pagination,{FontManager, TestEmulator} from "we-edit-representation-pagination"
import Html from "we-edit-representation-html"
import Text from "we-edit-representation-text"
import Plain from "we-edit-representation-plain"

import iDocx from "we-edit-input-docx"
import iJson from "we-edit-input-json"
import ioFile from "we-edit-loader-stream-file"
import ioBrowser from "we-edit-loader-stream-browser"

import Variant, {Provider} from "we-edit-variant"

import React,{Fragment} from "react"
import {Viewer, Editor,Input, DocumentTree, ACTION, Test} from  "we-edit"
import {Office,Workspace, Ribbon,reducer} from "we-edit-office"
import {Tabs, Tab, ToolbarGroup, SvgIcon} from "material-ui"
import {connect} from  "react-redux"
import minimatch from "minimatch"
import { Toolbar } from "./packages/we-edit-office/src/ribbon"


iDocx.install({
	template:"/templates/normal.docx"
})
iJson.install()
ioFile.install()
ioBrowser.install()

Variant.install()
FontManager.asService("/font-service.js")



function testOffice(Target, representation="pagination"){
	const KEY="test"

	const Tree=({data, filter="*", node})=>{
		filter=(filter=>{
			if(typeof(filter)=="string"){
				let glob=filter
				filter=key=>minimatch(`${key}`,glob)
			}

			if(typeof(filter)=="function")
				return filter

			return a=>!!filter
		})(filter);

		const toArray=a=>Object.keys(a).map(k=>[k,a[k]])
		const createElement=(value,key)=>{
			let children=typeof(value)=="object"&&value ? (Array.isArray(value) ? value.map((v,i)=>[i,v]) : toArray(value)) : null

			if(key=="root" || filter(key,value)){
				return React.cloneElement(
					node,
					{name:key, value, key},
					Array.isArray(children) ? create4Children(children) : children
				)
			}else{
				return Array.isArray(children) ? create4Children(children) : null
			}
		}

		const create4Children=children=>{
				children=children
					.map(([key,value])=>createElement(value,key))
					.filter(a=>!!a && (Array.isArray(a) ? a.length>0 : true))
					.reduce((all,a)=>{
						if(Array.isArray(a)){
							all.splice(all.length,0,...a)
						}else{
							all.splice(all.length,0,a)
						}
						return all
					},[])
				return children.length==0 ? null : children
		}

		return createElement(data,"root")
	}

	const Node=({name,value, children})=>{
		if(!name)
			return null
		if(children){
			children=<div style={{marginLeft:10}}>{children}</div>
		}
		return (
			<Fragment>
				<div>{name}</div>
				{children}
			</Fragment>
		)

	}

	const FileSelector=connect(state=>state[KEY])(({dispatch,assemble,data, pilcrow, ...props})=>(
		<div>
			<center>
				<input {...props} type="file" accept=".json" onChange={({target})=>{
					let file=target.files[0]
					if(!file)
						return
					let reader=new FileReader()
					reader.onload=e=>{
						dispatch({type:`${KEY}/data`, payload:eval(`(a=>a)(${e.target.result})`)})
					}
					reader.readAsText(file)
					target.value=""
				}}/>
			</center>
			<div>
				<input type="checkbox" checked={assemble} onChange={a=>dispatch({type:`${KEY}/assemble`})}/>
				<span style={{background:!!data ? "lightgreen" : ""}}>Assemble</span>
			</div>
			<div>
				<Tree {...{data, node:<Node/>}}/>
			</div>
		</div>
	))

	const VariantEditor=connect(state=>state[KEY])(({data,assemble, pilcrow, ...props})=>{
		var editor=<Target {...props}/>

		if(data && assemble){
			return (
				<Provider value={data}>
					{editor}
				</Provider>
			)
		}

		return editor
	})

	const myWorkspace=(
		<Workspace
			debug={true}
			accept="*.docx"
			key={KEY}
			ruler={false}
			toolBar={
				<Ribbon.Ribbon commands={{layout:true,}}>
				</Ribbon.Ribbon>
			}
			reducer={(state={assemble:false, data:null, pilcrow:false},{type,payload})=>{
				switch(type){
					case `${KEY}/data`:
						return {...state,  data:payload}
					case `${KEY}/assemble`:
						return {...state, assemble:!state.assemble}
				}
				return state
			}}
			>
				
			<Workspace.Desk
				layout={
					<Workspace.Layout right={<Workspace.PanelContainer name="right" style={{width:300}}/>}
						/>
				}
			>
				<VariantEditor representation={representation/*<Pagination fonts="/fonts"/>*/}
					onContextMenu={e=>console.log("context menu")}
					onKeyDown={e=>{
						console.log("key down")
						return false
					}}
					/>
			</Workspace.Desk>
		</Workspace>
	)

	Office.install(myWorkspace,dispatch=>{
		fetch("/basic.docx")
			.then(res=>res.blob())
			.then(data=>{
				const file={data,name:"basic.docx",ext:"docx", src:"/basic.docx"}
				return Input.parse(file)
			})
			.then(doc=>dispatch(ACTION.ADD(doc,reducer)))
	})
}


testOffice(Editor,"pagination")
