import React,{PureComponent} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName, getContext, mapProps} from "recompose"

import {Toolbar, AppBar,IconButton,Drawer,Menu,MenuItem,Popover,FlatButton} from "material-ui"
import IconClose from "material-ui/svg-icons/navigation/close"
import IconFiles from "material-ui/svg-icons/navigation/arrow-drop-down"

import Dashboard from "we-edit-ui/dashboard"

import {ACTION} from "we-edit-ui"


export class Bar extends PureComponent{
    state={showDrawer:false, showFiles:false}
    render(){
        const {active, docs, setActive, close,zoom=0.3}=this.props
        let {showDrawer,showFiles, fileAnchor}=this.state
		let drawer=null
		if(showDrawer){
			drawer=<Dashboard dispear={()=>this.setState({showDrawer:false})}/>
		}

		let currentFile=null
		if(active){
			currentFile=(
				<FlatButton
					icon={<IconFiles style={{visibility: docs.length>1 ? "inherit" : "hidden"}}/>}
					label={active.doc.name}
					labelPosition="before"
					onClick={e=>docs.length>1 && this.setState({showFiles:true,fileAnchor:this.refs.anchor}) }/>
			)
		}

		let files=null
		if(showFiles && docs.length>1){
			files=(
				<Popover
                    anchorEl={fileAnchor}
					anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
					targetOrigin={{ vertical: 'top', horizontal: 'right',}}
					onRequestClose={()=>this.setState({showFiles:false,fileAnchor:undefined})}
					open={true}>
					<Menu>
						{docs.map(({id,doc})=>(
							<MenuItem key={id}
								onClick={()=>{
									setActive(id)
									this.setState({showFiles:false,fileAnchor:undefined})
								}}
								primaryText={doc.name}/>
						))}
					</Menu>
				</Popover>
			)
		}

        return (
            <div>
                <AppBar
                    style={{zoom}}
                    title="we edit"
                    iconElementRight={
                        <div>
                            {currentFile}
                            <IconButton onClick={close}>
                                <IconClose/>
                            </IconButton>
                        </div>
                    }
                    onLeftIconButtonTouchTap={()=>this.setState({showDrawer:!this.state.showDrawer})}
                    />
                <div ref="anchor" style={{height:0.1}}></div>
                {drawer}
                {files}
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
    connect(({active,docs})=>({
        active:active ? docs[active] : undefined,
        docs:Object.keys(docs).map(k=>docs[k])
    }))
)(Bar)
