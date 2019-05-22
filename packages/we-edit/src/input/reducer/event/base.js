import Base from "../base"

export default class extends Base{
    serializeSelection(){

	}

	seperateSelection(){

	}

	removeSelection(){

	}

	get pos(){
        const pos=[]
        const {type,children}=this.targetNode.toJS()
        const {id,at=0}=this.selection.start
        if(at==0){
            pos.push("at_beginning_of")
        }

        if(type=="text"){
            if(at>=children.length-1){
                pos.push("at_end_of")
            }
            pos.push("in_text")
        }else if(at==1){
            pos.push("at_end_of")
        }

        return pos
    }

    get target(){
        return this.$(`#${this.selection.start.id}`)
    }

    get targetNode(){
        return this.content.get(this.selection.start.id)
    }

    insert({data}){
        this.removeSelection()
        const action=(t=>{
                if(t.length==1){
                    return ({
                        "9":"tab",
                        "13":"enter"
                    })[`${t.charCodeAt(0)}`]||"text"
                }
            })(data)||"text";

        const pos=this.pos.find(pos=>`${action}_${pos}` in this)
        if(pos){
            this[`${action}_${pos}`](...arguments)
        }
        return this
    }
}
