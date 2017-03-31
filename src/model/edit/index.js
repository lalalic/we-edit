import {PropTypes} from "react"
import {getComposers} from "state/selector"

export function editable(Model){
	return class extends Model{
		static displayName=`editable-${Model.displayName}`

		static propTypes={
			...Model.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		}
		
		static contextTypes={
			...Model.contextTypes,
			docId: PropTypes.any,
			store: PropTypes.any,
		}
		
		constructor(){
			super(...arguments)
			const state=this.context.store.getState()
			const composers=getComposers(state)
			let editorId=this.context.docId
			let contentId=this.props.id
			let t
			if(!(t=composers[editorId]))
				t=composers[editorId]={}
			t[contentId]=this
		}
	}
}
