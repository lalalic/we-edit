import {JSONDocument, XMLDocument} from "we-edit-input-json"

export default {
	install(){
		JSONDocument.install()
		XMLDocument.install()
	},
	uninstall(){
		JSONDocument.uninstall()
		XMLDocument.uninstall()
	}
}
