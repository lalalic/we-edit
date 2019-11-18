
import PropTypes from "prop-types"
import HasParentAndChild from "./hasParentAndChild"
export default A=>{
    const Super=HasParentAndChild(A)
    return class __$1 extends Super{
		constructor(){
            super(...arguments)
            this.splittable=false
        }

        render() {
            this.appendComposed()
            this.onAllChildrenComposed()
            return null
        }
    }
}
