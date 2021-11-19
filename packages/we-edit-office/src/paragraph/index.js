import React,{Component,Fragment} from "react"
import PropTypes from "prop-types"

import {compose,setDisplayName,mapProps, shallowEqual,shouldUpdate, withContext,withState} from "recompose"
import {ACTION, whenSelectionChangeDiscardable,getUI,dom} from "we-edit"

import {ToolbarSeparator,MenuItem, SvgIcon, FlatButton} from "material-ui"
import CheckIconButton from "../components/check-icon-button"
import ContextMenu from "../components/context-menu"
import Dialog from "../components/dialog"

import ListSetting from "./list-setting"
import IconMore from "material-ui/svg-icons/navigation/more-vert"
import PropTypesUI from "../components/prop-types-ui"

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
	withState("setting", "toggleSetting", {paragraph:false,bullet:false,numbering:false,outline:false,list:false}),
)(class extends Component{
	render(){
		const {style,pilcrow, togglePilcrow,children, setting, toggleSetting, dispatch,apply,}=this.props
				return (
			<ContextMenu.Support menus={[
				<MenuItem key="paragraph" primaryText="Paragraph..." 
					onClick={e=>dispatch(ACTION.UI({dialog:this.paragraphDialog(e=>dispatch(ACTION.UI({dialog:null})))}))}/>,
				<MenuItem key="list" primaryText="Bullet/Numbering..." 
					onClick={e=>dispatch(ACTION.UI({dialog:this.listDialog(e=>dispatch(ACTION.UI({dialog:null})))}))}/>,
			]}>
				<Fragment>
					<PropTypesUI uiContext="Ribbon" theme="Paragraph" 
						propTypes={dom.Paragraph.propTypes} 
						props={style}
						onChange={apply}
						onEvent={event=>toggleSetting({...setting,[event]:true})}
						/>
					<ToolbarSeparator/>
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
					{setting.outline && this.outlineDialog()}
					{setting.list && this.listDialog()}
					
					{children}
				</Fragment>
			</ContextMenu.Support>
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
				<PropTypesUI uiContext="Dialog" theme="Paragraph" propTypes={dom.Paragraph.propTypes} props={style} ref={refSetting}/>
			</Dialog>
		)
	}

	bulletDialog(toggleSetting=this.props.toggleSetting){
		const {apply, refSetting=React.createRef(), style, bullets, setting}=this.props
		return (
			<Dialog title="create bullet list"
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
				<PropTypesUI uiContext="Dialog"
					propTypes={dom.Paragraph.BulletListShape}
					props={style.numbering}
					ref={refSetting}
					/>
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
				<PropTypesUI uiContext="Dialog"
					propTypes={dom.Paragraph.NumberListShape} 
					props={style.numbering}
					ref={refSetting}
					/>
			</Dialog>
		)
	}

	outlineDialog(toggleSetting=this.props.toggleSetting){
		const {apply, refSetting=React.createRef(), style, numberings,setting}=this.props
		return (
			<Dialog title="Paragraph Settings"
				actions={[
					<FlatButton
					label="Cancel"
					onClick={e=>toggleSetting({...setting,outline:false})}
				/>,
				<FlatButton
					label="Submit"
					primary={true}
					onClick={e=>{
						apply({numbering:refSetting.current.state})
						toggleSetting({...setting,outline:false})
					}}
				/>,
				]}
				>
				<PropTypesUI uiContext="Dialog" 
					propTypes={dom.Paragraph.OutlineListShape} 
					props={style.numbering}
					ref={refSetting}
					/>
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
				<PropTypesUI uiContext="Dialog"
					propTypes={{numbering:dom.Paragraph.ListShape}} 
					props={style}
					ref={refSetting}
					/>
			</Dialog>
		)
	}
})