
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

/**
 * It make a composer navigatable: 
 * >>> if a composer can NOT navigate itself, let parent navigate
 * @param {*} A 
 */
export default function Navigatable(A){
	return class __$1 extends A{
		static displayName=`navigatable-${A.displayName}`
		static propTypes={
			...A.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		}

        static contextTypes={
            ...A.contextTypes,
 			getComposer: PropTypes.func,
        }
		
		getFocusShape(){
			return this.navigatable('getFocusShape',...arguments)
		}

		navigatable(op, ...args){
			if(this.props[op]){
				return this.props[op](...args)
			}else if(this.context.parent && this.context.parent[op]){
				return this.context.parent[op](...args)
			}
		}
	}
}
