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
	
    get currentPage(){
        if(this.computed.composed.length==0)
            this.createPage()
		return this.computed.composed[this.computed.composed.length-1]
	}
	
	getDocument=memoize(()=>{
		var current=this.context.parent
		while(current){
			if(current.getComposerType()=="document")
				return current
		}
		return current
	})
	
	get total(){
		return this.getDocument().computed.composed.length
	}

    createPageTemplate(){
        const {size:{width,height},margin,padding}=this.props
        return new Frame({width,height,margin,padding})
    }

    createPage(){
        const page=this.createPageTemplate()
        this.computed.composed.push(page)
        this.context.parent.appendComposed(this.createComposed2Parent(page))
        return page
    }

    nextAvailableSpace(){
        let space=this.currentPage.nextAvailableSpace(...arguments)
        if(!space){
            this.createPage()
            return this.nextAvailableSpace(...arguments)
        }
        return space
    }

    appendComposed({props:{named}}){
        if(named){
            this.computed.named[named]=arguments[0]
            return
        }else if(this.currentPage.appendComposed(...arguments)===false){
            this.createPage()
            return this.appendComposed(...arguments)
        }
    }

    createComposed2Parent(page){
        return page
    }
	
	static Page=class extends Frame{
		nextAvailableSpace(){
			
		}
		
		appendComposed(){
			
		}
		
		render(){
			
		}
	}
}
