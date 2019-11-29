import React, {Component} from "react"
import PropTypes from "prop-types"

import {HasParentAndChild,Fissionable} from "../composable"
import {dom} from "we-edit"
import memoize from "memoize-one"

const Super=Fissionable(HasParentAndChild(dom.Section))
export default class Section extends Super{
	static fissureLike=Frame=>class __$1 extends Frame{
		static displayName="frame-section"

		getComposeType(){
			return Section.getType()
		}

		render(){
			const {props:{I:key,width,height,margin}}=this
			return React.cloneElement(super.createComposed2Parent(),{
				key,width,height,margin,I:key
			})
		}

		lineIndexOf({page}){
			if(page){
				if(page==this){
					return super.lineIndexOf(...arguments)
				}
				return -1
			}else{
				return super.lineIndexOf(...arguments)
			}
		}
	}

	static defaultProps={
		...Super.defaultProps,
		create(props,context){
			const {page}=this.props
			if(page){
				return new this.Fission({...page, ...props},context)
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
