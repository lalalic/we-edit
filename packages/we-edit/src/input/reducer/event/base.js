import Base from "../base"

export default class extends Base{
    serializeSelection(){

	}

	seperateSelection(){

	}

	removeSelection(){

	}

    isContainer(type){
        return !["image"].includes(type)
    }

	get pos(){
        const pos=[],types=[]
        const {type,children,parent}=this.targetNode.toJS()
        const parentType=this.content.getIn([parent,"type"])
        const {id,at=0}=this.selection.start
        if(this.isContainer(type) && (!children || children.length==0)){
            pos.push("at_empty_"+type)
            return pos
        }

        if(at==0){
            pos.push("at_beginning")
        }

        if(type=="text"){
            if(at>=children.length){
                pos.push("at_end")
            }
        }else{
            if(at==1){
                pos.push("at_end")
            }
        }

        if(pos.includes("at_beginning")){
            let i=pos.indexOf("at_beginning")
            if(parentType)
                pos.splice(i,0,`at_beginning_of_${type}_${parentType}`)
            pos.splice(i,0,`at_beginning_of_${type}`)
        }

        if(pos.includes("at_end")){
            let i=pos.indexOf("at_end")
            if(parentType)
                pos.splice(i,0,`at_end_of_${type}_${parentType}`)
            pos.splice(i,0,`at_end_of_${type}`)
        }


        if(pos.includes("at_beginning")){
            let i=pos.indexOf("at_beginning")
            let current=this.targetNode
            let parent=this.content.get(current.get("parent"))
            let found=[]
            while(parent){
                if(parent.get("children").first()===current.get("id")){
                    found.push(`at_beginning_of_${parent.get("type")}`)
                    current=parent
                    parent=this.content.get(current.get("parent"))
                    continue
                }
                break
            }
            if(found.length>0){
                pos.splice(i,0,...found)
            }
        }

        if(pos.includes("at_end_of")){
            let i=pos.indexOf("at_end")
            let current=this.targetNode
            let parent=this.content.get(current.get("parent"))
            let found=[]
            while(parent){
                if(parent.get("children").last()===current.get("id")){
                    found.push(`at_end_of_${parent.get("type")}`)
                    current=parent
                    parent=this.content.get(current.get("parent"))
                    continue
                }
                break
            }
            if(found.length>0){
                pos.splice(i,0,...found)
            }
        }

        if(parentType){
            pos.push(`at_${type}_in_${parentType}`)
        }

        pos.push("at_"+type)

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
