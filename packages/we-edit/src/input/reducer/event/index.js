import xQuery from "./query"
import Base from "../base"

export default class extends Base{
    constructor(state){
        super(...arguments)
        this.$=context=>new xQuery(state, context)
    }


    get $target(){
        return this.$(`#${this.selection.start.id}`)
    }

    get target(){
        return this.file.getNode(this.selection.start.id)
    }
        
    emit(action,conds, ...payload){
        const event=conds.find(cond=>`${action}_${cond}` in this)
        if(event){
            console.warn({message:"event with handler",action,conds,payload})
            this[`${action}_${event}`](...payload,conds)
        }else{
            console.warn({message:"event without handler",action,conds,payload})
        }
    }

    isEmpty(){
        const {type,children}=this.content.get(this.selection.start.id).toJS()
        return (this.isContainer(type) || type=="text") && (!children || children.length==0)
    }

    isWhole(){
        return false
    }
    
    isContainer(type){
        return !["image","text"].includes(type)
    }

    serializeSelection(){
        
	}

    //the result should be [element], or [el1,...,el2]
	seperateSelection(){
        var {start,end}=this.selection
        if(start.id==end.id){
            if(start.at==end.at){
                return
            }else{
                if(this.content.getIn([start.id,"type"])!="text"){
                    return
                }else if(start.at==0 && end.at>=this.content.getIn([start.id,"children"]).length-1){
                    return
                }
            }
        }

        const action="seperate"
        this.cursorAt(end.id, end.at)
        var conds=this.conds
        if(!(conds.includes("at_end"))){
            this.emit(action,conds.map(a=>a+"_for_end"))
        }
        end=this.selection.start

        this.cursorAt(start.id,start.at,end.id,end.at)
        conds=this.conds
        if(!(conds.includes("at_beginning"))){
            this.emit(action,this.conds.map(a=>a+"_for_start"))
        }
    }


	removeSelection(){
        const wholifyConds=()=>{
            const conds=this.conds.map(a=>a.replace(/at_/,"whole_").replace(/^whole_(beginning|end)/),'whole_at_$1')
            conds.push("whole")
            return conds
        }
        const {start,end}=this.selection
        if(start.id==end.id){
            if(start.at==end.at){
                return
            }else{
                const type=this.content.getIn([start.id,"type"])
                if(type!="text"){
                    //remove whole object
                    this.emit("remove", wholifyConds())
                    return
                }else if(start.at==0 && end.at>=this.content.getIn([id,"children"]).length-1){
                    //remove whole text
                    this.emit("remove", wholifyConds())
                    return
                }else{//text,some
                    //remove some from text
                    this.emit("shrink", ["text"])
                    return 
                }
            }
        }
        try{
            this.seperateSelection()
            const {start,end}=this.selection
            const prev=this.$("#"+start.id).backwardFirst()
            const next=this.$('#'+end.id).forwardFirst()

            const targets=this.$target.to("#"+end.id)
            targets.toArray().forEach(id=>{
                this.cursorAt(id,0)
                this.emit("remove",wholifyConds())
            })

            //join
            this.cursorAtEnd(prev.attr("id"))
            this.cursorAt(this.selection.start.id, this.selection.start.at, next.attr("id"),0)
            {
                const {start,end}=this.selection
                const parentsOfEnd=this.$('#'+end.id).parents()
                const grandParent=this.$target.closest(parentsOfEnd)
                const inParagraph=parentsOfEnd.slice(0,parentsOfEnd.indexOf(grandParent)).filter("paragraph").length>0

                const type=grandParent.attr("type")
                const conds=[]
                if(inParagraph){
                    conds.push("in_paragraph")
                }
                conds.push(`up_to_${type}`)
                conds.push("up_to_same_grand_parent")
                this.emit("merge",conds)
            }
        }finally{
            if(this.content.has(start.id)){
                this.cursorAt(start.id, start.at)
            }else{
                
            }
        }
	}

	get conds(){
        const target=this.content.get(this.selection.start.id)
        const {type,children,parent}=target.toJS()
        const parentType=this.content.getIn([parent,"type"])
        const {id,at=0}=this.selection.start
        const pos=[], conds=[]
        if(this.isEmpty()){
            pos.push("at_empty")
        }else if(this.isWhole()){
            pos.push("at_whole")
        }else{
            if(at==0){
                pos.push("at_beginning_of")
            }

            if(type=="text"){
                if(at>=children.length){
                    pos.push("at_end_of")
                }
            }else{
                if(at==1){
                    pos.push("at_end_of")
                }
            }
        }

        pos.push("at")

        if(parentType){
            pos.forEach(a=>conds.push(`${a}_${type}_in_${parentType}`))
        }
        pos.forEach(a=>conds.push(`${a}_${type}`))
        pos.forEach(a=>conds.push(`${a}_in_${parentType}`))

        pos.forEach(a=>{
            let current=target,parent
            switch(a){
                case "at_whole":
                case "at_empty":
                    conds.push(a)
                    break
                case "at_beginning_of":{
                    while(parent=this.content.get(current.get("parent"))){
                        if(parent.get("children").first()!==current.get("id")){
                            break
                        }
                        conds.push(`${a}_up_to_${parent.get("type")}`)
                        current=parent
                    }
                    conds.push("at_beginning")
                    break
                }
                case "at_end_of":{
                    while(parent=this.content.get(current.get("parent"))){
                        if(parent.get("children").last()!==current.get("id")){
                            break
                        }
                        conds.push(`${a}_up_to_${parent.get("type")}`)
                        current=parent
                    }
                    conds.push("at_end")
                    break
                }
            }
        })

        return conds
    }

    insert({data}){
        this.removeSelection()
        const action=(t=>{
                if(t.length==1){
                    return ({
                        "9":"tab",
                        "13":"enter"
                    })[`${t.charCodeAt(0)}`]
                }
            })(data)||"type";

        this.emit(action,this.conds,...arguments)
        return this
    }

    remove({backspace}){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==end.at){
            const action=backspace ? "backspace" : "delete";
            this.emit(action,this.conds,...arguments)
        }else{
            this.removeSelection(...arguments)
        }
        return this
    }

    update({id,type,...changing}){
        this.seperateSelection()
        
        const {start,end}=this.selection
        if(!type){
			type=Object.keys(changing)[0]
			changing=changing[type]
		}

		const targets=id ? [id] : (()=>{
			const from=this.$(`#${start.id}`)
			const to=this.$(`#${end.id}`)
			const targets=((from,to)=>start.id==end.id ? from : from
				.add(from.forwardUntil(to))
				.add(to.parents())
				.add(to)
			)(from,to)

			return targets//self
				.add(from.parents())//ancestors
				.filter(type)
				.add(from.add(to).find(type))//descendents
				.toArray()
        })();
        
        try{
            targets.forEach(id=>{
                this.cursorAt(id,0)
                this.emit("update",this.conds,{id,...changing})
            })
        }finally{
            this.cursorAt(start.id,start.at,end.id,end.at)
        }
        return this
    }
    
    create({type,...props}){
        this.removeSelection()
        this.emit("create_"+type.toLowerCase(),this.conds,props)
		return this
    }
}
