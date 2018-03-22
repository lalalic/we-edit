import PropTypes from "prop-types"
import Components from "we-edit/model"

function extract(Component){
	let name=Component.displayName
	let propTypes=Component.propTypes||{}

	return Object.keys(propTypes).reduce((actions, k)=>{

		switch(propTypes[k]){
			case PropTypes.bool:
			case PropTypes.number:
			case PropTypes.string:
			case PropTypes.bool.isRequired:
			case PropTypes.number.isRequired:
			case PropTypes.string.isRequired:
				actions[k]=b=>({type:`we-edit/style/${name}/${k}`,payload:b})
			break
			default:

		}
		return actions
	}, {})
}

export default {
	update:payload=>({type:"we-edit/content/update", payload})
}
