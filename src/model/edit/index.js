import {PropTypes} from "react"
import {_recordComposer,_removeComposer} from "state/selector"

export function editable(Model){
	return class extends Model{
		static displayName=`editable-${Model.displayName}`

		static propTypes={
			...Model.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		}
		
		static contextTypes={
			...Model.contextTypes,
			docId: PropTypes.any
		}
		
		constructor(){
			super(...arguments)
			_recordComposer(this)
		}
		
		componentWillUnmount(){
			_removeComposer(this)
		}
		
		static cursorable(){
			let type=this.displayName.split('-').pop()
			return ["text","image"].indexOf(type)!=-1
		}
	}
}
