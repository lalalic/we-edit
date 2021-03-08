import React, {Fragment,Component} from "react"

export default class Line extends Component{
    render(){
        const {
            d, width:strokeWidth, color:stroke, style, sketched, compound, dash, join, cap, transparency, gradient, 
            fill:{solidFill, blipFill,}={solidFill:"transparent"}, size,
            ...props
        }=this.props

        if(d){
            if(solidFill){
                props.fill=solidFill
            }else if(blipFill){
                return (
                    <BlipFill url={blipFill.url} x={strokeWidth/2} y={strokeWidth/2} {...size}>
                        <path {...{...props, d,stroke,strokeWidth, fill:"transparent"}}/>
                    </BlipFill>
                )
            }
            return <path {...{...props, d,stroke,strokeWidth}}/>
        }
        return <line {...{...props, stroke,strokeWidth}}/>
    }
}

const BlipFill=({url,children,  ...props})=>(
    <Fragment>
        {children}
        <image href={url} {...props} preserveAspectRatio="none"/>
    </Fragment>
)