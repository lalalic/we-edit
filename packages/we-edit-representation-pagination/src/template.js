import React, {Component} from "react"
import PropTypes from "prop-types"

import {HasParentAndChild,Fissionable} from "./composable"
import Frame from "./frame"
import {models} from "we-edit"
import memoize from "memoize-one"
const {Template:Base}=models

const Super=Fissionable(HasParentAndChild(Base))
export default class Template extends Super{
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
