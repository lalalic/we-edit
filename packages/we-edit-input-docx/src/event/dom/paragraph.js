import Editor from "./base"
import Numbering from "./numbering"
import {dom, clean} from "we-edit"
import {Text} from "./text"

const {UnitShape}=dom.Unknown
export default class Paragraph extends Editor{
	get isDirectNumbering(){
		return this.node.is(":has(w\\:numPr>w\\:numId)")
	}

	get isStyleNumbering(){
		const styleId=this.node.children("w\\:pPr").children("w\\:pStyle").attr('w:val')
		if(styleId){
			const numPr=this.file.doc.officeDocument.styles(`w\\:style[w\\:styleId=${styleId}]>w\\:pPr>w\\:numPr`)
			if(numPr.length){
				return true
			}
		}
	}

	get isOutline(){
		const styleId=this.node.children("w\\:pPr").children("w\\:pStyle").attr('w:val')
		if(styleId){
			const outline=this.file.doc.officeDocument.styles(`w\\:style[w\\:styleId=${styleId}]>w\\:pPr>w\\:outlineLvl`)
			if(outline.length){
				return true
			}
		}
	}

	get isNumbering(){
		return this.isDirectNumbering||this.isStyleNumbering
	}

	got(nodeName){
		return super.got(nodeName, "w:p", "w:pPr")
	}

	align(type){
		this.got("w:jc").attr("w:val",type)
	}

	numbering(props){
		const numPr=this.got("w:numPr")
		if(!props){
			if(this.isDirectNumbering){
				numPr.remove()
			}else if(this.isStyleNumbering){
				numPr.children("w\\:numId").attr("w:val","0")
			}
			return 
		}
		if(props.levels){
			props=props.levels[0]
		}

		if(!this.file.doc.officeDocument.numbering){
			this.file.doc.officeDocument.addNumberingPart()
		}
		
		this.makeStyleReady()

		const $=this.file.doc.officeDocument.numbering

		const numIdLevel=numPr=>({
			numId:numPr.children("w\\:numId").attr("w:val"),
			level:parseInt(numPr.children("w\\:ilvl").attr("w:val")||0),
		})

		const getLevelNode=(numId,level,aNumId=$(`w\\:num[w\\:numId="${numId}"]>w\\:abstractNumId`).attr("w:val"))=>
			$(`w\\:abstractNum[w\\:abstractNumId="${aNumId}"]>w\\:lvl[w\\:ilvl="${level}"]`)

		const getNumStyleLink=numId=>{
			const absId=$(`w\\:num[w\\:numId=${numId}]`).children("w\\:abstractNumId").attr('w:val')
			return $(`w\\:abstractNum[w\\:abstractNumId=${absId}]`).children("w\\:styleLink, w\\:numStyleLink").attr('w:val')
		}

		if(!this.isDirectNumbering){
			let adjacentNumbering=this.node.prev(`w\\:p:has(w\\:numPr>w\\:numId)`)
			if(adjacentNumbering.length==0)
				adjacentNumbering=this.node.next(`w\\:p:has(w\\:numPr>w\\:numId)`)
			if(adjacentNumbering.length==1){
				const adjacentNumPr=numIdLevel(adjacentNumbering.children("w\\:pPr").children("w\\:numPr"))
				const canFollowAdjacent=(({format:type,label:text,id},{numId,level})=>{
					const nLevel=getLevelNode(numId,level)
					if(nLevel.length==0){//numStyleLink
						return getNumStyleLink(numId)==getNumStyleLink(id)
					}
					if(nLevel.is(`:has(w\\:numFmt[w\\:val="${type}"])`)){
						return text ? nLevel.is(`:has(w\\:lvlText[w\\:val="${text}"])`) : true
					}
					return false
				})(props,adjacentNumPr);

				if(canFollowAdjacent){
					numPr.append(`<w:ilvl w:val="${adjacentNumPr.level}"/>`)
					numPr.append(`<w:numId w:val="${adjacentNumPr.numId}"/>`)
					return
				}
			}

			this._createNumbering($, props, numPr, getNumStyleLink)
		}

		if(!props.id){
			const {numId, level}=numIdLevel(numPr)
			this._applyChangeToAbstractNumberingLevel(getLevelNode(numId, level), props, $)
		}
	}

	_applyChangeToAbstractNumberingLevel(nLevel,{ format, label, start, indent: left, hanging, style: font }, $) {
		if (format != undefined)
			nLevel.find("w\\:numFmt").attr("w:val", format)
		if (label != undefined)
			nLevel.find("w\\:lvlText").attr("w:val", label)
		if (start != undefined)
			nLevel.find("w\\:start").attr("w:val", start)

		const indent = clean({ left, firstLine: -hanging }, {nullable:[undefined, NaN], emptyAsUndefined:true})
		if (indent) {
			const p = new this.constructor(this.reducer)
			p.node = nLevel
			p.got = (got => (A, context = null, pr) => got.call(p, A, context, pr))(p.got)
			p.apply({ indent })
		}

		if (font != undefined) {
			const text = new Text(this.reducer)
			text.node = nLevel
			text.got = (got => (A, context = null, pr) => got.call(text, A, context, pr))(text.got)
			text.apply(font)
		}

		this.file.renderChanged($(`w\\:abstractNum[w\\:abstractNumId="${nLevel.closest("w\\:abstractNum").attr("w:abstractNumId")}"]`))	
	}

