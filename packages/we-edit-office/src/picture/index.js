import React from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps} from "recompose"

import {ToolbarGroup} from "material-ui"
import IconPicture from "material-ui/svg-icons/editor/insert-photo"

import SizeIconButton from "../components/size-icon-button"
import selectFile from "../components/file-select"

import {ACTION, connect} from "we-edit"

export {default as Ribbon} from "./ribbon"

export const Tools=compose(
	connect(),
	mapProps(({children,dispatch})=>({
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
					dispatch(ACTION.Entity.CREATE({type:"image",data}))
				})
		}
	})),
)(({children, insert})=>{
	return (
		<ToolbarGroup>
			<SizeIconButton 
				onClick={e=>selectFile("image/*").then(insert)}>
				<IconPicture/>
			</SizeIconButton>
			
			{children}
		</ToolbarGroup>
	)
})



