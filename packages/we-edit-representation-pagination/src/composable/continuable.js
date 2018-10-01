import PropTypes from "prop-types"

export default A=>class extends A{
    static displayName=`continuable-${A.displayName}`

    static childContextTypes={
		...A.childContextTypes,
		shouldContinueCompose: PropTypes.func
	}

    getChildContext(){
        return {
            ...super.getChildContext(),
            shouldContinueCompose:this.shouldContinueCompose.bind(this)
        }
    }

    shouldContinueCompose(current){
        throw new Error("shouldContinueCompose must be implemented, and notifyNotAllComposed when false")
    }

	notifyNotAllComposed(current){
        current.computed.allComposed=false
		while(current.context.parent){
			current.context.parent.computed.allComposed=false
			current=current.context.parent
		}
	}
}
