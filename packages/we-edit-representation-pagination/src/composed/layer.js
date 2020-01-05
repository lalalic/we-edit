import React, {Component, Fragment, Children} from "react"
import PropTypes from "prop-types"
import {connect,getSelectionStyle} from "we-edit"
import Group from "./group"

export default class Layer extends Component{
    static displayName="layer"
    static propTypes={
        z:PropTypes.number,
        active: PropTypes.bool,
    }

    render(){
        const {active=true,children}=this.props
        if(!active){
            return (
                <Group style={{opacity:0.4}} onDoubleClick={e=>e}>
                    {children}
                </Group>
            )
        }

        return (<Group>{children}</Group>)
    }

    static Container=connect(state=>{
        const selectionStyle=getSelectionStyle(state)
        if(!selectionStyle)
            return {}
        const props=selectionStyle.pageProps()
        const active=props ? props.layer : undefined
        return {active}
    })(class LayerContainer extends Component{
        static contextTypes={
            editable: PropTypes.any
        }
        render(){
            if(!this.context.editable){
                return <Fragment>{this.props.children}</Fragment>
            }
            const {active}=this.props
            const children=Children.toArray(this.props.children).filter(a=>!!a).sort(({props:a},{props:b})=>a.z-b.z)
            return (
                <Fragment>
                    {[
                        ...children.filter(a=>a.props.z!=active).map(a=>React.cloneElement(a, {active:false})),
                        children.find(a=>a.props.z==active)
                    ].filter(a=>!!a)}
                </Fragment>
            )
        }
    })
}