import {Editors} from "we-edit-representation-pagination"

import Document from "./document"
import Section from "./section"
import Table from "./table"

export default {
    ...Editors,
	Document,
	Section,
	Table,
	Header:props=><Editors.Header {...props} children={null}/>,
	Footer:props=><Editors.Footer {...props} children={null}/>,
}
