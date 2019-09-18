
import PropTypes from "prop-types"
import HasParentAndChild from "./hasParentAndChild"
export default A=>{
    const Super=HasParentAndChild(A)
    return class __$1 extends Super{
		static contextTypes={
            ...Super.contextTypes,
            getMyBreakOpportunities: PropTypes.func
        }

        constructor(){
            super(...arguments)
            this.splittable=false
        }

        render() {
            this.context.getMyBreakOpportunities(null)
            this.appendComposed()
            this.onAllChildrenComposed()
            return null
        }
    }
}
