import React from "react"
import editable from "./editable"
import {ReactQuery} from "we-edit"
import TestRenderer from 'react-test-renderer'
import {Cacheable} from "../../composable"
import Base from "../frame"
import {Group} from "../../composed"

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

    //locatable

    lineIndexOf(position){
        const lines=this.lines
        const {lineIndexOfParagraph,paragraph,id,at}=position
        if(paragraph){
            return lines.findIndex(a=>new ReactQuery(a)
                .findFirst(({props:{"data-content":content,"data-type":type,pagination:{i}={}}})=>{
                    if(content==paragraph && i==lineIndexOfParagraph+1){
                        return true
                    }
                    if(type=="paragraph"){
                        return false
                    }
                }).length)
        }else{
            const index=lines[`find${at==0?"":"Last"}Index`](a=>new ReactQuery(a)[at==0 ? "findFirst" : "findLast"](`[data-content="${id}"]`).length)
            if(index==-1){//line container
                return at==0 ? 0 : lines.length-1
            }
            return index
        }
    }

    columnIndexOf(line){
        return this.columns.reduce((c,column,i)=>{
            if(c.count>0){
                c.count-=column.children.length
                c.i=i
            }
            return c
        },{count:line+1,i:0}).i
    }

	includeContent(id){
		if(!!this.columns.find(a=>a.id==id)){
			return true
		}
		return !![...this.lines,...this.anchors].find(a=>this.belongsTo(a,id))
	}

	positionFromPoint(x,y){
        const include=({x:x0=0,y:y0=0,width,height})=>x0<=x && y0<=y && (x0+width)>=x && (y0+height)>=y
        const rendered=this.render()
        const {first:found,parents}=new ReactQuery(rendered).findFirstAndParents((node,parents)=>{
            const {width,height,x=0,y=0,children,"data-type":type}=node.props
            if(width && height){
                let xy=parents.reduceRight((p,{props:{x=0,y=0}})=>(p.x+=x,p.y+=y,p),{x,y})
                if(!include({...xy,width,height})){
                    return false//don't continue
                }
            }

            if(type=="paragraph"){
                return true
            }

            if(type=="anchor"){
                return true
            }

            if(node.type!=Group)
                return false
        })
        if(found.length>0){
            if(found.attr("data-type")=="paragraph"){
                const paragraphId=found.attr("data-content")
        		const i=found.attr("pagination").i-1

                let xy=parents.reduceRight((p,{props:{x=0,y=0}})=>(p.x+=x,p.y+=y,p),{x:found.attr("x")||0,y:found.attr("y")||0})
        		return this.context.getComposer(paragraphId).positionFromPoint(i,x-xy.x, y-xy.y)
            }
            parents.push(found.get(0))
        }
        const lastChance=parents.findLast(a=>!!a.props["data-content"])
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
        return [...super.composeFrames(),this.props.id]
    }
})
