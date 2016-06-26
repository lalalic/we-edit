import React, {Component, PropTypes} from "react"
import {HasChild} from "./any"

export default class Document extends HasChild{
    render(){
        return <svg {...this.props}/>
    }

    getChildContext(){
        const {width,height}=this.props
        return Object.assign(super.getChildContext(),{
            canvas: {width,height}
        })
    }

    static childContextTypes=Object.assign({
        canvas: PropTypes.object
    },HasChild.childContextTypes)
}
