import React,{Fragment} from "react"
import editable from "./editable"
import {ReactQuery} from "we-edit"
import {Cacheable} from "../../composable"
import Base from "../frame"
import {Group} from "../../composed"

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

    //locatable

	positionFromPoint(x,y){
        const pointIsInside=({x:x0=0,y:y0=0,width,height})=>x0<=x && y0<=y && (x0+width)>=x && (y0+height)>=y
        const pointIsInExtendedLine=({y:y0=0,height})=>y0<=y && (y0+height)>=y
        const chosen=new Set()
        const extendedLines=[]
        const lines=[]
        var bound
        const {first:found}=new ReactQuery(this.render()).findFirstAndParents((node,parents)=>{
            const {width,height,"data-type":type, "data-content":id, className}=node.props||{}
            bound={width,height,...this.getBound([...parents,node])}
            if(bound.width && bound.height){
                if(!pointIsInside(bound)){
                    if(className=="line"){
                        if(pointIsInExtendedLine(bound)){
                            extendedLines.push({node,parents,bound})
                        }
                    }
                    return false//don't continue
                }else if(className=="line"){
                    lines.push({node,parents,bound})
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

            if(node.type!=Group && node.type!=Fragment){
                return false
            }
        })

        if(found.length>0){
            return {id:bound.id, at:bound.at}
        }else if(extendedLines.length || lines.length){
            const {bound,node,parents}=[...extendedLines,...lines].pop()
            const paragraph=[...parents,node].findLast(a=>a.props["data-type"]=="paragraph")
            const lineIndex=paragraph.props.pagination.i
            const composer=this.context.getComposer(paragraph.props["data-content"])
            let pos
            if(x>=bound.x){//end of line
                const width=paragraph.props.width
                pos=composer.positionFromPoint(width,undefined,lineIndex-1)
            }else if(x<bound.x){//beginning of line
                pos=composer.positionFromPoint(0,undefined,lineIndex-1)
            }
            if(pos){
                return {id:pos.id, at:pos.at}
            }
        }

        return {}
	}

    //only paragraph would be shrinked
	lineRect(line){
        line=this.lines[line]
        const {first,parents}=new ReactQuery(line).findFirstAndParents(`[data-type="paragraph"]`)
        const target=[...parents,first.get(0)].find(a=>!!a.props['data-content'])
        const composer=this.context.getComposer(target.props['data-content'])
        const rect=composer.rectInLine(line)

        rect.left=this.lineX(line)+rect.left
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
			Object.assign(rects[0],{left:pageXY(start.page).x+(start.x||0)})
            Object.assign(rects[rects.length-1], {right:pageXY(end.page).x+(end.x||0)})
		}
		return rects
	}
},undefined,["hash","width"])

export default factory(Base)
