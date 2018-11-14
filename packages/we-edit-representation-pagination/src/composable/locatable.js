
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
	}
}
