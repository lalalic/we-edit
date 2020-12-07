import {Table} from "./dom"
export default {
    remove_column(){
        const $cell=this.$target.closest("cell")
        if($cell.length==0)
            return

        const $row=$cell.closest('row')
        var $cells=$row.find("cell")
        if($cells.length==1){
            return this.remove_table()
        }

        const at=$cells.indexOf($cell)
        const table=this.file.getNode($cell.closest('table').attr('id'))
        const grid=table.first("w\\:tblGrid")
        const cols=grid.find("w\\:gridCol")
        const len=cols.length
        var width=cols.toArray().reduce((w,a)=>w+parseInt(a.attribs["w:w"]),0)
        const ratio=len/(len-1)
        for(let i=0;i<len;i++){
            const col=cols.eq(i)
            const w=parseInt(parseInt(col.attr("w:w"))*ratio)
            col.attr("w:w",w)
            width-=w
        }

        cols.eq(at).remove()

        const rows=table.find("w\\:tr")
        for(let i=0;i<rows.length;i++){
            rows.eq(i)
                .find("w\\:tc")
                .eq(at).remove()
        }
        this.file.renderChanged(table)
        $cells=$row.find("cell")
        const id=$cells.eq(at).attr('id')||$cells.eq(at-1).attr('id')
        if(id){
            this.cursorAt(id,0)
        }
    },

    remove_at_whole_in_field(){
        const $field=this.$field
        const backward=$field.backwardFirst(this.cursorable)
        const forward=this.$fieldEnd.forwardFirst(this.cursorable)
        const id=$field.attr('id')
        const p=this.field.closest('w\\:p')

        const runs=this.$(`#${id},#endField${id},[field=${id}]`).closest('run').toArray()
        runs.forEach((a)=>{
            this.file.getNode(a).remove()
        })
        this.file.renderChanged(p)
        if(forward.length){
            this.cursorAt(forward.attr('id'),0)
        }else{
            this.cursorAtEnd(backward.attr('id'))
        }
    },

    remove_toc(){
        let $target=this.$target
        $target=$target.is('ToC') ? $target : $target.closest('ToC')
        const target=this.file.getNode($target.attr('id'))
        const bookmarks=$target.find('hyperlink[anchor]').map((i,a)=>a.getIn(['props','anchor']))
        const bookmarkIDs=[]
        this._content.find(a=>{
            if(bookmarks.includes(a.getIn(['props','name']))){
                bookmarkIDs.push(a.get('id'))
            }
        });

        [...bookmarkIDs,...bookmarkIDs.map(a=>`end${a}`)].forEach(id=>{
            this.file.getNode(id).remove()
            this.$(id).remove()
        })
        
        target.remove()
        $target.remove()

        this.init()
    },
}