export default function makeTableStylable(docx,props){	
	["bottom","top","right","left"].forEach(function(key){
		const method=`${key}Border`
		
		const [cond,condBorder,type1, type2]=this[key]
		
		docx.officeDocument.content.prototype[method]=
		docx.officeDocument.styles.prototype[method]=function(conds=[]){
			let found=null
			if(this.prop("name")=="w:tblStylePr"){
				let type=this.attr("w:type")
				
				found=this.find(`>w\\:tcPr>w\\:tcBorders>w\\:${key}`).get(0)
				/*
				if(-1!=conds.indexOf(cond) && type.endsWith(type1) || type.endsWith(type2)){
					found=this.find(`>w\\:tcPr>w\\:tcBorders>w\\:${key}`).get(0)
				}else{
					found=this.find(`>w\\:tcPr>w\\:tcBorders>w\\:${condBorder}`).get(0)
				}*/
				return found
			}else{
				let notDirectStyle=this.prop("name")==="w:style"
				
				if(notDirectStyle)
					found=conds.reduce((found,a)=>{
						if(!found){
							let typed=this.find(`w\\:tblStylePr[w\\:type=${a}]`)
							if(typed.length)
								found=typed[method](conds)
						}
						return found
					},null)

				if(!found)
					found=this.find(`${notDirectStyle ? ">w\\:tcPr" : ""}>w\\:tcBorders>w\\:${key}`).get(0)

				let di=-1!=conds.indexOf(cond) ? key : condBorder

				if(!found)
					found=this.find(`${notDirectStyle ? ">w\\:tblPrEx" : ""}>w\\:tblBorders>w\\:${di}`).get(0)

				if(!found)
					found=this.find(`${notDirectStyle ? ">w\\:tblPr" : ""}>w\\:tblBorders>w\\:${di}`).get(0)

				if(!found){
					let parentStyle=this.getParentStyle()
					if(parentStyle)
						return parentStyle[method](conds)
				}else
					return props.toBorder(found)
			}
		}
	},{
		bottom:["lastRow","insideH","Col", "Vert"],
		top:["firstRow","insideH","Col","Vert"],
		right:["lastCol","insideV","Row","Horz"],
		left:["firstCol","insideV", "Row", "Horz"]
	})
	
	docx.officeDocument.content.prototype.cellBorder=
	docx.officeDocument.styles.prototype.cellBorder=function(conds=[]){
		return {
			left: this.leftBorder(conds)||{sz:0},
			right:this.rightBorder(conds)||{sz:0},
			top: this.topBorder(conds)||{sz:0},
			bottom: this.bottomBorder(conds)||{sz:0}
		}
	}
	
	;["bottom","top","right","left"].forEach(function(key){
		docx.officeDocument.content.prototype[`${key}Margin`]=
		docx.officeDocument.styles.prototype[`${key}Margin`]=function(conds=[]){
			let notDirectStyle=this.prop("name")==="w:style"
			let found=null
			
			if(notDirectStyle)
				found=conds.reduce((found,a)=>{
					if(!found)
						found=this.find(`>w\\:tblStylePr[w\\:type=${a}]>w\\:tcPr>w\\:tcMar>w\\:${key}`).get(0)
					return found
				},null)

			if(!found)
				found=this.find(`${notDirectStyle ? ">w\\:tcPr" : ""}>w\\:tcMar>w\\:${key}`).get(0)

			if(!found)
				found=this.find(`${notDirectStyle ? ">w\\:tblPr" : ""}>w\\:tblCellMar>w\\:${key}`).get(0)

			if(!found){
				let parentStyle=this.getParentStyle()
				if(parentStyle)
					return parentStyle[`${key}Margin`](conds)
			}else
				return docx.dxa2Px(found.attribs["w:w"])
		}
	})
	
	docx.officeDocument.content.prototype.cellMargin=
	docx.officeDocument.styles.prototype.cellMargin=function(conds=[]){
		return {
			left: this.leftMargin(conds)||0,
			right:this.rightMargin(conds)||0,
			top: this.topMargin(conds)||0,
			bottom: this.bottomMargin(conds)||0
		}
	}
	
	docx.officeDocument.content.prototype.cellKey=
	docx.officeDocument.styles.prototype.cellKey=function(path, conds=[]){
		 let found= conds.reduce((found,a)=>{
			if(!found)
				found=this.find(`>w\\:tblStylePr[w\\:type=${a}]`).find(path).get(0)
			return found
		},null)
		
		if(!found)
			found=this.children().not(`>w\\:tblStylePr`).find(path).get(0)
			
		if(!found){
			let parentStyle=this.getParentStyle()
			if(parentStyle)
				return parentStyle.cellKey(path, conds)
		}else
			return props.selectValue(found)
	}
}