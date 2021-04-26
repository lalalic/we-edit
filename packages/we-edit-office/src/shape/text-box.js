import React, {} from "react"
import {dom, ACTION} from "we-edit"
import CheckIconButton from "../components/check-icon-button"
import IconTextBox from "material-ui/svg-icons/editor/format-shapes"

function rect({motionRoute:geometry}, {positioning, anchor,dispatch,type="shape",shapeProps, frameProps, anchorProps}={}){
    const {left,top,right,bottom, w=right-left, h=bottom-top}=geometry.bounds()
    if(!positioning){
        return <dom.Shape geometry={`M${left} ${top} h${w} v${h} h${-w}z`} {...shapeProps}/>
    }
    dispatch(ACTION.Entity.CREATE({
        type,
        shape:{
            ...shapeProps,
            fill:undefined,//not fill
            kind:"rect",        
            geometry:geometry.boundRect().translate(-left,-top),
        },
        frame:frameProps,
        anchor: {
            ...anchorProps,
            ...anchor({x:left,y:top},positioning),
        },
    }))
}

export default (
    <CheckIconButton 
        hint="text box" 
        create={(e,props)=>rect(e,{...props, type:"textbox"})}>
        <IconTextBox/>
    </CheckIconButton>
)