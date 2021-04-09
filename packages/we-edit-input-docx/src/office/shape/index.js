import React, {} from "react"
import {dom, ACTION} from "we-edit"
import {Ribbon} from "we-edit-office"
import IconTextBox from "material-ui/svg-icons/editor/format-shapes"

const Shape=dom.Shape

function rect({motionRoute:geometry}, {positioning, anchor,dispatch,type="shape"}={}){
    const {left,top,right,bottom, w=right-left, h=bottom-top}=geometry.bounds()
    if(!positioning){
        return <Shape geometry={`M${left} ${top} h${w} v${h} h${-w}z`} outline={{width:1,color:"green"}}/>
    }
    dispatch(ACTION.Entity.CREATE({
        type,
        kind:"rect",
        geometry,
        ...anchor({x:left,y:top},positioning),
    }))
}

function scribble({motionRoute:geometry, target},{positioning,dispatch,anchor}={}){
    if(!positioning){
        if(!target){
            return <Shape outline={{width:1,color:"green"}} geometry="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"/>
        }
        return <Shape {...{geometry:geometry.toString(), outline:{width:1,color:"green"}}}/>
    }
    const {left,top,right,bottom,width=right-left,height=bottom-top}=geometry.bounds()
    
    geometry.translate(-left,-top)
    dispatch(ACTION.Entity.CREATE({
        type:'shape',kind:'scribble',
        geometry,
        size:{width,height}, 
        ...anchor({x:left,y:top},positioning),
    }))
}
scribble.props={route:true}

export const shapes=[
    {name:"Lines", children:[
        function line({motionRoute:geometry}, {positioning, anchor,dispatch}={}){
            const {left,top,right,bottom}=geometry.bounds()
            if(!positioning)
                return <Shape geometry={`M${left} ${top} L${right} ${bottom}`} outline={{width:1,color:"green"}}/>
            
            geometry.translate(-left,-top)
            dispatch(ACTION.Entity.CREATE({
                type:'shape',kind:'line',
                geometry,
                ...anchor({x:left,y:top},positioning),
            }))
        },

        scribble,

        Object.assign(function closedScribble({motionRoute:geometry, target},{positioning,dispatch,anchor}={}){
            if(!positioning){
                if(!target){
                    return <Shape outline={{width:1,color:"green"}} geometry="M4.5,8c1.04,0,2.34-1.5,4.25-1.5c1.52,0,2.75,1.23,2.75,2.75c0,2.04-1.99,3.15-3.91,4.22C5.42,14.67,4,15.57,4,17 c0,1.1,0.9,2,2,2v2c-2.21,0-4-1.79-4-4c0-2.71,2.56-4.14,4.62-5.28c1.42-0.79,2.88-1.6,2.88-2.47c0-0.41-0.34-0.75-0.75-0.75 C7.5,8.5,6.25,10,4.5,10C3.12,10,2,8.88,2,7.5C2,5.45,4.17,2.83,5,2l1.41,1.41C5.41,4.42,4,6.43,4,7.5C4,7.78,4.22,8,4.5,8z M8,21 l3.75,0l8.06-8.06l-3.75-3.75L8,17.25L8,21z M20.37,6.29c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83 c0.39-0.39,0.39-1.02,0-1.41L20.37,6.29z"/>
                }
                return <Shape {...{geometry:geometry.toString()+"Z", outline:{width:1,color:"green"}}}/>
            }
            const {left,top,right,bottom,width=right-left,height=bottom-top}=geometry.bounds()
            
            geometry.translate(-left,-top)
            dispatch(ACTION.Entity.CREATE({
                type:'shape',kind:'closedScribble',
                geometry,
                size:{width,height}, 
                ...anchor({x:left,y:top},positioning),
            }))
        },{props:{route:true}})
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

export const defaultShape=rect