export default A=>class extends A{
    static displayName=`recomposable-${A.displayName}`

    shouldComponentUpdate(){
        this.clearComposed()
        return true
    }

    clearComposed(){
        this.computed.composed=[]
        delete this.computed.allComposed
    }
}
