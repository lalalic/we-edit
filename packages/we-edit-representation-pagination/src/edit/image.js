import recomposable from "./recomposable"
import Base from "../image"

export default class extends recomposable(Base){
    nextCursorable(at){
        switch(at){
        case undefined:
            return 0
        case 0:
            return 1
        }
        return false
    }

    prevCursorable(at){
        switch(at){
        case undefined:
            return 1
        case 1:
            return 0
        }
        return false
    }
}
