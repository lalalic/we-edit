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
        if(at>this.text.length)
            at=this.text.length
		const {id}=this.props
        const {fontSize, fontFamily,height}=this.measure.defaultStyle
        const position={fontSize, fontFamily,height,x:0,y:0}
		const rects=canvas.getClientRects(id)
		const i=rects.map(a=>parseInt(a.node.dataset.endat))
				.concat([at])
				.sort((a,b)=>a-b)
				.indexOf(at)
        const rect=rects[i]
        if(rect){
    		let x=rects[i].x
    		const {y,node}=rects[i]
    		const text=node.textContent
    		const endat=parseInt(node.dataset.endat)

    		x+=this.measure.stringWidth(text.substring(0,at-(endat-text.length)))
            position.x=x
            position.y=y
            position.node=node
        }
        return position
	}
}
