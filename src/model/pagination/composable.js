import React, {Children,Fragment} from "react"
import PropTypes from "prop-types"


export function HasChild(Component){
    return class extends Component{
        static displayName=`composable-${Component.displayName}`
		static contextTypes={
			events: PropTypes.shape({emit:PropTypes.func.isRequired}),
			debug: PropTypes.bool,
		}

        static childContextTypes = {
            ...(Component.childContextTypes||{}),
            parent: PropTypes.object,
            prevSibling: PropTypes.func
        }

        computed = { children: [], composed: [] }
        getChildContext() {
            let self = this
            let superChildContext=super.getChildContext ? super.getChildContext() : {}
            return {
                ...superChildContext,
                parent: this,
                prevSibling(me) {
                    const {children: siblings} = self.computed
                    let found = siblings.indexOf(me)
                    if (found == -1) {//not found, current should not be composed
                        return siblings[siblings.length - 1]
                    } else {
                        return siblings[found - 1]
                    }
                }
            }
        }

        /**
         * usually NoChild content should be composed according to nextAvailableSpace,
         * and then append to itself.composed[] and parent.appendComposed
         */
        render(){
            if(Children.count(this.props.children)===0){
				this.onAllChildrenComposed()
				this.context.parent.on1ChildComposed(this)
			}
			//console.log(`render--${this.constructor.displayName}[${this.props.id}]`)
            return (<Fragment>{this.props.children}</Fragment>)
        }

        /**
         * children should call after a line composed out
         * a chance to add to self's composed
         */
        appendComposed(line) {

        }

        /**
         * children should call before composing line,
         * return next line rect {*width, [height]}
         */
        nextAvailableSpace(required = { width: 0, height: 0 }) {

        }

    	/**
    	 *  child calls context.parent.on1ChildComposed() to notify parent 1 child composed
    	 *  return
    	 *  	true: parent's all children composed
    	 */
        on1ChildComposed(child) {
            this.computed.children.push(child)

            if (this.isAllChildrenComposed()) {
                this.onAllChildrenComposed()
            }
        }

        isAllChildrenComposed() {
            return Children.count(this.props.children) == this.computed.children.length
        }

        onAllChildrenComposed() {//

        }

        createComposed2Parent(props) {

        }

		emit(){
			try{
				if(this.context.events)
					this.context.events.emit(...arguments)
			}catch(e){

			}
		}

		get debug(){
			return !!this.context.debug
		}
    }
}

export function HasParentAndChild(Component){
    return class extends HasChild(Component){
        static contextTypes = {
            ...(Component.contextTypes||{}),
            parent: PropTypes.object,
            prevSibling: PropTypes.func
        }
        /**
         * children should call before composing line,
         * return next line rect {*width, [height], [greedy(text)=true], [wordy(text)=true]}
         */
        nextAvailableSpace() {
            return this.availableSpace = this.context.parent.nextAvailableSpace(...arguments)
        }

        /**
         * children should call after a line composed out
         * a chance to add to self's composed
         */
        appendComposed() {
            return this.context.parent.appendComposed(...arguments)
        }

        onAllChildrenComposed() {
            this.context.parent.on1ChildComposed(this)
            super.onAllChildrenComposed()
        }
    }
}

export function NoChild(Component){
    return class extends HasParentAndChild(Component){
        render() {
            let composed = this.createComposed2Parent()
            this.computed.composed.push(composed)
            this.appendComposed(composed)
            this.context.parent.on1ChildComposed(this)
            return null
        }
    }
}
