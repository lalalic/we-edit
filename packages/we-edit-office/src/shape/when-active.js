import React,{Fragment} from "react"
import {ACTION, whenSelectionChange, dom} from "we-edit"
import {compose, setDisplayName} from "recompose"

import selectFile from "../components/file-select"

import {MenuItem, Divider, SvgIcon, ToolbarSeparator} from "material-ui"

import Field from "../components/toolbar-field"
import UnitInput from "../components/unit-input"
import DropDownButton from "../components/drop-down-button"

import IconPosition from "material-ui/svg-icons/av/featured-video"
import IconRotate from "material-ui/svg-icons/device/screen-rotation"
import IconFormatShape from "material-ui/svg-icons/image/brush"

import IconFillShape from "material-ui/svg-icons/editor/format-color-fill"
import IconOutlineShape from "material-ui/svg-icons/editor/border-color"
import IconEffectShape from "material-ui/svg-icons/action/view-agenda"

import IconFit from "material-ui/svg-icons/action/aspect-ratio"
import IconAlign from "material-ui/svg-icons/action/swap-vert"
import IconArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import { IconWrap, } from "./icons";
import CheckIconButton from "../components/check-icon-button"
import Create from "./create"
import ColorButton from "../components/color-button"

export default compose(
	setDisplayName("Shape Ribbon"),
	whenSelectionChange(({selection})=>{
		const shape=selection?.props('shape')
		const anchor=selection?.props('anchor')
		const frame=selection?.props('frame')
		return {shape,anchor,frame}
	}),
)(({children, shape, anchor, frame, dispatch})=>{
	return (
		<Fragment>	
			<Create/>
			<DropDownButton label="edit shape" icon={<IconGeometry/>}>
				<MenuItem primaryText="Change shape"/>
				<MenuItem primaryText="Edit points"/>
			</DropDownButton>
			<ToolbarSeparator/>
			<Layout/>
			<ToolbarSeparator/>
			<Field label="Size>Width">
				<UnitInput style={{width:50}} value={shape?.geometry?.width}
					onChange={width=>dispatch(ACTION.Entity.UPDATE({shape:{width}}))}/>
			</Field>
			<Field label="Height">
				<UnitInput style={{width:50}} value={shape?.geometry?.height}
					onChange={height=>dispatch(ACTION.Entity.UPDATE({shape:{height}}))}/>		
			</Field>
			<ToolbarSeparator/>
			<ColorButton label="Fill" 
				value={dom.Shape.FillShape.normalize(shape?.fill)?.color||""} 
				onChange={color=>dispatch(ACTION.Entity.UPDATE({shape:{fill:{color}}}))}
				icon={<IconFillShape/>}>
				<Divider/>
				<MenuItem primaryText="Picture..." onClick={e=>{
					selectFile("image/*")
						.then(url=>dispatch(ACTION.Entity.UPDATE({shape:{fill:{picture:{url}}}})))
				}}/>
				<MenuItem primaryText="Gradient"/>
				<MenuItem primaryText="Texture"/>
			</ColorButton>
			<ColorButton label="Outline" 
				value={dom.Shape.LineShape.normalize(shape?.outline)?.color||"black"} 
				onChange={color=>dispatch(ACTION.Entity.UPDATE({shape:{outline:{color}}}))}
				icon={<IconOutlineShape/>}>
				<Divider/>
				<MenuItem primaryText="Weight" 
					rightIcon={<IconArrowDropRight/>} 
					menuItems={[
						...(["1/4","1/2","3/4","1","2","3","4"].map(a=>
						<MenuItem key={a} 
							onClick={e=>dispatch(ACTION.Entity.UPDATE({shape:{outline:{width:parseFloat(a)+'pt'}}}))}
							rightIconButton={<span style={{paddingRight:4}}>{a} pt</span>} 
							primaryText={<svg style={{height:24}} viewBox="0 0 48 24"><path {...{d:`M0 12 h48`,stroke:"black", strokeWidth:`${a}pt`}}/></svg>}/>))
						,
						<MenuItem primaryText="More Lines..."/>
					]}/>
				<MenuItem primaryText="Sketched"
					rightIcon={<IconArrowDropRight/>} 
					menuItems={[
						...(Sketcheds.map(a=>
							<MenuItem key={a} 
								rightIconButton={<svg>{a}</svg>}/>)),
						<MenuItem primaryText="More Lines..."/>
					]}/>
				<MenuItem primaryText="Dashes"
					rightIcon={<IconArrowDropRight/>} 
					menuItems={[
						...(Dashes.map(a=>
							<MenuItem key={a} 
								onClick={e=>dispatch(ACTION.Entity.UPDATE({shape:{outline:{dashArray:a}}}))}
								primaryText={<svg style={{height:24, width:48}} viewBox="0 0 48 24"><path {...{d:`M0 12 h48`,stroke:"black", strokeWidth:2, strokeDasharray:a}}/></svg>}
								/>)),
						<MenuItem primaryText="More Lines..."/>
					]}/>
			</ColorButton>
			{/*<DropDownButton label="Effect" icon={<IconEffectShape/>}/>*/}
			<ToolbarSeparator/>
			
			<DropDownButton label="Verital Align" 
				icon={<IconAlign/>}
				onMouseOver={e=>{
					e.currentTarget.click()
				}}
				>
				<MenuItem primaryText="Top"/>
				<MenuItem primaryText="Middle"/>
				<MenuItem primaryText="Bottom"/>
			</DropDownButton>

			<DropDownButton label="Auto Fit" icon={<IconFit/>}>
				<MenuItem primaryText="Not Fit"/>
				<Divider/>
				<MenuItem primaryText="Resize Shape" />
				<MenuItem primaryText="Resize Text"/>
				<Divider/>
				<MenuItem primaryText="Clip Shape" checked={true} onClick={e=>toggleClip()}/>
			</DropDownButton>

			{children}	
			<ToolbarSeparator/>
			<CheckIconButton label="Format Panel" icon={<IconFormatShape/>}/>
		</Fragment>
	)
})

