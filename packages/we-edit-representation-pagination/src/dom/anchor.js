import React from "react"
import {Group} from "../composed"

import {HasParentAndChild} from "../composable"
import {dom} from "we-edit"

/**
* xy for Positioning
* wrap boundary must be provided by children content, and then pass to frame
*/
export default class Anchor extends HasParentAndChild(dom.Anchor){
    createComposed2Parent(content){
        var {width,height,geometry}=content.props
        const {
            margin:{left=0,right=0,top=0,bottom=0}={}, 
            wrap:{mode,wrap,path,distance:{left:dl=0,right:dr=0,top:dt=0,bottom:db=0}={}}, 
            x:X, y:Y
        }=this.props
        this.width=width+=(left+dl+dr+right)
        this.height=height+=(top+bottom+dt+db)
        return (
            <Group children={content}
                anchor={space=>{
                    const size={width:this.width, height:this.height}  
                    var x=space.anchor({align:"left",...X},size,space)
                    var y=space.anchor({align:"top",...Y},size,space)
                    
                    x=x-left-dl, y=y-top-dt
                    if(geometry && geometry.origin){
                        x-=geometry.origin.x
                        y-=geometry.origin.y
                    }

                    const wrapFunc=(fn=>{
                        if(!fn)
                            return 
                        if(mode=="square" || mode=="clear")
                            return line=>fn.call(this, line, {bounds:()=>({left:x,top:y,right:x+width,bottom:y+height})})
                        return line=>fn.call(this, line, geometry.clone().translate(x,y))
                    })(wrap||this[mode]);

                    return (
                        <Group {...{
                            x,y,
                            wrap:wrapFunc,
                            geometry:{x,y,width,height},
                            "data-content":this.props.id,"data-type":this.getComposeType()}}>
                            <Group x={left+dl} y={top+dt}>
                                {content}
                            </Group>
                        </Group>
                    )
                }
            }
            />
        )
    }

    applySide(x1,x2, x, X){
        const {wrap:{side}}=this.props
        const get=type=>{
            switch(type){
            case "left":
                return {x,width:x2-x}
            case "right":
                return {x:x1,width:X-x1}
            case "largest":
                return get((x-x1)>=(x2-X) ? "left" : "right")
            case "both":
            default:
                return {x, width:X-x}
            }
        }

        return get(side)
    }

    square({x1,x2,y2:y,y1=y},geometry){
        const {wrap:{mode, wrapText},margin:{right:mr=0, left:ml=0}={}}=this.props
        const {left,top,right,bottom}=geometry.bounds()
        if(y>=top && y<=bottom){
            if(!(x2<=left || x1>=right)){
                if(y1!==bottom){
                    return Object.assign(this.applySide(x1,x2,left-ml, right+mr),{y:bottom})
                }
            }
        }
    }

    tight(line,geometry){
        const {margin:{left=0,right=0}}=this.props
        const {x1,x2, y2}=line
        const points=geometry.intersects({x1,x2,y2,y1:y2}).sort((a,b)=>a.x-b.x)
        if(points.length>2){
            points.splice(1,points.length-1-1)
        }
        if(points.length>0){
            return this.applySide(x1,x2,points[0].x-left,points.pop().x+right)
        }
    }

    clear({x1,x2,y2:y, y1=y},geometry){
        const {left,top,right,bottom}=geometry.bounds()
        if(y>=top && y<=bottom){
            if(y1!==bottom){
                return {x:x1,width:x2-x1,y:bottom,type:"clear"}
            }
        }
    }
}
