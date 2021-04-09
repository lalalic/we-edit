
import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

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

		/**a helper for later create relationships*/
		wrapParentsUntilMe(element,me=this){
			const id=new ReactQuery(element).findFirst("[data-content]").attr('data-content')
			const composer=this.context.getComposer(id)
			let wrapped=element, current=composer?.context.parent
			while(current?.createComposed2Parent && current!=me){
				wrapped=current.createComposed2Parent(wrapped)
				current=current.context.parent
			}
			return wrapped
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
