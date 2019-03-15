import Editor from "./base"
import Numbering from "./numbering"

export default class extends Editor{
	got(nodeName){
		return super.got(nodeName, "w:p", "w:pPr")
	}

	align(type){
		this.got("w:jc").attr("w:val",type)
	}

	onBackspace(){
		const pPr=this.node.children("w\\:pPr")
		let temp
		if((temp=pPr.find("w\\:numPr")).length>0){
			temp.remove()
		}else if((temp=pPr.find("w\\:ind")).length){
			temp.remove()
		}else if(this.file.doc.officeDocument
			.styles(`w\\:style[w\\:styleId="${(temp=pPr.find('w\\:pStyle')).attr("w:val")}"]`)
			.basest(":has(w\\:numPr,w\\:ind)")
			.length>0){
			temp.remove()
		}else if((temp=this.node.prev()).is("w\\:p")){
			const target=this.node
			this.node=temp
			this.node.append(target.children().not("w\\:pPr"))
		}
	}

	numbering(props){
		const numPr=this.got("w:numPr")
		if(!props){
			numPr.remove()
		}else{
			if(!this.file.doc.officeDocument.numbering){
				this.file.doc.officeDocument.addNumberingPart()
			}
			const $=this.file.doc.officeDocument.numbering

			const numIdLevel=numPr=>({
				numId:numPr.children("w\\:numId").attr("w:val"),
				level:parseInt(numPr.children("w\\:ilvl").attr("w:val")||0),
			})

			const getLevelNode=(numId,level,aNumId=$(`w\\:num[w\\:numId="${numId}"]>w\\:abstractNumId`).attr("w:val"))=>
				$(`w\\:abstractNum[w\\:abstractNumId="${aNumId}"]>w\\:lvl[w\\:ilvl="${level}"]`)

			const isList=numPr.children("w\\:numId").length>0
			if(!isList){
				const prevNumbering=this.node.prev(`w\\:p:has(w\\:numPr>w\\:numId)`)
				if(prevNumbering.length==1){
					const prev=numIdLevel(prevNumbering.children("w\\:pPr").children("w\\:numPr"))
					const canFollowPrev=(({type,text},{numId,level})=>{
						const nLevel=getLevelNode(numId,level)
						if(nLevel.is(`:has(w\\:numFmt[w\\:val="${type}"])`)){
							return text ? nLevel.is(`:has(w\\:lvlText[w\\:val="${text}"])`) : true
						}
						return false
					})(props,prev);

					if(canFollowPrev){
						numPr.append(`<w:ilvl w:val="${prev.level}"/>`)
						numPr.append(`<w:numId w:val="${prev.numId}"/>`)
						return
					}else{
						//createNumbering(props)
					}
				}else{
					//createNumbering(props)
				}
				{//createNumbering(props)
					const aNums=$("w\\:abstractNum")
					const aNumId=Math.max(-1,...(aNums.map((i,a)=>parseInt(a.attribs["w:abstractNumId"]))))+1
					const aNum=$(this.trim(Numbering[props.type=="bullet" ? "Bullet" : "Numeric"](aNumId)))
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
					this.file.renderChanged($(`w\\:num[w\\:numId="${numId}"]`))
				}
			}

			//applyChangeToAbstractNumberingLevel(props, aNumId, level)
			;(({type,text,start,indent,hanging,font,tabs},{numId,level},nLevel=getLevelNode(numId, level))=>{
				if(type!=undefined)
					nLevel.find("w\\:numFmt").attr("w:val",type)
				if(text!=undefined)
					nLevel.find("w\\:lvlText").attr("w:val",text)
				if(start!=undefined)
					nLevel.find("w\\:start").attr("w:val",start)
				if(indent!=undefined)
					nLevel.find("w\\:pPr>w\\:ind").attr("w:left",indent)
				if(hanging!=undefined)
					nLevel.find("w\\:pPr>w\\:ind").attr("w:hanging",hanging)
				if(font!=undefined)
					nLevel.find("w\\:rPr>w\\:rFonts").attr("w:ascii",font).attr("w:hAnsi",font)

				this.file.renderChanged($(`w\\:abstractNum[w\\:abstractNumId="${nLevel.closest("w\\:abstractNum").attr("w:abstractNumId")}"]`))
			})(props,numIdLevel(numPr))
		}
	}

