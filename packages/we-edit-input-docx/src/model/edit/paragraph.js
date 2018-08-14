import Editor from "./base"

export default class extends Editor{
	got(nodeName){
		return super.got(nodeName, "w:p", "w:pPr")
	}
	
	align(type){
		this.got("w:jc").attr("w:val",type)
	}
	
	numFmt(x){
		let numPr=this.got("w:numPr")
		if(!x){
			numPr.remove()
		}else{
			
		}
	}	
	
	indent({left,right,firstLine}){
		let node=this.got("w:ind")
			
		if(left)
			node.attr("w:left",this.px2dxa(left))
		
		if(right)
			node.attr("w:right",this.px2dxa(right))
		
		if(firstLine){
			if(firstLine>0){
				node.attr("w:firstLine",this.px2dxa(Math.abs(firstLine)))
			}else if(firstLine<0){
				node.attr("w:hanging",this.px2dxa(Math.abs(firstLine)))
			}
		}
	}
}