import React from "react"
import {dom, ACTION} from "we-edit"
import Active from "./when-active"
import Create from "./create"
import SelectStyle from "../components/select-style"
import PropTypesUI from "../components/prop-types-ui"


export default Object.assign(Active,{Create})

export const Setting=({})=>(
    <SelectStyle type="shape">
        {({style,dispatch})=>(
            <PropTypesUI theme="Shape" uiDialog="dialog"
                propTypes={dom.Shape.propTypes} props={style} 
                onChange={change=>dispatch(ACTION.Entity.UPDATE({shape:change}))}/>
        )}
    </SelectStyle>
)


