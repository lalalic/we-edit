export default {
    seperate_up_to_run_at_end_of_text(){
        const target=this.target
        const r=target.closest('w\\:r')
        const clonedR=r.clone()
        clonedR.children(`:not(${this.PR})`).remove()
        clonedR.append(target.nextAll())
        r.after(clonedR)

        this.file.renderChanged(r)
        const a=this.file.renderChanged(clonedR)
        this.$target.closest("run").after(`#${a.id}`)
    },
    seperate_up_to_run_at_beginning_of_text(){
        const target=this.target
        const r=target.closest('w\\:r')
        const clonedR=r.clone()
        clonedR.children(`:not(${this.PR})`).remove()
        clonedR.append(target.prevAll())
        r.before(clonedR)

        this.file.renderChanged(r)
        const a=this.file.renderChanged(clonedR)
        this.$target.closest("run").before(`#${a.id}`)
    },
}