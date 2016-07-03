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
export default function editable(Content){
    return class extends Content{
        constructor(){
            super(...arguments)
            Object.assign(this.state,{composed:this.composed})//for debug
        }


        reCompose(){
    		this.composed[0] && this._reComposeFrom(this.composed[0])//#2 solution
    	}

    	/**
    	 *  if with content
    	 *  	> simply ask parent to recompose
    	 *  if without content
    	 *  	> just remove all and offspring to be ready to re-compose
    	 *  	> somewhere sometime it will be triggered to re-compose
    	 */
    	_reComposeFrom(content){
            console.info(`remove all from ${this.displayName} ${content ? "" : "not"} including child, and parent`)
    		if(content)
    			this.context.parent._reComposeFrom(this)
    		else{//here parent is ready for re-compose
                let lastComposed=this.composed.splice(0)
                if(!this._isLastComposedFitIntoParent(lastComposed)){
                    if(this.children.length){
            			this.children.forEach(a=>a._reComposeFrom())
            			this.children.splice(0)
                    }
                }
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
        shouldComponentUpdate(nextProps, nextState, nextContext){
            console.info(`shouldComponentUpdate on ${this.displayName}, with ${this.composed.length==0}`)
            if(this.composed.length==0)
                this.compose()
            return true
        }
    }
}
