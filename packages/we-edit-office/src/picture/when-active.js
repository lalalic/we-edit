import React from "react"
import {dom,ACTION} from "we-edit"
import WhenActive from "../components/when-active"
import SelectStyle from "../components/select-style"
import PropTypesUI from "../components/prop-types-ui"
export default Object.assign(({children})=>{
	return (
		<WhenActive label="Picture Format">
            <SelectStyle getStyle={selection=>{
				const image=selection.props('image',false)
				const shape=selection.props('shape',false)
				return {image,shape}
			}}>
				{({style,dispatch})=>{
					if(style.image){
						return <PropTypesUI propTypes={dom.Image.propTypes} props={style.image} theme="Image" 
							onChange={change=>dispatch(ACTION.Entity.UPDATE({image:change}))}
						/>
					}else if(style.shape){
						return <PropTypesUI propTypes={dom.Shape.propTypes} props={style.shape} theme="ShapeImage" 
							onChange={change=>dispatch(ACTION.Entity.UPDATE({shape:change}))}
						/>
					}
					return null
				}}
			</SelectStyle>
			<SelectStyle type="anchor">
			{({style,dispatch})=>{
				return <PropTypesUI propTypes={dom.Anchor.propTypes} props={style} theme="Anchor" 
					onChange={change=>{
						if(style){
							dispatch(ACTION.Entity.UPDATE({anchor:change}))
						}else{
							dispatch(ACTION.Entity.CREATE({anchor:change}))
						}
					}}
				/>
			}}
			</SelectStyle>
			{children}
		</WhenActive>
	)
},{
	defaultProps:{
		active:selection=>{
			return !!(selection.props("image",false)||selection.props("shape",false)?.fill?.picture)
		}
	}
})