import React,{Fragment, PureComponent} from "react"

import {ACTION, whenSelectionChangeDiscardable,dom} from "we-edit"
import {Path, Composed} from "we-edit-representation-pagination"
import {ToolbarGroup, SvgIcon} from "material-ui"
import IconShape from "material-ui/svg-icons/editor/show-chart"
import memoize from "memoize-one"

import {compose,setDisplayName} from "recompose"

import DropDownButton from "../components/drop-down-button"

const {Shape}=dom, IconGeometry=Object.freeze(Path.fromRect({width:24,height:24}))
export default compose(
    setDisplayName("DrawShape"),
    whenSelectionChangeDiscardable(),
)(class DrawShape extends PureComponent{
    constructor(){
        super(...arguments)
        this.scrible=this.scrible.bind(this)
        this.scrible.props={route:true}
    }
    render(){
        const {props:{children, shapes=[]}}=this
        return (
            <ToolbarGroup>
                <DropDownButton hint="draw shape" icon={<IconShape/>} onClick={e=>this.send(this.scrible)}>
                    {this.shapes(shapes)}
                </DropDownButton>
                {React.Children.toArray(children).map((a,key)=>{
                    return React.cloneElement(a,{key,onClick:e=>this.send(a.props.create),create:undefined})
                })}
            </ToolbarGroup>
        )
    }

    shapes=memoize((shapes)=>{
        return shapes.map(({name,children})=>{
            const icons=children.map(a=>{
                const icon=a({motionRoute:IconGeometry})
                if(!icon)
                    return null
                const {props:{outline,fill, geometry},type}=icon
                return (
                    <SvgIcon key={a.name} title={a.name} onClick={e=>this.send(a)}
                        viewBox="-6 -6 36 36" 
                        style={{border:"1px solid transparent", borderRadius:2}}
                        onMouseEnter={e=>e.currentTarget.style.borderColor="lightgray"} 
                        onMouseLeave={e=>e.currentTarget.style.borderColor="transparent"}>
                        {type==dom.Shape ? <Composed.Shape {...outline} fille={fill} d={geometry.toString()}/> : icon}
                    </SvgIcon>
                )
            }).filter(a=>!!a)
            return icons.length && (
                <div key={name}>
                    <div style={{background:"lightgray",border:"outset 1px solid", fontSize:"smaller",paddingLeft:4,marginBottom:2}}>{name}</div>
                    <div style={{paddingLeft:2}}>{icons}</div>
                </div>
            )
        })
    })

    send(fn){
        const {props:{selection:{positioning},dispatch,anchor}}=this
        dispatch(ACTION.UI({
            draw:(
                <Shape.OverlayWhenMouseDown {...fn.props}
                    onMouseUp={e=>{
                        dispatch(ACTION.UI({draw:null}))
                        fn(e,{positioning,dispatch,anchor})
                    }}>
                {(overlay)=>{
                    if(!overlay.state.down)
                        return <rect style={{width:"100%",height:"100%",fill:"transparent", cursor:"crosshair",opacity:0.6}}/>
                    return fn(overlay)
                }}
            </Shape.OverlayWhenMouseDown>
            )
        }))
    }

    scrible({motionRoute:geometry},{positioning,dispatch,anchor}={}){
        if(!positioning)
            return <Shape {...{geometry:geometry.toString(), outline:{width:1,color:"green"}}}/>
        const {left,top,right,bottom,width=right-left,height=bottom-top}=geometry.bounds()
        if(Math.abs(width*height)<1){
            return 
        }
        dispatch(ACTION.Entity.CREATE({
            type:'shape',kind:'scrible',
            geometry,
            size:{width,height}, 
            ...anchor({x:left,y:top},positioning),
        }))
    }
})