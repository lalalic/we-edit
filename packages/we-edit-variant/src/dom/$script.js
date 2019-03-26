import React from "react"
import PropTypes from "prop-types"

import Component from "./$"


export default Components=>class extends Component{
    static displayName="$script"
    static propTypes={
        script: PropTypes.string.isRequired
    }

    static defaultProps={
        script:""
    }


    render(){
        if(this.canAssemble){

        }

        return null
    }
}
