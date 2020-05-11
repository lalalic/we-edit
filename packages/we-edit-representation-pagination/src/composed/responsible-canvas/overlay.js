import React, {Component,Fragment} from "react"
import ReactDOM from "react-dom"

export default class Overlay extends Component{
    render(){
        const {style, ...props}=this.props
        const {screen:{width,height}}=window
        return (
            ReactDOM.createPortal(
                <div style={{
                    ...style,
                    position:"fixed", left:0, top:0,
                    width,height,overflow:"hidden",
                    zIndex:Number.MAX_SAFE_INTEGER
                }} {...props}/>, 
                document.body
            )
        )
    }

    static WhenMousePressedMove=class OverlayWhenMousePressedMove extends Component{
        constructor(...args){
            super(...args)
            this.state={}
        }
        render(){
            const {children,onStart,onMouseUp, ...props}=this.props
            const {moving}=this.state

            return (
                <Fragment>
                    <g onMouseMove={e=>{
                        if(e.buttons==1){
                            e.stopPropagation()
                            this.setState({moving:true})
                            onStart && onStart(e)
                        }
                    }}>
                        {children}
                    </g>
                    {moving && <Overlay {...props}
                        onMouseUp={e=>{
                            e.stopPropagation()
                            this.setState({moving:false})
                            onMouseUp && onMouseUp(e)
                        }}
                    />}
                </Fragment>
            )
        }
    }
}