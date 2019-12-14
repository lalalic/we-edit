import PropTypes from "prop-types"

import {Cacheable,editable} from "../../composable"
import Base from "../section"

const Super=editable(Base,{stoppable:true})

export default Cacheable(class __$1 extends Super{
	static childContextTypes={
		...Super.childContextTypes,
		shouldContinueCompose:PropTypes.func,
	}

	getChildContext(){
		const ctx=super.getChildContext()
		ctx.shouldContinueCompose=this.shouldContinueCompose.bind(this)
		return ctx
	}

	shouldContinueCompose(){
		if(this.computed.allComposed===false){
			return false
		}
		return this.context.parent.shouldContinueCompose(...arguments)
	}
},true)//numbering can't work
