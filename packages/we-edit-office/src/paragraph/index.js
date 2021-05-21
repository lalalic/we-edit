import React,{Component,Fragment} from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,mapProps, shallowEqual,shouldUpdate, withContext,withState} from "recompose"
import {ACTION, whenSelectionChangeDiscardable,getUI,dom} from "we-edit"

import {ToolbarGroup,ToolbarSeparator,MenuItem, SvgIcon, FlatButton} from "material-ui"
import CheckIconButton from "../components/check-icon-button"
import DropDownButton from "../components/drop-down-button"
import ContextMenu from "../components/context-menu"
import Dialog from "../components/dialog"

import ParagraphSetting from "./setting"
import {BulletList, NumberList, MultiLevelList} from "./numbering-setting"
import ListSetting from "./list-setting"


import IconAlignCenter from "material-ui/svg-icons/editor/format-align-center"
import IconAlignLeft from "material-ui/svg-icons/editor/format-align-left"
import IconAlignRight from "material-ui/svg-icons/editor/format-align-right"
import IconAlignJustify from "material-ui/svg-icons/editor/format-align-justify"

import IconListBullet from "material-ui/svg-icons/editor/format-list-bulleted"
import IconListNumber from "material-ui/svg-icons/editor/format-list-numbered"
import IconListOutline from "material-ui/svg-icons/editor/pie-chart-outlined"
import IconMore from "material-ui/svg-icons/navigation/more-vert"

