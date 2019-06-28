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
                    const nodes=[...parents,node]
                    let last=nodes.findLast(a=>chosen.has(a.props["data-content"]))
                    if(last){
                        const i=nodes.indexOf(last)
                        if(isLastContent(nodes.slice(i))){
                            const composer=this.context.getComposer(last.props["data-content"])
                            const xy=this.getBound(nodes.slice(0,i))
                            bound=composer.positionFromPoint(x-xy.x,y-xy.y)
                            return true
                        }
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
                    bound=composer.closest("paragraph").positionFromPoint(dx,undefined,lineIndex-1)
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
        const {first,parents}=new ReactQuery(line).findFirstAndParents(`[data-type="paragraph"]`)
        const target=[...parents,first.get(0)].find(a=>!!a.props['data-content'])
        const composer=this.context.getComposer(target.props['data-content'])
        const rect=composer.rectInLine(line)

        rect.left=this.columns.find(a=>a.children.includes(line)).x+rect.left
        rect.height=line.props.height
        rect.top=this.lineY(line)-rect.height
        return rect
    }

    rectInLine(line){
        debugger
        const {x:left=0,y:top=0,width=0,height=0}=line.props
        const rect={left,top,width,height}
        rect.left=this.columns.find(a=>a.children.includes(line)).x+rect.left
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

    getRangeRects(p0,p1, pageXY){
		const getComposer=id=>this.getComposer && this.getComposer(id) || this.context.getComposer && this.context.getComposer(id)
		const pages=this.getPages()

		const composer0=getComposer(p0.id)
		p0=composer0.position(p0.id,p0.at)
		p1=getComposer(p1.id).position(p1.id,p1.at)//no context
		if(!p0 || !p1){
			return []
		}
		if(p0.id==p1.id && p0.page==p1.page && !composer0.splittable){
			const [start,end]=[p0,p1].sort((a,b)=>a.at-b.at);
			const {x,y}=pageXY(pages.find(a=>a.props.I==start.page))
			return [{left:x+start.x,top:y+start.y,right:x+end.x,bottom:y+end.y}]
		}
        debugger
        p0.page=p1.page=pages.find(a=>a.props.I==p0.page)
        
        //convert paragraph line index to page line index
		p0.line=this.lineIndexOf(p0)
		p1.line=this.lineIndexOf(p1)

		const rects=[]
        const frameXY=page=>{
            const {x,y}=pageXY(page)
            const {first,parents}=new ReactQuery(page.render()).findFirstAndParents(`[data-content="${this.props.id}"]`)
            return [...parents,first.get(0)].reduce((p,{props:{x=0,y=0}})=>(p.x+=x,p.y+=y,p),{x,y})
        }

        const lineRectsInPage=(page,start=0,end)=>{
            const {x,y}=frameXY(page)
            this.lines.slice(start,end).forEach((a,i)=>{
				const {left,top,width,height}=this.lineRect(start+i)
				rects.push({left:left+x,top:top+y,right:left+width+x,bottom:top+height+y})
			})
		}

		const [start,end]=(()=>{
            if(p0.page.props.I>p1.page.props.I){
                return [p1,p0]
            }else if(p0.page.props.I==p1.page.props.I){
                if(p0.line>p1.line){
                    return [p1,p0]
                }
            }
            return [p0,p1]
        })();

		lineRectsInPage(start.page, start.line, end.line+1)

		if(rects.length){
			Object.assign(rects[0],{left:pageXY(start.page).x+start.x})

			Object.assign(rects[rects.length-1], {right:pageXY(end.page).x+end.x})
		}
		return rects
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


export default factory(Base)
