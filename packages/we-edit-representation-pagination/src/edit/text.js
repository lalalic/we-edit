
import editable from "./editable"
import Base from "../text"
import {Cacheable} from "../composable"

//cache doesn't help on performance
const Super=editable(Base)
export default class extends Super{
    nextCursorable(id,at){
        if(this.text.length-1>at){
            return {id,at:at+1}
        }
		return super.nextCursorable(...arguments)
    }

    prevCursorable(id, at){
        if(at>0){
            return {id,at:at-1}
        }
        return super.nextCursorable(...arguments)
    }

    nextSelectable(id,at=0){
        if(this.text.length>at){
            return {id,at:at+1}
        }
        return super.nextSelectable(...arguments)
    }

    prevSelectable(id,at=this.text.length){
        if(at>0){
            return {id,at:at-1}
        }
        return super.prevSelectable(...arguments)
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
}
