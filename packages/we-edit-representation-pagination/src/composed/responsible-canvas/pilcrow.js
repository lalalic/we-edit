import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {connect, getUI} from "we-edit"

export default connect(state=>({pilcrow:getUI(state).pilcrow}))(
class extends PureComponent{
    static contextTypes={
        hintMeasure: PropTypes.object
    }
    render(){
        const {pilcrow, canvas}=this.props
        return (
            <style>
                {`
                    #${canvas} text[data-type="text"]{
                        user-select: none;
                        white-space: pre;
                        cursor:text;
                    }
                    #${canvas} .ender,#${canvas} .__ender {
                        fill:deepskyblue;
                        font-family: ${this.context.hintMeasure.style.fonts} !important;
                    }
                `}
                {!pilcrow && `#${canvas} .ender,#${canvas} .__ender{visibility:hidden}`}
            </style>
        )
    }
})
