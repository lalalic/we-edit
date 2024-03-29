import React,{Fragment} from "react"
import { Dialog, Popover } from "material-ui"
import {ColorButton, PropTypesUI} from "we-edit-office"
import SelectColor from "./select-color"

export default class ColorShape extends PropTypesUI.any{
    static displayName="ColorShape"
    constructor(){
        super(...arguments)
        this.state={show:false}
    }
    renderRibbon(){
        const {types, value, path,name,label=name, uiContext, ...props}=this.$props
        return (
            <ColorButton {...props}
                status={value?"checked":"unchecked"}
                onChange={color=>this.set(this.path,color)}
                value={value||""}
                label={label}
                children={<SelectColor/>}
                />
        )
    }

    renderDialog(){
        const {types, value, path,name,uiContext,label=name, ...props}=this.$props
        const {show}=this.state
        const ref=React.createRef()
        return (
            <Fragment>
                {this.lineField(<button onClick={e=>this.setState({show:true})} style={{backgroundColor:value, border:0}}/>)}
                {show && <Dialog 
                    title={`Set ${label}`}
                    actions={[
                        <FlatButton
                            label="Cancel"
                            onClick={e=>this.setState({show:false})}
                        />,
                        <FlatButton
                            label="Submit"
                            primary={true}
                            onClick={e=>{
                                this.set(this.path, ref.current.value)
                                this.setState({show:false})
                            }}
                        />,
                    ]}
                    >
                        <SelectColor ref={ref}/>
                    </Dialog>}
            </Fragment>
        )
    }

    renderTree(){
        return this.renderRibbon()
    }

    renderMenu(){
        return <SelectColor onChange={color=>this.set(this.path,color)}/>
    }
}