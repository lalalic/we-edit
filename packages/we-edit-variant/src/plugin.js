import {Representation} from "we-edit"
import {withVariant, Provider, VariantRepresentation} from "we-edit-variant"


export default {
	install(){
		Representation.defaultProps.transformer=withVariant
	},
	uninstall(){
		Representation.defaultProps.transformer=undefined
	}
}
