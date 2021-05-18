import { RaisedButton } from "material-ui"
import React, {Component} from "react"
import {dom} from "we-edit"
import SvgIcon from "material-ui/SvgIcon"
import Dialog from "../components/dialog"
import UnitInput from "../components/unit-input"

const NumberingShape=dom.Paragraph.NumberingShape
export class BulletList extends Component{
    static getDerivedStateFromProps({indent,hanging},state){
        return {indent,hanging,...state}
    }
    state={}
    render(){
        const {state:{indent=0,hanging=0},props:{close, apply, bullets=[]}}=this
        return (
            <Dialog 
                title="Customize Bulleted List" 
                open={true}
                actions={[
                    <RaisedButton label="cancel" onClick={close}/>,
                    <RaisedButton label="OK" primary={true} onClick={e=>apply(this.state)}/>
                ]}
                >
                <div style={{display:"flex"}}>
                    <div style={{flex:1}}>
                        <h3>Bullet Character</h3>
                        <div>
                            {bullets.map(({label},i)=>{
                                NumberingShape.normalize(bullets[i])
                                return (<SvgIcon key={label}></SvgIcon>)
                            })}
                        </div>
                        <div>
                            <RaisedButton label="Font..."/>
                            <RaisedButton label="Bullet..."/>
                            <RaisedButton label="Picture..."/>
                        </div>
                        <h3>Text Position</h3>
                        <div>
                            <span>indent at </span>
                            <UnitInput min={0} value={hanging} onChange={e=>this.setHanging(e)}/>
                        </div>

                        <h3>Bullet Position</h3>
                        <div>
                            <span>indent at </span>
                            <UnitInput min={0} max={indent} value={indent} onChange={e=>this.setIndent(e)}/>
                        </div>
                    </div>
                    <ListPreview style={{width:200,border:"1px solid black",padding:10}}/>
                </div>
            </Dialog>
        )
    }

    setIndent(e){
        this.setState({indent:e.target.value})
    }

    setHanging(e){
        this.setState({hanging:e.target.value})
    }
}


export class NumberList extends Component{
    state={}
    render(){
        const {props:{close,apply}}=this
        return (
            <Dialog 
                title="Customize Numbered List" 
                open={true}
                actions={[
                    <RaisedButton label="cancel" onClick={close}/>,
                    <RaisedButton label="OK" primary={true} onClick={e=>apply(this.state)}/>
                ]}
                >
                <div style={{display:"flex"}}>
                    <div style={{flex:1}}>
                        <h3>Number Format</h3>
                        <div>
                            <div>Enter formatting for number:</div>
                            <div>
                                <input type="text"/>
                                <RaisedButton label="Font..."/>
                            </div>

                            <div>Number Style</div>
                            <div>
                                <select></select>
                                <input type="number" min={0}/>
                            </div>
                        </div>
                        <h3>Text Position</h3>
                        <div>
                            <span>indent at </span>
                            <UnitInput min={0} value={hanging} onChange={e=>this.setHanging(e)}/>
                        </div>

                        <h3>Bullet Position</h3>
                        <div>
                            <span>indent at </span>
                            <UnitInput min={0} max={indent} value={indent} onChange={e=>this.setIndent(e)}/>
                        </div>
                    </div>
                    <ListPreview style={{width:200,border:"1px solid black",padding:10}}/>
                </div>
            </Dialog>
        )
    }
}

export class MultiLevelList extends Component{
    state={}
    render(){
        const {props:{close,apply}}=this
        return (
            <Dialog 
                title="Customize Outline Numbered List" 
                open={true}
                actions={[
                    <RaisedButton label="cancel" onClick={close}/>,
                    <RaisedButton label="OK" primary={true} onClick={e=>apply(this.state)}/>
                ]}
                >
                
            </Dialog>
        )
    }
}

const ListPreview=({style,pStyle={background:"lightgray"}, liStyle={background:"black"}})=>(
    <div style={style}>
        <p style={pStyle}>&nbsp;</p>
        <p style={pStyle}>&nbsp;</p>
        <ul>
            <li><p style={liStyle}>&nbsp;</p></li>
            <li><p style={liStyle}>&nbsp;</p></li>
            <li><p style={liStyle}>&nbsp;</p></li>
        </ul>
        <p style={pStyle}>&nbsp;</p>
        <p style={pStyle}>&nbsp;</p>
        
    </div>
)

