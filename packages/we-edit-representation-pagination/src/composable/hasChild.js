
import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {ContentQuery} from "we-edit"

const ComposedAllTrigger=({host})=>(host.onAllChildrenComposed(),null)

export default A=>class __$1 extends A{
    static displayName=`composable-${A.displayName}`
	static contextTypes={
		...A.contextTypes,
		activeDocStore: PropTypes.object,
		debug: PropTypes.bool,
	}

    static childContextTypes = {
        ...(A.childContextTypes||{}),
        parent: PropTypes.object
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
            parent: this
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

    createComposed2Parent(content) {
        return content
    }

	get debug(){
		return !!this.context.debug||this.props.debug
	}

	dispatch(){
		this.context.activeDocStore.dispatch(...arguments)
	}
	
	query(selector=`#${this.props.id}`){
		return new ContentQuery(this.context.activeDocStore.getState(),selector)
    }
    
    closest(type){
        var fn=type
        if(typeof(type)=="string")
            fn=a=>a.getComposeType()==type

        var current=this
        while(current){
            if(!!fn(current))
                return current
            if(current.context)
                current=current.context.parent
        }
    }    
}
