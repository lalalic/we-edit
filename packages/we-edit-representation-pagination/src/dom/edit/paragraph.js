import {editable} from "../../composable"
import Base from "../paragraph"

export default class __$1 extends editable(Base,{stoppable:true}) {
	/**to sync lastComposed with composed */
	rollbackLines(n){
		super.rollbackLines(n)
		this.computed.lastComposed.splice(-n)
	}
	
	cancelUnusableLastComposed({hash,changed=hash!=this.props.hash}){
		if(changed){
			this.atoms=[]
			super.cancelUnusableLastComposed(...arguments)
		}
	}

	/**if lineSegments is same, last layouted line should be able to fit in without relayout */
	appendLastComposed(){
		const lines=this.lines
		this.lines=[]
		const spaceChangedAt=this.computed.lastComposed.findIndex((a,i)=>{
			const line=lines[i]
			const space=this.nextAvailableSpace({height:a.props.height})
			if(line.isFitTo(space)){
				this.lines.push(line)
				this.context.parent.appendComposed(a)
				return false
			}else{
				this.computed.lastComposed.splice(i)
				return true
			}
		})

		if(spaceChangedAt==0){
			this.cancelUnusableLastComposed({changed:true})
			return false
		}
		
		if(spaceChangedAt>0){
			this.commit(this.computed.atoms.indexOf(lines[spaceChangedAt].firstAtom))
		}
		return true
	}
}
