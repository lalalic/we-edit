import React from "react"
import PropTypes from "prop-types"

export default Object.assign(({children, getValue},{variables:{I}={}})=>React.cloneElement(children,{children:getValue(I)}),{
    contextTypes:{
        variables: PropTypes.object
    }
})