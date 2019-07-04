import {Editors} from "we-edit-representation-pagination"
import Document from "./document"
import Section from "./section"

const dom=Object.keys(Editors).reduce((My,k)=>{
    My[k]=class extends Editors[k]{}
    return My
},{})

export default {
    ...dom,
	Document,
	Section,
    Header:props=><Editors.Header {...props} children={null}/>,
    Footer:props=><Editors.Footer {...props} children={null}/>
}
