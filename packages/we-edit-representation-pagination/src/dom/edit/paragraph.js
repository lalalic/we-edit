import React,{Children} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {ReactQuery} from "we-edit"

import {Cacheable} from "../../composable"
import Base from "../paragraph"
import editable from "./editable"

export default Cacheable(class __$1 extends editable(Base,{stoppable:true}) {
	shouldComponentUpdate(){
		return super.shouldComponentUpdate(...arguments) && this.context.shouldContinueCompose(this)
	}

	getNumberingAtom(){
		const numbering=super.getNumberingAtom()
		if(this.context.numbering){
			return React.cloneElement(numbering,{children:this.context.numbering(this.props.id)})
		}
		return numbering
	}

	clearComposed(){
		this.atoms=[]
		super.clearComposed(...arguments)
	}

	rollbackLines(n){
		super.rollbackLines(n)
		if(this.computed.lastComposed){
			this.computed.lastComposed.splice(-n)
		}
	}

	recalcNumbering(composedLine){
		const $=new ReactQuery(composedLine)
		const last=$.findFirst(".numbering").get(0)
		const current=this.getNumberingAtom()
		const {x,y}=last.props
		return $.replace(last,React.cloneElement(current,{x,y})).root
	}

	/**if lineSegments is same, last layouted line should be able to fit in without relayout */
	appendLastComposed(){
		const lines=this.lines
		this.lines=[]
		const spaceChangedAt=this.computed.lastComposed.findIndex((a,i)=>{
			const line=lines[i]
			const space=this.context.parent.nextAvailableSpace({height:a.props.height})
			if(line.isFitTo(space)){
				this.lines.push(line)
				if(i==0 && this.props.numbering){
					a=this.recalcNumbering(a)
				}
				this.context.parent.appendComposed(a)
				return false
			}else{
				this.computed.lastComposed.splice(i)
				return true
			}
		})

		switch(spaceChangedAt){
			case 0:
				return false//fully recompose
			case -1:
				return
			default:
				this.commit(this.computed.atoms.indexOf(lines[spaceChangedAt].firstAtom))
		}
	}

	getDefaultMeasure=memoize((style=this.props.defaultStyle)=>{
		return new this.context.Measure(style)
	})
})
