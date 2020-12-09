import Base from "../event"

import seperate from "./seperate"
import create from "./create"
import update from "./update"
import enter from "./enter"
import type from "./type"
import backspace from "./backspace"
import Delete from "./delete"
import tab from "./tab"
import forward from "./forward"
import backward from "./backward"
import remove from "./remove"

export default (class XDocEvents extends Base{
    static extends(){
        Object.assign(this.prototype,...arguments)
        return this
    }
    constructor(){
        super(...arguments)
        this.PR="__unknown"
        this.PARAGRAPH="paragraph"
        this.TEXT="text"
        this.InlineContainers=""
        this.super=new Proxy(this,{
            get(me, k){
                let a=me.__proto__.__proto__
                while(a){
                    if(k in a){
                        if(typeof(a[k])=="function"){
                            return a[k].bind(me)
                        }
                        break
                    }
                    a=a.__proto__
                }
                throw new Error(`super has no ${k}`)
            }
        })
    }

    get TEXT_(){
        return this.TEXT.replace(":","\\:")
    }

    get PARAGRAPH_(){
        return this.PARAGRAPH.replace(":","\\:")
    }

    paragraphHasIndentSetting(){
        throw new Error("no paragraphHasIndentSetting implementation")
    }

    isNumberingParagraph(){
        throw new Error("no isNumberingParagraph implementation")
    }

    merge_in_paragraph(){
        const {start,end}=this.selection
        this.cursorAt(start.id, start.at)
    }

    merge_up_to_same_grand_parent(){
        const {start,end}=this.selection
        const p0=this.target.closest(this.PARAGRAPH_)
        const p1=this.file.getNode(end.id).closest(this.PARAGRAPH_)
        p0.append(p1.children(`:not(${this.PR})`))
        this.$(`#${end.id}`).remove()
        p1.remove()
        this.file.renderChanged(p0)
        this.cursorAt(start.id, start.at)
    }

    create_first_paragraph(){
        throw new Error("create_first_paragraph")
    }

    backspace(){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==end.at){
            this.emit("backspace",this.conds,...arguments)
        }else{
            this.remove(...arguments)
        }
        this.clean()
    }

    create({type}){
        this.remove()
        this.emit("create",[...this.conds,""].map(a=>type.toLowerCase()+(a&&"_")+a),...arguments)
    }
    
    delete(){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==end.at){
            this.emit("delete",this.conds,...arguments)
        }else{
            this.remove(...arguments)
        }
        this.clean()
    }
    
    remove({type}={}){
        if(type){
            this.emit("remove", [...this.conds,""].map(a=>type.toLowerCase()+(a&&'_')+a), ...arguments)
            return
        }

        const {start,end}=this.selection
        if(start.id==end.id){
            if(start.at!==end.at){
                this.emit("remove", this.conds, ...arguments)
            }
            return
        }

        try{
            this.seperateSelection()
            const {start,end}=this.selection
            const prev=this.$("#"+start.id).backwardFirst(this.cursorable)
            const next=this.$('#'+end.id).forwardFirst(this.cursorable)

            const targets=this.$target.to("#"+end.id)
            targets.toArray().forEach(id=>{
                this.selectWhole(id)
                this.emit("remove",this.conds, ...arguments)
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
            }
        }
    }
    
	update({id,type,...changing}){
        if(!type){
			type=Object.keys(changing)[0]
			changing=changing[type]
		}
		if(!id){//target id specified, so don't need seperate selection
			this.seperateSelection(type)
		}
        
		const {start,end}=this.selection
		
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
                this.cursorAt(id,0,false)
                this.emit("update",this.conds,changing)
            })
        }finally{
            if(this.$(`#${start.id}`).length && this.$(`#${end.id}`).length){
                this.cursorAt(start.id,start.at,end.id,end.at)
            }
        }
    }   
    
    //the result should be [element], or [el1,...,el2]
    seperateSelection(){
        const action="seperate"
        var {start,end}=this.selection
        start={...start}, end={...end}
        if(start.id==end.id){
            const min=Math.min(start.at, end.at),max=Math.max(start.at, end.at)
            start.at=min
            end.at=max
            //whole
            if(this.content.getIn([start.id,"type"])!="text")
                return
            //text
            //full text, whole/empty
            const isEndAtEnd=end.at>=this.content.getIn([start.id,"children"]).length-1
            if(start.at==0 && isEndAtEnd)
                return
            if(start.at==end.at){
                this.emit("split_text",this.conds)
                return
            }
        }else{
            //normalize start, and end according to order
            const ids=[start.id,end.id]
            const grand=this.$('#'+end.id).parentsUntil(this.$('#'+start.id).parents()).parent()
            grand.findFirst(a=>{
                switch(ids.indexOf(a.get('id'))){
                    case 1:
                        ([start,end]=[end,start]);
                    case 0:
                        return true
                }
            })
        }

        this.cursorAt(end.id, end.at)
        var conds=this.conds
        if(!(conds.includes("at_end"))){
            this.emit(action,conds.map(a=>a+"_for_end"))
        }
        end=this.selection.start

        this.cursorAt(start.id,start.at,end.id,end.at)
        conds=this.conds
        if(conds.includes("at_whole")){
            return 
        }

        if(!(conds.includes("at_beginning"))){
            this.emit(action,this.conds.map(a=>a+"_for_start"))
        }
    }    
}).extends(seperate,create,update,enter,type,backspace,Delete,tab,forward,backward,remove)