import {Cacheable} from "../composable"
import editable from "./editable"
import Base from "../row"

export default Cacheable(class extends editable(Base,{stoppable:true}){
	appendLastComposed(){
		this.computed.lastComposed=[]
		this.onAllChildrenComposed()
	}

	nextSelectable(at){
        switch(at){
        case undefined:
            return 0
        case 0:
            return 1
        }
        return false
    }

    prevSelectable(at){
        switch(at){
        case undefined:
            return 1
        case 1:
            return 0
        }
        return false
    }
})
