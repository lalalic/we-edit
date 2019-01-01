
import editable from "./editable"
import Base from "../text"
import {Cacheable} from "../composable"

//cache doesn't help on performance
const Super=editable(Base)
export default class extends Super{
    nextCursorable(at=-1,locator){
        if(this.text.length-1>at){
            return at+1
        }else if(this.text.length-1==at){
            const next=(()=>{
                const {node}=locator.getClientRects(this.props.id).pop()
                const p=node.closest(`[data-type="paragraph"]`)
                const contents=Array.from(locator.getClientRects(p.dataset.content))
                    .reduce((all,{node:a})=>{
                        return [...Array.from(a.querySelectorAll(`[data-content]:not(g)`)),...all]
                    },[])
                return contents[contents.indexOf(node)+1]
            })();
            if(next){
                if(this.context.getComposer(next.dataset.content).nextCursorable(undefined,locator)===false){
                    return at+1
                }
            }else{
                return at+1
            }
        }
        return false
    }

    prevCursorable(at,locator){
        switch(at){
            case 0:
                return false
            case undefined:{
                const next=(()=>{
                    const {node}=locator.getClientRect(this.props.id)
                    const p=node.closest(`[data-type="paragraph"]`)
                    const contents=Array.from(locator.getClientRects(p.dataset.content))
                        .reduce((all,{node:a})=>{
                            return [...Array.from(a.querySelectorAll(`[data-content]:not(g)`)),...all]
                        },[])
                    return contents[contents.indexOf(node)+1]
                })();
                if(next){
                    if(this.context.getComposer(next.dataset.content).prevCursorable(undefined,locator)===false){
                        return this.text.length
                    }
                }
                at=this.text.length
            }
        }
        return at-1
    }

    nextSelectable(at=0){
        if(this.text.length>at){
            return at+1
        }
        return false
    }

    prevSelectable(at=this.text.length){
        if(at>0){
            return at-1
        }
        return false
    }

    distanceAt(x, node){
		const endat=parseInt(node.dataset.endat)
		const offset=endat-node.textContent.length
		return offset+this.measure.widthString(Math.max(x,0),node.textContent)
	}

    getClientRects(canvas){
        const {height,descent}=this.measure.defaultStyle

        return canvas.getPages(this.props.id)
            .reduce((rects,page)=>{
                const {x,y}=canvas.pageXY(canvas.pages.indexOf(page))
                return [...rects,...page.getClientRects(this.props.id).map(a=>Object.assign(a,{x:a.x+x,y:a.y+y-(height-descent)}))]
            },[])
    }

	position(canvas,at){
		const {id}=this.props
        const {fontSize, fontFamily,height,descent}=this.measure.defaultStyle
        const paragraph=this.query().closest("paragraph").attr('id')
		const {page,x,y,...position}=this.context.getComposer(paragraph).position(id,at)
		const pageIndex=canvas.pages.indexOf(page)
		const {x:x0,y:y0}=canvas.pageXY(pageIndex)
		return {
			id,at,
			fontSize, fontFamily,height,descent,
			x:x0+x,
			y:y0+y,
			page:pageIndex,
			...position
		}
	}
	
    position1(canvas, at){
        const {id}=this.props
        const {fontSize, fontFamily,height,descent}=this.measure.defaultStyle
        const position={fontSize, fontFamily,height,x:0,y:0}
		const rects=canvas.getClientRects(id)
		const i=Math.max(0,Math.min(rects.map(a=>parseInt(a.endat))
				.concat([at])
				.sort((a,b)=>a-b)
				.indexOf(at),rects.length-1))

        const rect=rects[i]
        if(rect){
    		let {x,y,text,endat}=rect
            position.y=y
            if(text.length!==0){
        		x+=this.measure.stringWidth(text.substring(0,at-(endat-text.length)))
            }else{
                position.y+=(height+descent)
            }
            position.x=x
        }
        return position
	}

	position0(canvas, at){
        const {id}=this.props
        const {fontSize, fontFamily,height,descent}=this.measure.defaultStyle
        const position={fontSize, fontFamily,height,x:0,y:0}
		const rects=canvas.getClientRects(id)
		const i=Math.max(0,Math.min(rects.map(a=>parseInt(a.endat))
				.concat([at])
				.sort((a,b)=>a-b)
				.indexOf(at),rects.length-1))

        const rect=rects[i]
        if(rect){
    		let x=rects[i].x
    		const {y,node}=rects[i]
            position.y=y
            const text=node.textContent
            if(text.length!==0){
        		const endat=parseInt(node.dataset.endat)

        		x+=this.measure.stringWidth(text.substring(0,at-(endat-text.length)))
            }else{
                position.y+=(height+descent)
            }
            position.x=x
            position.node=node
        }
        return position
	}
}
