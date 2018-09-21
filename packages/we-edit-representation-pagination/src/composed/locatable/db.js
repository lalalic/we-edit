
export default class DB{
	constructor(){
		this.data=Object.create({})
	}
	
	add(id, rect){
		(this.data[id]||(this.data[id]=new Record())).add(rect)
		return this
	}
	
	remove(id, rect){
		if(this.data[id])
			this.data[id].delete(rect)
		return this
	}
	
	
	rects(id,at){
		let record=this.data[id]
		
	}
	
	position(id,at){
		
	}
	
	nextLine(id,at){
		
	}
	
	prevLine(id,at){
		
	}
	
	lineRects(start,end){
		
	}
}

const Record=Set