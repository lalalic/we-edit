import {Cacheable,editable} from "../../composable"
import Base from "../paragraph"

export default Cacheable(class __$1 extends editable(Base,{stoppable:true}) {
	/**to sync lastComposed with composed */
	rollbackLines(n){
		super.rollbackLines(n)
		this.computed.lastComposed.splice(-n)
	}
	/**
	 * @stoppable
	 */
	shouldComponentUpdate(){
		super.shouldComponentUpdate(...arguments)
		return this.context.shouldContinueCompose(this)
	}
	
	clearComposed(){
		this.atoms=[]
		super.clearComposed(...arguments)
	}

	/**if lineSegments is same, last layouted line should be able to fit in without relayout */
	appendLastComposed(){
		const lines=this.lines
		this.lines=[]
		const spaceChangedAt=this.computed.lastComposed.findIndex((a,i)=>{
			const line=lines[i]
			const space=this.context.parent.nextAvailableSpace({height:a.props.height})
			if(line.isFitTo(space)){
				this.lines.push(line)
				this.context.parent.appendComposed(a)
				return false
			}else{
				this.computed.lastComposed.splice(i)
				return true
			}
		})

		switch(spaceChangedAt){
			case 0:
				return false//fully recompose
			case -1:
				return
			default:
				this.commit(this.computed.atoms.indexOf(lines[spaceChangedAt].firstAtom))
		}
	}
})
