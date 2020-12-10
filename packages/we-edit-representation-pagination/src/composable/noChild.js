
import HasParentAndChild from "./hasParentAndChild"
export default A=>{
    return class NoChild extends HasParentAndChild(A){
        get isAtom(){
            return true
        }

        render() {
            this.appendComposed()
            this.onAllChildrenComposed()
            return null
        }
    }
}
