import {Children} from "react"

/**
 * Cacheable keep last composed in computed.lastComposed when it call createComposed2Parent
 * TypedCacheable should implement how to append last composed
 * the following can be cached
 * Frame
 * Paragraph
 * Fissionable
 */
export default (A,partable, composedOnlyForFields=["hash"])=>class __$1 extends A{
    static displayName=`cacheable(${partable ? "part" : "all"})-${A.displayName}`
    constructor(){
        super(...arguments)
        this.computed.lastComposed=[]
        this.computed.hash=null
    }

    //keep last composed for next time
    createComposed2Parent(){
        let composed=super.createComposed2Parent(...arguments)
        this.computed.lastComposed.push(composed)
        return composed
    }

    isChanged(current,last){
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

    renderFrom(index){
        if(this.appendLastComposed()===false){
            return super.render()
        }
        //only compose from changedIndex
        const _children=this.children
        try{
            this.children=()=>Children.toArray(this.props.children).slice(index)
            const rendered=super.render()
            return rendered
        }finally{
            this.children=_children
        }
    }

    appendLastComposed(){
        if(super.appendLastComposed){
            return super.appendLastComposed(...arguments)
        }

        this.computed.lastComposed.forEach(a=>this.context.parent.appendComposed(a))
    }

    removeChangedPart(changedChildIndex){
        if(super.removeChangedPart){
            return super.removeChangedPart(...arguments)
        }
        return false
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
