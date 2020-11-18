import Base from "./base"
import {parse, execute} from "../../render/dom/field"

export default class Field extends Base{
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

    update({update:id}){
        const instruct=parse(this.content.attr('instr'))
        const value=instruct.execute()
        const display=this.content.attr('display')
        if(value!==display){
            const p=this.content.closest('paragraph')
            const texts=p.find(a=>
                a.getIn(['props','field'])==id && 
                a.get('type')=='text' && 
                !a.getIn(['props','isInstr'])
            )

            if(texts.length){
                this.file.getNode(texts.first().attr('id')).text(value)
                texts.slice(1).each((i,a,$)=>{
                    const target=$(a).parentsUntil(a=>a.get('type')=='paragraph'||a.get('children').size>1)
                                    .add(a,'unshift')//in case parent has multiple children
                                    .last()
                    this.file.getNode(target.attr('id')).remove()
                    target.remove()
                })
            }else{
                const end=p.findFirst(`fieldEnd[field="${id}"]`)
                end.before(`<w:t>${value}</w:t>`)
            }
            this.file.renderChanged(this.file.getNode(p.attr('id')))
        }
    }

    charformat(){

    }

    mergeformat(){

    }
}