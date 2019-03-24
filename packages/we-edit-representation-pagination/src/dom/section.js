import React, {Component} from "react"
import PropTypes from "prop-types"

import {HasParentAndChild,Fissionable} from "../composable"
import Frame from "./frame"
import {dom} from "we-edit"
import memoize from "memoize-one"

const Super=Fissionable(HasParentAndChild(dom.Section))
export default class extends Super{
	static defaultProps={
		...Super.defaultProps,
		create(props,context){
			const {page}=this.props
			if(page){
				return new Page({...page, ...props},context)
			}else{
				throw new Error("section has no create")
			}
		}
	}
	
    getDocument=memoize(()=>{
		var current=this.context.parent
		while(current){
			if(current.getComposeType()=="document")
				return current
            current=current.context.parent
		}
		return current
	})

	get totals(){
		return this.getDocument().computed.composed.length
	}


    create(){
        const page=super.create({I:this.totals})
		this.context.parent.appendComposed(this.createComposed2Parent(page))
		return page
    }

	createComposed2Parent(page){
		return page
	}
}

class Page extends Frame{
	render(){
		const {props:{i:key,width,height,margin}}=this
		return React.cloneElement(super.createComposed2Parent(),{key,width,height,margin})
	}
}
