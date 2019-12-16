/**
 * make component always update (by calling .render), so AllComposedTrigger would be triggered to correctly set allComposed
 * but at first clear last composed
 */
export default A=>class __$1 extends A{
    static displayName=`recomposable-${A.displayName}`

    shouldComponentUpdate(){
        this.clearComposed(...arguments)
        return true
    }

    clearComposed(nextProps, nextState){
        this.computed.composed=[]
        delete this.computed.allComposed
    }
}
