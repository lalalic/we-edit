import recomposable from "./recomposable"
import Base from "../text"

export default class extends recomposable(Base){
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
	
	distanceAt(x, offset=0){
		offset=parseInt(offset)
		let text=this.props.children.substring(offset)
		return this.measure.widthString(text, x)+offset
	}
}