	numDemote(){
		const numPr=this.got("w:numPr")
		const numId=numPr.children("w\\:numId").attr("w:val")
		const isFirstOfList=!this.node.prev().is(`w\\:p:has(w\\:numPr>w\\:numId[w\\:val="${numId}"])`)
		const $=this.file.doc.officeDocument.numbering
		const aNumId=$(`w\\:num[w\\:numId="${numId}"]>w\\:abstractNumId`).attr("w:val")
		const aNum=$(`w\\:abstractNum[w\\:abstractNumId="${aNumId}"]`)
		const levels=aNum.find(`w\\:lvl`)

		if(isFirstOfList){//change indent
			const len=levels.length
			new Array(levels.length-1).fill(0)
				.forEach((a,i)=>levels.eq(i).find("w\\:ind").replaceWith(levels.eq(i+1).find("w\\:ind").clone()))
			const last=levels.eq(len-1).find("w\\:ind")
			last.attr("w:left",String(parseInt(last.attr("w:left"))+2*parseInt(last.attr("w:hanging"))))
			this.file.renderChanged(aNum)
		}else{
			const nLevel=numPr.children("w\\:ilvl")
			const level=parseInt(nLevel.attr("w:val"))
			if(level<8){
				nLevel.attr("w:val",String(level+1))
			}

			if(levels.length-1<level+1){
				const type=levels.eq(0).find("w\\:numFmt").attr("w:val")
				$(this.trim(Numbering[type=="bullet" ? "Bullet" : "Numeric"](aNumId)))
					.find('w\\:lvl')
					.slice(level+1)
					.insertAfter(levels.last())
				aNum.find("w\\:multiLevelType").attr("w:val","hybridMultilevel")
				this.file.renderChanged(aNum)
			}
		}
	}

	numPromote(){
		const numPr=this.got("w:numPr")
		const numId=numPr.children("w\\:numId").attr("w:val")
		const isFirstOfList=!this.node.prev().is(`w\\:p:has(w\\:numPr>w\\:numId[w\\:val="${numId}"])`)
		if(isFirstOfList){//change indent
			const $=this.file.doc.officeDocument.numbering
			const aNumId=$(`w\\:num[w\\:numId="${numId}"]>w\\:abstractNumId`).attr("w:val")
			const aNum=$(`w\\:abstractNum[w\\:abstractNumId="${aNumId}"]`)
			const inds=aNum.find(`w\\:lvl w\\:ind`)
			const first=inds.eq(0)
			const firstHanging=parseInt(first.attr("w:hanging"))
			if(parseInt(first.attr("w:left"))!=firstHanging){
				inds.each((i,a)=>{
					a.attribs["w:left"]=String(parseInt(a.attribs["w:left"])-firstHanging)
				})
				first.attr("w:left",String(firstHanging))
			}
			this.file.renderChanged(aNum)
		}else{
			const nLevel=numPr.children("w\\:ilvl")
			const level=parseInt(nLevel.attr("w:val"))
			if(level>0){
				nLevel.attr("w:val",String(level-1))
			}
		}
	}

	tab({shiftKey}){
		if(this.node.is(":has(w\\:numPr)")){
			this[`num${shiftKey ? "Pro" :"De"}mote`]()
		}else{
			const heading=parseInt((/^Heading(\d)$/.exec(this.node.find(`w\\:pStyle`).attr("w:val"))||[])[1])||0
			if(heading){
				if(!shiftKey && heading<9){
					this.node.find(`w\\:pStyle`).attr("w:val",`Heading${heading+1}`)
				}else if(shiftKey && heading>1){
					this.node.find(`w\\:pStyle`).attr("w:val",`Heading${heading-1}`)
				}
			}else {
				const ind=this.got("w:ind")
				const left=parseInt(ind.attr("w:left"))||0
				ind.attr("w:left",String(shiftKey ? Math.max(0,left-360) : left+360))
			}
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
