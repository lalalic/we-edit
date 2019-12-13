import {Cacheable,editable} from "../../composable"
import Base from "../frame"

const factory=base=>Cacheable(class Frame extends editable(base){
    static editableLike(A){
        return factory(A)
    }

    clearComposed(){
        this.computed.anchors=[]
        return super.clearComposed(...arguments)
    }

    appendLastComposed(){
        const lastComposed=[...this.computed.lastComposed]
        this.computed.lastComposed=[]
        lastComposed.forEach(a=>{
            this.context.parent.appendComposed(this.createComposed2Parent())
        })
    }

    removeChangedPart(removedChildren){
        const findChangedContentId=line=>{
			const id=this.findContentId(line)
			return (id!==undefined && removedChildren.includes(id))
		}

        const lineIndex=this.lines.findIndex(line=>findChangedContentId(line))
        this.rollbackLines(this.lines.slice(lineIndex))
        return true
    }

    findLastChildIndexOfLastComposed(){
        return this.findContentId(this.lastLine)
    }
    
	removeFrom(lineIndex){
		//remove content
		return super.rollbackLines(this.lines.length-lineIndex,false)
	}
},undefined,["hash","width"])

export default factory(Base)
