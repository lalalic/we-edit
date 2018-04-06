import React,{PureComponent, Fragment} from "react"
import PropTypes from "prop-types"
import {Input} from "we-edit"
import {RaisedButton} from "material-ui"

import ComboBox from "../components/combo-box"
import reducer from "../state/reducer"

export default class Create extends PureComponent{
    static contextTypes={
        store: PropTypes.object
    }
    state={type:this.getSupportedFormats()[0].value}

    getSupportedFormats(){
        return Input.supports.filter(Type=>Type.prototype.create)
            .map(Type=>({text:`${Type.getTypeName()}(*.${Type.getTypeExt()})`,value:Type.getType()}))
    }

    render(){
        const formats=this.getSupportedFormats()
        if(formats.length==1)
            return null

        const {onCancel}=this.props
        return (
            <div>
                <center>
                    <ComboBox dataSource={formats} value={this.state.type}/>
                </center>
                <center>
                    <RaisedButton label="Cancel"
                        style={{marginRight:5}}
                        onClick={onCancel}/>

                    <RaisedButton label="Create"
                        primary={true}
                        onClick={this.create.bind(this)}/>
                </center>
            </div>
        )
    }

    componentDidMount(){
        const formats=this.getSupportedFormats()
        if(formats.length==1){
            this.create()
        }
    }

    create(){
        Input.create(this.state.type)
            .then(doc=>{
                const {onCreate, reducer}=this.props
                this.context.store.dispatch(ACTION.ADD(doc,reducer))
                onCreate()
            })
    }
}
