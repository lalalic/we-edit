import React,{Fragment, Component} from "react"
import {whenSelectionChange, connect, getUI, ACTION} from "we-edit"
import {getOffice,Dialog} from "we-edit-office"
import {compose, setStatic} from "recompose"

import {FlatButton} from "material-ui"

const ALIGNs="Left,Center,Right,Decimal".split(",")
const LEADERs=`,-|hyphen,.|dot,_|underscore,${String.fromCharCode(0xB7)}|middleDot`.split(",")

const Setting=compose(
    whenSelectionChange(({selection})=>({tabs:selection?.props("paragraph",false)?.tabs})),
    connect(state=>({setting:getUI(state).settingTab})),
)(class Setting extends Component{
    static getDerivedStateFromProps({tabs, defaultTab},state){
        return {tabs,defaultTab, ...state}
    }

    state={}
    render(){
        const {setting, dispatch}=this.props
        if(!setting)
            return null
        const {tabs=[], i=tabs.length, tab=tabs[i]||{val:"left"}, defaultTab=1.27}=this.state
        const close=e=>dispatch(ACTION.UI({settingTab:undefined}))
        return (
            <Dialog open={true} modal={true} title="Tabs" titleStyle={{padding:2,background:"lightgray",textAlign:"center"}}
                style={{width:700}}
                actions={[
                    <FlatButton
                        label="Clear All"
                        onClick={e=>this.setState({tabs:undefined})}
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
                            dispatch(ACTION.Entity.UPDATE({paragraph:{tabs,defaultTab}}))
                        }}
                    />,
                ]}
                >
                <div style={{marginTop:10,marginBottom:5}}>Tab stops:</div>
                <div style={{display:"flex", flexDirection:"row"}}>
                    <div style={{width:200}}>
                        <input style={{width:"calc(100% - 7.97px)",marginBottom:10}} 
                            value={tab.pos||""}
                            onChange={e=>{
                                tabs.splice(i,1,{...tab,pos:e.target.value})
                                this.setState({tabs:[...tabs]})
                            }}
                            />
                        <select style={{width:"100%"}} 
                            size={11} multiple value={[i]}
                            onChange={e=>this.setState({i:e.target.value})}
                            >
                            {tabs.map(({pos},k)=><option value={k} key={k}>{pos}</option>)}
                        </select>
                    </div>
                    <div style={{flex:1,paddingLeft:10}}>
                        <div>Alignment:</div>
                        <div style={{marginTop:10,marginBottom:10}}>
                            {ALIGNs.map(val=>{
                                return (
                                    <span key={val} style={{padding:5,display:"inline-block",width:"calc(50% - 10px)"}}>
                                        <input type="radio" 
                                            checked={val.toLowerCase()==tab.val} 
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
                        <button style={{borderRadius:0}}>+</button>
                        <button style={{borderRadius:0,borderLeft:0}}>-</button>
                    </div>
                    <div style={{float:"right"}}>
                        Default stops: 
                        <input type="number" min={0.02}
                            value={defaultTab} step={0.1} 
                            onChange={e=>{
                                this.setState({defaultTab:Math.ceil(e.target.value*10-1)/10})
                            }}/>cm
                    </div>
                </div>
            </Dialog>
        )
    }
})
export default compose(
    setStatic("Setting",Setting),
    whenSelectionChange(({selection},state)=>{
        const {tabs=[]}=selection?.props("paragraph",false)||{}
        const {margin:{left=0}={}}=selection?.props('layout')||{}
        return {tabs,from:left}
    }),
    connect((state,{from=0})=>{
        const scale=getOffice(state).scale||1
        return {from:from*scale}
    }),
)(class Tabs extends Component{
    render(){
        const {tabs=[],from=0}=this.props
        return(
            <Fragment>
                <defs>
                    <marker id="triangle" viewBox="0 0 20 20"
                        refX="1" refY="5" 
                        markerUnits="strokeWidth"
                        markerWidth="10" markerHeight="10"
                        orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="black"/>
                    </marker>
                </defs>
                {tabs.map(({val="left", pos},i)=>{
                    return this[val](pos+from,16,i)
                })}
            </Fragment>
        )
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
            <Fragment key={i}>
                <circle {...{cx:x,cy:y-1,r:1}}/>
                <path d={`M${x} ${y-3} v-4`} fill="none" stroke="black" markerEnd="url(#triangle)"/>
            </Fragment>
        )
            
    }
})