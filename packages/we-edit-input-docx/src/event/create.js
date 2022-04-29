import {Image,Shape, TextBox, Section,Paragraph,Table} from "./dom"
import {Context, Field} from "../render/dom/field"
import FieldEditor from "./dom/field"
import ToC from "./dom/toc"

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
        const editor=new Table(this)
        editor.create(...arguments)
        this.target.before(editor.node)
        const {id}=this.file.renderChanged(editor.node)
        this.$target.before('#'+id)
        this.cursorAt(this.$('#'+id).first("text").attr('id'),0)
    },

    create_table_at_end_of_paragraph(){
        const editor=new Table(this)
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
        const editor=new Image(this)
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
        const editor=new Table(this)
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
        const editor=new Table(this)
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
        const editor=new Paragraph(this)
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
        this.seperate_at_text_for_end()
        this.seperate_up_to_run_at_end_of_text()

        const r=this.target.closest('w\\:r')
        const p=r.closest('w\\:p')
        const field=Field.create(instr)
        const editor=new FieldEditor.Simple(this)
        r.after(editor.trim(editor.template(instr,field.execute(new Context(this._state)))))
        this.file.renderChanged(p)
        this.cursorAt(this.file.makeId(r.next(),0))
    },

    create_toc({canvas,instr}){
        //find headings
        const field=Field.create(instr)
        const officeDocument=this.file.doc.officeDocument.content
        const styles=this.$('#root').attr('styles')
        const outlinePStyles=Object.keys(styles).filter(k=>{
            const style=styles[k]
            if(style.type=="paragraph"){
                const level=style.get('p.heading')
                if(level>=field.minLevel && level<=field.maxLevel){
                    return true
                }
            }
        })
        const outlineRStyles=Array.from(new Set(outlinePStyles.reduce((dd,k)=>[styles[k].getLink()?.id,...dd],[]).filter(a=>!!a)))
        
        let uid=Math.max(0,...this.$('bookmarkStart').map(a=>parseInt(a.getIn('props','i'))))
        let tocid=Date.now()

        const content=officeDocument.root()
        const pSelectors=[
                ...new Array(field.maxLevel-field.minLevel+1).fill(0).map((k,i)=>field.minLevel+i).map(l=>`w\\:pPr>w\\:outlineLvl[w\\:val=${l}]`),//direct p
                ...outlinePStyles.map(a=>`w\\:pPr>w\\:pStyle[w\\:val="${a}"]`),
            ]
        const rSelectors=outlineRStyles.map(a=>`w\\:rPr>w\\:rStyle[w\\:val="${a}"]`)
        const headings=content.find([...pSelectors,...rSelectors].join(","))
            .closest("w\\:p")
            .map((i,p)=>{
                p=officeDocument(p)
                let pr=p.find(pSelectors.join(",")), level,text
                if(pr.length){
                    p.append(`<w:bookmarkEnd w:id="${++uid}"/>`)
                        .children('w\\:pPr')
                        .after(`<w:bookmarkStart w:id="${uid}" w:name="_Toc${++tocid}"/>`)
                    
                    const $p=this.$('#'+this.file.makeId(p.get(0)))
                    $p.append('#'+this.file.renderChanged(p.children("w\\:bookmarkEnd").last()).id)
                        .prepend('#'+this.file.renderChanged(p.children("w\\:bookmarkStart").first()).id)
                        
                    level=$p.attr('style').get('p.heading')
                    text=p.text()
                }else{
                    const r=p.find(rSelectors.join(",")).eq(0).closest('w\\:r')

                    r.before(`<w:bookmarkStart w:id="${++uid}" w:name="_Toc${++tocid}"/>`)
                        .after(`<w:bookmarkEnd w:id="${uid}"/>`)
                    
                    const $r=this.$('#'+this.file.makeId(r.get(0)))
                    $r.before('#'+this.file.renderChanged(r.prev()).id)
                        .after('#'+this.file.renderChanged(r.next()).id)
                    level=$r.attr('style').getLink().get('p.heading')
                    text=r.text()
                }
                return ToC.template1({tocid,level,text}) 
            })
            .get()
            
        const toc=ToC.template(headings)
        
        const target=this.target.before(toc)
        target.prev()//toc
            .find("w\\:sdtContent")
            .children("w\\:p").eq(1)//
            .children("w\\:pPr")
            .after(ToC.field(instr))// TOC field

        const $toc=this.$('#'+this.file.renderChanged(target.prev()).id).attr('needPage',true)
        this.$target.before($toc)
    },

    create_textbox({page, column:{i,x}={}, paragraph:{id:p, y},run, geometry, ...props}){
        const editor=new TextBox.Anchor(this)
        const paragraph=this.file.getNode(p)
        editor.create({})
        if(run){
            this.file.getNode(run).after(editor.node)
        }else{
            paragraph.prepend(editor.node)
            editor.node.before(paragraph.find('>w\\:pPr'))
        }
        
        editor.node.prepend(paragraph.find('>w\\:pPr>w\\:rPr').clone())

        this.file.renderChanged(paragraph)
        const id=this.file.makeId(editor.node)
        const cursor=this.$('#'+id).find('shape').attr('id')
        this.cursorAt(cursor,0)
        editor.node=this.target
        const size=geometry.size()
        editor.update({size,offset:{x,y, page},...props})
        this.file.renderChanged(this.file.getNode(id))
    },

    create_shape({page, column:{i,x}={}, paragraph:{id:p, y},run, geometry,...props}){
        const editor=new Shape.Anchor(this)
        const paragraph=this.file.getNode(p)
        editor.create({name:"shape"})
        if(run){
            this.file.getNode(run).after(editor.node)
        }else{
            paragraph.prepend(editor.node)
            paragraph.find('>w\\:pPr').before(editor.node)
        }
        
        editor.node.prepend(paragraph.find('>w\\:pPr>w\\:rPr').clone())

        this.file.renderChanged(paragraph)
        const id=this.file.makeId(editor.node)
        const cursor=this.$('#'+id).find('shape').attr('id')
        this.cursorAt(cursor,0)
        editor.node=this.target
        const size=geometry.size()
        editor.update({size,offset:{x,y,page},geometry,...props})
        this.file.renderChanged(this.file.getNode(id))
    }
}