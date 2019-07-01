import React,{Fragment} from "react"
import {compose, mapProps, setDisplayName} from "recompose"

import {ToolbarGroup, SvgIcon} from "material-ui"

import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import DropDownButton from "../components/drop-down-button"
import IconChecked from "material-ui/svg-icons/action/done"

import {ACTION,connect,getSelectionStyle} from "we-edit"
import { equal } from "assert";

export const Tools=compose(
	setDisplayName("Page Layout"),
	connect(state=>({selection:getSelectionStyle(state)})),
	mapProps(({children,dispatch,selection})=>{
		const style=selection&&selection.props("page",false)||{}
		return {
			children,
			style,
			createSection(props={}){
				dispatch(ACTION.Entity.CREATE({...props,type:"section",}))
			},
			createPageBreak(){
				dispatch(ACTION.Entity.CREATE({type:"pagebreak",}))
			},
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
			column(...cols){
				dispatch(ACTION.Entity.UPDATE({type:"section",cols}))
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
			},
			cols(n, f=a=>a){
				const cols=style.cols
				return cols && cols.length==n && f(...cols.map(a=>a.width))
			}
		}
	}),
)(({children, createSection,createPageBreak, margin, size, column, landscape,protrait, 
	sizeEqual,marginEqual, cols,
	style
})=>{
	return (
		<ToolbarGroup>			
			<DropDownButton 
				label="Breaks"
				title="page breaks"
				icon={
					<SvgIcon>
						<IconPage transform="translate(0 -12)"/>
						<line strokeDasharray="2" stroke="blue" x1="0" x2="24" y1="12" y2="12" strokeWidth="2"/>
						<IconPage transform="translate(0 12)"/>
					</SvgIcon>
				}>
				<Subheader>Page Breaks</Subheader>
				<MenuItem primaryText="Page" leftIcon={
						<SvgIcon>
							<IconBlank transform="translate(0 -12)"/>
							<path d="M1 10 l2 2l-2 2z" fill="blue"/>
							<IconBlank transform="translate(0 12)"/>
						</SvgIcon>
					}
					onClick={()=>createPageBreak()}	
					/>

				<MenuItem primaryText="Column" leftIcon={
					<SvgIcon>
						<path d="M9 7 l0 10 M14 7 l0 10" strokeDasharray="2" stroke="blue" strokeWidth="2"/>
						<IconBlank />
						<path d="M8.5 18 h3 v-12 h1" stroke="red" strokeWidth="1" fill="none"/>
					</SvgIcon>
				}/>

				<Subheader>Section Breaks</Subheader>
				<MenuItem 
					primaryText="Next Page" 
					onClick={e=>createSection()}
					leftIcon={
						<SvgIcon>
							<IconPage transform="translate(0 -12)"/>
							<path d="M1 10 l2 2l-2 2z" fill="blue"/>
							<IconPage transform="translate(0 12)"/>
						</SvgIcon>
					}
					/>
				<MenuItem primaryText="Continuous" 
					leftIcon={
						<SvgIcon>
							<path d="M12 6 l0 5" strokeDasharray="1" stroke="lightblue" strokeWidth="10"/>
							<IconBlank />
							<path d="M1 10 l2 2l-2 2z" fill="blue"/>
							<path d="M12 12 l0 5" strokeDasharray="1" stroke="blue" strokeWidth="10"/>
						</SvgIcon>
					}
					onClick={e=>createSection({kind:"continuous"})}/>
				<MenuItem primaryText="Even Page" 
					leftIcon={
						<SvgIcon>
							<IconBlank transform="translate(0 -12)"/>
							<IconBlank transform="translate(0 12)"/>
							<text x="10" y="6" fontSize="6" fontFamily="arial" stroke="blue">2</text>
							<text x="10" y="22" fontSize="6" fontFamily="arial" stroke="blue">4</text>
						</SvgIcon>
					}
					onClick={e=>createSection({kind:"evenPage"})}/>
				<MenuItem primaryText="Odd Page" 
					leftIcon={
						<SvgIcon>
							<IconBlank transform="translate(0 -12)"/>
							<IconBlank transform="translate(0 12)"/>
							<text x="10" y="6" fontSize="6" fontFamily="arial" stroke="blue">1</text>
							<text x="10" y="22" fontSize="6" fontFamily="arial" stroke="blue">3</text>
						</SvgIcon>
					}
					onClick={e=>createSection({kind:"oddPage"})}/>		
			</DropDownButton>
			
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
			
			<DropDownButton 
				label="Columns"
				title="page column"
				icon={<IconColumn children={
					<Fragment>
						<Column/>
						<Column transform="translate(7 0)"/>
					</Fragment>
				}/>}>
				<MenuItem primaryText="1" 
					rightIcon={cols(1) ? checked : null}
					leftIcon={
						<IconColumn>
							<Column d="M12 6.5v12" strokeWidth="12"/>
						</IconColumn>
					}
					onClick={e=>column(1)}/>
				<MenuItem primaryText="2"
					rightIcon={cols(2, (a,b)=>a==b) ? checked : null}
					leftIcon={
						<IconColumn>
							<Column/>
							<Column transform="translate(7 0)"/>
						</IconColumn>
					}
					onClick={e=>column(2)}/>
				<MenuItem primaryText="3" 
					rightIcon={cols(3) ? checked : null}
					leftIcon={
						<IconColumn>
							<Column strokeWidth="3"/>
							<Column strokeWidth="3" transform="translate(3.5 0)"/>
							<Column strokeWidth="3" transform="translate(7 0)"/>
						</IconColumn>
					}
					onClick={e=>column(3)}/>
				<MenuItem primaryText="Left" 
					rightIcon={cols(2,(a,b)=>a<b) ? checked : null}
					leftIcon={
						<IconColumn>
							<Column strokeWidth="3"/>
							<Column strokeWidth="7" transform="translate(6 0)"/>
						</IconColumn>
					}
					onClick={e=>column(1,2)}/>	
				<MenuItem primaryText="Right"  
					rightIcon={cols(2,(a,b)=>a>b) ? checked : null}
					leftIcon={
						<IconColumn>
							<Column strokeWidth="7" transform="translate(1 0)"/>
							<Column strokeWidth="3" transform="translate(7 0)"/>
						</IconColumn>
					}
					onClick={e=>column(2,1)}/>
				<MenuItem primaryText="More Columns..." leftIcon={<SvgIcon/>} />					
			</DropDownButton>
			{children}
		</ToolbarGroup>
	)
})
const checked=<IconChecked/>

const IconPage=props=><path {...props} d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
const IconBlank=props=><path {...props} d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>

const Column=props=><path d="M8.5 6.5v12" fill="none" stroke="blue" strokeWidth="5" strokeDasharray="1.5" {...props}/>
const IconColumn=({size=20, d=(24-size)/2, children,...props})=>(
	<SvgIcon {...props}>
		<path d="M4 2h16v20H4z" fill="none" stroke="black"/>
		{children}
	</SvgIcon>
)

const IconSize=()=>(
	<SvgIcon>
		<IconBlank transform="scale(0.6) translate(10,10)"/>
    	<path d="M9 3 v3v-1.5 h10v-1.5v3" fill="none" stroke="blue"/>
		<path d="M9 3 v3v-1.5 h10v-1.5v3" fill="none" stroke="blue" transform="translate(9.5 -1) rotate(90)"/>
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