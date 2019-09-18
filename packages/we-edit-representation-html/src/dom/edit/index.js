import {Editors} from "we-edit-representation-pagination"
import Document from "./document"
import Paragraph from "./paragraph"

const dom=Object.keys(Editors).reduce((My,k)=>{
    My[k]=class __$1 extends Editors[k]{}
    return My
},{})

export default {
    ...dom,
	Document,
    Section:dom.Container,
    Paragraph,
    Header:dom.Ignore,
    Footer:dom.Ignore
}
