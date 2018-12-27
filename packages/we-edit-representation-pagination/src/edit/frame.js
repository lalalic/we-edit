import editable from "./editable"
import {Cacheable} from "../composable"
import Base from "../frame"

export default Cacheable(class extends editable(Base){
    clearComposed(){
        this.columns=[]
        return super.clearComposed(...arguments)
    }

    removeChangedPart(changedChildIndex){
        const children=Children.toArray(this.props.children)
		const changed=children[changedChildIndex]

		const removedChildren=children.slice(changedChildIndex).map(a=>a.props.id).filter(a=>a!==undefined)

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
})
