import Base from "./base"
import {Field,Context} from "../../render/dom/field"

export default class Complex extends Base{
    _normalize(){
        const $target=this.reducer.$target
        const id=$target.attr('id')
        const instrText=this.file.getNode($target.forwardFirst(`instrText`).attr('id'))
        const displayText=this.file.getNode(this.reducer.$(`#end${id}`).backwardFirst('text').attr('id'))
        return {instrText, displayText}
    }

    get fieldContext(){
        return new Context(this.reducer._state,this.reducer.$target.attr('id'))
    }

    template(instr,value=""){
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
                <w:t xml:space="preserve">${value}</w:t>
            </w:r>
            <w:r>
                <w:fldChar w:fldCharType="end"/>
            </w:r>
            `
    }

    execute(id){
        const value=Field.create(this.reducer.$target.attr('instr')).execute(this.fieldContext)
        const display=this.reducer.$target.attr('display')
        if(value!==display){
            const {displayText}=this._normalize()
            displayText.text(value)
        }
    }

    instr(instr){
        const {instrText, displayText}=this._normalize()
        instrText.text(instr)
        displayText.text(Field.create(instr).execute(this.fieldContext))
    }

    static Simple=class Simple extends Complex{
        template(instr, value=""){
            return `
                <w:fldSimple w:instr='${instr}'>
                    <w:r>
                        <w:t xml:space="preserve">${value}</w:t>
                    </w:r>
                </w:fldSimple>
            `
        }

        _normalize(){
            const displayText=this.file.getNode(this.reducer.$target.findFirst('text').attr('id'))
            return {
                instrText:{
                    text:t=>{
                        this.reducer.target.attr('w:instr',t)
                    }
                }, 
                displayText
            }
        }
    }
}