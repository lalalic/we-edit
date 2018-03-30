import React, {Component,} from "react"
import PropTypes from "prop-types"


export default class Overlay extends Component{
    static contextTypes={
		query: PropTypes.func
	}

    render(){
        let $=this.context.query()
        let {width,height}=$.svg

        let props={x:0,y:0,width,height,fill:"transparent"}
        let {children,...others}=this.props
        return (
            <g>
                {children}
                <rect {...props} {...others}/>
            </g>
        )
    }
}
