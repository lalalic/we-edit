import React,{Component,Fragment} from "react"
import {ACTION, connect,getUI,dom} from "we-edit"

import {ToolbarSeparator, SvgIcon, FlatButton} from "material-ui"
import {MenuItem} from "../components/menu"

import CheckIconButton from "../components/check-icon-button"
import ContextMenu from "../components/context-menu"
import Dialog from "../components/dialog"

import IconMore from "material-ui/svg-icons/navigation/more-vert"
import PropTypesUI from "../components/prop-types-ui"
import SelectStyle from "../components/select-style"

export default ({children})=>(
	<SelectStyle target="paragraph">
		{({style,dispatch,setting})=>(
			<ContextMenu.Support menus={[
				<MenuItem key="paragraph" primaryText="Paragraph..." onClick={e=>setting('paragraph')}/>,
				<MenuItem key="list" primaryText="Bullet/Numbering..." onClick={e=>setting('list')}/>,
			]}>
				<Fragment>
					<PropTypesUI 
						theme="Paragraph"
						props={style}
						propTypes={(({align,numbering})=>({align,numbering}))(dom.Paragraph.propTypes)} 
						onChange={paragraph=>dispatch(ACTION.Selection.UPDATE({paragraph}))}
						/>
					<ToolbarSeparator/>

					<Pilcrow/>

					<CheckIconButton
							label="paragraph settings..."
							onClick={e=>setting('paragraph')}
							children={<IconMore/>}
							/>
					{children}
				</Fragment>
			</ContextMenu.Support>
		)}
	</SelectStyle>
)

const Pilcrow=connect(state=>getUI(state))(({dispatch,pilcrow})=>(
	<CheckIconButton
		status={pilcrow ? "checked" : "unchecked"}
		onClick={()=>dispatch(ACTION.UI({pilcrow:!pilcrow}))}
		hint="Show/Hide❡"
		children={
			<SvgIcon>
				<g transform="translate(0 4)">
					<path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4z"/>
				</g>
			</SvgIcon>
		}
		/>
))

export function ParagraphSetting({value, onSubmit, ...props}){
	return (
		<SelectStyle target="paragraph">
			{({style,dispatch})=>{
				const Paragraph=style?._composer?.constructor||dom.Paragraph
				const refSetting=React.createRef()
				if(onSubmit==undefined){
					onSubmit=paragraph=>dispatch(ACTION.Selection.UPDATE({paragraph}))
				}
				
				return (
					<Dialog title="Paragraph Settings"
						onSubmit={e=>onSubmit(refSetting.current.value,dispatch)}
						moreActions={[
							<FlatButton
								label="Set As Default..."
								onClick={e=>dispatch(ACTION.Entity.UPDATE({document:{defaultParagraphStyle:refSetting.current.value}}))}
							/>
						]}
						{...props}
						>
						<PropTypesUI theme="Paragraph" 
							propTypes={{...Paragraph.propTypes,numbering:null}} 
							props={value||style} ref={refSetting}/>
					</Dialog>
				)
			}}
		</SelectStyle>
	)
}

export function ListSetting({shape=dom.Paragraph.propTypes.numbering, value, defaultValue, onSubmit, ...props}){
	return (
		<SelectStyle target="paragraph">
			{({style,dispatch})=>{
				const refSetting=React.createRef()
				if(onSubmit==undefined){
					onSubmit=numbering=>dispatch(ACTION.Selection.UPDATE({paragraph:{numbering}}))
				}
				
				return (
					<Dialog 
						onSubmit={e=>onSubmit(refSetting.current.value,dispatch)}
						{...props}
						>
						<PropTypesUI
							propTypes={{numbering:shape}}
							props={{numbering:value||style.numbering||defaultValue}}
							wrapper={null}
							ref={refSetting}
							/>
					</Dialog>
				)
			}}
		</SelectStyle>
	)
}