export default compose(
	setDisplayName("ParagraphStyle"),
	whenSelectionChangeDiscardable(({selection},state)=>{
		if(selection)
			return {style:selection.props("paragraph",false),...getUI(state)}
		return getUI(state)
	}),
	withContext({disabled:PropTypes.bool},({style})=>({disabled:!style})),
	mapProps(({dispatch,children,style,pilcrow})=>{
		const props={
			children,
			style,
			pilcrow,
			dispatch,
			toggleAlign(align){
				const {align:current="left"}=style||{}
				if(current==align){
					align=null
				}
				dispatch(ACTION.Selection.UPDATE({paragraph:{align}}))
			},
			numbering: numbering=>{
				if(numbering && style?.numbering){
					const {id,level=0}=style.numbering
					numbering={...numbering,id,level}
				}
				dispatch(ACTION.Selection.UPDATE({paragraph:{numbering}}))
			},
			toggleBullet(numbering){
				if(style?.numbering?.format=="bullet"){
					numbering=null
				}
				props.numbering(numbering)
			},
			toggleNumbering(numbering){
				if(style?.numbering?.format &&style.numbering.format!=="bullet"){
					numbering=null
				}
				props.numbering(numbering)
			},
			togglePilcrow(){
				dispatch(ACTION.UI({pilcrow:!pilcrow}))
			},
			apply(paragraph){
				dispatch(ACTION.Selection.UPDATE({paragraph}))
			}
		}
		return props
	}),
	shouldUpdate((a,b)=>!(shallowEqual(a.style,b.style) && a.pilcrow==b.pilcrow)),
	withState("setting", "toggleSetting", {paragraph:false,bullet:false,numbering:false,multiLevel:false,list:false}),
)(class extends Component{
	static defaultProps={
		bullets:[
			{style:{fonts:"Arial"},label:String.fromCharCode(0x25CF)},
			{style:{fonts:"Arial"},label:String.fromCharCode(0x25CB)},
			{style:{fonts:"Arial"},label:String.fromCharCode(0x25A0)},
			{style:{fonts:"Arial"},label:String.fromCharCode(0x2666)},
			{style:{fonts:"Arial"},label:String.fromCharCode(0x263A)},
			{style:{fonts:"Arial"},label:String.fromCharCode(0x263B)},
		],
		numberings:[
			{format:"decimal",label:"%1."},
			{format:"lowerLetter",label:"%1."},
			{format:"upperLetter",label:"%1."},
			{format:"lowerRoman",label:"%1."},
			{format:"upperRoman",label:"%1."},
			{format:"chinese",label:"%1"},
		],
		Numberings:dom.Paragraph.numberings
	}
	render(){
		const {
			style, toggleAlign,numbering, bullet, toggleBullet, toggleNumbering, 
			pilcrow, togglePilcrow,children, setting, toggleSetting,
			bullets,numberings,Numberings, dispatch,
		}=this.props
				return (
			<ContextMenu.Support menus={[
				<MenuItem key="paragraph" primaryText="Paragraph..." 
					onClick={e=>dispatch(ACTION.UI({dialog:this.paragraphDialog(e=>dispatch(ACTION.UI({dialog:null})))}))}/>,
				<MenuItem key="list" primaryText="Bullet/Numbering..." 
					onClick={e=>dispatch(ACTION.UI({dialog:this.listDialog(e=>dispatch(ACTION.UI({dialog:null})))}))}/>,
			]}>
				<ToolbarGroup>
					<CheckIconButton
						status={style &&(!style.align ||style.align=="left")?"checked":"unchecked"}
						onClick={()=>toggleAlign("left")}
						children={<IconAlignLeft/>}
						hint="Align Left"
						/>
					<CheckIconButton
						status={style&&style.align=="center"?"checked":"unchecked"}
						onClick={()=>toggleAlign("center")}
						children={<IconAlignCenter/>}
						hint="Align Center"
						/>
					<CheckIconButton
						status={style &&style.align=="right"?"checked":"unchecked"}
						onClick={()=>toggleAlign("right")}
						children={<IconAlignRight/>}
						hint="Align Right"
						/>
					<CheckIconButton
						status={style&&style.align=="justify"?"checked":"unchecked"}
						onClick={()=>toggleAlign("justify")}
						children={<IconAlignJustify/>}
						hint="Justify"
						/>
					<ToolbarSeparator style={{marginRight:2, marginLeft:2}}/>

					<DropDownButton
						status={style?.numbering?.format=="bullet" ?"checked":"unchecked"}
						onClick={()=>toggleBullet({format:"bullet",...bullets[0]})}
						icon={<IconListBullet/>}
						hint="bullet list"
						>
						{bullets.map(({label,style:{fonts}},i)=>
							<MenuItem key={label} 
								primaryText={label} 
								style={{fontFamily:fonts}} 
								onClick={e=>numbering({format:"bullet",...bullets[i]})}
								/>
						)}
						<MenuItem primaryText="Define New Bullet" onClick={e=>toggleSetting({...setting,bullet:true})}/>
					</DropDownButton>
					<DropDownButton
						status={style?.numbering?.format && style.numbering.format!=="bullet" ?"checked":"unchecked"}
						onClick={()=>toggleNumbering(numberings[0])}
						icon={<IconListNumber/>}
						hint="numbered list"
						>
						{numberings.map(({format, label},i)=>
							<MenuItem key={format} 
								primaryText={label.replace("%1",Numberings[format](0))} 
								onClick={e=>numbering(numberings[i])}
								/>
						)}
						<MenuItem primaryText="Define New Number List" onClick={e=>toggleSetting({...setting,numbering:true})}/>
					</DropDownButton>
					<DropDownButton
						status={"unchecked"}
						icon={<IconListOutline/>}
						hint="outline line"
						>
						<MenuItem primaryText="Define New Number List" onClick={e=>toggleSetting({...setting,multiLevel:true})}/>
					</DropDownButton>

					<ToolbarSeparator style={{marginRight:2, marginLeft:2}}/>
					<CheckIconButton
						status={pilcrow ? "checked" : "unchecked"}
						onClick={togglePilcrow}
						hint="Show/Hide❡"
						children={
							<SvgIcon>
								<g transform="translate(0 4)">
									<path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4z"/>
								</g>
							</SvgIcon>
						}
						/>
					<CheckIconButton
							label="paragraph settings..."
							onClick={e=>toggleSetting({...setting,paragraph:true})}
							children={<IconMore/>}
							/>

					{setting.paragraph && this.paragraphDialog()}

					{setting.bullet && this.bulletDialog()}
					{setting.numbering && this.numberingDialog()}
					{setting.multiLevel && this.multiLevelDialog()}
					{setting.list && this.listDialog()}
					
					{children}
				</ToolbarGroup>
			</ContextMenu.Support>
		)
	}

	bulletDialog(toggleSetting=this.props.toggleSetting){
		const {apply, refSetting=React.createRef(), style, bullets, setting}=this.props
		return (
			<Dialog title="Paragraph Settings"
				actions={[
					<FlatButton
					label="Cancel"
					onClick={e=>toggleSetting({...setting,bullet:false})}
				/>,
				<FlatButton
					label="Submit"
					primary={true}
					onClick={e=>{
						apply({numbering:refSetting.current.state})
						toggleSetting({...setting,bullet:false})
					}}
				/>,
				]}
				>
				<BulletList style={style?.numbering} bullets={bullets} ref={refSetting}/>
			</Dialog>
		)
	}

	paragraphDialog(toggleSetting=this.props.toggleSetting){
		const {apply, refSetting=React.createRef(), style,setting}=this.props
		return (
			<Dialog title="Paragraph Settings"
				actions={[
					<FlatButton
					label="Cancel"
					onClick={e=>toggleSetting({...setting,paragraph:false})}
				/>,
				<FlatButton
					label="Submit"
					primary={true}
					onClick={e=>{
						apply(refSetting.current.state)
						toggleSetting({...setting,paragraph:false})
					}}
				/>,
				]}
				>
				<ParagraphSetting style={style} ref={refSetting}/>
			</Dialog>
		)
	}

	numberingDialog(toggleSetting=this.props.toggleSetting){
		const {apply, refSetting=React.createRef(), style, numberings,setting}=this.props
		return (
			<Dialog title="Paragraph Settings"
				actions={[
					<FlatButton
					label="Cancel"
					onClick={e=>toggleSetting({...setting,numbering:false})}
				/>,
				<FlatButton
					label="Submit"
					primary={true}
					onClick={e=>{
						apply({numbering:refSetting.current.state})
						toggleSetting({...setting,numbering:false})
					}}
				/>,
				]}
				>
				<NumberList style={style?.numbering} numberings={numberings} ref={refSetting}/>
			</Dialog>
		)
	}

	multiLevelDialog(toggleSetting=this.props.toggleSetting){
		const {apply, refSetting=React.createRef(), style, numberings,setting}=this.props
		return (
			<Dialog title="Paragraph Settings"
				actions={[
					<FlatButton
					label="Cancel"
					onClick={e=>toggleSetting({...setting,multiLevel:false})}
				/>,
				<FlatButton
					label="Submit"
					primary={true}
					onClick={e=>{
						apply({numbering:refSetting.current.state})
						toggleSetting({...setting,multiLevel:false})
					}}
				/>,
				]}
				>
				<MultiLevelList style={style?.numbering}  ref={refSetting} numberings={numberings}/>
			</Dialog>
		)
	}

	listDialog(toggleSetting=this.props.toggleSetting){
		const {apply, refSetting=React.createRef(), style,setting}=this.props
		return (
			<Dialog title="Paragraph Settings"
				actions={[
					<FlatButton
					label="Cancel"
					onClick={e=>toggleSetting({...setting,list:false})}
				/>,
				<FlatButton
					label="Submit"
					primary={true}
					onClick={e=>{
						apply({numbering:refSetting.current.state})
						toggleSetting({...setting,list:false})
					}}
				/>,
				]}
				>
				<ListSetting style={style?.numbering}  ref={refSetting}/>
			</Dialog>
		)
	}
})