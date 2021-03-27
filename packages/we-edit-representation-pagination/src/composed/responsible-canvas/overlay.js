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
            this.target=React.createRef()
        }
        render(){
            const {children, ..._props}=this.props
            const {onStart,onMouseUp,...props}=targetEvents(_props,this.target)
            const {moving}=this.state

            return (
                <Fragment>
                    <g ref={this.target} onMouseMove={e=>{
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
            this.target=React.createRef()
        }
        render(){
            const {children, doubleClickTimeout=200, ..._props}=this.props
            const {onStart,onMouseUp, onMouseMove, onDoubleClick,...props}=targetEvents(_props, this.target)
            const {down,x,y,lastUp=0}=this.state

            return (
                <Fragment>
                    <g ref={this.target} onMouseDown={e=>{
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

function createEvent(e, target){
    return new Proxy(e,{
        get(e,k){
            if(k=="currentTarget" || k=="target")
                return target
            return Reflect.get(...arguments)
        }
    })
}

function targetEvents(props, ref){
    return Object.keys(props).reduce((props,key)=>{
        if(key.startsWith("on") && typeof(props[key])=="function"){
            const func=props[key]
            props[key]=(e,...args)=>func(createEvent(e,ref.current),...args)
        }
        return props
    },props)
}