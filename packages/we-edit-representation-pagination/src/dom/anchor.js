import React, { Fragment } from "react"
import {Group} from "../composed"

import {HasParentAndChild} from "../composable"
import {dom,ReactQuery} from "we-edit"
import Path from "../tool/path"

/**
* xy for Positioning
* wrap boundary must be provided by children content, and then pass to frame
*/
export default class Anchor extends HasParentAndChild(dom.Anchor){
    onAllChildrenComposed(){
        if(React.Children.toArray(this.props.children).length==0){
            this.context.parent.appendComposed(this.createComposed2Parent())
        }
        super.onAllChildrenComposed()
    }

    createComposed2Parent(content){
        const {width, height, geometry: contentGeometry}=content?.props||{}
        const {x:X, y:Y,wrap:{mode, geometry:anchorGeometry, geometryFn=(a,{x,y})=>a?.clone().translate(x,y)}={}}=this.props
        const _geometry=anchorGeometry||contentGeometry||Path.fromRect({width,height})
        const size=_geometry?.size()||{x:0,y:0}
        const anchorX={align:"left", base:"closest", ...(typeof(X)=="object" ? X : {offset:X})}
        const anchorY={align:"top", base:"closest", ...(typeof(Y)=="object" ? Y : {offset:Y})}
        return (
            <Group children={content}
                anchor={space=>{
                    const x=space.anchor(anchorX,size,space)
                    const y=space.anchor(anchorY,size,space)
                    const geometry=geometryFn(_geometry, {x,y})
                    
                    const wrapFunc=(fn=>{
                        if(typeof(this.props.wrap)=="function"){
                            return line=>this.props.wrap.call(this, line, {x,y})
                        }
                        return fn ? line=>fn.call(this, line, geometry?.clone()) : null
                    })(this[mode]);
                    const {left=0,right=0,top=0,bottom=0}=geometry?.bounds()||{}
                    return (
                        <Group {...{
                            x,y,
                            wrap:wrapFunc,
                            geometry:{x:left,y:top,width:right-left,height:bottom-top},
                            "data-content":this.props.id,"data-type":this.getComposeType()}}
                            children={content && this.fromInlineMode2AnchorMode(content)}
                            />
                    )
                }
            }
            />
        )
    }

    fromInlineMode2AnchorMode(content){
        const $=new ReactQuery(content)
        const inline=$.findFirst('[data-anchorable]').get(0)
        return inline ? $.replace(inline,inline.props.children).get(0) : content
    }

    /**
     * 
     * @param {*} x1 
     * @param {*} x2 
     * @param {*} x 
     * @param {*} X 
     * @returns 
     */
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

    square({x1,x2,y2,y1},geometry){
        const {left,top,right,bottom}=geometry.bounds()
        if(y1>=bottom || y2<=top || x2<=left || x1>=right)
            return 
        return Object.assign(this.applySide(x1,x2,left, right),{y:bottom})
    }

    tight(line,geometry){
        const {x1,x2, y2}=line
        const points=geometry.intersects({x1,x2,y2,y1:y2}).sort((a,b)=>a.x-b.x)
        if(points.length>2){
            points.splice(1,points.length-1-1)
        }
        if(points.length>0){
            return this.applySide(x1,x2,points[0].x,points.pop().x)
        }
    }

    clear({x1,x2,y2, y1},geometry){
        const {top,bottom}=geometry.bounds()
        if(y1>=bottom || y2<=top)
            return 
        return {x:x1,width:x2-x1,y:bottom,type:"clear"}
    }
}
