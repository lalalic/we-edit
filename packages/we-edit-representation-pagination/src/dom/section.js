import React, {Component} from "react"
import PropTypes from "prop-types"

import {HasParentAndChild,Fissionable} from "../composable"
import {dom} from "we-edit"
import memoize from "memoize-one"

const Super=Fissionable(HasParentAndChild(dom.Section))
export default class Section extends Super{
	static fissureLike=Frame=>class extends Frame{
		static dispatchName="PageFrame"
		defineProperties(){
			super.defineProperties()
			Object.defineProperties(this,{
				composedHeight:{
					enumerable:false,
					configurable:true,
					get(){
						const parent=this.context.parent
						if(this==parent.current){//last
							if(!parent.isAllChildrenComposed()){
								return Math.max(...this.columns.map(column=>column.y+(column.height-column.availableHeight)))
							}
						}
						return this.props.height
					}
				},
			})
		}

		render(){
			const {props:{I:key,width,height,margin}}=this
			return React.cloneElement(super.createComposed2Parent(),{key,width,height,margin, "data-content":undefined, "data-type":undefined})
		}
	}

	static defaultProps={
		...Super.defaultProps,
		create(props,context){
			const {page}=this.props
			if(page){
				const {
					width,height,margin:{left=0,right=0,top=0,bottom=0,header=0,footer=0}={},
					cols
				}=page
				const availableWidth=width-left-right
				let columns=cols
				if(!Array.isArray(cols)){
					const {num=1, space=0, y=top}=cols||{}
					columns=new Array(num)
							.fill({width:(availableWidth-(num-1)*space)/num,space})
							.reduce((state,{width,space})=>{
								state.columns.push({x:state.x, width, y})
								state.x+=(space+width)
								return state
							},{x:left,columns:[]})
							.columns
				}
				return new this.Fission({width, height, margin:{left,right,top,bottom},cols:columns, ...props},context)
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
