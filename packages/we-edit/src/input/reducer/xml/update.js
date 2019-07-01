export default {
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
                this.emit("update",this.conds,changing)
            })
        }finally{
            this.cursorAt(start.id,start.at,end.id,end.at)
        }
        return this
    },    
}
