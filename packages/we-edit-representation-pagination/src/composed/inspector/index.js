import React, {Component,Fragment} from "react"
import {ReactQuery} from "we-edit"
import Canvas from "../canvas"

export default class InspectorCanvas extends Canvas{
    static PageShow=class extends Component{
        render(){
            const {children,width,height,margin,precision,paper, waypointProps}=this.props
            let content=new ReactQuery(<Fragment>{children}</Fragment>)
            const lines=content.find(".line").toArray()
            lines.forEach((line,i)=>{
                content=content.replace(line,<Line theme={Theme[i%2]}>{line}</Line>)
            })
            return (
                <g>
                    <rect {...{x:0,y:0, width,height,fill:"white"}}/>
                    {content.root.props.children}
                </g>
            )
        }
    }
}

class Line extends Component{
    render(){
        const {children:line, theme}=this.props
        const {width,height,children:content}=line.props
        const {width:contentWidth,height:contentHeight,x,y}=content.props

        return React.cloneElement(
            line,line.props,
            <Fragment>
                <rect {...{width,height,fill:theme.Line}}/>
                <rect {...{width:contentWidth,height:contentHeight,x,y,fill:theme.Content}}/>
            </Fragment>,
            <Story>{content}</Story>
        )
    }
}

class Story extends Component{
    render(){
        return this.props.children
    } 
}

const Theme=[
    {Line:"lightgray", Content:"blue"},
    {Line:"lightblue", Content:"yellow"}
]