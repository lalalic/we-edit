import React,{Fragment, PureComponent} from "react"
import PropTypes from "prop-types"
import {ACTION, whenSelectionChangeDiscardable,dom} from "we-edit"
import {Path, Composed} from "we-edit-representation-pagination"
import {ToolbarGroup, SvgIcon, MenuItem} from "material-ui"
import IconShape from "material-ui/svg-icons/editor/show-chart"
import memoize from "memoize-one"

import {compose,setDisplayName} from "recompose"

import DropDownButton from "../components/drop-down-button"
import ContextMenu from "../components/context-menu"
import Setting from "./panel"

const {Shape}=dom, IconGeometry=Object.freeze(Path.fromRect({width:24,height:24}))
export default compose(
    setDisplayName("DrawShape"),
    whenSelectionChangeDiscardable(({selection})=>{
		if(selection){
            const shape=selection.props("shape",false)
            const image=selection.props("image",false)
			return {style:image||shape, type:image ? "Image" : "Shape"}
        }
		return {}
	}),
)(class DrawShape extends PureComponent{
    static contextTypes = {
        panelManager: PropTypes.any,
    }
    render(){
        const {props:{children, shapes=[], defaultShape, style, type}}=this
        return (
            <ContextMenu.Support menus={!style ? null :
                <MenuItem primaryText={`Format ${type}...`} onClick={e=>this.context.panelManager.toggle(Setting.panel)}/>
            }>
                <ToolbarGroup>
                    <DropDownButton hint="draw shape" icon={<IconShape/>}
                        onClick={defaultShape ? e=>this.send(defaultShape) : null}>
                        {this.shapes(shapes)}
                    </DropDownButton>
                    {React.Children.toArray(children).map((a,key)=>{
                        return React.cloneElement(a,{key,onClick:e=>this.send(a.props.create),create:undefined})
                    })}
                </ToolbarGroup>
            </ContextMenu.Support>
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
})
