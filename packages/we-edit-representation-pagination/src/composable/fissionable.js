import React, {Children} from "react"
import PropTypes from "prop-types"
import Recomposable from "./recomposable"

export default (A)=>class extends A{
	static contextTypes={
		...A.contextTypes,
		ModelTypes: PropTypes.object,
	}
	static childContextTypes={
        ...A.childContextTypes,
        isAnchored:PropTypes.func,
        exclusive: PropTypes.func,
    }

	constructor(){
		super(...arguments)
		this.computed.named={}
		if(!this.constructor.Frame && this.constructor.extendsFrame){
			this.constructor.Frame=this.constructor.extendsFrame(this.context.ModelTypes.Frame)
		}
	}

	get Frame(){
		return this.context.ModelTypes.Frame
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

	named(name){
		return this.computed.named[name]
	}

    get current(){
        if(this.computed.composed.length==0)
            this.create()
		return this.computed.composed[this.computed.composed.length-1]
	}

    create(props={},context={},requiredSpace){
        const a=this.props.create.bind(this)(
            {...props,id:this.props.id, i:this.computed.composed.length, named:this.named.bind(this)},
            {...context,parent:this,getComposer:id=>this.context.getComposer(id)}
        )
        this.computed.composed.push(a)
        return a
    }


    nextAvailableSpace(required){
        let space=this.current.nextAvailableSpace(...arguments)
        if(!space){
            this.create(undefined,undefined,required)
            return this.nextAvailableSpace(...arguments)
        }
        return space
    }

    appendComposed({props:{named,height}}){
        if(named){
            this.computed.named[named]=arguments[0]
            return
        }else{
            const appended=this.current.appendComposed(...arguments)
            if(appended===false){
                this.create(undefined, undefined,{height})
                return 1//recompose current line in case different availableSpace
            }else if(Number.isInteger(appended)){
                return appended
            }
        }
    }
}
