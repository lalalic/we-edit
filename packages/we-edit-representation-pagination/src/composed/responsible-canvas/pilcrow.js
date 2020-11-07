import React from "react"
import {connect, getUI} from "we-edit"

export default connect(state=>({pilcrow:getUI(state).pilcrow}))(({pilcrow, canvas})=>(
    <style>{!pilcrow && `#${canvas} .ender,#${canvas} .__ender{visibility:hidden}`}</style>
))
