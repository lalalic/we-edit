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
		const bounds=nodes=>{
			return nodes.reduce((bound, a)=>{
				const {width,height,x=0,y=0,"data-type":type,"data-content":id}=a.props||{}
				bound.x+=x
				bound.y+=y
				if(type=="paragraph"){
					bound.height=height
				}
				return bound
			},{x:0,y:0})
		}
        const include=({x:x0=0,y:y0=0,width,height})=>x0<=x && y0<=y && (x0+width)>=x && (y0+height)>=y
        const rendered=this.render()
		var bound
        const {first:found,parents}=new ReactQuery(rendered).findFirstAndParents((node,parents)=>{
            const {width,height,"data-type":type, "data-content":id}=node.props||{}
            bound={width,height,...bounds(parents)}
            if(bound.width && bound.height){
				if(!include(bound)){
                    return false//don't continue
                }
            }

            if(id){
				const composer=this.context.getComposer(id)
				if(!composer.splittable){
					bound.id=id
					bound.at=0
					return true
				}
				if(type=="text"){
					const {children:text,"data-endat":endat}=node.props
					bound.at=endat-text.length+composer.measure.widthString(x-bound.x,text)
					bound.id=id
					return true
				}
            }

            if(node.type!=Group)
                return false
        })
        if(found.length>0){
            return bound
        }

        var lastChance=parents.findLast(a=>!!a.props["data-content"])
        if(lastChance){
            return {id:lastChance.props["data-content"]}
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

export default factory(Base)
