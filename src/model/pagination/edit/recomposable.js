import React from "react"
import PropTypes from "prop-types"

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
	return class extends Content{
		static displayName=`recomposable-${Content.displayName}`

		static propTypes={
			...Content.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		}

		static contextTypes={
			...Content.contextTypes,
			mount: PropTypes.func,
			unmount: PropTypes.func,
		}

		constructor(){
			super(...arguments)
			this.context.mount && this.context.mount(this)
			if(this.debug){
				this.state={...this.computed}
			}
		}

		/*
		* content and container should have data-content id
		*/
		createComposed2Parent(props){
			return React.cloneElement(super.createComposed2Parent(props),{
					"data-content":this.props.id,
					"data-type":this.constructor.displayName.split("-").pop()
				})
		}

		componentWillReceiveProps(){
			this.clearComposed()
		}

		clearComposed(){
			this.computed.composed=[]
			this.computed.children=[]
		}
	}
}
