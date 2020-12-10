
import HasParentAndChild from "./hasParentAndChild"
export default A=>{
    const Super=HasParentAndChild(A)
    return class __$1 extends Super{
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
