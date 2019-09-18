export default A=>class __$1 extends A{
    static displayName=`recomposable-${A.displayName}`

    shouldComponentUpdate({changed}){
        this.clearComposed(...arguments)
        return true
    }

    clearComposed(nextProps, nextState){
        this.computed.composed=[]
        delete this.computed.allComposed
    }
}
