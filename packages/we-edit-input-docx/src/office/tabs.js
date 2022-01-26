import React,{Fragment, Component} from "react"
import PropTypes from "prop-types"
import {createPortal} from "react-dom"
import {whenSelectionChangeDiscardable, connect, getUI, ACTION} from "we-edit"
import {Dialog, PropTypesUI, SelectStyle, Movable} from "we-edit-office"
import {compose} from "recompose"

const ALIGNs="Left,Center,Right,Decimal".split(",")

export const Indicator=compose(
    whenSelectionChangeDiscardable(({selection,leftMargin})=>{
        const {tabs}=selection?.props("paragraph",false)||{}
        return {tabs, from:leftMargin}
    }),
    connect((state,{dispatch})=>{
        const {tabAlign="left"}=getUI(state)
        return {
            defaultAlign:tabAlign,
            switchDefault(){
                const i=ALIGNs.findIndex(a=>a.toLowerCase()==tabAlign)
                dispatch(ACTION.UI({tabAlign:ALIGNs[(i+1)%4].toLowerCase()}))
            },
            update(tabs){
                dispatch(ACTION.Entity.UPDATE({paragraph:{tabs:tabs.sort((a,b)=>a.pos-b.pos)}}))
            }
        }
    }),
)(class Tabs extends Component{
    static contextTypes={
        dialogManager: PropTypes.shape({show:PropTypes.func})
    }
    constructor(){
        super(...arguments)
        this.state={}
        this.placeholder=React.createRef()
    }
    render(){
        const {tabs=[],from=0, scale=1, defaultAlign, switchDefault,update}=this.props
        const {container}=this.state
        return(
            <Fragment>
                {tabs.map(({val="left", pos},i)=>{
                    if(!this[val])
                        return null

                    const tab=React.createElement(this[val],{
                            key:i, height:10, 
                            style:{position:"absolute",top:10,left:(pos+from)*scale},
                            onDoubleClick:e=>this.context.dialogManager.show('tabs'),
                        })
                    return (
                        <Movable key={i}
                            onAccept={(dx)=>{
                                const cloned=[...tabs]
                                cloned.splice(i,1,{...tabs[i],pos:pos+dx})
                                update(cloned)
                            }}
                            onMove={dx=>{
                                return {style:{left:(pos+from)*scale+dx}}
                            }}
                            >
                            {tab}
                        </Movable>
                    )
                })}
                <div ref={this.placeholder} style={{position:"absolute",display:'none'}}/>
                {container && this[defaultAlign] && createPortal(
                    <div onClick={switchDefault}
                        style={{top:0,position:"absolute",left:-20,width:20,height:20}}>
                        {React.createElement(this[defaultAlign],{
                            width:20, height:20, 
                            style:{position:"absolute",left:10,top:-5,} 
                        })}
                    </div>
                ,container)}
            </Fragment>
        )
    }

    componentDidMount(){
        if(this.state.container)
            return 
        let horizontalRulerParent=this.placeholder.current
        while(horizontalRulerParent && !horizontalRulerParent.querySelector('.ruler.horizontal')){
            horizontalRulerParent=horizontalRulerParent.parentElement
        }
        if(!horizontalRulerParent)
            return 
        const {update}=this.props
        this.setState({container:horizontalRulerParent},()=>{
            const horizontalScale=horizontalRulerParent.querySelector('.HorizontalScale')
    
            horizontalScale.addEventListener('click', ({clientX:left,clientY:top})=>{
                const {defaultAlign,from, dispatch, tabs=[]}=this.props
                const point=horizontalScale.createSVGPoint()
                point.x=left,point.y=top
                const {x,pos=x-from}=point.matrixTransform(horizontalScale.getScreenCTM().inverse())
                if(!tabs.find(a=>Math.abs(a.pos-pos)<10)){
                    update([...{val:defaultAlign,pos},...tabs])
                }
            })
        })
    }

    left({width=9, height, style:{left:x,top:y,...style}, ...props}){
        return(
            <svg style={{left:x-1,top:y, width,height, ...style}}
                viewBox={`0 0 ${width} ${height}`} {...props}>
                <Arrow/>
                <path d={`M${1} ${height} v-8 h2`} fill="none" stroke="black" markerEnd="url(#triangle)"/>
            </svg>
        )
    }

    right({width=9,height,style:{left:x,top:y,...style},...props}){
        return (
            <svg style={{left:x-(width-1),top:y, width,height,...style}} 
                viewBox={`0 0 ${width} ${height}`} {...props}>
                <Arrow/>
                <path d={`M${width-1} ${height} v-8 h-2`} fill="none" stroke="black" markerEnd="url(#triangle)"/>
            </svg>
        )
    }

    center({width=6,height,style:{left:x,top:y,...style},...props}){
        return (
            <svg style={{left:x-width/2,top:y, width,height, ...style}} 
                viewBox={`0 0 ${width} ${height}`} {...props}>
                <Arrow/>
                <path d={`M${width/2} ${height} v-6`} fill="none" stroke="black" markerEnd="url(#triangle)"/>
            </svg>    
        )
            
    }

    decimal({width=6,height, r=1, style:{left:x,top:y,...style}, ...props}){
        return (
            <svg style={{left:x-width/2,top:y, width,height, ...style}} 
                viewBox={`0 0 ${width} ${height}`} {...props}>
                <Arrow/>
                <circle {...{cx:width/2,cy:height-r,r}}/>
                <path d={`M${width/2} ${height-3} v-3`} fill="none" stroke="black" markerEnd="url(#triangle)"/>
            </svg>
        )    
    }
})

const Arrow = ()=>(
    <defs>
        <marker id="triangle" viewBox="0 0 20 20"
            refX="1" refY="5" 
            markerUnits="strokeWidth"
            markerWidth="10" markerHeight="10"
            orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="black"/>
        </marker>
    </defs>
)

export function Setting({value, onSubmit, ...props}){
    return (
        <SelectStyle target="paragraph">
            {({style,dispatch})=>{
                const refSetting=React.createRef()
				if(onSubmit==undefined){
					onSubmit=paragraph=>dispatch(ACTION.Selection.UPDATE({paragraph}))
				}
                return (
                    <Dialog title="Tabs"
                        onSubmit={e=>onSubmit(refSetting.current.value, dispatch)}
                        {...props}
                        >
                        <PropTypesUI ref={refSetting}
                            props={{tabs:(value||style)?.tabs}}
                            grid={1}
                            propTypes={(({tabs})=>({tabs}))(style._composer.constructor.propTypes)} 
                            />
                    </Dialog>
                )
            }}
        </SelectStyle>
    )
}