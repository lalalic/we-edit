import React,{Fragment} from "react"
import {compose, mapProps, setDisplayName} from "recompose"

import {SvgIcon, ToolbarSeparator} from "material-ui"

import MenuItem from 'material-ui/MenuItem'
import DropDownButton from "../components/drop-down-button"
import IconChecked from "material-ui/svg-icons/action/done"

import {ACTION,whenSelectionChangeDiscardable,dom} from "we-edit"
import PropTypesUI from "../components/prop-types-ui"

export default compose(
	setDisplayName("Page Ribbon"),
	whenSelectionChangeDiscardable(),
	mapProps(({children,dispatch,selection})=>{
		const style=(!selection?.props('section') && selection?.props("page",false))||null
		return {
			children,
			style,
			landscape(){
				dispatch(ACTION.Entity.UPDATE({type:"section",orientation:"landscape"}))
			},
			protrait(){
				dispatch(ACTION.Entity.UPDATE({type:"section",orientation:"portrait"}))
			},
			margin(...margin){
				dispatch(ACTION.Entity.UPDATE({type:"section",margin}))
			},
			size(width,height){
				dispatch(ACTION.Entity.UPDATE({type:"section",size:{width,height}}))
			},
			sizeEqual(w,h){
				const size=style.size
				return size && Math.abs(size.width*h-size.height*w)<0.1
			},
			marginEqual(...margins){
				const [top,right=top,bottom=top,left=right]=margins
				const margin=style.margin
				var a
				return margin && 
					(a=parseInt(margin.top*100/top)) &&
					Math.abs(a-margin.right*100/right)<1 &&
					Math.abs(a-margin.bottom*100/bottom)<1 &&
					Math.abs(a-margin.left*100/left)<1
			}
		}
	}),
)(({children, margin, size, landscape,protrait, sizeEqual,marginEqual,style})=>{
	return <PropTypesUI propTypes={dom.Page.propTypes} props={style} uiContext="Ribbon" theme="Page"/>
	if(!style)
		return null
	return (
		<Fragment>			
			<PropTypesUI propTypes={dom.Page.propTypes} props={style} uiContext="Ribbon" theme="Page"/>
			<ToolbarSeparator/>
			<DropDownButton 
				label="Margins"
				title="page margin"
				icon={<IconMargin/>}>
				<MenuItem primaryText="Normal" 
					rightIcon={marginEqual(2.54) ? checked : null}
					leftIcon={<IconMargin/>} onClick={e=>margin(2.54)}/>
				<MenuItem primaryText="Narrow" 
					rightIcon={marginEqual(1.27) ? checked : null}
					leftIcon={<SvgIcon/>}onClick={e=>margin(1.27)}/>
				<MenuItem primaryText="Moderate" 
					rightIcon={marginEqual(2.54,1.91) ? checked : null}
					leftIcon={<SvgIcon/>}onClick={e=>margin(2.54,1.91)}/>
				<MenuItem primaryText="Wide" 
					rightIcon={marginEqual(2.54,5.08) ? checked : null}
					leftIcon={<SvgIcon/>}onClick={e=>margin(2.54,5.08)}/>
				<MenuItem primaryText="Mirrored" 
					rightIcon={marginEqual(2.54,2.54,2.54,3.18) ? checked : null}
					leftIcon={<SvgIcon/>} onClick={e=>margin(2.54,2.54,2.54,3.18)}/>	
				<MenuItem primaryText="Custom Margins..." leftIcon={<SvgIcon/>} />					
			</DropDownButton>
			
			<DropDownButton 
				label="Orientation"
				title="page orientation"
				icon={<IconOrientation/>}>
				<MenuItem primaryText="Portrait" 
					rightIcon={style.size && style.size.width<style.size.height ? checked : null}
					leftIcon={<SvgIcon children={<IconBlank/>}/>} onClick={protrait}/>
				<MenuItem primaryText="Landscape"  
					rightIcon={style.size && style.size.width>style.size.height ? checked : null}
					leftIcon={<SvgIcon  children={<IconBlank transform="translate(25 0) rotate(90)" />} />} onClick={landscape}/>
			</DropDownButton>
			
			<DropDownButton 
				label="Size"
				title="page size"
				icon={<IconSize/>}>
				<MenuItem primaryText="Letter" 
					rightIcon={sizeEqual(21.59,27.94) ? checked : null}
					leftIcon={<SvgIcon/>} onClick={e=>size(21.59,27.94)}/>
				<MenuItem primaryText="Legal" 
					rightIcon={sizeEqual(21.59,35.56) ? checked : null}
					leftIcon={<SvgIcon/>} onClick={e=>size(21.59,35.56)}/>
				<MenuItem primaryText="A3" 
					rightIcon={sizeEqual(29.7,42.01) ? checked : null}
					leftIcon={<SvgIcon/>} onClick={e=>size(29.7,42.01)}/>
				<MenuItem primaryText="A4" 
					rightIcon={sizeEqual(20.99, 29.7) ? checked : null}
					leftIcon={<SvgIcon/>}  onClick={e=>size(20.99, 29.7)}/>
				<MenuItem primaryText="More Paper Sizes..."  leftIcon={<SvgIcon/>} />
			</DropDownButton>
			
			{children}
            <ToolbarSeparator/>
		</Fragment>
	)
})
const checked=<IconChecked/>

const IconBlank=props=><path {...props} d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>

const IconSize=()=>(
	<SvgIcon>
		<g transform="translate(-3,-3)">
			<IconBlank transform="scale(0.6) translate(10,10)"/>
			<path d="M8 3 v3v-1.5 h10v-1.5v3" fill="none" stroke="blue"/>
			<path d="M9 3 v3v-1.5 h10v-1.5v3" fill="none" stroke="blue" transform="translate(9.5 -1) rotate(90)"/>
		</g>
	</SvgIcon>
)

const IconOrientation=props=>(
	<SvgIcon {...props}>
		<g transform="scale(0.8) translate(4 4)">
			<IconBlank transform="translate(-3 -1) scale(0.9)"/>
			<IconBlank transform="translate(24 4.5) scale(0.9) rotate(90)"/>
		</g>
	</SvgIcon>
)

const IconMargin=({children, ...props})=>(
	<SvgIcon {...props}>
		<path d="M4 2h16v20H4z" fill="none" stroke="black"/>
		
		{children || 
			<Fragment>
				<H/>
				<H transform="translate(10 0)"/>
				<V/>
				<V transform="translate(0 14)"/>
			</Fragment>
		}
	</SvgIcon>
)

const H=props=><path d="M7 2.5 v19" fill="none" stroke="blue" {...props}/>
const V=props=><path d="M4.5 5 h15" fill="none" stroke="blue" {...props}/>

