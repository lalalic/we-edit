import React, {Component} from "react"
import PropTypes from "prop-types"
import {Editors, Composed} from "we-edit-representation-pagination"
const {Frame,}=Editors
const {Group}=Composed
export default class extends Component{
    static displayName="html-section"
    static contextTypes={
        margin: PropTypes.object,
        wrap: PropTypes.bool,
        viewport: PropTypes.object,
    }

    render(){
        const {margin,wrap=true, viewport}=this.context
        if(!viewport)
            return null
        return (
            <SectionFrame {...this.props} {...{
                margin,
                width:wrap ? viewport.width : Number.MAX_SAFE_INTEGER,
                height:Number.MAX_SAFE_INTEGER 
            }}/>
        )
    }
}

const SectionFrame=Frame.editableLike(class extends Frame.Columnable{
    appendComposed(){
        super.appendComposed(...arguments)
        this.context.parent.appendComposed(this.createComposed2Parent(...arguments))
    }

    createComposed2Parent(a){
        if(a){
            const {width,height,x,y}=a.props
            return <Group {...{width,height,x,y}}>{a}</Group>
        }
        return a
    }
})