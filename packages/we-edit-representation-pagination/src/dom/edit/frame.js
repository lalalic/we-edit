import React from "react"
import editable from "./editable"
import {ReactQuery} from "we-edit"
import TestRenderer from 'react-test-renderer'
import {Cacheable} from "../../composable"
import Base from "../frame"
import {Group} from "../../composed"

const factory=base=>Cacheable(class extends editable(base){
    static editableLike(A){
        return factory(A)
    }

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

    //locatable

	positionFromPoint(x,y){
        const include=({x:x0=0,y:y0=0,width,height})=>x0<=x && y0<=y && (x0+width)>=x && (y0+height)>=y
        const chosen=new Set()
        var bound
        const {first:found,parents}=new ReactQuery(this.render()).findFirstAndParents((node,parents)=>{
            const {width,height,"data-type":type, "data-content":id}=node.props||{}
            bound={width,height,...this.getBound([...parents,node])}
            if(bound.width && bound.height){
                if(!include(bound)){
                    //inline level container should be selected, such as paragraph,shape
                    const paragraphIndex=parents.findIndex(a=>a.props["data-type"]=="paragraph")
                    if(paragraphIndex!=-1){
                        return positionClosestInlineContainer([...parents.slice(paragraphIndex),node],chosen, bound)
                    }
                    return false//don't continue
                }
            }

            if(id){
                const composer=this.context.getComposer(id)
				if(!composer.splittable){
                    bound={id}
					return true
				}

				if(type=="text"){
                    const paragraph=parents.findLast(a=>a.props["data-type"]=="paragraph")
                    const lineIndex=paragraph.props.pagination.i
                    const dx=x-this.getBound(parents.slice(0,parents.indexOf(paragraph)+1)).x
                    bound=composer.closest("paragraph").positionFromPoint(dx,lineIndex-1)
                    return true
				}

                chosen.add(id)
            }

            if(node.type!=Group)
                return false
        })

        if(found.length>0){
            return {id:bound.id, at:bound.at}
        }

        return {}
	}

	lineRect(line){
        line=this.lines[line]
        const p=new ReactQuery(line).findFirst(`[data-type="paragraph"]`)
        const rect=this.context.getComposer(p.attr('data-content'))
                                .contentRect(p.attr("pagination").i-1)
        rect.left=this.columns.find(a=>a.children.includes(line)).x+rect.left
        rect.height=line.props.height
        rect.top=this.lineY(line)-rect.height
        return rect
	}

	removeFrom(lineIndex){
		//remove content
		return super.rollbackLines(this.lines.length-lineIndex,false)
	}

    composeFrames(){
        return [...super.composeFrames(...arguments),this.props.id]
    }
})
const isLastContent=nodes=>nodes.reduceRight(function(bLast,a,i){
    if(bLast){
        if(i==0){
            return bLast
        }else{
            const children=nodes[i-1].props.children
            if(Array.isArray(children)){
                return children[children.length-1]==a
            }else{
                return children==a
            }
        }
    }
    return false
},true)

const positionClosestInlineContainer=(nodes, chosen, bound,last)=>{
    if(last=nodes.findLast(a=>chosen.has(a.props["data-content"]))){
        const i=nodes.indexOf(last)
        if(isLastContent(nodes.slice(i))){
            //@TODO: container'd better implement its own positionFromPoint(x,y),document,section,paragraph, shape, cell,...
            /*
            const composer=this.context.getComposer(last.props["data-content"])
            composer.positionFromPoint()
            */
            bound.id=last.props["data-content"]
            if(last.props["data-type"]=="paragraph"){
                bound.at=1
            }
            return true
        }else{
            return false
        }
    }
    return false
}

export default factory(Base)
