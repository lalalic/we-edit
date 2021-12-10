import React from "react"
import PropTypes from "prop-types"
import DropDownButton from "../../drop-down-button"

export default class ShapeAsMenu extends React.Component{
    static displayName="ShapeAsMenu"
    static childContextTypes={
        uiContext: PropTypes.string
    }

    getChildContext(){
        return {
            uiContext:"Menu"
        }
    }

    render(){
        const {children, shape:{props:{name,label=name, icon, onClick}}}=this.props
        return (
            <DropDownButton
                onClick={onClick}
                icon={icon}
                hint={label}>
                {children}
            </DropDownButton>
        )
    }
}