export const Layout=compose(
	setDisplayName("Shape Layout"),
	whenSelectionChange(({selection})=>{
		return {selection}
	})
)(({selection, dispatch, open})=>(
	<Fragment>
		<DropDownButton label="Position" icon={<IconPosition/>}>
			<MenuItem primaryText="In Line With Text"/>
			<Divider/>
			<MenuItem primaryText="Top Left"/>
			<MenuItem primaryText="Top Center"/>
			<MenuItem primaryText="Top Right"/>
			<MenuItem primaryText="Middle Left"/>
			<MenuItem primaryText="Middle Center"/>
			<MenuItem primaryText="Middle Right"/>
			<MenuItem primaryText="Bottom Left"/>
			<MenuItem primaryText="Bottom Center"/>
			<MenuItem primaryText="Bottom Right"/>
			<Divider/>
			<MenuItem primaryText="More Layout Options..."/>
		</DropDownButton>
		<DropDownButton label="Wrap"  icon={<IconWrap/>}>
			<MenuItem primaryText="In Line With Text"/>
			<Divider/>
			<MenuItem primaryText="Square"/>
			<MenuItem primaryText="Tight"/>
			<MenuItem primaryText="Clear"/>
			<MenuItem primaryText="Square"/>
			<Divider/>
			<MenuItem primaryText="Behind Text"/>
			<MenuItem primaryText="In Front of Text"/>
			<Divider/>
			<MenuItem primaryText="More Layout Options..."/>
		</DropDownButton>
		<DropDownButton label="Rotate"  icon={<IconRotate/>}>
			<MenuItem primaryText="Rotate Right 90" onClick={e=>dispatch(ACTION.Entity.UPDATE({shape:{rotate:90}}))}/>
			<MenuItem primaryText="Rotate Left 90" onClick={e=>dispatch(ACTION.Entity.UPDATE({shape:{rotate:270}}))}/>
			<MenuItem primaryText="Flip Vertical" onClick={e=>dispatch(ACTION.Entity.UPDATE({shape:{rotate:90}}))}/>
			<MenuItem primaryText="Flip Horizontal" onClick={e=>dispatch(ACTION.Entity.UPDATE({shape:{rotate:90}}))}/>
			<Divider/>
			<MenuItem primaryText="More Rotation Options..."/>
		</DropDownButton>
		<DropDownButton label="Bring Forward"  icon={<IconBringForward/>}>
			<MenuItem primaryText="Bring Forward"/>
			<MenuItem primaryText="Bring to Front"/>
			<MenuItem primaryText="Bring In Front of Text"/>
		</DropDownButton>
		<DropDownButton label="Bring Backward"  icon={<IconBringBackward/>}>
			<MenuItem primaryText="Bring Backward"/>
			<MenuItem primaryText="Bring to Back"/>
			<MenuItem primaryText="Bring Behind Text"/>
		</DropDownButton>
	</Fragment>
))

const IconBringForward=props=>(
	<SvgIcon {...props}>
		<rect {...{x:11,y:11,width:12,height:12, fill:"white", stroke:"black"}}/>
		<rect {...{x:1,y:1,width:16,height:16, fill:"chocolate",stroke:"brown"}}/>
	</SvgIcon>
)

const IconBringBackward=props=>(
	<SvgIcon {...props}>
		<rect {...{x:1,y:1,width:16,height:16, fill:"chocolate",stroke:"brown"}}/>
		<rect {...{x:11,y:11,width:12,height:12, fill:"white", stroke:"black"}}/>
	</SvgIcon>
)

const IconGeometry=props=>(
	<SvgIcon {...props}>
		<path d="M23 7V1h-6v2H7V1H1v6h2v10H1v6h6v-2h10v2h6v-6h-2V7h2zM3 3h2v2H3V3zm2 18H3v-2h2v2zm12-2H7v-2H5V7h2V5h10v2h2v10h-2v2z"/>
	</SvgIcon>
)

const Sketcheds=[]
const Dashes=[null, "5 5", "5,10", "15,10,5,10"]	