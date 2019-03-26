import JSONDocument from "./json"
import XMLDocument from "./xml"

export default {
	JSONDocument,
	XMLDocument,
	install(){
		JSONDocument.install()
		XMLDocument.install()
	},
	uninstall(){
		JSONDocument.uninstall()
		XMLDocument.uninstall()
	}
}
