import React from "react"
import PropTypes from "prop-types"
import Unknown from "./component"

export default class Template extends Unknown{
    static displayName="template"
    static Use=({template})=>null
    
    static propTypes={
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        master: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }
}
