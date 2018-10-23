
import React from "react"
import PropTypes from "prop-types"

export default function Locatable(A){
	return class extends A{
		static displayName=`locatable-${A.displayName}`
		static propTypes={
			...A.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		}

        static contextTypes={
            ...A.contextTypes,
            mount: PropTypes.func,
            unmount: PropTypes.func,
			getComposer: PropTypes.func,
        }

        constructor(){
            super(...arguments)
            this.splittable=true
			this.context.mount && this.context.mount(this)
        }

        componentWillUnmount(){
            //this.context.unmount(this)
        }

		createComposed2Parent(){
			const element=super.createComposed2Parent(...arguments)
			if(React.isValidElement(element) && this.props.id){
				return React.cloneElement(element,{
						"data-content":this.props.id,
						"data-type":this.getComposeType()
					})
			}else{
				return element
			}
		}

		nextCursorable(){
            return this.props.nextCursorable ? this.props.nextCursorable() : false
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
