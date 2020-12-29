import {Office} from "we-edit-office"
import Type from "./type"
import TypedOffice from "./office"

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