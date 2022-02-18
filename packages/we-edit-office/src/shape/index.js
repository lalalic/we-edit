import React from "react"
import {dom, ACTION} from "we-edit"
import Active from "./when-active"
import Create from "./create"
import SelectStyle from "../components/select-style"
import PropTypesUI from "../components/prop-types-ui"


export default Object.assign(Active,{Create})

export const Setting=({})=>(
    <SelectStyle target="shape">
        {({style,dispatch})=>(
            <PropTypesUI theme="Shape" props={style} 
                propTypes={dom.Shape.propTypes} 
                onChange={change=>dispatch(ACTION.Entity.UPDATE({shape:change}))}/>
        )}
    </SelectStyle>
)

export const TextFrameSetting=({})=>(
    <SelectStyle target="frame">
        {({style,dispatch})=>(
            <PropTypesUI theme="Frame" props={style} 
                propTypes={dom.Frame.propTypes} 
                onChange={change=>dispatch(ACTION.Entity.UPDATE({frame:change}))}/>
        )}
    </SelectStyle>
)


