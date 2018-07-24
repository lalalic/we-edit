import React,  {PureComponent} from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps} from "recompose"

import {ToolbarGroup} from "material-ui"
import IconPicture from "material-ui/svg-icons/editor/insert-photo"
import IconOnlinePicture from "material-ui/svg-icons/editor/insert-chart"
import IconShape from "material-ui/svg-icons/editor/insert-chart"
import SizeIconButton from "../components/size-icon-button"
import selectFile from "../components/file-select"

import {ACTION} from "we-edit"

export {default as Ribbon} from "./ribbon"

export const Tools=compose(
	getContext({
		//selection: PropTypes.object,
		store: PropTypes.object
	}),
	mapProps(({children, selectRemote,store})=>({
		children,
		insert(url){
			fetch(url)
				.then(res=>{
					if(!res.ok){
						throw new Error(res.statusText)
					}
					return res.arrayBuffer()
				})
				.then(data=>{
					data=new Uint8Array(data)
					data.crc32=url
					store.dispatch(ACTION.Entity.CREATE({type:"image",data}))
				})
		},
		selectRemote(){
			return selectFile("image/*")
		},
		createSection(){
			store.dispatch(ACTION.Entity.CREATE({type:"section"}))
		},
	})),
)(({children, insert,selectRemote, createSection})=>{
	return (
		<ToolbarGroup>
			<SizeIconButton 
				onClick={e=>selectFile("image/*").then(insert)}>
				<IconPicture/>
			</SizeIconButton>
			
			
			<SizeIconButton
				onClick={e=>selectRemote().then(insert)}
				>
				<IconOnlinePicture/>
			</SizeIconButton>
			
			<SizeIconButton
				onClick={e=>createSection()}
				>
				<IconOnlinePicture/>
			</SizeIconButton>

			{children}
		</ToolbarGroup>
	)
})



