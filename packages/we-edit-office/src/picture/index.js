import React,  {PureComponent} from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps} from "recompose"

import {ToolbarGroup,ToolbarSeparator as ToolbarSeparator0,} from "material-ui"
import IconPicture from "material-ui/svg-icons/editor/insert-photo"
import IconOnlinePicture from "material-ui/svg-icons/image/photo-library"

import IconChart from "material-ui/svg-icons/editor/pie-chart"
import IconMap from "material-ui/svg-icons/maps/place"
import IconShape from "material-ui/svg-icons/editor/bubble-chart"
import IconEmot from "material-ui/svg-icons/editor/insert-emoticon"

import SizeIconButton from "../components/size-icon-button"
import selectFile from "../components/file-select"

import {ACTION} from "we-edit"
const ToolbarSeparator=props=><ToolbarSeparator0 style={{marginRight:2, marginLeft:2}} {...props}/>

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
		}
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

			<SizeIconButton>
				<IconMap/>
			</SizeIconButton>
			
			<SizeIconButton>
				<IconEmot/>
			</SizeIconButton>
			
			<ToolbarSeparator/>	
			
			<SizeIconButton>
				<IconChart/>
			</SizeIconButton>

			<SizeIconButton>
				<IconShape/>
			</SizeIconButton>
			
			{children}
		</ToolbarGroup>
	)
})



