import {Editors} from "we-edit-representation-html"
import Document from "./document"
import Paragraph from "./paragraph"
import Text from "./text"

const dom=Object.keys(Editors).reduce((My,k)=>{
    My[k]=class extends Editors[k]{}
    return My
},{})

export default {
    ...dom,
	Document,
	Paragraph,
	Text,
	Table:dom.Container,
	Row:dom.Container,
	Cell:dom.Container,
	Image:()=>null,
}
