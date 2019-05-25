import Base from "./base"
const PR="w\\:rPr,w\\:pPr,w\\:tblPr,w\\:sdtPr,w\\:tcPr,w\\:trPr"
export default class Type extends Base{
    constructor(){
        super(...arguments)
        this.PR=PR
    }
    type_at_text({data}){
        const target=this.target
        const {start:{id,at}}=this.selection
        const src=target.text()
        target.text(src.substring(0,at)+data+src.substring(at))
        this.file.renderChanged(target)
        this.cursorAt(id,at+data.length)
    }

    type_at_empty_text({data}){
        this.file.renderChanged(this.target.text(data))
        this.cursorAt(this.selection.start.id,data.length)
    }

    type_at_empty_run({data}){
        this.file.renderChanged(this.target.append(`<w:t>${data}</w:t>`))
        this.cursorAt(this.$target.children("text").attr("id"),data.length)
    }

    type_at_empty_paragraph({data}){
        this.file.renderChanged(this.target.append(`<w:r><w:t>${data}</w:t></w:r>`))
        this.cursorAt(this.$target.find("text").attr("id"),data.length)
    }

    //clone run to hold data
    type_at_beginning_of_run({data}){
        const target=this.target
        const clonedR=target.closest("w\\:r").clone()
        clonedR.children(":not(w\\:rPr)").remove()
        cloneR.append(`<w:t>${data}</w:t>`).before(target)
        this.file.renderChanged(target.parent())
        this.cursorAt(this.$target.prev().children("text").first().attr("id"),data.length)
    }

    //clone run to hold data
    type_at_beginning_of_up_to_run({data}){
        const target=this.target
        const clonedR=target.closest("w\\:r").clone()
        clonedR.children(":not(w\\:rPr)").remove()
        clonedR.append(`<w:t>${data}</w:t>`).before(target)
        this.file.renderChanged(target.parent())
        this.cursorAt(this.$target.next().children("text").first().attr("id"),data.length)
    }

    type_at_beginning_of_paragraph({data}){
        this.file.renderChanged(this.target.afterOrPrepend(`<w:r><w:t>${data}</w:t></w:r>`,"w\\:pPr"))
        this.cursorAt(this.$target.find("text").first().attr("id"),data.length)
    }

    type_at_end_of_run({data}){
        this.file.renderChanged(this.target.append(`<w:t>${data}</w:t>`))
        this.cursorAt(this.$target.children("text").last().attr("id"),data.length)
    }

    type_at_end_of_paragraph({data}){
        this.file.renderChanged(this.target.append(`<w:r><w:t>${data}</w:t></w:r>`))
        this.cursorAt(this.$target.find("text").last().attr("id"),data.length)
    }
}
