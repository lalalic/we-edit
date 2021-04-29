import React, {Component,Fragment} from "react"
import {dom} from "we-edit"
import ReactDOM from "react-dom"
import simplify from "simplify-path"
const Path=dom.Shape.Path

export default class Overlay extends Component{
    render(){
        const {style, ...props}=this.props
        const {screen:{width,height}}=window
        return (
            ReactDOM.createPortal(
                <div style={{
                    ...style,
                    position:"fixed", left:0, top:0,
                    width,height,overflow:"hidden", background:"transparent", opacity:0.5,
                    zIndex:Number.MAX_SAFE_INTEGER
                }} {...props}/>, 
                document.body
            )
        )
    }

    static WhenMouseDown=class OverlayWhenMouseDown extends Component{
        static defaultProps={
            _triggerEvent:"onMouseDown"
        }
        constructor(...args){
            super(...args)
            this.state={}
            this.target=React.createRef()
        }
        render(){
            const {children, route=false, doubleClickTimeout=200, _triggerEvent,..._props}=this.props
            const {onStart,onMouseUp, onMouseMove, onDoubleClick,...props}=targetEvents(_props, this)
            const {triggered,left,top, points=[], lastUp=0}=this.state

            return (
                <Fragment>
                    <g {...{
                        ref:this.target,
                        [_triggerEvent]:e=>{
                            if(e.buttons==1){
                                e.stopPropagation()
                                this.setState({
                                    triggered:true,
                                    left:e.clientX, top:e.clientY,right:undefined, bottom:undefined,
                                    points:route && [[e.clientX, e.clientY]]||undefined,   
                                })
                                onStart && onStart(e)
                            }
                        },
                    }}>
                        {typeof(children)=="function" ? children(this) : children}
                    </g>
                    {triggered && <Overlay 
                        onMouseMove={e=>{
                            e.stopPropagation() 
                            this.setState({
                                right:e.clientX,bottom:e.clientY, 
                                points:route && [...points,[e.clientX,e.clientY]]||undefined
                            })
                            onMouseMove && onMouseMove(e,{dx:e.clientX-left,dy:e.clientY-top})
                        }}
                        {...props}
                        onMouseUp={e=>{
                            e.stopPropagation()

                            this.setState({
                                triggered:false,
                                lastUp:Date.now(), 
                                right:e.clientX,bottom:e.clientY, 
                                points:route && [...points, [e.clientX,e.clientY]]||undefined
                            })
                            onMouseUp && onMouseUp(e)
                            if(onDoubleClick && (Date.now()-lastUp)<=doubleClickTimeout){
                                onDoubleClick(e)
                            }
                        }}
                    />}
                </Fragment>
            )
        }

        get motionPoint(){
            const {right:x,bottom:y}=this.motionRect
            return {x,y}
        }

        get motionRect(){
            const {state:{left:x0, top:y0, right:x1=x0,bottom:y1=y0}}=this
            const {x:left,y:top}=this.toCanvasPoint({x:x0,y:y0})
            const {x:right,y:bottom}=this.toCanvasPoint({x:x1,y:y1})
            return {left,top,right,bottom}
        }

        get motionRoute(){
            const {state:{points=[],left:x0, top:y0, right:x1=x0,bottom:y1=y0}, target, props:{route}}=this
            
            const simplified=simplify(
                (route ? points : [[x0,y0],[x1,y1]]).map(a=>{
                    const b=this.toCanvasPoint({x:a[0],y:a[1]})
                    return [b.x,b.y]
                })
            )
            const d=simplified.map((a,i)=>`${i ? 'L' : 'M'}${a[0]},${a[1]}`).join("")
            return new Path(d)
        }

        toCanvasPoint(point){
            const svg=this.target.current.viewportElement,m=svg.getScreenCTM().inverse()
            return Object.assign(svg.createSVGPoint(),point).matrixTransform(m)
        }
    }

    static WhenMousePressedMove=class OverlayWhenMousePressedMove extends this.WhenMouseDown{
        static defaultProps={
            _triggerEvent:"onMouseMove"
        }
    }
}

function createEvent(e, overlay){
    return new Proxy(e,{
        get(e,k){
            switch(k){
                case "motionPoint":
                    return overlay.motionPoint
                case "motionRect":
                    return overlay.motionRect
                case "motionRoute":
                    return overlay.motionRoute
                case "overlay":
                    return overlay
            }
            return Reflect.get(...arguments)
        }
    })
}

function targetEvents(props, overlay){
    return Object.keys(props).reduce((props,key)=>{
        if(key.startsWith("on") && typeof(props[key])=="function"){
            const func=props[key]
            props[key]=(e,...args)=>func(createEvent(e,overlay),...args)
        }
        return props
    },props)
}