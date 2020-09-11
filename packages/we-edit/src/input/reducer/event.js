import Base from "./base"

export default class Events extends Base{
    /* whole|empty|beginning_of|end_of|type
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
            if(this.debug){
                console.debug({message:`${action}_${event}`,action,conds,payload})
            }
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

    forward({shiftKey}={}){
        const {cursorAt="end", ...a}=this.selection
        this.cursorAt(a[cursorAt].id, a[cursorAt].at)
        if(shiftKey){
            this.emit("forward",this.conds,...arguments)
            const {end:current}=this.selection
            if(cursorAt=="start"){
                this.cursorAt(current.id,current.at,a.end.id,a.end.at,cursorAt)
            }else{
                this.cursorAt(a.start.id, a.start.at, current.id,current.at,cursorAt)
            }
        }else{
            this.emit("forward",this.conds,...arguments)
        }
    }

    backward({shiftKey}={}){
        const {cursorAt="end", ...a}=this.selection
        this.cursorAt(a[cursorAt].id, a[cursorAt].at)
        if(shiftKey){
            this.emit("backward",this.conds,...arguments)
            const {end:current}=this.selection
            if(cursorAt=="start"){
                this.cursorAt(current.id,current.at,a.end.id,a.end.at,cursorAt)
            }else{
                this.cursorAt(a.start.id, a.start.at, current.id,current.at,cursorAt)
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

    paste(){
        this.remove()
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
}
