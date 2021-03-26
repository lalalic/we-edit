import React, {Component} from "react"
import Path from "../tool/path"

export default class Shape extends Component{
    static displayName="Shape"
    render(){
        const {
            id,
            d, 
            width:strokeWidth=1, color:stroke="black", 
            style, sketched, compound, dash, join, cap, transparency, 
            fill:{color:fill="none", picture, gradient, pattern}={}, size,
            ...props
        }=this.props
        
        join && (props.strokeLinejoin=join);

        if(!d)
            return <line {...{...props, stroke,strokeWidth}}/>
        
        const pid=`${id}-pattern`
            
        const shape=<path {...{...props, d,stroke,strokeWidth, fill}}/>
        const geometry=new Path(d)
        const {left,right,top,bottom}=geometry.bounds()
        const width=right-left-strokeWidth, height=bottom-top-strokeWidth
        const x=strokeWidth/2,y=strokeWidth/2

        if(picture){
            const {url,transparency,margin:{left,right,top,bottom}={},tile}=picture
            return (
                <g>
                    {shape}
                    <image {...{x,y,width,height, href:url, preserveAspectRatio:"none"}}/>
                </g>
            )
        }else if(pattern){
            const {foreground="black",background, pattern:{path:d, ...patterProps}}=pattern
            const geometry=new Path(d), {width:w,height:h}=geometry.size()
            return (
                <g>
                    <defs>
                        <pattern id={pid} {...patterProps}>
                            <path {...{d, fill:foreground}}/>
                        </pattern>
                    </defs>
                    {background && React.cloneElement(shape,{fill:background,stroke:"transparent"})}
                    {React.cloneElement(shape,{fill:`url(#'${pid}')`})}
                </g>
            )
        }else if(gradient){
            const {type, angle, stops, typedGradient=`${type}Gradient`}=gradient
            return (
                <g>
                    <defs>
                        {
                            React.createElement(
                                typedGradient,
                                {id:pid},
                                stops.map(({position,color,transparency})=><stop {...{offset:position,stopColor:color, stopOpacity:transparency,key:position}}/>)
                            )
                        }
                    </defs>
                    {React.cloneElement(shape,{fill:`url(#${pid})`})}
                </g>
            )
        }   
        return shape
    }
}