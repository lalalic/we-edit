import {Office} from "we-edit-office"
import {Type, Office as TypedOffice} from "we-edit-input-json" 

export default {
	install(){
		Type.install()
		//Office.install(TypedOffice)
	},
	uninstall(){
		Type.uninstall()
		//Office.uninstall(TypedOffice)
	}
}
