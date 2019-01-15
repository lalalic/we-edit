
import React from "react"
import PropTypes from "prop-types"

function Locatable(A){
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

function Locatorize(A){
	return class extends A{
		static displayName=`locator-${A.displayName}`
		static childContextTypes={
			...A.childContextTypes,
			mount: PropTypes.func,
			unmount: PropTypes.func,
			getComposer: PropTypes.func,
		}

		constructor(){
			super(...arguments)
			const composers=this.composers=new Map([[this.props.id,this]])
			this.mount=a=>composers.set(a.props.id,a)
			this.unmount=a=>composers.delete(a.props.id)
			this.getComposer=id=>composers.get(id)
		}

		getChildContext(){
			const {mount,unmount,getComposer}=this
			return {
				...super.getChildContext(),
				mount,unmount,getComposer
			}
		}


	}
}

Locatable.Locatorize=Locatorize

export default Locatable
