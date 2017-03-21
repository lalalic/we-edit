import React, {Children, PropTypes} from "react"

export function HasChild(Component){
    return class extends Component{
        static displayName=`composable-${Component.displayName}`
        computed = { children: [], composed: [] }

        static childContextTypes = {
            ...(Component.childContextTypes||{}),
            parent: PropTypes.object,
            prevSibling: PropTypes.func
        }

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

        render(){
			console.log(`render--${this.constructor.displayName}[${this.props.id}]`)
            return (<div>{this.props.children}</div>)
        }

        /**
         * compose on client or server
         */
        componentWillMount() {
            this.compose()
        }

        /**
         * usually NoChild content should be composed according to nextAvailableSpace,
         * and then append to itself.composed[] and parent.appendComposed
         */
        compose() {
            if(Children.count(this.props.children)===0)
                this.context.parent.on1ChildComposed(this)
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
        compose() {
            let composed = this.createComposed2Parent()

            const {parent} = this.context
            this.computed.composed.push(composed)
            parent.appendComposed(composed)
            parent.on1ChildComposed(this)
        }
    }
}
