
import React, {Fragment} from "react"
import PropTypes from "prop-types"

const ComposedAllTrigger=({host})=>(host.onAllChildrenComposed(),null)

export default A=>class extends A{
    static displayName=`composable-${A.displayName}`
	static contextTypes={
		...A.contextTypes,
		activeDocStore: PropTypes.object,
		debug: PropTypes.bool,
	}

    static childContextTypes = {
        ...(A.childContextTypes||{}),
        parent: PropTypes.object,
        prevSibling: PropTypes.func
    }

    constructor(){
        super(...arguments)
        this.computed = {composed: [] , allComposed:undefined}
        if(this.debug){
            this.state={computed:this.computed}
        }
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

    /**
     * usually NoChild content should be composed according to nextAvailableSpace,
     * and then append to itself.composed[] and parent.appendComposed
     */
    render(){
        return (
            <Fragment>
                {this.children()}
                <ComposedAllTrigger host={this}/>
            </Fragment>
        )
    }

    children(){
        return this.props.children
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

    isAllChildrenComposed() {
        return this.computed.allComposed
    }

    onAllChildrenComposed() {//
        if(this.computed.allComposed!==false)
            this.computed.allComposed=true
    }

    createComposed2Parent(props) {

    }

	get debug(){
		return !!this.context.debug||this.props.debug
	}
	
	dispatch(){
		this.context.activeDocStore.dispatch(...arguments)
	}
}
