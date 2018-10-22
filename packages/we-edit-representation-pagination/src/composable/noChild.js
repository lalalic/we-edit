
import PropTypes from "prop-types"
import HasParentAndChild from "./hasParentAndChild"
export default A=>{
    const Super=HasParentAndChild(A)
    return class extends Super{
		static contextTypes={
            ...Super.contextTypes,
            getMyBreakOpportunities: PropTypes.func
        }

		get noChild(){
			return true
		}

        render() {
            this.context.getMyBreakOpportunities(null)
            this.appendComposed(this.createComposed2Parent())
            this.onAllChildrenComposed()
            return null
        }
    }
}
