import Base from "../base"
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
import collaborate from "./conflict-collaborate"
import merge from "./merge"
/**
 * conditions:
 *  whole|empty|beginning_of|end_of|type
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
export default (class Events extends Base{
    static extends(){
        Object.assign(this.prototype,...arguments)
        return this
    }

    constructor(){
        super(...arguments)
        this.PARAGRAPH="paragraph"
        this.TEXT="text"
        
        this.PR="__unknown"//non-content in file source
        this.InlineContainers="__unknown"//inline container types in file source
        
        Object.defineProperties(this,{
            conds:{
                configurable:true,
                get(){
                    const target=this.content.get(this.selection.start.id)
                    const {type,children,parent}=target.toJS()
                    const parentType=this.content.getIn([parent,"type"])
                    const {id,at=0}=this.selection.start
                    const pos=
                        (this.isWhole()&&"whole")||
                        (this.isEmpty()&&"empty")||
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
                    if(parentType)
                        conds.push(`${pos}_${type}_in_${parentType}`)
                    conds.push(`${pos}_${type}`)
                    if(parentType)
                        conds.push(`${type}_in_${parentType}`)
                    conds.push(type)
                    conds.push(pos.replace(/_of$/,''))
                    conds=conds.filter(a=>!!a).map(a=>a.replace(/^_/g,""))
                    return Array.from(new Set(conds)).map(a=>'at_'+a)
                }
            },
            PARAGRAPH_:{
                configurable:true,
                get(){
                    return this.PARAGRAPH
                }
            },
            TEXT_:{
                configurable:true,
                get(){
                    return this.TEXT
                }
            },
        })

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

    isEmpty(){
        const $target=this.$target
        return $target.findFirst(this.cursorable).length==0 && 
            ($target.is("paragraph") || !this.cursorable($target.get(0)))
    }

    isWhole(){
        const {start,end}=this.selection
        if(start.id==end.id && Math.min(start.at,end.at)==0 && end.at!=start.at){
            if(this.$target.attr('type')=="text"){
                return Math.max(start.at,end.at)>=this.$target.text().length
            }else{
                return Math.max(start.at,end.at)>=1
            }
        }
        return false
    }
    
    emit(action,conds, ...payload){
        const event=conds.find(cond=>`${action}_${cond}` in this)
        if(event){
            if(this.debug)
                console.debug({message:`${action}_${event}`,action,conds,payload})
            return this[`${action}_${event}`](...payload,conds)
        }else if(this.debug){
            console.warn({message:"event without handler",action,conds,payload})
        }
    }

    /**
     * clean current paragraph
     * @param {*} f 
     */
    clean(f){
        const $next=this.$target.forwardFirst(this.cursorable)
        const $prev=this.$target.backwardFirst(this.cursorable)
        if($next.length==0 && $prev.length==0){
            return 
        }

        const $p=this.$target.closest("paragraph")
        
        f&&f();

        if(this.$target.length==0){
            if($next.closest($p).length>0){
                this.cursorAt($next.attr('id'),0)
            }else if($prev.closest($p).length>0){
                this.cursorAtEnd($prev.attr('id'))
            }else{
                this.cursorAtEnd($p.attr('id'))
            }
        }
    }

    type(){
        this.remove()
        this.emit("type",this.conds,...arguments)
    }

    enter(){
        this.remove()
        this.emit("enter",this.conds,...arguments)
    }

    tab(){
        this.remove()
        this.emit("tab",this.conds,...arguments)
    }

    shouldRemoveSelectionWhenCreate(payload){
        return true
    }

    create({type}){
        if(this.shouldRemoveSelectionWhenCreate(...arguments)){
            this.remove()
        }
        this.emit("create",[...this.conds,""].map(a=>type.toLowerCase()+(a&&"_")+a),...arguments)
    }

    remove({type}={}){
        if(type){
            this.emit("remove", [...this.conds,""].map(a=>type.toLowerCase()+(a&&'_')+a), ...arguments)
            return
        }

        if(this.$target.is("page")){
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

    delete(){
        if(this.isCursor){
            this.emit("delete",this.conds,...arguments)
        }else{
            this.remove(...arguments)
        }
        this.clean()
    }

    backspace(){
        if(this.isCursor){
            this.emit("backspace",this.conds,...arguments)
        }else{
            this.remove(...arguments)
        }
        this.clean()
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
                this.cursorAt(id,0)
                this.emit("update",this.conds,changing)
            })
        }finally{
            if(this.$(`#${start.id}`).length && this.$(`#${end.id}`).length){
                this.cursorAt(start.id,start.at,end.id,end.at)
            }
        }
    }

    forward({shiftKey}={}){
        const {cursorAt="end", ...a}=this.selection
        if(!shiftKey && !this.isCursor){
            this.cursorAt(a.end.id,a.end.at)
            return 
        }
        
        this.cursorAt(a[cursorAt].id, a[cursorAt].at)
        if(shiftKey){
            this.emit("forward",this.conds,...arguments)
            const {id,at}=this.selection.end
            if(cursorAt=="end"){//end changed
                this.cursorAt(a.start.id, a.start.at, id,at)
            }else{//start changed
                this.cursorAt(id, at, a.end.id,a.end.at)
            }
        }else{
            this.emit("forward",this.conds,...arguments)
        }
    }

    backward({shiftKey}={}){
        const {cursorAt="end", ...a}=this.selection
        if(!shiftKey && !this.isCursor){
            this.cursorAt(a.start.id,a.start.at)
            return
        }
        
        this.cursorAt(a[cursorAt].id, a[cursorAt].at)
        if(shiftKey){
            this.emit("backward",this.conds,...arguments)
            const {id,at}=this.selection.end
            if(cursorAt=="end"){//end changed
                this.cursorAt(a.start.id, a.start.at, id,at)
            }else{//start changed
                this.cursorAt(id, at, a.end.id,a.end.at)
            }
            
        }else{
            this.emit("backward",this.conds,...arguments)
        }
    }

    copy(){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==end.at){
            return
        }

        if(start.id==end.id){
            this.clipboard=this.emit("serialize", this.conds)
        }else{
            const targets=this.$target.to("#"+end.id).toArray()
            this.cursorAt(start.id,start.at, start.id, this.cursorAtEnd(start.id).end.at)
            const first=this.emit("serialize",this.conds)

            const contents=targets.slice(1,targets.length-1).map(id=>{
                this.selectWhole(id)
                return this.emit("serialize",this.conds)
            })

            this.cursorAt(end.id, 0, end.id, end.at)
            const last=this.emit("serialize",this.conds)

            this.clipboard=[first, ...contents, last].join("")
            this.cursorAt(start.id, start.at, end.id, end.at)
        }
    }

    cut(){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==end.at){
            return 
        }

        if(start.id==end.id){
            this.clipboard=this.emit("serialize", this.conds)
        }else{   
            this.seperateSelection()
            this.clipboard=this.$target.to("#"+end.id).toArray().map(id=>{
                this.selectWhole(id)
                return this.emit("serialize",this.conds)
            }).join("")
        }
        this.remove()
    }

    shouldRemoveSelectionWhenPaste(payload){
        return true
    }

    paste(){
        if(this.shouldRemoveSelectionWhenPaste(...arguments)){
            this.remove()
        }

        this.file.attach(this.clipboard).each((i,a)=>{
            const {id}=this.file.renderChanged(a)
            const $b=this.$(`#${id}`)
            this.emit("paste_"+$b.attr('type'),this.conds,$b,a)
        })
    }

    /**
     * anchor move: move by dest{dx,dy}
     * flow move: move to dest{id,at}
     * @param {*} param0 
     */
    move({dest:{id,at,dx,dy, isMovingAnchor=!id && dx!=undefined && dy!=undefined}}){
        const {start,end}=this.selection
        if(isMovingAnchor){
            if(dx||dy){
                this.emit("move",["at_up_to_anchor"], {dx,dy})
            }
            return 
        }

        if(!id)
            return 
        if(start.id==end.id && start.at==end.at)
            return 
    
        /**
         * flow move is a cut-n-paste, but this.clipboard should be kept 
         */
        const clipboard=this.clipboard
        try{
            //@TODO: to make sure dest still exists after cut
            this.cut()
            this.cursorAt(id,at)
            this.paste()
        }finally{
            this.clipboard=clipboard
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

    conflict({action,conflict}){
        const isCursor=({start,end})=>start.id==end.id && start.at==end.at
        const type=id=>this.$('#'+id).attr('type')
        const conds=action.type.split('/').slice(1).reverse().map(a=>a.toLowerCase())
        conds.push('at', this.isCursor ? type(this.cursor.id) : 'range')

        const start=this.emit('conflict_collaborating',[conds.join("_")+'_for_'+type(conflict.start.id)], {action,conflict:conflict.start})||conflict.start
        const end=!isCursor(conflict) && this.emit('conflict_collaborating',[conds.join("_")+'_for_'+type(conflict.end.id)], {action,conflict:conflict.end}) || start
        
        if(start!=conflict.start || end!=conflict.end){
            return {...conflict,start,end}
        }
    }

    paragraphHasIndentSetting(){
        throw new Error("no paragraphHasIndentSetting implementation")
    }

    isNumberingParagraph(){
        throw new Error("no isNumberingParagraph implementation")
    }

    create_first_paragraph(){
        throw new Error("create_first_paragraph")
    }

}).extends(seperate,create,update,enter,type,backspace,Delete,tab,forward,backward,remove,collaborate,merge)
