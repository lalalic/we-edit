import Base from "./base"

export default class extends Base{
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
        return [
            ...conds,
            `${pos}_${type}`,
            type,
            pos.replace(/_of$/,'')
        ]
            .filter(a=>!!a).map(a=>a.replace(/^_/g,""))
            .map(a=>'at_'+a)
    }  

    isEmpty(){
        const $target=this.$target
        return $target.findFirst(this.cursorable).length==0 && 
            ($target.is("paragraph") || !this.cursorable($target.get(0)))
    }

    isWhole(){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==0 && end.at!=0){
            if(this.$target.attr('type')=="text"){
                return end.at>=this.$target.text().length
            }else{
                return end.at>=1
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

    clean(f){
        const $next=this.$target.forwardFirst(this.cursorable)
        const $prev=this.$target.backwardFirst(this.cursorable)
        if($next.length==0 && $prev.length==0){
            return 
        }

        f&&f();
        
        const $p=this.$target.closest("paragraph")
        $p.find("text").filter(a=>this.$(a).text().length==0).each((i,a)=>{
            const parents=this.$(a).parentsUntil($p).not($p)
            const k=((parents.toArray().findIndex(b=>this.$('#'+b).length>1)+1)||parents.length)-1
            const target=parents.eq(k).attr('id')||a.get('id')
            this.$(`#${target}`).remove()
            this.file.getNode(target).remove()
        })

        if(this.$target.length==0){
            if($next.length==1){
                this.cursorAt($next.attr('id'),0)
            }else if($prev.length==1){
                this.cursorAtEnd($prev.attr('id'))
            }
        }
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
        if(conds.includes("at_whole")){
            return 
        }

        if(!(conds.includes("at_beginning"))){
            this.emit(action,this.conds.map(a=>a+"_for_start"))
        }
    }


	remove({type}={}){
        if(type){
            this.emit("remove_"+type, [...this.conds,""], ...arguments)
            return this
        }

        const {start,end}=this.selection
        if(start.id==end.id){
            if(start.at!==end.at){
                this.emit("remove", this.conds, ...arguments)
            }
            return this
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
        return this
    }

    type(){
        this.remove()
        this.emit("type",this.conds,...arguments)
        return this
    }

    enter(){
        this.remove()
        this.emit("enter",this.conds,...arguments)
        return this
    }

    tab(){
        this.remove()
        this.emit("tab",this.conds,...arguments)
        return this
    }

    delete(){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==end.at){
            this.emit("delete",this.conds,...arguments)
        }else{
            this.remove(...arguments)
        }
        this.clean()
        return this
    }

    backspace(){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==end.at){
            this.emit("backspace",this.conds,...arguments)
        }else{
            this.remove(...arguments)
        }
        this.clean()
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
        this.remove()
        this.emit("create_"+type.toLowerCase(),this.conds,...arguments)
		return this
    }

    forward(){
        this.emit("forward",this.conds,...arguments)
        return this
    }

    backward(){
        this.emit("backward",this.conds,...arguments)
        return this
    }

    copy(){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==end.at){
            return this
        }

        if(start.id==end.id){
            this.clipboard=this.emit("serialize", this.conds)
        }else{
            const targets=this.$target.to("#"+end.id).toArray()
            this.cursorAt(start.id,start.at, start.id, this.cursorAtEnd(start.id).end.at)
            const first=this.emit("serialize",this.conds)

            const contents=targets.slice(1,targets.length-1).map(id=>{
                this.selectWhole(id)
                return this.emit("serialize",[...this.conds,"any"])
            })

            this.cursorAt(end.id, 0, end.id, end.at)
            const last=this.emit("serialize",this.conds)

            this.clipboard=[first, ...contents, last].join("")
            this.cursorAt(start.id, start.at, end.id, end.at)
        }
        
        return this
    }

    cut(){
        const {start,end}=this.selection
        if(start.id==end.id && start.at==end.at){
            return this
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
        return this
    }

    paste(){
        this.remove()
        this.file.attach(this.clipboard).each((i,a)=>{
            const {id}=this.file.renderChanged(a)
            const $b=this.$(`#${id}`)
            this.emit("paste_"+$b.attr('type'),this.conds,$b,a)
        })

        return this
    }
}
