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

    static WhenMouseDown=class OverlayWhenMouseDown extends Component{
        constructor(...args){
            super(...args)
            this.state={}
        }
        render(){
            const {children,onStart,onMouseUp, onMouseMove, onDoubleClick, doubleClickTimeout=200, ...props}=this.props
            const {down,x,y,lastUp=0}=this.state

            return (
                <Fragment>
                    <g onMouseDown={e=>{
                        if(e.buttons==1){
                            e.stopPropagation()
                            this.setState({down:true,x:e.clientX, y:e.clientY})
                            onStart && onStart(e)
                        }
                    }}>
                        {children}
                    </g>
                    {down && <Overlay 
                        onMouseMove={e=>{
                            onMouseMove && onMouseMove(e,{dx:e.clientX-x,dy:e.clientY-y})
                        }}
                        {...props}
                        onMouseUp={e=>{
                            console.log(Date.now()-lastUp)
                            e.stopPropagation()
                            this.setState({down:false,lastUp:Date.now()})
                            onMouseUp && onMouseUp(e)
                            if(onDoubleClick && (Date.now()-lastUp)<=doubleClickTimeout){
                                onDoubleClick(e)
                            }
                        }}
                    />}
                </Fragment>
            )
        }
    }
}