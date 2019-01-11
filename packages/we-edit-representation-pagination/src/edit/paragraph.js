import React,{Children} from "react"
import PropTypes from "prop-types"
import {Cacheable} from "../composable"

import {ReactQuery, models} from "we-edit"

import Base from "../paragraph"
import Text from "./text"
import editable from "./editable"

import {Text as ComposedText} from "../composed"

const Paragraph=Cacheable(class extends editable(Base,{stoppable:true}){
	clearComposed(){
		this.computed.lastText=""
		this.computed.atoms=[]
		super.clearComposed(...arguments)
	}

	rollbackLines(n){
		super.rollbackLines(n)
		if(this.computed.lastComposed){
			this.computed.lastComposed.splice(-n)
		}
	}

	appendLastComposed(){
		const lines=this.computed.composed
		this.computed.composed=[]
		const spaceChangedAt=this.computed.lastComposed.findIndex((a,i)=>{
			let line=lines[i]
			let space=this.context.parent.nextAvailableSpace({height:line.lineHeight()})
			if(line.hasEqualSpace(space)){
				this.computed.composed.push(line)
				this.context.parent.appendComposed(a)
				return false
			}else{
				this.computed.lastComposed.splice(i)
				return true
			}
		})

		switch(spaceChangedAt){
			case 0:
				return false//fully recompose
			case -1:
				return
			default:
				this.commit(this.computed.atoms.indexOf(lines[spaceChangedAt].first))
		}
	}

	getDefaultMeasure(){
		return new this.context.Measure(this.props.defaultStyle)
	}

	nextParagraphCursorable(){
		const nextParagraphId=this.query().forwardFirst('paragraph').attr("id")
		if(nextParagraphId){
			const composer=this.context.getComposer(nextParagraphId)
			if(composer){
				return composer.nextCursorable()
			}else{
				return {id:nextParagraphId,at:0}
			}
		}
	}

	nextCursorable(id,at){
		const {atoms}=this.computed
		const resolve2FirstAtom=(success,failure)=>{
			const firstAtom=new ReactQuery(atoms[0])
			const firstAtomText=firstAtom.findFirst('[data-type="text"]')
			if(firstAtomText.length){
				return success(firstAtomText.attr("data-content"))
			}

			return failure()
		}

		if(id==undefined){
			return resolve2FirstAtom(
				textId=>({id:textId,at:0}),
				()=>({id:this.props.id,at:0})
			)
		}else if(id==this.props.id){//itself first cursorable position
			if(at==0){
				return resolve2FirstAtom(
					textId=>this.context.getComposer(textId).nextCursorable(textId,0),
					()=>this.nextCursorable(id,1)
				)
			}else if(at==1){
				return this.nextParagraphCursorable()
			}
		}else{
			 const i=atoms.findLastIndex(a=>new ReactQuery(a).findFirst(`[data-content="${id}"]`).length>0)
			 const iAtom=new ReactQuery(atoms[i])
			 if(iAtom.findFirst('[data-type="text"]').length){//text
				 const nextAtom=new ReactQuery(atoms[i+1])
				 const nextAtomText=nextAtom.findFirst('[data-type="text"]')
				 if(nextAtomText.length==0){//not text
					 if(this.context.getComposer(id).text.length>at){//at end of text
						 return {id,at:at+1}
					 }else{
						 if(atoms.length>i+2){
							 let nextText
							 atoms.slice(i+2)
							 	.find(a=>(nextText=new ReactQuery(a).findFirst('[data-type="text"]')).length>0)
							if(nextText.length>0){
								return {id:nextText.attr("data-content"),at:0}
							}else{
								return {id:this.props.id,at:1}//paragraph end
							}
						}else{
							return this.nextParagraphCursorable()
						}
					 }
				 }else{
					 return {
						 id:nextAtomText.attr("data-content"),
						 at:0
					 }
				 }
			 }
		}
		return super.nextCursorable(...arguments)
	}

	prevParagraphCursorable(){
		const prevParagraphId=this.query().backwardFirst('paragraph').attr("id")
		if(prevParagraphId){
			const composer=this.context.getComposer(prevParagraphId)
			if(composer){
				return composer.prevCursorable()
			}else{
				return {id:prevParagraphId,at:1}
			}
		}
	}

	prevCursorable(id,at){
		const {atoms}=this.computed
		const resolve2LastAtom=(success, failure=()=>({id:this.props.id,at:0}))=>{
			const lastAtom=new ReactQuery(atoms[atoms.length-2])
			const lastAtomText=lastAtom.findFirst('[data-type="text"]')
			if(lastAtomText.length){
				return success(lastAtomText)
			}

			return failure()
		}

		if(id==undefined){
			return resolve2LastAtom(
				text=>({id:text.attr("data-content"), at:text.attr("data-endat")}),
				()=>({id:this.props.id,at:1})
			)
		}else if(id==this.props.id){//itself first cursorable position
			if(at==0){
				return this.prevParagraphCursorable()
			}else if(at==1){
				return resolve2LastAtom(
					text=>({id:text.attr("data-content"), at:text.attr("data-endat").length-1}),
					()=>this.prevCursorable(id,0)
				)
			}
		}else{
			 const i=atoms.findIndex(a=>new ReactQuery(a).findFirst(`[data-content="${id}"]`).length>0)
			 const iAtom=new ReactQuery(atoms[i])
			 if(iAtom.findFirst('[data-type="text"]').length){//text
				 if(i>0){
					 const prevAtom=new ReactQuery(atoms[i-1])
					 const prevAtomText=prevAtom.findFirst('[data-type="text"]')
					 if(prevAtomText.length>0){//text
						 return {id:prevAtomText.attr("data-content"),at:prevAtomText.length-1}
					 }else{//not text
						 let prevText
						 atoms.slice(0,i)
							.findLast(a=>(prevText=new ReactQuery(a).findFirst('[data-type="text"]')).length>0)
						if(prevText.length>0){
							let prevTextId=prevText.attr("data-content")
							let len=this.query(`#${prevTextId}`).text().length
							if(len>0){
								return {id:prevTextId,at:len}
							}else{
								return this.context.composer(prevTextId).prevCursorable(prevTextId,0)
							}
						}else{
							return this.nextCursorable()
						}
					}

				}else if(i==0){
					return this.prevParagraphCursorable()
				}
			}
		}
		return super.prevCursorable(...arguments)
	}

	nextSelectable(at,locator){
		const {node}=locator.getClientRect(this.props.id)
		const hasText=node.querySelector(`[data-type="text"]`)
		if(!hasText){
			if(at===undefined)
				return 1
		}else if(at==-1){
			return 1
		}
		return super.nextSelectable(...arguments)
	}

	prevSelectable(at, locator){
		const {node}=locator.getClientRect(this.props.id)
		const hasText=node.querySelector(`[data-type="text"]`)
		if(!hasText){
			if(at===undefined)
				return 1
			else if(at===1){
				return 0
			}
		}else if(at===-1){
			return 0
		}
		return super.prevSelectable(...arguments)
	}

	lineIndexOf(id,at){
		if(id==this.props.id){
			return at==0 ? 0 : this.computed.composed.length-1
		}
		return this.computed.composed.findIndex(line=>line.children.find((atom,i)=>{
				let node=new ReactQuery(atom).findFirst(`[data-content="${id}"]`)
				if(node.length>0){
					let endat=node.attr("data-endat")
					if(endat==undefined){
						return true
					}else if(endat>at){
						return true
					}else if(endat==at){
						if(line.children.length-1==i){//last
							if(this.context.getComposer(node.attr('data-content')).text.length==endat){
								return true
							}
						}else{
							return true
						}
					}
				}
			})
		)
	}

	xyInLine(id,at,i=this.lineIndexOf(id,at)){
		const {first,parents}=new ReactQuery(this.computed.lastComposed[i])
			.findFirstAndParents(a=>a.type.displayName=="story"||undefined)
		const {type:Story, props}=first.get(0)
		const story=new Story(props)
		if(id==this.props.id){
			const {fontSize, fontFamily,height,descent}=this.getDefaultMeasure().defaultStyle
			const renderedStory=story.render()
			const xy={x:0,y:renderedStory.props.y-(height-descent),fontSize, fontFamily,height,descent}

			if(at==1){
				xy.x=new ReactQuery(renderedStory)
					.findFirstAndParents(a=>a.props.className=="ender"||undefined)
					.parents.reduce((X,{props:{x=0}})=>X+x,xy.x)
			}
			return xy
		}else{
			const xy=story.position(id,at,id=>this.context.getComposer(id))
			return parents.reduce((xy,{props:{x=0,y=0}})=>(xy.x+x,xy.y+y,xy),xy)
		}
	}

	getPageLine(lineIndexOfParagraph,test,right=false){
		if(!test){
			test=({props:{"data-content":id,"data-type":type,pagination={}}})=>{
				if(id==this.props.id && pagination.i==lineIndexOfParagraph+1){
					return true
				}
				if(type=="paragraph"){
					return false
				}
			}
		}
		var parents,line
		const page=this.getPages()[`find${right ? "Last" : ""}`](page=>{
			let found=new ReactQuery(page.render())[`find${right ? "Last" :"First"}AndParents`]((a,b)=>test(a,b,page))
			if((line=found.first||found.last).length){
				parents=found.parents
				return true
			}
		})
		return {page,line,parents}
	}

	position(id,at){
		if(id==this.props.id){
			({id,at}=this[`${at==0 ? "next" :"prev"}Cursorable`]());
		}
		const lineIndexOfParagraph=this.lineIndexOf(id,at)
		if(lineIndexOfParagraph>=0){
			const {page, line, parents}=this.getPageLine(lineIndexOfParagraph)
			if(page){
				const xyInLine=this.xyInLine(id,at,lineIndexOfParagraph)
				return {
					page:page.props.I,
					...[...parents,line.get(0)].reduce((xy,{props:{x=0,y=0}})=>{
						xy.x+=x
						xy.y+=y
						return xy
					},xyInLine)
				}
			}
		}
	}

	nextLine(id,at){
		const lineIndexOfParagraph=this.lineIndexOf(id,at)
		const {x,y}=this.xyInLine(id,at,lineIndexOfParagraph)

		let selfPage, selfLine, selfParents, selfY=0,selfX=0, isSelfInTable=false
		const {page, line, parents}=this.getPageLine(lineIndexOfParagraph,(node,parents,page)=>{
			const {props:{"data-content":id,"data-type":type,pagination={}}}=node
			if(id==this.props.id && pagination.i==lineIndexOfParagraph+1){
				selfLine=node
				selfParents=[...parents]
				selfPage=page
				isSelfInTable=selfParents.findLast(a=>a.props["data-type"]=="cell")
				selfY=selfParents.reduce((Y,{props:{y=0}})=>Y+y,y)
				selfX=[...selfParents,selfLine].reduce((X,{props:{x=0}})=>X+x,x)
				return false
			}
			if(type=="paragraph"){
				if(selfLine){
					if(selfPage.props.I==page.props.I &&
						selfY>[...parents,node].reduce((Y,{props:{y=0}})=>Y+y,0)){//make sure under current line
						return false
					}

					if(isSelfInTable && selfLine.props.pagination.last && pagination.i==1){
						return this.isSameColumnTableLine(node,parents,selfLine,selfParents)
					}

					let isInTable=parents.findLast(a=>a.props["data-type"]=="cell")
					if(isInTable && selfLine.props.pagination.last && pagination.i==1){

						if(selfX<=[...parents,node].reduce((X,{props:{x=0}})=>X+x,node.props.width||0)){
							return true
						}

						return this.isLastCell(parents)
					}

					return true
				}
				return false
			}
		})

		if(line.length){
			const x1=[...selfParents,selfLine].reduce((X,{props:{x=0}})=>X+x,x)
			const x2=[...parents,line.get(0)].reduce((X,{props:{x=0}})=>X+x,0)
			const composer=this.context.getComposer(line.attr("data-content"))
			return composer.caretPositionFromPoint(line.attr("pagination").i-1,x1-x2)
		}
	}

	prevLine(id,at){
		const lineIndexOfParagraph=this.lineIndexOf(id,at)
		const {x,y}=this.xyInLine(id,at,lineIndexOfParagraph)
		let selfPage, selfLine, selfParents,selfX,selfY, isSelfInTable=false
		const {page, line, parents}=this.getPageLine(lineIndexOfParagraph,(node,parents,page)=>{
			const {props:{"data-content":id,"data-type":type,pagination={}}}=node
			if(id==this.props.id && pagination.i==lineIndexOfParagraph+1){
				selfLine=node
				selfParents=[...parents]
				selfPage=page
				isSelfInTable=selfParents.findLast(a=>a.props["data-type"]=="cell")
				selfY=selfParents.reduce((Y,{props:{y=0}})=>Y+y,y)
				selfX=[...selfParents,selfLine].reduce((X,{props:{x=0}})=>X+x,x)
				return false
			}
			if(type=="paragraph"){
				if(selfLine){
					if(selfPage.props.I==page.props.I &&
						selfY<[...parents,node].reduce((Y,{props:{y=0}})=>Y+y,0)){//make sure above current line
						return false
					}

					if(isSelfInTable && selfLine.props.pagination.i==1 && pagination.last){
						return this.isSameColumnTableLine(node,parents,selfLine,selfParents)
					}

					let isInTable=parents.findLast(a=>a.props["data-type"]=="cell")
					if(isInTable && selfLine.props.pagination.i==1 && pagination.last){
						if(selfX<=[...parents,node].reduce((X,{props:{x=0}})=>X+x,node.props.width||0)){
							return true
						}
						return this.isLastCell(parents)
					}
					return true
				}
				return false
			}
		},true)

		if(line.length){
			const x1=[...selfParents,selfLine].reduce((X,{props:{x=0}})=>X+x,x)
			const x2=[...parents,line.get(0)].reduce((X,{props:{x=0}})=>X+x,0)
			const composer=this.context.getComposer(line.attr("data-content"))
			return composer.caretPositionFromPoint(line.attr("pagination").i-1,x1-x2)
		}
	}

	isLastCell(parents){
		let cell=parents.findLast(a=>a.props["data-type"]=="cell")
		let row=parents.findLast(a=>a.props["data-type"]=="row")
		let last=new ReactQuery(row).find(`[data-type="cell"]`).toArray().pop()
		return last.props["data-content"]==cell.props["data-content"]
	}

	isSameColumnTableLine(node,parents,selfLine,selfParents){
		const same=(type,i=selfParents.findLastIndex(a=>a.props["data-type"]==type))=>selfParents[i]==parents[i]
		if(same("cell")){
			return true
		}else if(same("row")){
			return false
		}else{//same row
			let cell=parents.findLast(a=>a.props["data-type"]=="cell")
			if(cell){//still in table
				//same column
				let selfCell=selfParents.findLast(a=>a.props["data-type"]=="cell")
				let selfRow=selfParents.findLast(a=>a.props["data-type"]=="row")
				let row=parents.findLast(a=>a.props["data-type"]=="row")
				const cellIndex=(row,cell)=>{
					const cells=new ReactQuery(row).find(`[data-type="cell"]`).toArray()
					return cells.findIndex(a=>a.props["data-content"]==cell.props["data-content"])
				}
				return cellIndex(row,cell)==cellIndex(selfRow,selfCell)
			}else{
				return true
			}
		}
	}

	caretPositionFromPoint(lineIndex,x){
		const composedLine=this.computed.lastComposed[lineIndex]
		const position=(({x:x0=0,children:{type:Story,props}})=>{
			return new Story(props)
				.caretPositionFromPoint(x-x0,id=>this.context.getComposer(id))
		})(composedLine.props.children.props);
		return position||this.nextCursorable()
	}

	getPages(){
		return super.getPages()
	}

	static End=class extends Base.End{
		createComposed2Parent(){
			return React.cloneElement(super.createComposed2Parent(...arguments),{children:[models.Paragraph.End]})
		}
	}
	static Story=class extends Base.Story{
		flat(content){
			const parents=[], atoms=[]
			new ReactQuery(content).find((el,parent)=>{
				if(parent){
					let i=parents.indexOf(parent)
					if(i!=-1)
						parents.splice(i)
					parents.push(parent)
				}
				if(el.props["data-content"]){
					atoms.push({el,parents:[...parents]})
					return false
				}
			})
			return atoms.map(({el:{props:{x=0}},parents},i)=>React.cloneElement(atoms[i].el,{x:parents.reduce((X,{props:{x=0}})=>X+x,0)+x}))
		}

		caretPositionFromPoint(x,getComposer){
			const node=this.flat(this.render()).findLast(a=>a.props.x<=x)
			if(node){
				const offset=x-node.props.x
				if(node.props.descent!=undefined){//text
					const textNode=new ReactQuery(node).findFirst(`[data-type="text"]`).get(0)
					const text=textNode.props.children
					const composer=getComposer(textNode.props["data-content"])
					const i=composer.measure.widthString(offset,text)
					return {id:textNode.props["data-content"], at:textNode.props["data-endat"]-text.length+i}
				}else{
					return {id:node.props.id}
				}
			}
		}

		position(id,at,getComposer){
			let endat
			const line=this.render()
			const {first:node,parents}=new ReactQuery(line).findFirstAndParents(a=>{
				if(a.props["data-content"]==id){
					endat=a.props["data-endat"]
					if(endat==undefined || endat>=at){
						return true
					}
				}
			})

			let x=parents.reduce((X,{props:{x=0}})=>X+x,0)
			let y=(({y=0},{height=0,descent=0})=>y-(height-descent))(line.props,node.get(0).props);
			const composer=getComposer(id)
			if(composer.getComposeType()=="text"){
				if(endat>=at){
					const text=node.attr("children")
					const len=at-(endat-text.length)
					const offset=composer.measure.stringWidth(text.substring(0,len))
					x+=offset
				}
			}

			return {x,y}
		}
	}
})

Paragraph.propTypes.defaultStyle=PropTypes.object.isRequired

export default Paragraph
