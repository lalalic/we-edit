import {Image,Section,Paragraph,Table} from "./dom"
import {parse} from "../render/dom/field"

export default{
    create_table_at_end_of_up_to_document(){
        const p=this.target.closest("w\\:p")
        const clonedP=p.clone()
        clonedP.children(`:not(${this.PR})`).remove()
        clonedP.append(`<w:r><w:t/></w:r>`)
        p.after(clonedP)
        const a=this.file.renderChanged(clonedP)
        this.$target.closest("paragraph").after('#'+a.id)
        this.create(...arguments)
    },

    create_table_at_beginning_of_paragraph(){
        const editor=new Table(this.file)
        editor.create(...arguments)
        this.target.before(editor.node)
        const {id}=this.file.renderChanged(editor.node)
        this.$target.before('#'+id)
        this.cursorAt(this.$('#'+id).first("text").attr('id'),0)
    },

    create_table_at_end_of_paragraph(){
        const editor=new Table(this.file)
        editor.create(...arguments)
        this.target.after(editor.node)
        const {id}=this.file.renderChanged(editor.node)
        this.$target.after('#'+id)
        this.cursorAt(this.$('#'+id).first("text").attr('id'),0)
    },

    
    create_image_at_text(){
        //split text to run
        this.seperate_at_text_for_end()
        this.seperate_up_to_run_at_end_of_text()
        this.cursorAt(this.$target.parent().attr('id'),1)
        this.create(...arguments)
    },

    create_image_at_beginning_of_up_to_run(){
        this.cursorAt(this.$target.closest('run').attr('id'),0)
        this.create(...arguments)
    },

    create_image_at_end_of_up_to_run(){
        this.cursorAt(this.$target.closest('run').attr('id'),1)
        this.create(...arguments)
    },

    create_image_at_beginning_of_run(){
        this.target.before(`<w:r/>`)
        this.__create_image_in_run(this.target.prev(),...arguments)
    },

    create_image_at_end_of_run(){
        this.target.after(`<w:r/>`)
        this.__create_image_in_run(this.target.next(),...arguments)
    },

    create_image_at_empty_run(){
        this.__create_image_in_run(this.target,...arguments)
    },

    __create_image_in_run(run, ...args){
        const editor=new Image(this.file)
        editor.create(...args)
        run.append(editor.node.closest("w\\:drawing"))
        const {id}=this.file.renderChanged(run)
        this.$target.after('#'+id)
        this.cursorAt(this.$('#'+id).first().attr('id'),0)
    },

    create_image_at_empty_paragraph(){
        this.target.append(`<w:r/>`)
        this.file.renderChanged(this.target)
        this.cursorAt(this.$target.children("run").attr('id'),0)
        this.create(...arguments)
    },

    create_row({where}){
        const $row=this.$target.closest("row")
        if($row.length==0)
            return 

        const row=this.file.getNode($row.attr('id'))
        const table=this.file.getNode($row.closest('table').attr('id'))
        const cols=table.first("w\\:tblGrid").find("w\\:gridCol")
        const editor=new Table(this.file)
        editor.node=table
        const tds=new Array(cols.length).fill(0).map((w,i)=>editor.template_tc(w))
        const tr=this.file.$("<w:tr>"+tds.join("")+"</w:tr>")
        tr[`insert${where[0].toUpperCase()}${where.substring(1)}`](row)
        const a=this.file.renderChanged(tr)
        $row[where](`#${a.id}`)
        this.selectWhole(a.id)
    },

    create_column({where}){
        const $cell=this.$target.closest("cell")
        if($cell.length==0)
            return
        
        const $row=$cell.closest('row')
        const $table=$row.closest('table')

        const at=$row.find("cell").indexOf($cell)
        const table=this.file.getNode($table.attr('id'))

		const grid=table.first("w\\:tblGrid")
		const cols=grid.find("w\\:gridCol")
		const len=cols.length
		let width=cols.toArray().reduce((w,a)=>w+parseInt(a.attribs["w:w"]),0)
		const ratio=len/(len+1)
		for(let i=0;i<len;i++){
			const col=cols.eq(i)
			const w=parseInt(parseInt(col.attr("w:w"))*ratio)
			col.attr("w:w",w)
			width-=w
		}

		cols.eq(at)[where](cols.eq(at).clone().attr("w:w",width))

        const rows=table.find("w\\:tr")
        const editor=new Table(this.file)
        editor.node=table
		for(let i=0;i<rows.length;i++){
            rows.eq(i)
				.find("w\\:tc")
                .eq(at)[where](editor.template_tc(width))
        }
        this.file.renderChanged(table)
    },

    create_section({kind}){
        this.enter()

        const $p=this.$target.closest('paragraph')
        const $section=this.$target.closest('section')
        const section=this.file.getNode($section.attr('id'))
        const editor=new Paragraph(this.file)
        editor.node=this.file.getNode($p.attr('id'))
        const clonedSection=section.clone()
        clonedSection.appendTo(editor.got("w:pPr"))
        if(kind){
            clonedSection.prepend(`<w:type w:val="${kind}"/>`)
        }
        const a=this.file.renderChanged(clonedSection)
        const $clonedSection=this.$(`#${a.id}`)
        $section.after($clonedSection)
        $clonedSection.append($p.nextAll())
        $clonedSection.prepend($p)
    },

    create_pagebreak(){
        this.enter()
        const $p=this.$target.closest('paragraph').prev('paragraph')
        const p=this.file.getNode($p.attr('id'))
        const $r=this.file.$(`<w:r><w:br w:type="page"/></w:r>`).appendTo(p)
        const a=this.file.renderChanged($r)
        $p.append(`#${a.id}`)
    },

    create_columnbreak(){
        this.enter()
        const $p=this.$target.closest('paragraph').prev('paragraph')
        const p=this.file.getNode($p.attr('id'))
        const $r=this.file.$(`<w:r><w:br w:type="column"/></w:r>`).appendTo(p)
        const a=this.file.renderChanged($r)
        $p.append(`#${a.id}`)
    },
    
    create_field_at_text({instr}){
        this.split_text_at_text()
        const target=this.target
        const p=target.closest('w\\:p')
        const field=parse(instr)
        target.before(`<w:fldChar w:fldCharType="begin"/>`)
        target.before(`<w:instrText xml:space="preserve">${instr}</w:instrText>`)
        target.before(`<w:fldChar w:fldCharType="separate"/>`)
        target.before(`<w:t xml:space="preserve">${field.execute()}</w:t>`)
        target.before(`<w:fldChar w:fldCharType="end"/>`)
        this.file.renderChanged(p)
    }
}