import Paragraph from "../paragraph"

export default class Numbering extends Paragraph{
    constructor(node){
        super(...arguments)
        this.basedOn="_num_"+this.docx.officeDocument.styles(node).find("w\\:numId").attr('w:val')
    }
}