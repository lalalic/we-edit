import {Input} from "we-edit"

export default class extends Input.EventReducer{
    text_in_text({data}){
        const {start:{id,at}}=this.selection
        const src=this.targetNode.get("children")
        this.content.setIn([id,"children"],src.substring(0,at)+data+src.substring(at))
        this.cursorAt(id,at+data.length)
    }

    enter_in_text(){
        const target=this.targetNode
        const {start:{id,at}}=this.selection
        const src=target.get('children')
        this.content.setIn([id,"children"],src.substring(0,at))

        const t1=target.set("children",src.substring(at)).set("id",this.file.makeId())
        this.content.set(t1.get("id"),t1)
        this.content.updateIn([target.get("parent"), "children"],children=>{
            return children.insert(children.indexOf(id)+1,t1.get("id"))
        })

        this.cursorAt(t1.get("id"),0)
        this.enter_at_beginning_of(...arguments)
    }

    enter_at_beginning_of(){
        const {parent:pId,id,type}=this.targetNode.toJS()
        this.content.updateIn([pId,"children"],children=>children.slice(0,children.indexOf(id)))

        const p1Id=this.file.makeId()
        const parent=this.content.get(pId)
            .set("id",p1Id)
            .updateIn(["children"], children=>{
                children=children.slice(children.indexOf(id))
                children.forEach(a=>this.content.setIn([a,"parent"],p1Id))
                return children
            })
        this.content.set(p1Id,parent)

        this.content.updateIn([parent.get("parent"),"children"],children=>
            children.insert(children.indexOf(pId)+1,parent.get("parent"))
        )

        this.cursorAt(parent.get("id"),0)

        this.enter_at_beginning_of(...arguments)
    }

    enter_at_beginning_of_paragraph(){
        const newParagraph=this.targetNode
            .set("id",this.file.makeId())
            .updateIn(["children"],children=>children.slice(0,0))
        this.content.set(newParagraph.get("id"),newParagraph)
        this.content.updateIn([newParagraph.get("parent"),"children"],children=>
            children.insert(children.indexOf(this.targetNode.get("parent")),newParagraph.get("id"))
        )
    }

    enter_at_end_of_paragraph(){
        const newParagraph=this.targetNode
            .set("id",this.file.makeId())
            .updateIn(["children"],children=>children.slice(0,0))
        this.content.set(newParagraph.get("id"),newParagraph)
        this.content.updateIn([newParagraph.get("parent"),"children"],children=>
            children.insert(children.indexOf(this.targetNode.get("parent"))+1,newParagraph.get("id"))
        )
        this.cursorAt(newParagraph.get('id'),0)
    }
}
