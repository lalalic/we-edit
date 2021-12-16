import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {Paper, ToolbarGroup} from "material-ui"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {MenuItem, Menu} from "./menu"

export default class OfficeContextMenu extends Component{
    render(){
        return (
            <MuiThemeProvider muiTheme={getMuiTheme({menuItem:{height:"auto",dataHeight:"auto"}})}>
                <Paper style={{display: 'inline-block',textAlign:"initial"}}>
                    <Menu style={{minWidth:"200px"}} {...this.props}/>
                </Paper>
            </MuiThemeProvider>
        )  
    }

    static Support=class ToolbarTransformer extends Component{
        static contextTypes={
            isContextMenu:PropTypes.bool
        }
    
        render(){
            if(!this.context.isContextMenu)
                return this.props.children

            if(this.props.menus!==undefined)
                return this.props.menus

            let {children}=this.props
            if(children?.type==ToolbarGroup)
                children=children.props.children
                
            const items=React.Children.toArray(children)
                .filter(({props:{onClick, label}})=>onClick && label)
            return (
                <Fragment>
                    {items.map(({props:{onClick,label:key,status,shortcut:secondaryText, disabled=status=="disabled"}})=>(
                        <MenuItem {...{key, primaryText:key, onClick, disabled,secondaryText}}/>
                    ))}
                </Fragment>
            )
        }
    }
}