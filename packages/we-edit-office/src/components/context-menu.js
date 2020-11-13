import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {ContextMenu} from "we-edit"
import {MenuItem, Paper, Menu} from "material-ui"

export default class OfficeContextMenu extends Component{
    render(){
        return (
            <ContextMenu>
                <Paper style={{display: 'inline-block'}}>
                    <Menu style={{minWidth:"200px"}}>
                        {this.props.children}
                    </Menu>
                </Paper>
            </ContextMenu>  
        )  
    }

    static Support=class ToolbarTransformer extends Component{
        static contextTypes={
            isContextMenu:PropTypes.bool
        }
    
        render(){
            if(!this.context.isContextMenu)
                return this.props.children
    
            const {children:{props:{children}}}=this.props
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