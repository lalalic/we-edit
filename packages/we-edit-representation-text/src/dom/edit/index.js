import {Editors} from "we-edit-representation-html"
import Document from "./document"
import Paragraph from "./paragraph"
import Text from "./text"

const dom=Object.keys(Editors).reduce((My,k)=>{
	try{
		My[k]=class __$1 extends Editors[k]{}
	}catch(e){
		console.error(e)
	}
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
