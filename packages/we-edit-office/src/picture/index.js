import React, {Fragment} from "react"
import {compose, mapProps} from "recompose"

import IconPicture from "material-ui/svg-icons/editor/insert-photo"

import SizeIconButton from "../components/size-icon-button"
import selectFile from "../components/file-select"

import {ACTION, connect} from "we-edit"

import FileType from "file-type/browser"

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
					FileType.fromBuffer(data)
					.then(mime=>{
						dispatch(ACTION.Entity.CREATE({type:"image",data, mime}))
					})
				})
		}
	})),
)(({children, insert})=>{
	return (
		<Fragment>
			<SizeIconButton label="picture"
				onClick={e=>selectFile("image/*").then(insert)}>
				<IconPicture/>
			</SizeIconButton>
			
			{children}
		</Fragment>
	)
})



