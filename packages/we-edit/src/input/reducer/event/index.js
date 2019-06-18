import xQuery from "./query"
import Base from "../base"

export default class extends Base{
    constructor(state){
        super(...arguments)
        this.$=context=>new xQuery(state, context)
        this.debug=false
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
            if(this.debug){
                console.debug({message:`${action}_${event}`,action,conds,payload})
            }
            this[`${action}_${event}`](...payload,conds)
        }else if(this.debug){
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
            const conds=this.conds.map(a=>a.replace(/at_/,"whole_").replace(/^whole_(beginning|end)/,'whole_at_$1'))
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
                }else if(start.at==0 && end.at>=this.content.getIn([start.id,"children"]).length-1){
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
            if(prev.length==0 && next.length==0){
                this.create_first_paragraph()
                return 
            }else{
                 if(prev.length>0){
                    this.cursorAtEnd(prev.attr("id"))
                    if(next.length>0){
                        this.cursorAt(this.selection.start.id, this.selection.start.at, next.attr("id"),0)

                        const {end}=this.selection
                        const parentsOfEnd=this.$('#'+end.id).parents()
                        const grandParent=this.$target.closest(parentsOfEnd)
                        const inParagraph=parentsOfEnd.slice(0,parentsOfEnd.indexOf(grandParent)+1).filter("paragraph").length>0
        
                        const type=grandParent.attr("type")
                        const conds=[]
                        if(inParagraph){
                            conds.push("in_paragraph")
                        }
                        conds.push(`up_to_${type}`)
                        conds.push("up_to_same_grand_parent")
                        this.emit("merge",conds)
                    }
                }else if(next.length>0){
                    this.cursorAt(next.attr("id"),0)
                }
            }
        }finally{
            if(this.content.has(start.id)){
                this.cursorAt(start.id, start.at)
            }else{
                
            }
        }
    }
    /*
        at_beginning_of_text_up_to_document_in_run
        at_beginning_of_text_up_to_section_in_run
        at_beginning_of_text_up_to_paragraph_in_run
        at_beginning_of_text_up_to_document
        at_beginning_of_text_up_to_section
        at_beginning_of_text_up_to_paragraph
        at_beginning_of_text_in_run
        at_beginning_of_up_to_document
        at_beginning_of_up_to_section
        at_beginning_of_up_to_paragraph
        at_beginning_of_text
        at_text
        at_beginning
    */
    get conds(){
        const target=this.content.get(this.selection.start.id)
        const {type,children,parent}=target.toJS()
        const parentType=this.content.getIn([parent,"type"])
        const {id,at=0}=this.selection.start
        const pos=
            (this.isEmpty()&&"empty")||
            (this.isWhole()&&"whole")||
            (at==0 && "beginning_of")||
            (type=="text" ? (at>=children.length && "end_of") : (at==1)&&"end_of")||
            ""
        
        const up2Parents=((current,parent,types=[])=>{
                switch(pos){
                case "whole":
                        current=this.content.get(current.get("parent"))
                case "empty":
                    while(parent=this.content.get(current.get("parent"))){
                        let children=parent.get("children")
                        if(children.size!=1 || children.first()!=current.get("id")){
                            break
                        }
                        types.unshift(parent.get("type"))
                        current=parent
                    }
                break
                case "beginning_of":
                    while(parent=this.content.get(current.get("parent"))){
                        if(parent.get("children").first()!==current.get("id")){
                            break
                        }
                        types.unshift(parent.get("type"))
                        current=parent
                    }
                break
                case "end_of":
                    while(parent=this.content.get(current.get("parent"))){
                        if(parent.get("children").last()!==current.get("id")){
                            break
                        }
                        types.unshift(parent.get("type"))
                        current=parent
                    }
                break
                }
                return types
            })(target);
        
        var conds=up2Parents.map(a=>`up_to_${a}`)
        if(parentType){
            conds=[...conds.map(a=>`${a}_in_${parentType}`),...conds,`in_${parentType}`]
        }
        //pos+type+parents
        conds=conds.map(a=>`${pos}_${type}_${a}`)
        //pos+parents
        conds=[...conds, ...up2Parents.map(a=>`${pos}_up_to_${a}`)]
        return [
            ...conds,
            `${pos}_${type}`,
            type,
            pos.replace(/_of$/,'')
        ]
            .filter(a=>!!a).map(a=>a.replace(/^_/g,""))
            .map(a=>'at_'+a)
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

    remove({backspace}={}){
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
                this.cursorAt(id,0,id,0,undefined, false)
                this.emit("update",this.conds,{id,...changing})
            })
        }finally{
            this.cursorAt(start.id,start.at,end.id,end.at)
        }
        return this
    }
    
    create({type,...props}){
        this.removeSelection()
        this.emit("create_"+type.toLowerCase(),this.conds,...arguments)
		return this
    }
}
