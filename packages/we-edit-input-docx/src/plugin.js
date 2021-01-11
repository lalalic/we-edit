import {Office} from "we-edit-office"
import {Type, Office as TypedOffice} from "we-edit-input-docx"

export default {
    install(){
        Type.install()
        Office.install(TypedOffice)
    },

    uninstall(){
        Type.uninstall()
        Office.uninstall(TypedOffice)
    }
}