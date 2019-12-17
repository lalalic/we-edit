/**
 * make component always update (by calling .render), so AllComposedTrigger would be triggered to correctly set allComposed
 * but at first clear last composed 

 * To make everything cacheable, component can customize appendLastComposed to define itself cache policy
 * shoul lastComposed be cleared
 */
export default (A,{})=>class __$1 extends A{
    static displayName=`recomposable-${A.displayName}`

    static getDerivedStateFromProps({hash},state={}){
        return {...state, selfChanged:hash!=state&&state.hash,hash}
    }

    shouldComponentUpdate(next){
        if(this.shouldComponentRecompose(...arguments)){
            this.clearComposed(...arguments)
        }
        return true
    }

    clearComposed(nextProps, nextState){
        this.computed.composed=[]
        this.computed.lastComposed=[]
        delete this.computed.allComposed
    }

    constructor(){
        super(...arguments)
        this.state={...this.state}
        this.computed.lastComposed=[]
    }
    
    //cache last composed for next time
    createComposed2Parent(){
        const composed=super.createComposed2Parent(...arguments)
        this.computed.lastComposed.push(composed)
        return composed
    }

    shouldComponentRecompose(){
        if(this.computed.lastComposed.length==0){
            return true
        }

        if(this.state.selfChanged){
            return true
        }

        if(!this.state.selfChanged && !this.isAllChildrenComposed()){
            return true
        }
    }


    //@return false==not success, then should render
    appendLastComposed(){
        if(this.shouldComponentRecompose()===true){
            this.computed.lastComposed=[]
            return false
        }

        this.computed.lastComposed.forEach(a=>this.context.parent.appendComposed(a))
    }
/*
    render(){
        if(this.appendLastComposed()!==false){
            this.onAllChildrenComposed()
            return null
        }
        return super.render()
    }
    */
}
