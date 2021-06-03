import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

export default ({Anchor, Shape, Frame})=>class __$1 extends Component{
    static displayName="shape"
    static contextTypes={
        defaultStyles:PropTypes.object
    }

    render(){
        return <Shape {...this.props}/>
        const {anchorProps, frameProps, children,id, ...shapeProps}=this.extractedProps
        const content=frameProps&& children && <Frame {...frameProps} id={`${id}-frame`}>{children}</Frame>
        const shape=<Shape {...shapeProps} id={id}>{content}</Shape>
        if(anchorProps){
            return <Anchor {...anchorProps} id={`${id}-anchor`}>{shape}</Anchor>
        }
        return shape
    }

    get extractedProps(){
        let {anchorProps, frameProps, children, geometry, ...props}=this.props
        const extract=propTypes=>{
            const targetProps=Object.keys(propTypes)
                .reduce((targetProps, key)=>{
                    if(key in props){
                        targetProps[key]=props[key]
                        delete props.key
                    }
                    return targetProps
                },Object.create(null))
            return Object.values(targetProps).length ? targetProps : undefined
        }

        anchorProps=anchorProps||extract(dom.Anchor.propTypes)
        frameProps=frameProps||(children && extract(dom.Frame.propTypes))
        if(frameProps && !frameProps.width){
            const {width,height}=dom.Shape.GeometryShape.normalize(geometry).bounds()
            frameProps.width=width
            frameProps.height=height
        }
        return {anchorProps, frameProps, children, geometry, ...props}
    }
}
