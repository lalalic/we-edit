import React,{Component} from "react"
import {Geometry} from "we-edit-representation-pagination"
export default ({Anchor})=>class __$1 extends Component{
	static displayName="anchor"
	render(){
		const {distance, effectExtent, wrap:{distance:_, path}, x, y,width,height,...props}=this.props

        switch(x.base){
        case "leftMargin":
            x.base="margin"
            x.align="left"
            break
        case "rightMargin":
            x.base="margin"
            x.align="right"
            break
        }

        switch(y.base){
        case "topMargin":
            y.base="margin"
            y.align="top"
            break
        case "bottomMargin":
            y.base="margin"
            y.align="bottom"
            break
        }

        return <Anchor {...props} {...{
            x,y,
            wrap:{
                mode:this.mode,
                side:this.side,
                distance:this.distance,
                geometry: Geometry.create({width,height}),
            }
        }}/>
	}

    get distance(){
        const {
            distance:{left:dl=0,right:dr=0,top:dt=0,bottom:db=0}={}, 
        }=this.props
        return (geometry,{x,y}={})=>{
            return {
                geometry:geometry.clone().translate(x,y),
                bounds(){
                    const {left,right,top,bottom}=this.geometry.bounds()
                    return {left:left-dl,right:right+dr,top:top-dt,bottom:bottom+db}
                },

                intersects(){
                    const segs=this.geometry.intersects(...arguments)
                    segs.length>0 && (segs[0].x-=dl);
                    segs.length>1 && (segs[segs.length-1].x+=dr);
                    return segs
                },

                clone(){
                    return {
                        ...this,
                        geometry:this.geometry.clone()
                    }
                }
            }
        }
    }

    get mode(){
        const {wrap:{mode}}=this.props
        return MODE[mode]||"no"
    }

    get side(){
        const {wrap:{side}}=this.props
        return SIDE[side]||"both"
    }
}

const MODE={
    Square:"square",
    Tight:"tight",
    Through:"tight",
    TopAndBottom:"clear",
    Clear:"clear",
}

const SIDE={
    bothSides:"both",
}