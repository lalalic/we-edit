import React, {Component,Fragment} from "react"
import ReactDOM from "react-dom"
import simplify from "simplify-path"
import Path from "../../tool/path"

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
            defineMotion(this)
        }
        render(){
            const {children, route=false, ..._props}=this.props
            const {onStart,onMouseUp,...props}=targetEvents(_props,this)
            const {moving,left, top, points=[]}=this.state

            return (
                <Fragment>
                    <g ref={this.target} onMouseMove={e=>{
                        if(e.buttons==1){
                            e.stopPropagation()
                            this.setState({
                                moving:true, 
                                right:e.clientX, bottom:e.clientY, 
                                left:left==undefined ? e.clientX : left, 
                                top: top==undefined ? e.clientY : top,
                                points:route && [...points,[e.clientX,e.clientY]]
                            })
                            onStart && onStart(e)
                        }
                    }}>
                        {typeof(children)=="function" ? children(this) : children}
                    </g>
                    {moving && <Overlay {...props}
                        onMouseUp={e=>{
                            e.stopPropagation()
                            this.setState({
                                moving:false, right:e.clientX, bottom:e.clientY,
                                points:route && [...points,[e.clientX,e.clientY]]
                            })
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
            defineMotion(this)
        }
        render(){
            const {children, route=false, doubleClickTimeout=200, ..._props}=this.props
            const {onStart,onMouseUp, onMouseMove, onDoubleClick,...props}=targetEvents(_props, this)
            const {down,left,top, points=[], lastUp=0}=this.state

            return (
                <Fragment>
                    <g ref={this.target} onMouseDown={e=>{
                        if(e.buttons==1){
                            e.stopPropagation()
                            this.setState({down:true,left:e.clientX, top:e.clientY,points:route && [[e.clientX, e.clientY]]||undefined, right:undefined, bottom:undefined})
                            onStart && onStart(e)
                        }
                    }}>
                        {typeof(children)=="function" ? children(this) : children}
                    </g>
                    {down && <Overlay 
                        onMouseMove={e=>{
                            e.stopPropagation() 
                            this.setState({right:e.clientX,bottom:e.clientY, points:route && [...points,[e.clientX,e.clientY]]||undefined})
                            onMouseMove && onMouseMove(e,{dx:e.clientX-left,dy:e.clientY-top})
                        }}
                        {...props}
                        onMouseUp={e=>{
                            e.stopPropagation()

                            this.setState({down:false,lastUp:Date.now(), right:e.clientX,bottom:e.clientY, points:route && [...points, [e.clientX,e.clientY]]||undefined})
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

function createEvent(e, overlay){
    return new Proxy(e,{
        get(e,k){
            switch(k){
                case "currentTarget":
                case "target":
                    return overlay.target.current
                case "motionRect":
                    return overlay.motionRect
                case "motionRoute":
                    return overlay.motionRoute
                default:
                    return Reflect.get(...arguments)
            }
        }
    })
}

function targetEvents(props, overlay){
    return Object.keys(props).reduce((props,key)=>{
        if(key.startsWith("onMouse") && typeof(props[key])=="function"){
            const func=props[key]
            props[key]=(e,...args)=>func(createEvent(e,overlay),...args)
        }
        return props
    },props)
}

function defineMotion(overlay){
    Object.defineProperties(overlay,{
        motionRect:{
            get(){
                const {state:{left:x0, top:y0, right:x1=x0,bottom:y1=y0}, target}=this
                const svg=target.current.viewportElement,m=svg.getScreenCTM().inverse()
                const {x:left,y:top}=Object.assign(svg.createSVGPoint(),{x:x0,y:y0}).matrixTransform(m)
                const {x:right,y:bottom}=Object.assign(svg.createSVGPoint(),{x:x1,y:y1}).matrixTransform(m)
                return {left,top,right,bottom}
            }
        },

        motionRoute:{
            get(){
                const {state:{points=[],left:x0, top:y0, right:x1=x0,bottom:y1=y0}, target, props:{route}}=this
                const svg=target.current.viewportElement,m=svg.getScreenCTM().inverse()
    
                const simplified=simplify(
                    (route ? points : [[x0,y0],[x1,y1]]).map(a=>{
                        const b=Object.assign(svg.createSVGPoint(),{x:a[0],y:a[1]}).matrixTransform(m)
                        return [b.x,b.y]
                    })
                )
                const d=simplified.map((a,i)=>`${i ? 'L' : 'M'}${a[0]},${a[1]}`).join("")
                return new Path(d)
            }
        }
    })
}