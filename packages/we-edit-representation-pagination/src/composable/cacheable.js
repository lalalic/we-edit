import React,{Children,Fragment} from "react"
import { ComposedAllTrigger } from "."

/**
 * Cacheable keep last composed in computed.lastComposed when it call createComposed2Parent
 * stoppable: to check context.shouldContinueCompose to stop composing itself
 * continuable: to provide shouldContinueCompose to content
 * 
 * 
 * TypedCacheable should implement how to append last composed
 * the following can be cached
 * Frame:  stoppable
 * Fissionable: stoppable
 * Paragraph: stoppable,continuable=true
 * Row: stoppable,continuable=true
 * 
 * 
 * cacheable component should always compose all children, but children composing is stoppable
 */
export default (A,partable, composedOnlyForFields=["hash"])=>class __$1 extends A{
    static displayName=`cacheable(${partable ? "part" : "all"})-${A.displayName}`
    constructor(){
        super(...arguments)
        this.computed.lastComposed=[]//cache
        this.computed.hash=null//cached for content hash
    }

    //cache last composed for next time
    createComposed2Parent(){
        const composed=super.createComposed2Parent(...arguments)
        this.computed.lastComposed.push(composed)
        return composed
    }

    isChanged(current,last){
        if(super.isChanged){
            return super.isChanged(...arguments)
        }
        return composedOnlyForFields.reduce((changed,k)=>{
            return changed || current[k]!=last[k]
        },false)
    }

    clearComposed({id, hash,children}){
        const changed=this.isChanged(arguments[0],this.props)
        console.debug(`${this.constructor.getType()}[${id}] -- ${changed}`)
        if(!changed && this.isAllChildrenComposed()){
            return
        }

        super.clearComposed(...arguments)
        composedOnlyForFields.forEach(k=>this.computed[k]=null)
        
        if(!partable){//keep last Composed for recovering
            this.computed.lastComposed=[]
        }else if(changed){
            const next=Children.toArray(children)
            const last=Children.toArray(this.props.children)
            const changedIndex=last.findIndex((a,i)=>{
                let b=next[i]
                if( b && b.props.id===a.props.id && b.props.hash===a.props.hash){
                    return false
                }
                return true
            })

            this.renderChangedPart=function(){
                switch(changedIndex){
                    case 0:
                        return false
                    case -1:
                        return this.renderFrom(last.length)
                    default:{
                        if(this.removeChangedPart(last.slice(changedIndex).map(a=>a.props.id))){
                            return this.renderFrom(changedIndex)
                        }
                        return false
                    }
                }
            }
        }
    }

    render(){
        try{
            if(this.context.shouldContinueCompose && !this.context.shouldContinueCompose(this)){
                return null
            }

            const {id, }=this.props
            const changed=this.isChanged(this.props,this.computed)
            console.debug(`${this.constructor.getType()}[${id}] -- ${changed}`)
            if(!changed && this.isAllChildrenComposed()){
                if(this.appendLastComposed()!==false){
                    return null
                }
            }

            if(partable){
                if(changed){//remove changed part, and continue compose left
                    if(this.renderChangedPart){
                        const changedRendered=this.renderChangedPart()
                        if(changedRendered!==false){
                            return changedRendered
                        }
                    }
                }else if(this.computed.lastComposed.length>0){//(!this.isAllChildrenComposed())
                    const lastIndex=this.keepUntilLastAllChildrenComposed()
                    if(lastIndex!=-1){
                        return this.renderFrom(lastIndex+1)
                    }
                }
            }

            //last safe
            super.clearComposed(this.props)
            this.computed.lastComposed=[]
            return super.render()
        }finally{
            composedOnlyForFields.forEach(k=>{
                this.computed[k]=this.props[k]
            })
            
        }
    }

    /**
     * to render part of content, customizable
     * @param {*} index 
     */
    renderFrom(index){
        if(this.appendLastComposed()===false){
            return super.render()
        }
        
        return (
            <Fragment>
                {Children.toArray(this.props.children).slice(index)}
                <ComposedAllTrigger host={this}/>
            </Fragment>
        )
    }
    /**
     * to utilize cache, customizable
     * default to append to parent
     */
    appendLastComposed(){
        if(super.appendLastComposed){
            return super.appendLastComposed(...arguments)
        }

        this.computed.lastComposed.forEach(a=>this.context.parent.appendComposed(a))
    }

    /**
     * to remove cache for changed content
     * @param {*} changedChildIndex 
     * @return boolean
     *   false: can't just remove, so will render all content
     */
    removeChangedPart(changedChildIndex){
        if(super.removeChangedPart){
            return super.removeChangedPart(...arguments)
        }
        return false
    }

    /**
     * only layouted of all children composed content can be utilized
     * @return {number} index
     */
    keepUntilLastAllChildrenComposed(){
        if(super.keepUntilLastAllChildrenComposed){
            return super.keepUntilLastAllChildrenComposed(...arguments)
        }
        return -1
    }

    findLastChildIndexOfLastComposed(){
        if(super.findLastChildIndexOfLastComposed){
            return super.findLastChildIndexOfLastComposed(...arguments)
        }
        return -1
    }

    findContentId(content){
		return ((line,id)=>{
			const extract=a=>{
				if((id=a.props["data-content"])!==undefined)
					return true
				return Children.toArray(a.props.children).findIndex(extract)!=-1
			}
			extract(line)
			return id
		})(content)
	}
}
