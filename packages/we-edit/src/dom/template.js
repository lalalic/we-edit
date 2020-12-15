import React from "react"
import PropTypes from "prop-types"
import Unknown from "./component"

export default class Template extends Unknown{
    static displayName="template"
    static Use=({xhref, varables})=>null
    
    static propTypes={
        xhref: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        master: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }

    static childContextTypes={
        notifyVariable: PropTypes.func
    }

    static Manager=React.Fragment
}
