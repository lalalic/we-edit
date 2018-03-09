import React,{PureComponent} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName, getContext, mapProps} from "recompose"

import {Toolbar, AppBar,IconButton,Drawer,Menu,MenuItem,Popover,FlatButton} from "material-ui"
import IconClose from "material-ui/svg-icons/navigation/close"
import IconFiles from "material-ui/svg-icons/navigation/arrow-drop-down"

import Dashboard from "we-edit-ui/dashboard"

import {ACTION} from "we-edit"

import ComboBox from "we-edit-ui/components/combo-box"
import Zoom from "we-edit-ui/components/zoom"


export class Bar extends PureComponent{
    state={showDrawer:false}
    render(){
        const {active, docs, setActive, close,zoom=0.3}=this.props
        let {showDrawer}=this.state
		let drawer=null
		if(showDrawer){
			drawer=<Dashboard dispear={()=>this.setState({showDrawer:false})}/>
		}

		let closeButton=null
		
		if(docs.length>0){
			closeButton=(
				<IconButton onClick={close}>
					<IconClose/>
				</IconButton>
			)
		}
		
		return (
			<div>
				<Zoom scale={zoom}>
					<AppBar
						title="we edit"
						iconElementRight={
							<div>
								<ComboBox
									disabled={active==null}
									value={active ? active.id : ""}
									dataSource={docs.map(({doc:{id:value,name:text}})=>({text,value}))}
									onChange={setActive}
									underlineShow={false}
									style={{width:100}}
									/>
								{closeButton}
							</div>
						}
						onLeftIconButtonTouchTap={()=>this.setState({showDrawer:!this.state.showDrawer})}
						/>
				</Zoom>
				{drawer}
			</div>
        )
    }
}

export default compose(
    setDisplayName("AppBar"),
    getContext({
        store:PropTypes.object,
    }),
    mapProps(({store:{dispatch}, zoom})=>({
        setActive(id){
            dispatch(ACTION.ACTIVE(id))
        },
        close(){
            dispatch(ACTION.CLOSE())
        },
        zoom
    })),
    connect(({"we-edit":{active,docs}})=>({
        active:active ? docs[active] : undefined,
        docs:Object.keys(docs).map(k=>docs[k])
    }))
)(Bar)
