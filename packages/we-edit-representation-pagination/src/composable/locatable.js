
import React from "react"
import PropTypes from "prop-types"

export default function Locatable(A){
	return class extends A{
		static displayName=`locatable-${A.displayName}`
		static propTypes={
			...A.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		}

        static contextTypes={
            ...A.contextTypes,
            mount: PropTypes.func,
            unmount: PropTypes.func
        }

        constructor(){
            super(...arguments)
            this.splittable=true
			this.context.mount(this)
        }

        componentWillUnmount(){
            this.context.unmount(this)
        }

		createComposed2Parent(){
			return React.cloneElement(super.createComposed2Parent(...arguments),{
					"data-content":this.props.id,
					"data-type":this.getComposeType()
				})
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

		distanceAt(x,node){
			return 0
		}

		position(locator, at){
			const {id}=this.props
			if(at==0){
                const {x,y,width,height,node}=locator.getClientRect(id)
                return {x,y,width,height,node}
            }else{
                const {x,y,width,height,node}=locator.getClientRects(id).pop()
                return {
                    x:x+width,
					y,
					width,
                    height,
                    node
                }
            }
		}

		getCursor(){
			return null
		}
	}
}
