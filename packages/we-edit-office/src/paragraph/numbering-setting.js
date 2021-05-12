import { RaisedButton } from "material-ui"
import React, {Component} from "react"
import {dom} from "we-edit"
import SvgIcon from "material-ui/SvgIcon"
import Dialog from "../components/dialog"

const NumberingShape=dom.Paragraph.NumberingShape
export class BulletList extends Component{
    render(){
        const {indent=0,hanging=0,bullets=[]}=this.props
        return (
            <Dialog title="Customize Bulleted List">
                <div>
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
                    <h3>Bullet Position</h3>
                    <div>indent at <input type="number" min={0} value={indent}/></div>
                    <h3>Text Position</h3>
                    <div>indent at <input type="number" min={0} value={hanging}/></div>
                </div>
            </Dialog>
        )
    }
}


export class NumberList extends Component{
    render(){
        return (
            <Dialog title="Customize Numbered List">
                
            </Dialog>
        )
    }
}

export class MultiLevelList extends Component{
    render(){
        return (
            <Dialog title="Customize Outlined Numbered List">
                
            </Dialog>
        )
    }
}