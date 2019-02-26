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
			
		if(left!=undefined)
			node.attr("w:left",this.file.px2dxa(left)||null)
		
		if(right!=undefined)
			node.attr("w:right",this.file.px2dxa(right)||null)
		
		if(firstLine!=undefined){
			if(firstLine>0){
				node.attr("w:firstLine",this.file.px2dxa(Math.abs(firstLine))||null)
				node.attr("w:hanging",null)
			}else if(firstLine<0){
				node.attr("w:hanging",this.file.px2dxa(Math.abs(firstLine))||null)
				node.attr("w:firstLine",null)
			}
		}

	}
}