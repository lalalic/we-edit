import React from "react"
import {connect, getUI} from "we-edit"

export default connect(state=>({pilcrow:getUI(state).pilcrow}))(({pilcrow, canvas})=>(
    <style>
        {`
            #${canvas} text[data-type="text"]{
                user-select: none;
                white-space: pre;
                cursor:text;
            }
            #${canvas} .ender,#${canvas} .__ender {
                fill:deepskyblue;
                font-family: Arial !important;
            }
        `}
        {!pilcrow && `#${canvas} .ender,#${canvas} .__ender{visibility:hidden}`}
    </style>
))
