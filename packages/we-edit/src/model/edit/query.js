export default class {
	static Range=(l1, l2)=>Object.create({start:l1, end:l2})
	static Location=(id,offset)=>Object.create({id, at:offset})
	static Position=({id, at, ...props})=>Object.create({id,at, ...props})
	
	constructor(content,composed, origin={x:0,y:0}){
		this.content=content
		this.composed=composed
		this.origin=origin
	}
	
	at(x,y){
		return new Location("0",0)
	}
	
	position(location){
		return new Position({left:0, top:0, height:0})
	}
	
    prevLine(position={id:"0",at:0}){
        let {left,top}=this.position(id,at)
        return this.at(left,top-5)
    }

    nextLine(position){
        let {left,top,height}=this.position(id,at)
        return this.at(left,top+height+5)
    }
	
	asSelection(position){
		return {
			props(type){
				return null
			}
		}
	}
}