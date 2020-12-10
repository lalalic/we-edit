import PropTypes from "prop-types"

export default A=>class __$1 extends A{
    static displayName=`continuable-${A.displayName}`

    static childContextTypes={
		...super.childContextTypes,
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
}
