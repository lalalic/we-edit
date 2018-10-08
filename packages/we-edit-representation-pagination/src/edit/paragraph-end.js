import React from "react"
import PropTypes from "prop-types"
import {models,ACTION} from "we-edit"
import editable from "./editable"
import {Text as ComposedText} from "../composed"

export default editable(class extends models.Unknown{
    static contextTypes={
        ...models.Unknown.contextTypes,
        parent: PropTypes.object,
        Measure: PropTypes.func,
        activeDocStore: PropTypes.object,
    }
    getComposeType(){
        return "paragran-end"
    }
    render(){
        this.context.parent.nextAvailableSpace()
        this.context.parent.appendComposed(this.createComposed2Parent())
        return null
    }

    createComposed2Parent(){
        const {context:{Measure},props:{fonts,size,bold,italic}}=this
        const measure=new Measure({fonts:fonts,size,bold,italic})
        return (
            <ComposedText
                {...measure.defaultStyle}
                width={0}
                onClick={e=>{
                    e.stopPropagation()
                    this.context.activeDocStore.dispatch(ACTION.Cursor.AT(this.props.id,1))
                }}
                children={[String.fromCharCode(0xb6)]}
                />
        )
    }
})
