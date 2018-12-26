import React, {Component} from "react"
import PropTypes from "prop-types"

import {HasParentAndChild} from "./composable"
import Frame from "./frame"
import {models} from "we-edit"
import memoize from "memoize-one"
const {Template:Base}=models

const Super=HasParentAndChild(Base)
export default class Template extends Super{
    constructor(){
        super(...arguments)
        this.computed.named={}
    }

	named(name){
		return this.computed.named[name]
	}

    get current(){
        if(this.computed.composed.length==0)
            this.create()
		return this.computed.composed[this.computed.composed.length-1]
	}

    get prev(){
        if(this.totals>1)
            return this.computed.composed[this.computed.composed.length-2]
        return null
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
        const frame=this.props.create(
            {id:this.props.id, I:this.totals,i:this.computed.composed.length, named:this.named.bind(this)},
            {parent:this,getComposer:id=>this.context.getComposer(id)}
        )
        this.computed.composed.push(frame)
        this.context.parent.appendComposed(this.createComposed2Parent(frame))
        return frame
    }

    nextAvailableSpace(){
        let space=this.current.nextAvailableSpace(...arguments)
        if(!space){
            this.create()
            return this.nextAvailableSpace(...arguments)
        }
        return space
    }

    appendComposed({props:{named}}){
        if(named){
            this.computed.named[named]=arguments[0]
            return
        }else{
            const appended=this.current.appendComposed(...arguments)
            if(appended===false){
                this.create()
                return 1//recompose current line in case different availableSpace
            }else if(Number.isInteger(appended)){
                return appended
            }
        }
    }

    createComposed2Parent(frame){
        if(this.props.createComposed2Parent){
            return this.props.createComposed2Parent.call(this,...arguments)
        }
        return frame
    }
}
