import React from "react"
import PropTypes from "prop-types"
import {Locatable,enablify} from "../composable"
import {Group} from "../composed"

/**
 *  it's a very complicated job, so we need a very simple design, one sentence described solution. options:
 *  1. remove all composed, and re-compose all
 *  	- need find a time to recompose
 *  	- logic is most simple
 *  	- performance is most bad
 *
 *  2. remove all composed from this content, and re-compose removals
 *  	- Need locate composed of this content in page
 *  	- Need find a time to recompose
 *  		> componentDidUpdate
 *  			. any state update,
 *  			. and carefully tuned shouldComponentUpdate(nextProps, nextState, nextContext)
 *  	- performance is better than #1
 *
 *  3. recompose this content, and check if new composed fits last composed space (hit ratio is low)
 *  	- Yes: just replace
 *  	- No: #1, or #2
 *  	- and then loop with all following content with the same logic
 *
 *  	3.a: recompose this content line by line ..., much logics here
 */
export default function recomposable(Content){
	return class extends Locatable(Content){
		static displayName=`recomposable-${Content.displayName}`

		static contextTypes={
			...Content.contextTypes,
			mount: PropTypes.func,
			unmount: PropTypes.func,
			shouldContinueCompose: PropTypes.func,
			shouldRemoveComposed: PropTypes.func,
		}

		constructor(){
			super(...arguments)
			this.context.mount && this.context.mount(this)
			if(this.debug){
				this.state={computed:this.computed}
			}
		}

		componentWillReceiveProps(){
			if(this.context.shouldRemoveComposed()){
				this.clearComposed()
			}
		}

		clearComposed(){
			this.computed.composed=[]
			this.computed.allComposed=false
		}

		render(){
			if(this.isAllChildrenComposed())
				return null

			if(!this.context.shouldContinueCompose())
				return null

			return super.render()
		}


	}
}

recomposable.enable=enablify(recomposable)
