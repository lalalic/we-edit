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

    static WhenMouseDown=class OverlayWhenMouseDown extends Component{
        constructor(...args){
            super(...args)
            this.state={mouseDowning:false, lastMouseUp:0}
            this.holder=React.createRef()
        }

        render(){
            const {children, doubleClickTime=200, style, ...props}=this.props
            const {mouseDowning,lastMouseUp}=this.state
            const {onMouseDown, onMouseMove, onMouseUp, onDoubleClick, onContextMenu,style:holderStyle={},cursor=holderStyle.cursor}=children.props
            return (
                <Fragment>
                    {React.cloneElement(children,{
                        onMouseDown:e=>{
                            e.stopPropagation()
                            this.setState({mouseDowning:true})
                            onMouseDown && onMouseDown(e)
                        },
                        onMouseMove:null,
                        onMouseUp:null,
                        onDoubleClick:null,
                        onContextMenu:null,
                    })}
                    {mouseDowning && <Overlay {...{
                        style:{cursor, ...style},
                        onMouseMove:e=>{
                            onMouseMove && onMouseMove(e)
                        },
                        onMouseUp:e=>{
                            e.stopPropagation()
                            const now=Date.now()
                            if(now-lastMouseUp<doubleClickTime){
                                e.stopPropagation()
                                this.setState({mouseDowning:false})
                                onDoubleClick && onDoubleClick(e)
                            }else{
                                this.setState({mouseDowning:false,lastMouseUp:Date.now()})
                                onMouseUp && onMouseUp(e)
                            }
                        },
                        onContextMenu:e=>{
                            onContextMenu && onContextMenu(e)
                        }
                    }} {...props}/>}
                </Fragment>
            )
        }
    }
}