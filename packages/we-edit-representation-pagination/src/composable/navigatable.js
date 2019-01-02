
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


		nextCursorable(){
            if(this.props.nextCursorable){
				return this.props.nextCursorable(...arguments)
			}else if(this.context.parent && this.context.parent.nextCursorable){
				return this.context.parent.nextCursorable(...arguments)
			}
        }

        prevCursorable(){
            return this.props.prevCursorable ? this.props.prevCursorable() : false
        }

		nextSelectable(){
            return this.props.nextSelectable ? this.props.nextSelectable(...arguments) : this.nextCursorable(...arguments)
        }

        prevSelectable(){
            return this.props.prevSelectable ? this.props.prevSelectable(...arguments) : this.prevCursorable(...arguments)
        }

		position(locator, at){
			const {id}=this.props
			if(at==0){
				const rect=locator.getClientRect(id)
				if(rect){
					const {x,y,width,height,node}=rect
					return {x,y,width,height,node}
				}
            }else{
				const rect=locator.getClientRects(id).pop()
				if(rect){
					const {x,y,width,height,node}=rect
					return {
						x:x+width,
						y,
						width,
						height,
						node
					}
				}
            }

			return null
		}

		getFocusShape(){
			return null
		}
	}
}
