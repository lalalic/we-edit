import Base from "./content"

export default class extends Base{
    copy(payload){
        this.clipboard=this.file.clone()
        return this
    }

    cut(payload){
        this.clipboard=this.clone()
        this.remove_withSelection()
        return this
    }

    paste(payload){
        this.remove_withSelection()
        return this
    }

    move(payload){
        return this
    }

    clone(){
        const {start,end}=this.selection
		const target0=this.file.getNode(start.id)
		const target1=this.file.getNode(end.id)
		const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()

		const ancestors0=target0.parentsUntil(ancestor)
		const ancestors1=target1.parentsUntil(ancestor)
		const top0=ancestors0.last()
		const top1=ancestors1.last()

		const cloned=top0.nextUntil(top1).clone().toArray()
		
		const clonedTop0=this.file.cloneNodeFrom(top0,{...start,type:this.$(`#${start.id}`).attr("type")})
		const clonedTop1=this.file.cloneNodeTo(top1,{...end,type:this.$(`#${end.id}}`).attr("type")})
		
        return [clonedTop0, ...cloned, clonedTop1]
    }
}
