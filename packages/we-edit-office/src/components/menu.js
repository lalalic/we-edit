import React, { Component } from "react"
import PropTypes from "prop-types"
import {Menu as Menu0, MenuItem as MenuItem0} from "material-ui"
/*
 * 1. Any MenuItem click should notify top Menu, so top Menu can close all
 * >>>MenuItem call most farest context.onMenuItemClick()
 * 2. MenuItem with menuItems should auto show sub items,
 * >>>onMouseOver -> click -> show 
 * 3.  subItems should hiden when change focus
 * >>>Menu has one focus
 * 
 */


export class Menu extends Component{
    static contextTypes={
        notifyMenuItemClick: PropTypes.func,
    }
    static childContextTypes={
        ...this.contextTypes,
        uiContext: PropTypes.string,
        notifyMenuItemOver:PropTypes.func,
    }

    constructor(){
        super(...arguments)
        this.notifyMenuItemClick=this.notifyMenuItemClick.bind(this)
        this.notifyMenuItemOver=this.notifyMenuItemOver.bind(this)
        this.state={open:true,}
    }

    getChildContext(){
        return {
            notifyMenuItemClick: this.context.notifyMenuItemClick || this.notifyMenuItemClick,
            notifyMenuItemOver: this.notifyMenuItemOver.bind(this),
            uiContext:"Menu",
        }
    }

    notifyMenuItemClick(e){
        return this.setState({open:false})
    }

    notifyMenuItemOver(item){
        if(this.focus!==item){
            this.focus?.setState({open:false})
            this.focus=item
        }
    }

    render(){
        const {open}=this.state
        return open ? <Menu0 {...this.props}/> : null
    }
}

export class MenuItem extends Component{
    static contextTypes=Menu.childContextTypes
    static childContextTypes={
        notifyMenuItemOver: PropTypes.func,
    }
    getChildContext(){
        return {
            notifyMenuItemOver:null,
        }
    }
    render(){
        const {onClick,onMouseOver,...props}=this.props     
        return <MenuItem0 {...props} 
                onClick={e=>{
                    if(!props.menuItems)
                        this.context.notifyMenuItemClick(e)
                    onClick?.(e)
                }}
                onMouseOver={e=>{
                    if(props.menuItems){
                        e.currentTarget.click()
                    }
                    this.context.notifyMenuItemOver?.(this)
                    onMouseOver?.()
                }}
                />
    }
}
