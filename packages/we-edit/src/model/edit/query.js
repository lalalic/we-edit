export default class {
	constructor(document, state){
		this.document=document
        this.state=state
	}
	
	at(x,y){
		return {id:"0",at:0}
	}
	
	position(id, at){
		return {left:0, top:0, height:0}
	}
	
    prevLine({id,at}){
        let {left,top}=this.position(id,at)
        return this.at(left,top-5)
    }

    nextLine({id,at}){
        let {left,top,height}=this.position(id,at)
        return this.at(left,top+height+5)
    }
	
	asSelection({id,at}){
		return {
			props(type){
				return null
			}
		}
	}
}