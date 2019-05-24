import xQuery from "./query"
import Base from "../base"

export default class extends Base{
    constructor(state){
        super(...arguments)
        this.$=context=>new xQuery(state, context)
        this.loopCount=0
    }
    serializeSelection(){

	}

	seperateSelection(){
        var {start,end}=this.selection
        if(start.id==end.id){
            if(start.at==end.at){
                return
            }else{
                if(this.content.getIn([id,"type"])!="text"){
                    return
                }else if(at==0 && end.at>=this.content.getIn([id,"children"]).length-1){
                    return
                }
            }
        }

        var action="seperate_end"
        this.cursorAt(end.id, end.at)
        var events=this.events
        if(!(events.includes("at_end") || events.includes("at_empty"))){
            const event=events.find(pos=>`${action}_${pos}` in this)
            if(event){
                console.log(`${action}_${event}`)
                this[`${action}_${event}`](events)
            }else{
                console.warn({message:"event without handler",action,events})
            }
        }

        action="seperate_start"
        this.cursorAt(start.id,start.at)
        events=this.events
        if(!(events.includes("at_beginning") || events.includes("at_empty"))){
            const event=events.find(pos=>`${action}_${pos}` in this)
            if(event){
                console.log(`${action}_${event}`)
                this[`${action}_${event}`](events)
            }else{
                console.warn({message:"event without handler",action,events})
            }
        }

        this.cursorAt(start.id,start.at,end.id,end.at)
	}

	removeSelection(){

	}

    isContainer(type){
        return !["image"].includes(type)
    }

	get events(){
        const target=this.$target.get(0)
        const {type,children,parent}=target.toJS()
        const parentType=this.content.getIn([parent,"type"])
        const {id,at=0}=this.selection.start
        const pos=[], events=[]
        if(this.isContainer(type) && (!children || children.length==0)){
            pos.push("at_empty")
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
            pos.forEach(a=>events.push(`${a}_${type}_in_${parentType}`))
        }
        pos.forEach(a=>events.push(`${a}_${type}`))
        pos.forEach(a=>events.push(`${a}_in_${parentType}`))

        pos.forEach(a=>{
            let current=target,parent
            switch(a){
                case "at_empty":{
                    events.push("at_empty")
                    break
                }
                case "at_beginning_of":{
                    while(parent=this.content.get(current.get("parent"))){
                        if(parent.get("children").first()!==current.get("id")){
                            break
                        }
                        events.push(`${a}_up_to_${parent.get("type")}`)
                        current=parent
                    }
                    events.push("at_beginning")
                    break
                }
                case "at_end_of":{
                    while(parent=this.content.get(current.get("parent"))){
                        if(parent.get("children").last()!==current.get("id")){
                            break
                        }
                        events.push(`${a}_up_to_${parent.get("type")}`)
                        current=parent
                    }
                    events.push("at_end")
                    break
                }
            }
        })

        return events
    }

    get $target(){
        return this.$(`#${this.selection.start.id}`)
    }

    get target(){
        return this.file.getNode(this.selection.start.id)
    }

    insert({data}){
        if(++this.loopCount>10){
            throw new Error("perhaps dead loop")
        }
        this.removeSelection()
        const action=(t=>{
                if(t.length==1){
                    return ({
                        "9":"tab",
                        "13":"enter"
                    })[`${t.charCodeAt(0)}`]
                }
            })(data)||"type";
        const events=this.events
        const event=events.find(pos=>`${action}_${pos}` in this)
        if(event){
            console.log(`${action}_${event}`)
            this[`${action}_${event}`](...arguments,events)
        }else{
            console.warn({message:"event without handler",action,events})
        }
        return this
    }

    remove({backspace}){
        if(++this.loopCount>10){
            throw new Error("perhaps dead loop")
        }
        this.removeSelection()
        const action=backspace ? "backspace" : "remove";
        const events=this.events
        const event=events.find(pos=>`${action}_${pos}` in this)
        if(event){
            console.log(`${action}_${event}`)
            this[`${action}_${event}`](...arguments,events)
        }else{
            console.warn({message:"event without handler",action,events})
        }
        return this
    }

    update({id,type,...changing}){
        this.seperateSelection()
        if(!type){
			type=Object.keys(changing)[0]
			changing=changing[type]
		}

		const targets=id ? [id] : (()=>{
			const {start,end}=this.selection
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

        const event="update_"+type

        if(event in this){
    		targets.forEach(id=>{
                this[event]({id,changing})
    		})
        }
	}
}
