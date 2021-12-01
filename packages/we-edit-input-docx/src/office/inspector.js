import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import { compose, setDisplayName } from "recompose"
import {whenSelectionChangeDiscardable} from "we-edit"
import {CheckIconButton} from "we-edit-office"
import InspectorIcon from "material-ui/svg-icons/places/all-inclusive"

export default class Inspector extends Component{
    constructor(){
        super(...arguments)
        this.state={}
    }

    render(){
        const {}=this.props
        return (
            <Fragment>
                <Composed/>
            </Fragment>
        )
    }

    static panel=<Inspector title="Inspector"/>
    static Button=class extends Component{
        static contextTypes={
            panelManager:PropTypes.any
        }

        render(){
            const {title=Inspector.panel.props.title, whichPanel="left", ...props}=this.props
            return (
                <CheckIconButton 
                    {...props}
                    hint={title}
                    onClick={()=>this.context.panelManager.toggle(Inspector.panel,whichPanel)}>
                    <InspectorIcon/>
                </CheckIconButton>
            )
        }
    }
}

const Composed=compose(
    setDisplayName("Composed Properties"),
    whenSelectionChangeDiscardable(({selection})=>{
        const inspector=selection?.positioning.responsible.inspector
        return {inspector}
    }),
)(
    class extends Component{
        render(){
            const {inspector,style}=this.props
            return (
                <div style={style}>
                    {React.cloneElement(inspector,{style:{width:"100%",height:"100%"}})}
                </div>
            )
        }
    }
)





