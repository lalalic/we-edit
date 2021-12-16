import React,{PureComponent} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName, getContext, mapProps} from "recompose"

import IconClose from "material-ui/svg-icons/navigation/close"
import IconMenu from "material-ui/svg-icons/navigation/menu"

import {ACTION,getAll} from "we-edit"

import ComboBox from "../components/combo-box"
import SizeIconButton from "../components/size-icon-button"

export class Bar extends PureComponent{
    state={showDrawer:false}
    render(){
        const {title, children, active, docs, setActive, close, height=20, style={}, onMenu}=this.props
        let closeButton=null

		if(docs.length>0){
			closeButton=(
				<SizeIconButton size={height} padding={height/4} onClick={close}>
					<IconClose/>
				</SizeIconButton>
			)
		}

		return (
			<div style={{
					position:"relative",
					background:"transparent",
					height, 
					whiteSpace:"nowrap",
					display:"flex", flexDirection:"row", 
					...style}}>
				<div>
					<SizeIconButton
						size={height}
						onClick={onMenu}
						>
						<IconMenu/>
					</SizeIconButton>
				</div>
				<div style={{lineHeight:`${height}px`,fontSize:height/2}}>{title||"we-edit"}</div>
				<div style={{flex:"1 100%",paddingLeft:20}}>
					<ComboBox
						disabled={active==null}
						value={active ? active.id : ""}
						dataSource={docs.map(({doc:{id:value,name:text}})=>({text,value}))}
						onChange={setActive}
						underlineShow={false}
						style={{width:100,height}}
						textFieldStyle={{height,lineHeight:`${height}px`,fontSize:height/2}}
						icon={<span/>}
						/>	
				</div>
				<div style={{lineHeight:`${height}px`,fontSize:height/2}}>
					{children}
				</div>
				<div style={{width:50}}>
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
    mapProps(({ store:{dispatch},  muiTheme:{titleBar}, ...others})=>({
		...others,
        setActive(id){
            dispatch(ACTION.ACTIVE(id))
        },
        close(){
            dispatch(ACTION.CLOSE())
        },
		height:titleBar ? titleBar.height : undefined,
    })),
    connect(state=>{
        return {
            docs:getAll(state)
        }
    })
)(Bar)
