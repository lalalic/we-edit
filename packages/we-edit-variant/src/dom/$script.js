import React from "react"
import PropTypes from "prop-types"

import $ from "./$"


export default Components=>class extends ${
    static displayName="$script"
    static propTypes={
        script: PropTypes.string.isRequired
    }

    static defaultProps={
        script:""
    }


    render(){
        if(this.canAssemble){
            this.eval(this.props.script, this.context.variantContext)
        }

        return null
    }
}
