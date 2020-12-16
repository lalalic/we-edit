
import React from "react"
import PropTypes from "prop-types"

/**It to make composed result locatable through id and type */
function Locatable(A){
	return class __$1 extends A{
		static displayName=`locatable-${A.displayName}`
		static propTypes={
			...super.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		}

        static contextTypes={
            ...super.contextTypes,
            mount: PropTypes.func,
            getComposer: PropTypes.func,
        }

        constructor(){
			super(...arguments)
			this.context.mount && this.props.id && this.context.mount(this)
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

function Locatorize(A){
	return class __$1 extends A{
		static displayName=`locator-${A.displayName}`
		static childContextTypes={
			...super.childContextTypes,
			mount: PropTypes.func,
			getComposer: PropTypes.func,
		}

		constructor(){
			super(...arguments)
			this.locatorize(new Map([[this.props.id,this]]))
		}

		locatorize(composers){
			this.mount=a=>composers.set(a.props.id,a)
			this.getComposer=id=>composers.get(id)
			return this
		}

		getChildContext(){
			return {
				...super.getChildContext(),
				mount:a=>this.mount(a),
				getComposer:id=>this.getComposer(id),
			}
		}
	}
}

Locatable.Locatorize=Locatorize

export default Locatable
