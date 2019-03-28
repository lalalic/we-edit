import html from "we-edit-representation-html"
import pagination from "we-edit-representation-pagination"
import text from "we-edit-representation-text"

import iDocx from "we-edit-input-docx"
import iJson from "we-edit-input-json"
import ioFile from "we-edit-loader-stream-file"
import ioBrowser from "we-edit-loader-stream-browser"
import SVG from "we-edit-output-svg"
import PDF from "we-edit-output-pdf"

import Variant, {Provider} from "we-edit-variant"


iDocx.install({
	template:"/templates/normal.docx"
})
iJson.install()
ioFile.install()
ioBrowser.install()
SVG.install()
PDF.install()

Variant.install()


import React,{PureComponent,Fragment} from "react"
import PropTypes from "prop-types"
import {Editor, Viewer,DocumentTree, models} from  "we-edit"
import {Office,Workspace, Ribbon} from "we-edit-office"
import {Tabs, Tab, ToolbarGroup, SvgIcon} from "material-ui"
import {connect} from  "react-redux"
import minimatch from "minimatch"

function testOffice(representation="pagination"){
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
					{name:key, value},
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
		var editor=<Editor {...props}/>

		if(data && assemble){
			return (
				<Provider value={data}>
					{editor}
				</Provider>
			)
		}

		return editor
	})

	const Pilcrow=connect(state=>state[KEY])(({dispatch,pilcrow})=>(
		<Ribbon.Components.CheckIconButton
			onClick={e=>dispatch({type:`${KEY}/pilcrow`})}
			status={pilcrow ? "checked" : "unchecked"}
			children={
				<SvgIcon>
					<g transform="translate(0 4)">
						<path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4z"/>
					</g>
				</SvgIcon>
			}
			/>
	))

	const myWorksapce=(
		<Workspace
			debug={true}
			accept="*"
			key={KEY}
			ruler={false}
			toolBar={
				<Ribbon.Ribbon commands={{
						layout:false,
						home:{
							more:(<ToolbarGroup><Pilcrow/></ToolbarGroup>)
						}
				}}/>
			}
			reducer={(state={assemble:false, data:null, pilcrow:false},{type,payload})=>{
				switch(type){
					case `${KEY}/data`:
						return {...state,  data:payload}
					case `${KEY}/assemble`:
						return {...state, assemble:!state.assemble}
					case `${KEY}/pilcrow`:
						return {...state, pilcrow:!state.pilcrow}
				}
				return state
			}}
			>
			<Workspace.Desk
				layout={
					<Workspace.Layout
						right={
							<div style={{width:210}}>
								<Tabs>
									<Tab label="Document">
										<DocumentTree
											filter={({type})=>type!="styles"}
											toNodeProps={({id,type,props})=>({name:`${type}(${id})`})}
											/>
									</Tab>
									<Tab label="Assemble">
										<FileSelector />
									</Tab>
								</Tabs>
							</div>
						}
						/>
				}
				children={<VariantEditor representation={representation}/>}
				/>
		</Workspace>
	)

	Office.install(myWorksapce)
}


testOffice("text")
