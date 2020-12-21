import React,{Fragment, Component,PureComponent} from "react"
import {createPortal} from "react-dom"
import {whenSelectionChangeDiscardable, connect, getUI,getContent, getFile, ACTION} from "we-edit"
import {getOffice,Dialog, } from "we-edit-office"
import {compose} from "recompose"


import {FlatButton} from "material-ui"

const ALIGNs="Left,Center,Right,Decimal".split(",")
const LEADERs=`,-|hyphen,.|dot,_|underscore,${String.fromCharCode(0xB7)}|middleDot`.split(",")

export const Indicator=compose(
    whenSelectionChangeDiscardable(({selection},state)=>{
        const {tabs}=selection?.props("paragraph",false)||{}
        const {margin:{left=0}={}}=selection?.props('layout')||{}
        return {tabs,from:left}
    }),
    connect((state,{from=0, dispatch})=>{
        const {scale=100}=getOffice(state)
        const {tabAlign="left"}=getUI(state)
        return {
            from, 
            defaultAlign:tabAlign,
            scale:scale/100,
            switchDefault(){
                const i=ALIGNs.findIndex(a=>a.toLowerCase()==tabAlign)
                dispatch(ACTION.UI({tabAlign:ALIGNs[(i+1)%4].toLowerCase()}))
            },
            setDocumentLayout:()=>dispatch(ACTION.UI({settingDocumentLayout:true})),
            setTabs:()=>dispatch(ACTION.UI({settingTab:true})),
        }
    }),
)(class Tabs extends Component{
    state={}
    render(){
        const {tabs=[],from=0, scale=1, defaultAlign, switchDefault}=this.props
        const {container}=this.state
        return(
            <Fragment>
                <defs ref="defs">
                    <marker id="triangle" viewBox="0 0 20 20"
                        refX="1" refY="5" 
                        markerUnits="strokeWidth"
                        markerWidth="10" markerHeight="10"
                        orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="black"/>
                    </marker>
                </defs>
                {tabs.map(({val="left", pos},i)=>{
                    return this[val]((pos+from)*scale,16,i)
                })}
                {container && <DefaultTab container={container}>
                    <svg style={{width:20,height:20}} onClick={switchDefault}>
                        {this.defaultTab(defaultAlign)}
                    </svg>
                </DefaultTab>}
            </Fragment>
        )
    }

    componentDidMount(){
        if(this.state.container)
            return 
        let stickyParent=this.refs.defs
        while(stickyParent && stickyParent.style.position!="sticky"){
            stickyParent=stickyParent.parentElement
        }
        if(stickyParent){
            this.setState({container:stickyParent},()=>{
                const {setDocumentLayout, setTabs}=this.props
                stickyParent.addEventListener('dblclick',setDocumentLayout)
                const horizontalScale=stickyParent.querySelector('svg')
                horizontalScale.addEventListener('dblclick', e=>{
                    e.stopPropagation()
                    setTabs()
                })
                horizontalScale.addEventListener('click', ({clientX:left,clientY:top,srcElement})=>{
                    const {defaultAlign,from, dispatch, tabs=[]}=this.props
                    const point=horizontalScale.createSVGPoint()
                    point.x=left,point.y=top
                    const {x,pos=x-from}=point.matrixTransform(horizontalScale.getScreenCTM().inverse())
                    if(!tabs.find(a=>Math.abs(a.pos-pos)<10)){
                        dispatch(ACTION.Entity.UPDATE({paragraph:{tabs:[...{val:defaultAlign,pos},...tabs].sort((a,b)=>a.pos-b.pos)}}))
                    }
                })

                let scrollParent=horizontalScale
                while(scrollParent && scrollParent.style.overflowY!="scroll"){
                    scrollParent=scrollParent.parentElement
                }
                const verticalRuler=scrollParent.querySelector('.vertical')
                verticalRuler.addEventListener('dblclick',setDocumentLayout)
            })
        }
    }

    defaultTab(align){
        return this[align](10,16,0)
    }

    left(x,y,i){
        return <path key={i} d={`M${x} ${y} v-8 h3`} fill="none" stroke="black" markerEnd="url(#triangle)"/>
    }

    right(x,y,i){
        return <path key={i} d={`M${x} ${y} v-8 h-3`} fill="none" stroke="black" markerEnd="url(#triangle)"/>
    }

    center(x,y,i){
        return <path key={i} d={`M${x} ${y} v-8`} fill="none" stroke="black" markerEnd="url(#triangle)"/>
    }

    decimal(x,y,i){
        return (
            <g key={i}>
                <circle {...{cx:x,cy:y-1,r:1}}/>
                <path d={`M${x} ${y-3} v-4`} fill="none" stroke="black" markerEnd="url(#triangle)"/>
            </g>
        )    
    }
})

export const Setting=compose(
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

class DefaultTab extends PureComponent{
    render(){
        const {children,container}=this.props
        return createPortal(
            <div style={{top:0,position:"absolute",left:-20}}>
                {children}
            </div>,
            container
        )
    }
}

export const Events=class extends PureComponent{

}

