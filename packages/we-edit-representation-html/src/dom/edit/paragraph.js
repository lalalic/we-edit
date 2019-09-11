import {Editors} from "we-edit-representation-pagination"

export default class extends Editors.Paragraph{
    static displayName="html-paragraph"
    isSameFrameStack(){
        return true
    }
}