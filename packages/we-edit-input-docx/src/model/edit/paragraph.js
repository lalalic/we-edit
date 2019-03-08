import Editor from "./base"
import Numbering from "./numbering"

export default class extends Editor{
	got(nodeName){
		return super.got(nodeName, "w:p", "w:pPr")
	}

	align(type){
		this.got("w:jc").attr("w:val",type)
	}


	numFmt(x){
		const numPr=this.got("w:numPr")
		if(!x){
			numPr.remove()
		}else{
			if(!this.file.doc.officeDocument.numbering){
				this.file.doc.officeDocument.addNumberingPart()
			}

			const $=this.file.doc.officeDocument.numbering
			const type=typeof(x)=="string" && x.length==1 ? "Bullet" : "Numeric"

			if(numPr.children("w\\:ilvl,w\\:numId").length==0){
				const prevParagraphHasSameNumFmt=(prev)=>{
					const numPr=prev.find("w\\:numPr")
					if(numPr.length>0){
						const numId=numPr.children("w\\:numId").attr("w:val")
						const aNumId=$(`w\\:num[w\\:numId="${numId}"]>w\\:abstractNumId`).attr("w:val")
						const level=numPr.children("w\\:ilvl").attr("w:val")

						const nLevel=$(`w\\:abstractNum[w\\:abstractNumId="${aNumId}"]>w\\:lvl[w\\:ilvl="${level}"]`)
						const numFmt=nLevel.children("w\\:numFmt").attr("w:val")
						if(numFmt=="bullet" && type=="Bullet"){
							if(nLevel.children("w\\:lvlText").attr("w:val")==x){
								return {numId, level}
							}
						}else if(numFmt==x){
							return {numId, level}
						}
					}
				}

				const prev=prevParagraphHasSameNumFmt(this.node.prev())

				if(prev){
					numPr.append(`<w:ilvl w:val="${prev.level}"/>`)
					numPr.append(`<w:numId w:val="${prev.numId}"/>`)
				}else{
					const aNums=$("w\\:abstractNum")
					const aNumId=Math.max(-1,...(aNums.map((i,a)=>parseInt(a.attribs["w:abstractNumId"]))))+1
					const aNum=$(this.trim(Numbering[type](aNumId)))
					if(aNums.length>0){
						aNum.insertAfter(aNums.last())
					}else{
						aNum.appendTo($("w\\:numbering"))
					}

					const level=0
					const numId=Math.max(-1,...($("w\\:num").map((i,a)=>parseInt(a.attribs["w:numId"]))))+1
					const num=$(this.trim(Numbering.Template(numId, aNumId))).appendTo($("w\\:numbering"))

					numPr.append(`<w:ilvl w:val="${level}"/>`)
					numPr.append(`<w:numId w:val="${numId}"/>`)

					if(type=="Bullet"){
						$(`w\\:abstractNum[w\\:abstractNumId="${aNumId}"]>w\\:lvl[w\\:ilvl="${level}"]>w\\:lvlText`).attr("w:val",x)
					}else{
						$(`w\\:abstractNum[w\\:abstractNumId="${aNumId}"]>w\\:lvl[w\\:ilvl="${level}"]>w\\:numFmt`).attr("w:val",x)
					}
				}
			}else{
				const numId=numPr.children("w\\:numId").attr("w:val")
				const aNumId=$(`w\\:num[w\\:numId="${numId}"]>w\\:abstractNumId`).attr("w:val")
				const level=numPr.children("w\\:ilvl").attr("w:val")

				const nLevel=$(`w\\:abstractNum[w\\:abstractNumId="${aNumId}"]>w\\:lvl[w\\:ilvl="${level}"]`)
				const numFmt=nLevel.children("w\\:numFmt").attr("w:val")
				if(numFmt=="bullet" && type=="Bullet"){
					nLevel.children("w\\:lvlText").attr("w:val",x)
				}else if(numFmt!="bullet" && type=="Numeric"){
					const numFmt=nLevel.children("w\\:numFmt").attr("w:val",x)
				}else{
					numPr.empty()
					this.numFmt(x)
				}
			}

			this.file.renderChanged($("w\\:numbering"))
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
