import React, {Component, Fragment, Children} from "react"
import PropTypes from "prop-types"
import {whenSelectionChange} from "we-edit"
import Group from "./group"

export default class Layer extends Component{
    static displayName="layer"
    static propTypes={
        z:PropTypes.number,
        active: PropTypes.bool,
    }

    render(){
        const {active=true,style, children, areas=[]}=this.props
        const Ignore=e=>{
            e.stopPropagation()
            e.preventDefault()
            return false
        }
        const ignoreEvents="onClick,onMouseDown,onMouseMove,onMouseUp,onContextMenu".split(",").reduce((o,k)=>(o[k]=Ignore,o),{})
        if(!active){
            return (
                <Group style={style}>
                    {children}
                    {areas.map(a=>{
                        return React.cloneElement(a,{
                            ...ignoreEvents,
                            onDoubleClick:e=>{
                                e.stopPropagation()
                                const click=new MouseEvent('click',{bubbles:true,cancelable:true,clientX:e.clientX,clientY:e.clientY})
                                e.target.viewportElement.dispatchEvent(click)
                            }
                        })
                    })}
                </Group>
            )
        }

        return (<Group>{children}</Group>)
    }

    static Container=whenSelectionChange(({selection})=>{
        if(!selection)
            return {}
        const props=selection.props("page")
        const active=props?.layer
        return {active}
    })(class LayerContainer extends Component{
        static contextTypes={
            editable: PropTypes.any
        }
        render(){
            if(!this.context.editable){
                return <Fragment>{this.props.children}</Fragment>
            }
            const {active, activeStyle, inactiveStyle}=this.props
            const children=Children.toArray(this.props.children).filter(a=>!!a).sort(({props:a},{props:b})=>a.z-b.z)
            const inactiveLayers=children.filter(a=>a.props.z!=active).map(a=>React.cloneElement(a, {active:false,style:inactiveStyle}))
            const activeLayers=children.filter(a=>a.props.z==active).map(a=>React.cloneElement(a, {active:true,style:activeStyle}))
            return (
                <Fragment>
                    {inactiveLayers}
                    {activeLayers}
                </Fragment>
            )
        }
    })
}