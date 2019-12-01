import React,{Children} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {ReactQuery} from "we-edit"

import {Cacheable} from "../../composable"
import Base from "../paragraph"
import editable from "./editable"

const Editable=Cacheable(class __$1 extends editable(Base,{stoppable:true}){
	shouldComponentUpdate(){
		return super.shouldComponentUpdate(...arguments) && this.context.shouldContinueCompose(this)
	}

	getNumberingAtom(){
		const numbering=super.getNumberingAtom()
		if(this.context.numbering){
			return React.cloneElement(numbering,{children:this.context.numbering(this.props.id)})
		}
		return numbering
	}

	clearComposed(){
		this.computed.lastText=""
		this.computed.atoms=[]
		this.computed.hasFrame=false
		super.clearComposed(...arguments)
	}

	rollbackLines(n){
		super.rollbackLines(n)
		if(this.computed.lastComposed){
			this.computed.lastComposed.splice(-n)
		}
	}

	recalcNumbering(composedLine){
		const $=new ReactQuery(composedLine)
		const last=$.findFirst(".numbering").get(0)
		const current=this.getNumberingAtom()
		const {x,y}=last.props
		return $.replace(last,React.cloneElement(current,{x,y})).root
	}

	appendLastComposed(){
		const lines=this.computed.composed
		this.computed.composed=[]
		const spaceChangedAt=this.computed.lastComposed.findIndex((a,i)=>{
			let line=lines[i]
			let space=this.context.parent.nextAvailableSpace({height:line.height})
			if(line.hasEqualSpace(space)){
				this.computed.composed.push(line)
				if(i==0 && this.props.numbering){
					a=this.recalcNumbering(a)
				}
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
				this.commit(this.computed.atoms.indexOf(lines[spaceChangedAt].firstAtom))
		}
	}

	getDefaultMeasure=memoize((style=this.props.defaultStyle)=>{
		return new this.context.Measure(style)
	})
})
class Positionable extends Editable{
	getPages(scoped=true){
		const pages=super.getPages()
		if(!scoped)
			return pages
		return pages.reduce((state,page,i)=>{
			if(state.start!=-1 && state.end!=-1)
				return state
			let found=new ReactQuery(page.render()).findFirst(({props:{"data-content":id, "data-type":type}})=>{
				if(id==this.props.id){
					return true
				}
				if(this.isSameFrameStack(id,(a,b)=>a.length==b.length)){
					if(type=="paragraph"){
						return false
					}
				}
			})
			if(found.length){
				if(state.start==-1){
					state.start=i
				}
			}else{
				if(state.start!=-1){
					state.end=i
				}
			}
			return state
		},{start:-1,end:-1,
			extract(){
				return this.start==-1 ? [] : (pages.slice(this.start, this.end==-1 ? undefined : this.end))
			}
		}).extract()
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

	rectInLine(composedLine){
		const i=new ReactQuery(composedLine).findFirst(`[data-content="${this.props.id}"]`).attr('pagination').i-1
		const line=this.computed.composed[i]
		const {indent:{left=0,firstLine=0}, numbering}=this.props
		return {
			left:left+(i==0 ? (numbering ? 0 : firstLine) : 0),
			top:0,
			width: line.currentX,
			height:line.props.height
		}
	}

	xyInLine(id,at,i=this.lineIndexOf(id,at)){
		const {first,parents}=new ReactQuery(this.computed.lastComposed[i]).findFirstAndParents(".story")
		const story=first.get(0)
		const xy=(()=>{
			if(id==this.props.id){
				const {fontSize, fontFamily,height,descent}=this.getDefaultMeasure().defaultStyle
				const xy={x:0,y:story.props.baseline-(height-descent),fontSize, fontFamily,height,descent}

				if(at==0){
					const {first,parents}=new ReactQuery(story).findFirstAndParents("[data-content]")
					if(first.length==1){
						xy.x=[first.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)
					}else{
						const {first,parents}=new ReactQuery(story).findFirstAndParents(".ender")
						xy.x=[first.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)
					}
				}else if(at==1){
					const {first,parents}=new ReactQuery(story).findFirstAndParents(".ender")
					xy.x=[first.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)
				}

				return xy
			}else{
				return this.xyInStory(id,at,story)
			}
		})();

		return parents.reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x,xy.y+=y,xy),xy)
	}

	xyInStory(id,at,story){
		let endat
		const {first:node,parents}=new ReactQuery(story).findFirstAndParents(a=>{
			if(a.props["data-content"]==id){
				endat=a.props["data-endat"]
				if(endat==undefined || endat>=at){
					return true
				}
			}
		})

		let x=[node.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)
		let y=(({y=0,height=0,descent=0})=>y-(height-descent))(node.get(0).props);
		const composer=this.context.getComposer(id)
		if(composer.getComposeType()=="text"){
			if(endat>=at){
				const text=node.attr("children")
				const len=at-(endat-text.length)
				const offset=composer.measure.stringWidth(text.substring(0,len))
				x+=offset
			}
		}else if(at==1){
			return {x:x+node.attr('width')||0,y}
		}

		return {x,y}
	}

	isSameFrameStack(id, limit=(mine,current)=>true){
		if(!id){
			return true
		}
		const mine=this.composeFrames(true)
		const composer=this.context.getComposer(id)
		const current=composer.composeFrames(true)
		return current.reduce((can,a,i)=>can && a==mine[i],limit(mine,current))
	}

	getPageLineAndParents(lineIndexOfParagraph,test,right=false){
		if(!test){
			test=({props:{"data-content":id,"data-type":type,pagination={}}})=>{
				if(id==this.props.id && pagination.i==lineIndexOfParagraph+1){
					return true
				}
				if(this.isSameFrameStack(id, (a,b)=>a.length==b.length)){
					if(type=="paragraph"){
						return false//@TODO: performance improvement, don't support nested paragraph
					}
				}
			}
		}
		var parents,line
		const page=this.getPages(false)[`find${right ? "Last" : ""}`](page=>{/*@TODO:improvement performance by useing true*/
			const found=new ReactQuery(page.render())[`find${right ? "Last" :"First"}AndParents`]((a,b)=>{
				const {props:{"data-content":id,"data-type":type}}=a
				if(!this.isSameFrameStack(id)){
					return false
				}
				return test(a,b,page)
			})
			if((line=found.first||found.last).length){
				parents=found.parents
				return true
			}
		})
		return {page,line,parents}
	}

	getSiblingLine(id,at,test,backward=false){
		const lineIndexOfParagraph=this.lineIndexOf(id,at)
		const {x,y}=this.xyInLine(id,at,lineIndexOfParagraph)

		let self
		const {page, line, parents}=this.getPageLineAndParents(lineIndexOfParagraph,(node,parents,page)=>{
			const {props:{"data-content":id,"data-type":type,pagination={}}}=node
			if(id==this.props.id && pagination.i==lineIndexOfParagraph+1){
				self=new LinePosition(page,node,[...parents],{x,y})
				return false
			}

			if(this.isSameFrameStack(id,(a,b)=>a.length==b.length)){
				if(type=="paragraph"){
					if(self){
						const tested=test(self, page,node,parents)
						if(tested==undefined)
							return true
						return tested
					}
					return false
				}
			}

		},backward)

		if(line.length){
			const x1=self.x
			const x2=[...parents,line.get(0)].reduce((X,{props:{x=0}})=>X+x,0)
			const paragraph=this.context.getComposer(line.attr("data-content"))
			return paragraph.positionFromPoint(x1-x2,undefined, line.attr("pagination").i-1)
		}
	}

	flatStory(story){
		const parents=[], atoms=[]
		new ReactQuery(story).find((el,parent)=>{
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
		return atoms.map(({el:{props:{x=0}},parents},i)=>
			React.cloneElement(atoms[i].el,{x:parents.reduce((X,{props:{x=0}})=>X+x,0)+x})
		)
	}

	isSameColumnTableLine(node,parents,selfLine,selfParents){
		const same=(type,i=selfParents.findLastIndex(a=>a.props["data-type"]==type))=>selfParents[i]==parents[i]
		if(same("cell")){
			return true
		}else if(same("row")){
			return false
		}else{//next row
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
}
class Navigatable extends Positionable{
	extendAtom(id,at){
		const atom=this.computed.atoms.find(a=>{
			const $a=new ReactQuery(a)
			const found=$a.findFirst(({props:{"data-content":xid, "data-endat":end=0}})=>{
				return (xid==id && end>=at)||undefined
			})
			return found.length>0
		})
		if(atom){
			const target=new ReactQuery(atom)
			const first=target.findFirst(`[data-type="text"]`)
			if(first.length){
				const last=target.findLast(`[data-type="text"]`)
				if(last.length){
					return {
						start:{
							id:first.attr('data-content'),
							at:parseInt(first.attr('data-endat'))-first.attr("children").length
						},
						end:{
							id:last.attr('data-content'),
							at:parseInt(last.attr('data-endat'))
						}
					}
				}
			}
		}
		return {}
	}

	position(id,at){
		const lineIndexOfParagraph=this.lineIndexOf(id,at)
		if(lineIndexOfParagraph>=0){
			const {page, line, parents}=this.getPageLineAndParents(lineIndexOfParagraph)
			if(page){
				const xyInLine=this.xyInLine(id,at,lineIndexOfParagraph)
				return {
					page:page.props.I,
					paragraph:this.props.id,
					lineIndexOfParagraph,
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
		return this.getSiblingLine(id,at,(self,page,node,parents)=>{
			const {pagination={}}=node.props
			if(self.page.props.I==page.props.I &&
				self.y>=[...parents,node].reduce((Y,{props:{y=0}})=>Y+y,0)){//make sure under current line
				return false
			}

			if(self.isInTable && self.line.props.pagination.last /*&& pagination.i==1 cross page can't meet*/){
				return this.isSameColumnTableLine(node,parents,self.line,self.parents)
			}

			let isInTable=parents.findLast(a=>a.props["data-type"]=="cell")
			if(isInTable && self.line.props.pagination.last && pagination.i==1){
				let cell=isInTable
				let cellX=(i=>parents.slice(0,i+1).reduce((X,{props:{x=0}})=>X+x,cell.props.width))(parents.indexOf(cell))
				if(self.x<=cellX){
					return true
				}

				let row=parents.findLast(a=>a.props["data-type"]=="row")
				let lastCell=new ReactQuery(row).find(`[data-type="cell"]`).toArray().pop()
				return lastCell.props["data-content"]==cell.props["data-content"]
			}
		})
	}

	prevLine(id,at){
		return this.getSiblingLine(id,at,(self,page,node,parents)=>{
			const {pagination={}}=node.props
			if(self.page.props.I==page.props.I &&
				self.y<=[...parents,node].reduce((Y,{props:{y=0}})=>Y+y,0)){//make sure above current line
				return false
			}

			if(self.isInTable && self.line.props.pagination.i==1 && pagination.last){
				return this.isSameColumnTableLine(node,parents,self.line,self.parents)
			}

			let isInTable=parents.findLast(a=>a.props["data-type"]=="cell")
			if(isInTable && self.line.props.pagination.i==1 && pagination.last){
				let cell=isInTable
				let cellX=(i=>parents.slice(0,i+1).reduce((X,{props:{x=0}})=>X+x,0))(parents.indexOf(cell))

				if(self.x>=cellX){
					return true
				}

				let row=parents.findLast(a=>a.props["data-type"]=="row")
				let firstCell=new ReactQuery(row).findFirst(`[data-type="cell"]`).get(0)
				return firstCell.props["data-content"]==cell.props["data-content"]
			}
		},true)
	}

	positionFromPoint(x,y,lineIndex=this.computed.lastComposed.length-1){//not support y
		const composedLine=this.computed.lastComposed[lineIndex]
		const position=(({x:x0=0,children:story})=>
			(x=>{
				const node=this.flatStory(story).findLast(a=>a.props.x<=x)
				if(node){
					const offset=x-node.props.x
					const $node=new ReactQuery(node)
					const textNode=$node.findFirst(`[data-type="text"]`).get(0)
					if(textNode){//text
						const text=textNode.props.children
						const composer=this.context.getComposer(textNode.props["data-content"])
						const i=composer.measure.widthString(offset,text)
						return {id:textNode.props["data-content"], at:textNode.props["data-endat"]-text.length+i}
					}else{
						return {id:$node.findFirst(`[data-content]`).attr("data-content")}
					}
				}else{//empty line
					return {id:this.props.id,at:0}
				}
			})(x-x0)
		)(composedLine.props.children.props);
		return position
	}
}

class LinePosition{
	constructor(page,line,parents,{x,y}){
		Object.assign(this,{page,line,parents})
		this.isInTable=parents.findLast(a=>a.props["data-type"]=="cell")
		Object.assign(this,[...parents,line].reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x,xy.y+=y,xy),{x,y}))
	}
}

const Paragraph=Navigatable
Paragraph.propTypes.defaultStyle=PropTypes.object.isRequired
Paragraph.contextTypes.numbering=PropTypes.func
export default Paragraph
