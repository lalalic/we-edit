
import React from "react"
import PropTypes from "prop-types"

export default function Navigatable(A){
	return class extends A{
		static displayName=`navigatable-${A.displayName}`
		static propTypes={
			...A.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		}

        static contextTypes={
            ...A.contextTypes,
 			getComposer: PropTypes.func,
        }

		navigatable(op, ...args){
			if(this.props[op]){
				return this.props[op](...args)
			}else if(this.context.parent && this.context.parent[op]){
				return this.context.parent[op](...args)
			}
		}

		getPages(){
			return this.navigatable("getPages",...arguments)
		}

		nextCursorable(){
			return this.navigatable('nextCursorable',...arguments)
        }

        prevCursorable(){
			return this.navigatable('prevCursorable',...arguments)
        }

		nextSelectable(){
            return this.navigatable('nextSelectable',...arguments)
        }

        prevSelectable(){
            return this.navigatable('prevSelectable',...arguments)
        }

		nextLine(){
			return this.navigatable('nextLine',...arguments)
		}

		prevLine(){
			return this.navigatable('prevLine',...arguments)
		}

		position(id, at){
			return this.navigatable('position',...arguments)
		}

		getClientRects(id){
			return this.navigatable("getClientRects",...arguments)
		}

		getFocusShape(){
			return this.navigatable('getFocusShape',...arguments)
		}
	}
}