	_createNumbering($, {id, format="bullet"}, numPr, getNumStyleLink) {
		const aNums = $("w\\:abstractNum")
		const aNumId = Math.max(-1, ...(aNums.map((i, a) => parseInt(a.attribs["w:abstractNumId"])).get())) + 1
		const level = 0
		const numId = Math.max(-1, ...($("w\\:num").map((i, a) => parseInt(a.attribs["w:numId"])).get())) + 1
		
		const styleName=getNumStyleLink(id)

		let aNum=null
		if(styleName){
			//add <num/> and <abstractNum><w:numStyleLink w:val=""/>
			aNum=$(this.trim(Numbering.Template_StyleLink(aNumId, styleName)))
		}else{
			aNum = $(this.trim(Numbering[format == "bullet" ? "Bullet" : "Numeric"](aNumId)))
		}
		if (aNums.length > 0) {
			aNum.insertAfter(aNums.last())
		} else {
			aNum.appendTo($("w\\:numbering"))
		}

		$(this.trim(Numbering.Template(numId, aNumId))).appendTo($("w\\:numbering"))

		numPr.append(`<w:ilvl w:val="${level}"/>`)
		numPr.append(`<w:numId w:val="${numId}"/>`)

		this.file.renderChanged($(`w\\:abstractNum[w\\:abstractNumId=${aNumId}]`))
		this.file.renderChanged($(`w\\:num[w\\:numId="${numId}"]`))
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
		}else{//increase level
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
		}else{//decrease level
			const nLevel=numPr.children("w\\:ilvl")
			const level=parseInt(nLevel.attr("w:val"))
			if(level>0){
				nLevel.attr("w:val",String(level-1))
			}
		}
	}

	outlinePromote(next=l=>Math.max(parseInt(l)-1,0)){
		//find outline style's abstract numbering next level
		const prPstyle=this.node.children("w\\:pPr").children("w\\:pStyle")
		const style=this.file.doc.officeDocument.styles(`w\\:style[w\\:styleId=${prPstyle.attr('w:val')}]`)

		const level=style.find("w\\:ilvl").attr('w:val')||"0"
		const numId=style.find("w\\:numId").attr('w:val')
		const absNumId=this.file.doc.officeDocument.numbering(`w\\:num[w\\:numId=${numId}]`).children("w\\:abstractNumId").attr('w:val')
		const abstractNum=this.file.doc.officeDocument.numbering(`w\\:abstractNum[w\\:abstractNumId="${absNumId}"]`)
		const styleId=abstractNum.find(`w\\:lvl[w\\:ilvl="${next(level)}"]>w\\:pStyle`).attr("w:val")
		prPstyle.attr('w:val',styleId)
	}

	outlineDemote(){
		this.outlinePromote(l=>Math.min(parseInt(l)+1,8))
	}

	tab({shiftKey}){
		if(this.isOutline){
			return this[`outline${shiftKey ? "Pro" :"De"}mote`]()
		}else if(this.isDirectNumbering){
			return this[`num${shiftKey ? "Pro" :"De"}mote`]()
		}else if(this.isStyleNumbering){

		}
		const ind=this.got("w:ind")
		const left=parseInt(ind.attr("w:left"))||0
		ind.attr("w:left",String(shiftKey ? Math.max(0,left-360) : left+360))
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

	makeStyleReady(){
        const $=this.file.doc.officeDocument.styles
		if($('w\\:style[w\\:styleId="NoList"]').length==0){
            const styleNode=$(this.trim(STYLE_NoList)).insertAfter($(`w\\:style[w\\:default="1"]`).last())
            this.file.renderChanged(styleNode)
        }
	}
	
	tabs(tabs=[]){
		if(tabs.length==0){
			this.got('w:tabs').remove()
		}else{
			this.got('w:tabs').empty()
				.append(tabs.map((tab)=>{
					const {align:val,pos,leader}=tab
					if(!val)
						delete tab.val
					if(!leader)
						delete tab.leader
					return `<w:tab ${val && `w:val="${val}"`||''} ${leader&&`w:leader="${leader}"`||''} w:pos="${this.file.px2dxa(UnitShape.normalize(pos))}"/>`
				}))
		}
		this.reducer.$target.attr('tabs',tabs)
	}

	defaultTab(v){
		const $=this.file.doc.officeDocument.settings
		$('defaultTabStop').attr('w:val',this.file.px2dxa(v))
		this.reducer.$('#root').attr('defaultTab',v)
	}
	
	spacing({top,bottom}){
		top && this.got("w:spacing").attr('w:before', this.file.px2dxa(top));
		bottom && this.got("w:spacing").attr('w:after', this.file.px2dxa(bottom));
	}
}

const STYLE_NoList=`
	<w:style w:type="numbering" w:default="1" w:styleId="NoList">
        <w:name w:val="No List"/>
        <w:uiPriority w:val="99"/>
        <w:semiHidden/>
        <w:unhideWhenUsed/>
	</w:style>
`