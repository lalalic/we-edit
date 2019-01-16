import React, {Component} from "react"
import PropTypes from "prop-types"

import {HasParentAndChild,Fissionable} from "./composable"
import Frame from "./frame"
import {models} from "we-edit"
import memoize from "memoize-one"
const {Template:Base}=models

const Super=Fissionable(HasParentAndChild(Base))
export default class Template extends Super{
    static childContextTypes={
        ...Super.childContextTypes,
        isAnchored:PropTypes.func,
        exclusive: PropTypes.func,
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

    getChildContext(){
        const me=this
        function isAnchored(){
            return me.current.isAnchored(...arguments)
        }
        function exclusive(){
            return me.current.exclusive(...arguments)
        }
        return Object.assign(super.getChildContext(),{
            isAnchored,
            exclusive,
        })
    }

    create(){
        return super.create({I:this.totals})
    }
}
