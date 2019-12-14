import {Cacheable,editable} from "../../composable"
import Base from "../row"

export default Cacheable(class __$1 extends editable(Base,{stoppable:true,continuable:true}){
	/**
	 * @TODO: it's disabled to refactor layout engine
	 * thinking: request space may change space, so should only checking requesting space be allowed not to change space
	 */
	appendLastComposed(){
		if(this.spaces.length!=this.computed.lastComposed.length){
			console.warn("something wrong for this row")
			return false
		}
		const space=this.context.parent.nextAvailableSpace()
		if(this.spaces.length==1){
			const rank=this.computed.lastComposed[0]
			if(space.height>=rank.props.height){
				this.context.parent.appendComposed(rank)
				this.spaces=[space]
				return
			}
		}else if(this.spaces.length>1){
			if(space.height==this.spaces[0].height){
				this.spaces=[]
				this.computed.lastComposed.forEach(rank=>{
					this.spaces.push(this.context.parent.nextAvailableSpace({height:rank.props.height}))
					this.context.parent.appendComposed(rank)
				})
				return
			}
		}
		return false
	}

	shouldContinueCompose(a){
		return true
	}
})