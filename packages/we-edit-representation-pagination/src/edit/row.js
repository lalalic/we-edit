import {Cacheable} from "../composable"
import editable from "./editable"
import Base from "../row"

export default class extends editable(Base,{stoppable:false}){
	clearComposed(){
		this.computed.spaces=[]
		super.clearComposed()
	}
}
