import React,{Fragment, Component,PureComponent} from "react"
import PropTypes from "prop-types"
import {createPortal} from "react-dom"
import {whenSelectionChangeDiscardable, connect, getUI,getContent, getFile, ACTION} from "we-edit"
import {getOffice,Dialog, PropTypesUI, SelectStyle, Movable} from "we-edit-office"
import {compose} from "recompose"


import {FlatButton} from "material-ui"

const ALIGNs="Left,Center,Right,Decimal".split(",")
const LEADERs=`,-|hyphen,.|dot,_|underscore,${String.fromCharCode(0xB7)}|middleDot`.split(",")

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

export function Setting(){
    return (
        <SelectStyle 
            getStyle={selection=>{
                return selection?.getComposer(selection.end.id).closest('paragraph')
            }}
            >
            {({composer,dispatch})=>(
                <PropTypesUI 
                    theme="Paragraph"
                    props={{tabs:composer.props.tabs}}
                    propTypes={{tabs:composer.propsTypes.tabs}} 
                    onChange={paragraph=>dispatch(ACTION.Selection.UPDATE({paragraph}))}
                    />
            )}

        </SelectStyle>
    )
}

export const Setting1=compose(
    whenSelectionChangeDiscardable(({selection}, state)=>{
        const file=getFile(state)
        const toPx=file.doc.cm2Px
            
        let tabs=selection?.props("paragraph",false)?.tabs
        if(tabs){
            tabs=tabs.map(a=>({...a, pos:Number(file.px2cm(a.pos)).toFixed(2)}))
        }
        const content=getContent(state)
        const {defaultTab}=content ? content.get("root").toJS() : {}
        return {tabs,detaultTab:defaultTab ? Number(file.doc.px2cm(defaultTab)).toFixed(2): undefined, toPx}
    }),
    connect(state=>({setting:getUI(state).settingTab})),
)(class Setting extends Component{

    static getDerivedStateFromProps({tabs, defaultTab},state){
        return {tabs:state.tabs||tabs,defaultTab:state.defaultTab||defaultTab}
    }

    state={}
    render(){
        const {setting, dispatch, toPx}=this.props
        if(!setting)
            return null
        const {tabs=[], i, tab=tabs[i]||{val:"left"}, defaultTab=1.27}=this.state
        const close=e=>dispatch(ACTION.UI({settingTab:undefined}))
        return (
            <Dialog open={true} modal={true} title="Tabs" titleStyle={{padding:2,background:"lightgray",textAlign:"center"}}
                actions={[
                    <FlatButton
                        label="Clear All"
                        onClick={e=>this.setState({tabs:[],i:undefined})}
                        style={{float:"left"}}
                    />,
                    <FlatButton
                        label="Cancel"
                        onClick={close}
                    />,
                    <FlatButton
                        label="Submit"
                        primary={true}
                        onClick={e=>{
                            close()
                            const paragraph={tabs}
                            if(tabs!==this.props.tabs){
                                paragraph.tabs=tabs.map(a=>({...a,pos:toPx(`${a.pos}cm`)}))
                            }
                            if(defaultTab!==this.props.defaultTab){
                                paragraph.defaultTab=toPx(`${defaultTab}cm`)
                            }
                            dispatch(ACTION.Entity.UPDATE({paragraph}))
                        }}
                    />,
                ]}
                >
                <div style={{marginTop:10,marginBottom:5}}>Tab stops:</div>
                <div style={{display:"flex", flexDirection:"row"}}>
                    <div style={{width:200}}>
                        <div style={{whiteSpace:"nowrap"}}>
                            <input type="number" step={0.1}
                            style={{width:"calc(100% - 37.97px)",marginBottom:10}} 
                            value={tab.pos||""}
                            onChange={({target:{value:pos}})=>{
                                const j=tabs.findIndex(a=>a.pos==pos)
                                if(j!=-1){
                                    this.setState({i:j, tab:undefined})
                                }else{
                                    this.setState({i:undefined,tab:{...tab,pos}})
                                }
                            }}
                            /> cm
                        </div>
                        <select style={{width:"100%"}} 
                            size={11} multiple value={[i]}
                            onChange={e=>{
                                this.setState({i:e.target.value[0],tab:undefined})
                            }}
                            >
                            {tabs.map(({pos},k)=><option value={k} key={k}>{pos} cm</option>)}
                        </select>
                    </div>
                    <div style={{flex:1,paddingLeft:10}}>
                        <div>Alignment:</div>
                        <div style={{marginTop:10,marginBottom:10}}>
                            {ALIGNs.map(val=>{
                                return (
                                    <span key={val} style={{padding:5,display:"inline-block",width:"calc(50% - 10px)"}}>
                                        <input type="radio" 
                                            checked={val.toLowerCase()==(tab.val||'left')} 
                                            onChange={e=>{
                                                tabs.splice(i,1,{...tab,val})
                                                this.setState({tabs:[...tabs]})
                                            }}
                                        />
                                        {val}
                                    </span>
                                )
                            })}
                        </div>
                        <div>Leader:</div>
                        <div style={{marginTop:10,marginBottom:10}}>
                            {LEADERs.map(a=>{
                                const [d,leader]=a.split("|")
                                return (
                                    <span key={d} style={{padding:5,display:"inline-block",width:"calc(50% - 10px)"}}>
                                        <input type="radio" 
                                            checked={leader===tab.leader}
                                            onChange={e=>{
                                                tabs.splice(i,1,{...tab,leader})
                                                this.setState({tabs:[...tabs]})
                                            }}
                                            />
                                        {d.repeat(5)||"None"}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div style={{marginTop:10}}>
                    <div style={{float:"left"}}>
                        <button style={{borderRadius:0}} onClick={e=>{
                            const newTabs=[tab, ...tabs].sort((a,b)=>a.pos-b.pos)
                            this.setState({tabs:newTabs, i:newTabs.findIndex(a=>a.pos==tab.pos)})
                        }}>+</button>
                        <button style={{borderRadius:0,borderLeft:0}} onClick={e=>{
                            if(i!==undefined){
                                tabs.splice(i,1)
                                this.setState({
                                    tabs:[...tabs],
                                    i:tabs[i] ? i : (tabs[i-1] ? i-1 : undefined)
                                })
                            }
                        }}>-</button>
                    </div>
                    <div style={{float:"right"}}>
                        Default stops: 
                        <input type="number" min={0.02} style={{textAlign:"right"}}
                            value={defaultTab} step={0.1} 
                            onChange={e=>{
                                this.setState({defaultTab:e.target.value})
                            }}/> cm
                    </div>
                </div>
            </Dialog>
        )
    }
})

export const Events=class extends PureComponent{

}

