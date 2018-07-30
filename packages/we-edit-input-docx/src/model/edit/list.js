import Base from "./paragraph"

export default class extends Base{
	numFmt(x){
		let numPr=this.got("w:numPr")
		if(!x){
			numPr.remove()
		}else{
			
		}
	}
	
	template(){
		
	}
}