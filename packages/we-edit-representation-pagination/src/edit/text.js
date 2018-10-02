import editable from "./editable"
import Base from "../text"

export default class extends editable(Base){
    nextCursorable(at=-1){
        const {children:text}=this.props
        if(text.length>at){
            return at+1
        }
        return false
    }

    prevCursorable(at){
        switch(at){
        case 0:
            return false
        case undefined:
            return this.props.children.length
        default:
            return at-1
        }
    }

	distanceAt(x, node){
		const endat=parseInt(node.dataset.endat)
		const offset=endat-node.textContent.length
		return offset+this.measure.widthString(Math.max(x,0),node.textContent)
	}

	position(canvas, at){
		try{
            if(at>this.text.length)
                at=this.text.length
			const {id}=this.props
			const rects=canvas.getClientRects(id)
			const i=rects.map(a=>parseInt(a.node.dataset.endat))
					.concat([at])
					.sort((a,b)=>a-b)
					.indexOf(at)
			let x=rects[i].x
			const {y,node}=rects[i]
			const text=node.textContent
			const endat=parseInt(node.dataset.endat)
			const {fontSize, fontFamily,height}=this.measure.defaultStyle

			x+=this.measure.stringWidth(text.substring(0,at-(endat-text.length)))
			return {
				x,y,height,fontSize, fontFamily,node
			}
		}catch(e){
			debugger
		}
	}
}
