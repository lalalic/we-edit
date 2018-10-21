export default A=>class extends A{
    static displayName=`recomposable-${A.displayName}`

    shouldComponentUpdate({changed}){
        this.clearComposed(...arguments)
        return true
    }

    clearComposed(nextProps, nextState){
        if(this.computed){
            this.computed.composed=[]
            delete this.computed.allComposed
        }
    }
}
