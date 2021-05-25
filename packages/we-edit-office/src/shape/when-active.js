import React,{Fragment} from "react"
import {ACTION} from "we-edit"

import {Menu, MenuItem, Divider, SvgIcon, ToolbarSeparator, Toggle} from "material-ui"

import Field from "../components/toolbar-field"
import UnitInput from "../components/unit-input"
import WhenActive from "../components/when-active"
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



import { IconWrap, IconWrapSquare, IconWrapTight, IconWrapThrough, IconWrapClear, IconWrapBehind, IconWrapFront, IconWrapInline } from "./icons";
import CheckIconButton from "../components/check-icon-button"
import Create from "./create"
import ColorButton from "../components/color-button"

export default ({children, style, selection,dispatch})=>{
	return (
		<WhenActive label="Shape Format">	
			<Create/>
			<DropDownButton label="edit shape" icon={<IconGeometry/>}>
				<MenuItem primaryText="Change shape"/>
				<MenuItem primaryText="Edit points"/>
			</DropDownButton>
			<ToolbarSeparator/>
			<Layout {...{style, selection, dispatch}}/>
			<ToolbarSeparator/>
			<Field label="Size>Width">
				<UnitInput style={{width:50}} 
					onChange={width=>dispatch(ACTION.Selection.UPDATE({shape:{width}}))}/>
			</Field>
			<Field label="Height">
				<UnitInput style={{width:50}}
					onChange={height=>dispatch(ACTION.Selection.UPDATE({shape:{height}}))}/>		
			</Field>
			<ToolbarSeparator/>
			<ColorButton label="Fill" icon={<IconFillShape/>}>
				<Divider/>
				<MenuItem primaryText="Picture..."/>
				<MenuItem primaryText="Gradient"/>
				<MenuItem primaryText="Texture"/>
			</ColorButton>
			<ColorButton label="Outline" icon={<IconOutlineShape/>}>
				<Divider/>
				<MenuItem primaryText="Weight" 
					rightIcon={<IconArrowDropRight/>} 
					menuItems={[
						...(["1/4","1/2","3/4","1","2","3","4"].map(a=>
						<MenuItem key={a} rightIconButton={<span>{a} pt</span>} 
							primaryText={<svg><line {...{x:0,y:12,stroke:"black", strokeWidth:`${a}pt`}}/></svg>}/>))
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
								rightIconButton={<svg>{a}</svg>}/>)),
						<MenuItem primaryText="More Lines..."/>
					]}/>
			</ColorButton>
			<DropDownButton label="Effect" icon={<IconEffectShape/>}/>
			<ToolbarSeparator/>
			
			<DropDownButton label="Verital Align" icon={<IconAlign/>}>
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
		</WhenActive>
	)
}

export const Layout=({style, selection, dispatch, open})=>(
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
			<MenuItem primaryText="In Line Width Text"/>
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
		<DropDownButton label="Rotate"  icon={<IconRotate/>}>
			<MenuItem primaryText="Rotate Right 90" onClick={e=>dispatch(ACTION.Selection.UPDATE({shape:{rotate:90}}))}/>
			<MenuItem primaryText="Rotate Left 90" onClick={e=>dispatch(ACTION.Selection.UPDATE({shape:{rotate:270}}))}/>
			<MenuItem primaryText="Flip Vertical" onClick={e=>dispatch(ACTION.Selection.UPDATE({shape:{rotate:90}}))}/>
			<MenuItem primaryText="Flip Horizontal" onClick={e=>dispatch(ACTION.Selection.UPDATE({shape:{rotate:90}}))}/>
			<MenuItem primaryText="More Rotation Options..."/>
		</DropDownButton>
	</Fragment>
)

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
const Dashes=[]