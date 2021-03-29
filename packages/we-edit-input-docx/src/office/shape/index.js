import React, {} from "react"
import {dom, ACTION} from "we-edit"
import {Ribbon} from "we-edit-office"
import IconTextBox from "material-ui/svg-icons/editor/format-shapes"

const Shape=dom.Shape

function rect({motionRoute:geometry}, {positioning, anchor,dispatch,type="shape"}={}){
    const {left,top,right,bottom, w=right-left, h=bottom-top}=geometry.bounds()
    if(!positioning)
        return <Shape geometry={`M${left} ${top} h${w} v${h} h${-w}z`} outline={{width:1,color:"green"}}/>
    dispatch(ACTION.Entity.CREATE({
        type,
        kind:"rect",
        geometry,
        ...anchor({x:left,y:top},positioning),
    }))
}

export const shapes=[
    {name:"Lines", children:[
        function line({motionRoute:geometry}, {positioning, anchor,dispatch}={}){
            const {left,top,right,bottom}=geometry.bounds()
            if(!positioning)
                return <Shape geometry={`M${left} ${top} L${right} ${bottom}`} outline={{width:1,color:"green"}}/>
            
            dispatch(ACTION.Entity.CREATE({
                type:'shape',kind:'line',
                geometry,
                ...anchor({x:left,y:top},positioning),
            }))
        },

        function scrible({}){

        }
    ]},
    {name:"Rects", children:[
        rect,
        function roundRect({motionRoute:geometry, target}, {positioning, anchor,dispatch}={}){
            const {left,top,right,bottom, w=right-left, h=bottom-top}=geometry.bounds()
            if(!positioning){
                if(!target){
                    return <rect {...{width:w,height:h,rx:5,ry:5,fill:"none",stroke:"green",strokeWidth:1}}/>
                }
                return <Shape geometry={`M${left} ${top} h${w} v${h} h${-w}z`} outline={{width:1,color:"green"}}/>
            }
                
            dispatch(ACTION.Entity.CREATE({
                type:'shape',kind:"rect",
                geometry,
                ...anchor({x,y},positioning),
            }))
        },
    ]},
    {name:"basic", children:[

    ]},
    {name:"flowchart",children:[

    ]},
]

export const textbox=(
    <Ribbon.CheckIconButton hint="text box" 
        create={(e,props)=>rect(e,{...props,type:"textbox"})}>
        <IconTextBox/>
    </Ribbon.CheckIconButton>
)