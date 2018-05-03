import React,{PureComponent} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName, getContext, mapProps} from "recompose"

import {IconButton,Drawer,Menu,MenuItem,Popover,FlatButton} from "material-ui"
import IconClose from "material-ui/svg-icons/navigation/close"
import IconFiles from "material-ui/svg-icons/navigation/arrow-drop-down"
import IconMenu from "material-ui/svg-icons/navigation/menu"

import Dashboard from "../dashboard"

import {ACTION,DOMAIN} from "we-edit"

import ComboBox from "../components/combo-box"
import SizeIconButton from "../components/size-icon-button"

export class Bar extends PureComponent{
    state={showDrawer:false}
    render(){
        const {title, active, docs, setActive, close, height=20, style={}, onMenu}=this.props
        let closeButton=null

		if(docs.length>0){
			closeButton=(
				<SizeIconButton size={height} padding={height/4} onClick={close}>
					<IconClose/>
				</SizeIconButton>
			)
		}

		return (
			<div style={{background:"transparent",height, display:"flex", flexDirection:"row", ...style}}>
				<div>
					<SizeIconButton
						size={height}
						onClick={onMenu}
						>
						<IconMenu/>
					</SizeIconButton>
				</div>
				<div style={{width:50,lineHeight:`${height}px`,fontSize:height/2}}>{title||"we-edit"}</div>
				<div style={{flex:"1 100%", textAlign:"center"}}>
					<ComboBox
						disabled={active==null}
						value={active ? active.id : ""}
						dataSource={docs.map(({doc:{id:value,name:text}})=>({text,value}))}
						onChange={setActive}
						underlineShow={false}
						style={{width:100,height}}
						textFieldStyle={{height,lineHeight:`${height}px`,fontSize:height/2}}
						/>
				</div>
				<div style={{width:50,lineHeight:`${height}px`,fontSize:height/2}}></div>
				<div>
					{closeButton}
				</div>
			</div>
        )
    }
}

export default compose(
    setDisplayName("TitleBar"),
    getContext({
        store:PropTypes.object,
		muiTheme: PropTypes.object,
    }),
    mapProps(({title, store:{dispatch},  muiTheme:{titleBar}, onMenu})=>({
        setActive(id){
            dispatch(ACTION.ACTIVE(id))
        },
        close(){
            dispatch(ACTION.CLOSE())
        },
		height:titleBar ? titleBar.height : undefined,
        onMenu,
        title,
    })),
    connect(state=>{
        const {[DOMAIN]:{docs}}=state
        return {
            docs:Object.keys(docs).map(k=>docs[k])
        }
    })
)(Bar)
