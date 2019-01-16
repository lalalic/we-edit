import React, {Children} from "react"
import PropTypes from "prop-types"
import Recomposable from "./recomposable"

export default (A)=>class extends A{
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
	
    create(props={},context={}){
        const a=this.props.create(
            {...props,id:this.props.id, i:this.computed.composed.length, named:this.named.bind(this)},
            {...context,parent:this,getComposer:id=>this.context.getComposer(id)}
        )
        this.computed.composed.push(a)
        this.context.parent.appendComposed(this.createComposed2Parent(a))
        return a
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
        return frame
    }
}