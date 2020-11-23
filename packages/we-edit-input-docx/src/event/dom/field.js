import Base from "./base"
import {Field,Context} from "../../render/dom/field"

export default class extends Base{
    _normalize(){
        const id=this.content.attr('id')
        const instrText=this.file.getNode(this.content.forwardFirst(`[field='${id}'][isInstr]`).attr('id'))
        const displayText=this.file.getNode(this.content.forwardFirst(`#endField${id}`).backwardFirst('text').attr('id'))
        return {instrText, displayText}
    }

    template(instr){
        return  `
            <w:r>
                <w:fldChar w:fldCharType="begin"/>
            </w:r>
            <w:r>
                <w:instrText xml:space="preserve">${instr}</w:instrText>
            </w:r>
            <w:r>
                <w:fldChar w:fldCharType="separate"/>
            </w:r>
            <w:r>
                <w:t xml:space="preserve"> </w:t>
            </w:r>
            <w:r>
                <w:fldChar w:fldCharType="end"/>
            </w:r>
            `
    }

    execute(id){
        const value=Field.create(this.content.attr('instr')).execute(new Context(this.file, id))
        const display=this.content.attr('display')
        if(value!==display){
            const {displayText}=this._normalize()
            displayText.text(value)
        }
    }

    instr(instr){
        const {instrText, displayText}=this._normalize()
        instrText.text(instr)
        displayText.text(Field.create(instr).execute(new Context(this.file)))
    }

    charformat(){

    }

    mergeformat(){

    }
}