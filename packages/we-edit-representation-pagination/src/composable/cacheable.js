import Recomposable from "./recomposable"

export default A=>class extends A{
    static displayName=`cachable(all|zero)-${A.displayName}`
    constructor(){
        super(...arguments)
        this.computed.lastComposed=[]
    }

    createComposed2Parent(){
        let composed=super.createComposed2Parent(...arguments)
        this.computed.lastComposed.push(composed)
        return composed
    }

    render(){
        if(!this.props.changed && this.isAllChildrenComposed()){
			this.computed.lastComposed.forEach(a=>this.context.parent.appendComposed(a))
            return null
		}
        this.computed.lastComposed=[]
		return super.render()
	}
}
