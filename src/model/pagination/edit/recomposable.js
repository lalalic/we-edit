import React, {PropTypes} from "react"
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

		/*
		* content and container should have data-content id
		*/
		createComposed2Parent(props){
			return super.createComposed2Parent({...props, "data-content":this.props.id})
		}

        reCompose(){
			this.computed.composed=[]
			this.computed.children.splice(0,this.computed.children.length)
			this.compose()
    	}

		appendLastComposed(){

		}
    	/**
    	 *  if with content
    	 *  	> simply ask parent to recompose
    	 *  if without content
    	 *  	> just remove all and offspring to be ready to re-compose
    	 *  	> somewhere sometime it will be triggered to re-compose
    	 */
    	_reComposeFrom(content){
            this.context.parent._reComposeFrom(this)
    	}

		_clearComposed4reCompose(fullclear){
			let lastComposed=this.computed.composed.splice(0)

			let clearAll=a=>{
				if(this.computed.children.length){
					this.computed.children.forEach(a=>a._clearComposed4reCompose(true))
					this.computed.children.splice(0)
				}
				this.computed.lastComposed=null
			}
			if(fullclear){
				clearAll()
			}else if(!this._isLastComposedFitIntoParent(lastComposed)){
				clearAll()
			}else {
				this.computed.lastComposed=lastComposed
			}
		}

        /**
         * is there a way to just simply re-use last composed?
         */
        _isLastComposedFitIntoParent(lastComposed){
			return false
        }
        /**
         * only no composed should be re-compose
		*/
		componentWillUpdate(){
			this.reCompose()
		}
	}
}
