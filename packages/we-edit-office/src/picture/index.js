import React, {Fragment} from "react"
import {compose, mapProps} from "recompose"
import {ACTION, connect} from "we-edit"

import IconPicture from "material-ui/svg-icons/editor/insert-photo"
import SizeIconButton from "../components/size-icon-button"
import selectFile from "../components/file-select"
import FileType from "file-type/browser"
import Active from "./when-active"

const Create=compose(
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


export default Object.assign(Create,{Active})