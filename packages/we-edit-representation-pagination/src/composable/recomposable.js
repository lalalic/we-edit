import React,{Fragment,Children} from "react"
import memoize from "memoize-one"
import ComposedAllTrigger from "./composed-all-trigger"
/**
 * make component always update (by calling .render), so AllComposedTrigger would be triggered to correctly set allComposed
 * but at first clear last composed 
 * 
 * Recompose:
 * 1. cancel and keep last composed according to props/state/computed/context
 * in render:
 * 2. append last composed
 * 3. compose not composed

 * To make everything cacheable, component can customize appendLastComposed to define itself cache policy
 * shoul lastComposed be cleared
 */
export default (A,{cancelAllOnSelfChange, partable})=>{
    class Recomposable extends A{
        static displayName=`recomposable-${A.displayName}`

        constructor(){
            super(...arguments)
            this.computed.lastComposed=[]
        }

        //cache last composed for next time
        createComposed2Parent(){
            const composed=super.createComposed2Parent(...arguments)
            this.computed.lastComposed.push(composed)
            return composed
        }

        //always call render to compose to sync onAllChildrenComposed
        shouldComponentUpdate(){
            this.cancelUnusableLastComposed(...arguments)
            return true
        }

        /**
         * to remove unusable composed, and keep usable, then append usable to parent in render 
         * all computed should be synced here
         * @param {*} nextProps 
         * @param {*} nextState 
         */
        cancelUnusableLastComposed(nextProps, nextState){
            this.computed.composed=[]
            this.computed.lastComposed=[]
            delete this.computed.allComposed
        }

        /**
         * * all computed should be synced here again based on cancelUnusableLastComposed
         * @return
         * number: need render from the index
         * true: success, render nothing,
         * others: fail, render all
         */
        appendLastComposed(){
            
        }

        //last composed + left
        render(){
            if(this.computed.lastComposed.length>0){
                const appended=this.appendLastComposed()
                if(typeof(appended)=="number" && appended>-1){
                    console.debug(`${this.getComposeType()}[${this.props.id}] used ${appended+1} children caches`)
                    return (
                        <Fragment>
                            {Children.toArray(this.props.children).slice(appended+1)}
                            <ComposedAllTrigger host={this}/>
                        </Fragment>
                    )
                }else if(appended===true){
                    console.debug(`${this.getComposeType()}[${this.props.id}] used all children caches`)
                    return null
                }
                console.debug(`${this.getComposeType()}[${this.props.id}] used 0 children caches`)
            }

            return super.render()
        }

        childIdOf(composed,id){
            const extract=({props:{"data-content":a,children}})=>(id=a)!=undefined ? 
                true :  Children.toArray(children).findIndex(extract)!=-1;
            extract(composed)
            return id
        }

        childrenNeedRecompose=memoize((b,a)=>{
            const next=Children.toArray(b.children)
            const current=Children.toArray(a.children)
            const changedIndex=current.findIndex(({props:{id,hash}},i,_,$,b=next[i])=>
                !(b && b.props.id==id && b.props.hash==hash))
            return current.slice(changedIndex).map(a=>a && a.props.id)
        })
    }


    return Recomposable
}
