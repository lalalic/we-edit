import {default as JSONDocument} from "./json"
import {default as XMLDocument} from "./xml"
import {default as JSXDocument} from "./jsx"

export default {
    JSONDocument,
    XMLDocument,
    JSXDocument,
    install(){
      JSONDocument.install()
      XMLDocument.install()
      JSXDocument.install()
    },

    uninstall(){
      JSONDocument.uninstall()
      XMLDocument.uninstall()
      JSXDocument.uninstall()
    }
}