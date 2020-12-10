
import React, {Children,Fragment} from "react"
import PropTypes from "prop-types"
import ComposedAllTrigger from "./composed-all-trigger"
import memoize from "memoize-one"
export default A=>{
    if(A.already)
        return A
    return class __$1 extends A{
        static displayName=`composable-${A.displayName}`
        static already=function(capable){
            return this.displayName.split("-").includes(capable)
        }
        static contextTypes={
            ...super.contextTypes,
            debug: PropTypes.bool,
            ModelTypes: PropTypes.object,
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
            const superChildContext=super.getChildContext ? super.getChildContext() : {}
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
                    {this.childrenArray(this.props.children)/****MUST use toArray(children), since recompose use this way to compose part of children*/}
                    <ComposedAllTrigger host={this}/>
                </Fragment>
            )
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

        /**
         * allComposed is very important
         * if content is skipped composed, itself and grand content should be set as false, 
         * then this event of grand content should be disabled
         * @check this.notifyNotAllComposed
         * 
         * @check Recomposable.shouldComponentUpdate: reset allComposed when not isAllChildrenComposed,
         * so this event can works again 
         */
        onAllChildrenComposed() {
            if(this.computed.allComposed!==false)
                this.computed.allComposed=true
        }

        notifyNotAllComposed(current){
            current.computed.allComposed=false
            while(current=current.context.parent){
                current.computed.allComposed=false
            }
        }

        createComposed2Parent(content) {
            const {transformComposed=a=>a}=this.props
            return transformComposed(content)
        }

        get debug(){
            return !!this.context.debug||this.props.debug
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
        
        childrenArray=memoize((children=this.props.children)=>Children.toArray(children))
    }
}
