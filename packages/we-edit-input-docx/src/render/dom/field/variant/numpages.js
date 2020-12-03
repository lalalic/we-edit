import React, {Component} from "react"
import PropTypes from "prop-types"
import Field from "../fields"
import Context from "../context"

export default class NUMPAGES extends Component{
    static displayName="NUMPAGES"
    static contextTypes={
        activeDocStore: PropTypes.object
    }
    render(){
        return this.getValue()
    }

    getValue(){
        const {context:{activeDocStore},props:{instr}}=this
        const field=Field.create(instr)
        const context=new Context(activeDocStore.getState())
        return field.execute(context)
    }
}