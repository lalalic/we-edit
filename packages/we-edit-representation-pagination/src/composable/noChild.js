
import PropTypes from "prop-types"
import HasParentAndChild from "./hasParentAndChild"
export default A=>{
    const Super=HasParentAndChild(A)
    return class extends Super{
		static contextTypes={
            ...Super.contextTypes,
            getMyBreakOpportunities: PropTypes.func
        }

        render() {
            this.context.getMyBreakOpportunities(null)
            this.appendComposed()
            this.onAllChildrenComposed()
            return null
        }
    }
}
