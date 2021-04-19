import React,{Fragment,Children} from "react"
import memoize from "memoize-one"
import {shallowEqual} from "recompose"

import ComposedAllTrigger from "./composed-all-trigger"
import UseCached from "./use-cached"
/**
 * make component always update (by calling .render), so AllComposedTrigger would be triggered to correctly set allComposed
 * but at first clear last composed 
 * 
 * Recompose:
 * 1. cancel and keep last composed according to props/state/computed/context
 * in render:
 * 2. append last composed
 * 3. compose not composed
 * ** The cache mechanism is to use keyed array react elements

 * To make everything cacheable, component can customize appendLastComposed to define itself cache policy
 * shoul lastComposed be cleared
 * 
 * AtomCollector: is inline conainer and NoChild in Paragraph, Paragraph.nextAvailableSpace would give null for AtomCollector test.
 * AtomCollector is just to collect atom without either block or inline layout, so the cache policy is sure as
 * ** if not change, cache can always be applicable
 * ** AtomCollector should be either all composed, or nothing composed
 * ** NoChild also works like AtomCollector from cache perspective
 */
export default A=>{
    class Recomposable extends A{
        static displayName=`recomposable-${A.displayName}`

        constructor(){
            super(...arguments)
            this.computed.lastComposed=[]
            this.computed.composedUUID=Date.now()
        }

        recomposable_createComposed2Parent(){
            return super.createComposed2Parent(...arguments)
        }

        //cache last composed for next time
        createComposed2Parent(){
            const composed=this.recomposable_createComposed2Parent(...arguments)
            this.computed.lastComposed.push(composed)
            return composed
        }

        //always call render to compose to sync onAllChildrenComposed
        shouldComponentUpdate(next){
            /**
             * composedUUID to identify each compose, so createComposed2Parent can be cached.
             */           
            this.computed.composedUUID=Date.now()
            this.context.mount && this.context.mount(this)
            if(!this.isAllChildrenComposed()){
                //clear last allComposed, so it can be reset
                this.computed.allComposed=undefined
            }
            if(this.context.shouldContinueCompose && !this.context.shouldContinueCompose(this,...arguments)){
                return false
            }
            this.cancelUnusableLastComposed(...arguments)
            return true
        }

        /**
         * to remove unusable composed, and keep usable, then append usable to parent in render 
         * all computed should be synced here
         * @param {*} nextProps 
         * @param {*} nextState 
         */
        cancelUnusableLastComposed(props){
            if(this.isAtom && shallowEqual(props,this.props)){
                return
            }
            
            this._cancelAllLastComposed()
        }

        _cancelAllLastComposed(){
            this.computed.composed=[]
            this.computed.lastComposed=[]
            this.computed.allComposed=undefined
        }

        /**
         * * all computed should be synced here again based on cancelUnusableLastComposed
         * @return
         * number: need render from the index
         * true: success, render nothing,
         * others: fail, render all
         */
        appendLastComposed(){
            if(this.isAtom){
                this.computed.lastComposed.forEach(a=>this.context.parent.appendComposed(a))
                return true
            }
        }

        //last composed + left
        render(){
            if(this.computed.allComposed || this.computed.lastComposed.length>0){
                const appended=this.appendLastComposed()
                const children=this.childrenArray(this.props.children)
                const tryUseCached=a=>UseCached.create(a,this.context.getComposer)
                if(typeof(appended)=="number" && appended>-1){
                    console.debug(`${this.getComposeType()}[${this.props.id}] used ${appended+1} children caches`)
                    return (
                        <Fragment>
                            {[//keyed array
                                ...children.slice(0,appended+1).map(tryUseCached),
                                ...children.slice(appended+1),
                            ]}
                            <ComposedAllTrigger host={this}/>
                        </Fragment>
                    )
                }else if(appended===true){
                    console.debug(`${this.getComposeType()}[${this.props.id}] used all children caches`)
                    return (
                        <Fragment>
                            {children.map(tryUseCached)}
                        </Fragment>
                    )
                }
            }
            console.debug(`${this.getComposeType()}[${this.props.id}] used 0 children caches`)
            return super.render()
        }



        childIdOf(composed,id){
            const extract=({props:{"data-content":a,children}})=>(id=a)!=undefined ? 
                true :  Children.toArray(children).findIndex(extract)!=-1;
            extract(composed)
            if(this.childrenArray(this.props.children).findIndex(a=>a && a.props.id==id)!=-1)
                return id
        }

        childrenNeedRecompose=memoize((b,a)=>{
            const next=Children.toArray(b.children)
            const current=this.childrenArray(a.children)
            const changedIndex=current.findIndex(({props:{id,hash}},i,_,$,b=next[i])=>!(b && b.props.id==id && b.props.hash==hash))
            if(changedIndex!=-1){
                return current.slice(changedIndex).map(a=>a && a.props.id)
            }
            return []
        })
    }

    return Recomposable
}
