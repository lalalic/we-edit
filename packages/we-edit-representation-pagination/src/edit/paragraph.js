import React,{Children} from "react"
import PropTypes from "prop-types"
import {Cacheable} from "../composable"

import {ReactQuery} from "we-edit"

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

	nextCursorable(id,at){
		const {atoms}=this.computed
		if(id==undefined){//itself first cursorable position
			if(atoms.find(a=>id=new ReactQuery(a).findFirst(`[data-type="text"]`).attr("data-content"))){
				return {id,at:0}
			}else{
				//throw new Error("no text in paragraph")
			}
		}else{
			 const i=atoms.findLastIndex(a=>new ReactQuery(a).findFirst(`[data-content="${id}"]`).length>0)
			 let nextId
			 atoms.slice(i+1).find(a=>nextId=new ReactQuery(a).findFirst(`[data-type="text"]`).attr("data-content"))
			 if(nextId){
				 return {id:nextId, at:0}
			 }else{
				 //
			 }
		}
		return super.nextCursorable(...arguments)
	}

	prevCursorable(id,at){
		if(id==undefined){
			let textNode
			if(this.computed.atoms.findLast(a=>textNode=new ReactQuery(a).findFirst(`[data-type="text"]`).get(0))){
				return {id:textNode.props["data-content"],at:textNode.props["data-endat"]}
			}else{
				//throw new Error("no text in paragraph")
			}
		}else{
			const i=this.atoms.findIndex(a=>new ReactQuery(a).findFirst(`[data-content="${id}"]`).length>0)
			let nextTextNode
			this.atoms.slice(0,i).findLast(a=nextTextNode=new ReactQuery(a).findFirst(`[data-type="text"]`).get(0))
			if(nextTextNode){
				return {id:nextTextNode.props["data-content"], at:nextTextNode.props["data-endat"]}
			}else{
				//
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
		return this.computed.composed.findIndex(line=>line.children.find(atom=>{
				let node=new ReactQuery(atom).findFirst(`[data-content="${id}"]`)
				if(node.length>0){
					let endat=node.attr("data-endat")
					return endat==undefined || endat>=at
				}
			})
		)
	}

	xyInLine(id,at,i=this.lineIndexOf(id,at)){
		return (({x:x0=0,y:y0=0,children:{type:Story, props}})=>{
			let {x,y}=new Story(props).position(id,at,id=>this.context.getComposer(id))
			x+=x0, y+=y0
			return {x,y}
		})(this.computed.lastComposed[i].props.children.props)
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
		const pages=this.getPages()
		const page=pages[`find${right ? "Last" : ""}`](page=>{
			parents=[]
			line=new ReactQuery(page.render())[`find${right ? "Last" :"First"}`]((a,parent)=>{
					if(parent){
						let i=parents.indexOf(parent)
						if(i!=-1)
							parents.splice(i)
						parents.push(parent)
					}
					return test(a,parents)
				})
			if(line.length){
				return true
			}
		})
		return {page,line,parents}
	}

	position(id,at){
		const lineIndexOfParagraph=this.lineIndexOf(id,at)
		const xyInLine=this.xyInLine(id,at,lineIndexOfParagraph)

		const {page, line, parents}=this.getPageLine(lineIndexOfParagraph)
		if(page){
			return {
				page:page.props.I,
				...[...parents,line.get(0)].reduce((xy,{props:{x=0,y=0}})=>{
					xy.x+=x
					xy.y+=y
					return xy
				},xyInLine)
			}
		}

		return {}
	}

	nextLine(id,at){
		var lineIndexOfParagraph=this.lineIndexOf(id,at)
		const {x}=this.xyInLine(id,at,lineIndexOfParagraph)
		if(lineIndexOfParagraph<this.computed.composed.length-1){
			return this.caretPositionFromPoint(lineIndexOfParagraph+1,x)
		}else{
			let selfLine, selfParents
			const {page, line, parents}=this.getPageLine(lineIndexOfParagraph,(node,parents)=>{
				const {props:{"data-content":id,"data-type":type,pagination={}}}=node
				if(id==this.props.id && pagination.i==lineIndexOfParagraph+1){
					selfLine=node
					selfParents=[...parents]
					return false
				}
				if(type=="paragraph"){
					if(selfLine){
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
	}

	prevLine(id,at){
		var lineIndexOfParagraph=this.lineIndexOf(id,at)
		const {x}=this.xyInLine(id,at,lineIndexOfParagraph)
		if(lineIndexOfParagraph>0){
			return this.caretPositionFromPoint(lineIndexOfParagraph-1,x)
		}else{
			let selfLine, selfParents
			const {page, line, parents}=this.getPageLine(lineIndexOfParagraph,(node,parents)=>{
				const {props:{"data-content":id,"data-type":type,pagination={}}}=node
				if(id==this.props.id && pagination.i==lineIndexOfParagraph+1){
					selfLine=node
					selfParents=[...parents]
					return false
				}
				if(type=="paragraph"){
					if(selfLine){
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
	}

	caretPositionFromPoint(lineIndex,x){
		const composedLine=this.computed.lastComposed[lineIndex]
		const position=(({x:x0=0,children:{type:Story,props}})=>{
			return new Story(props)
				.caretPositionFromPoint(x-x0,id=>this.context.getComposer(id))
		})(composedLine.props.children.props);
		return position||{id:this.props.id,at:0}
	}

	getPages(){
		return super.getPages()
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
					return true
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
			const line=this.render()
			let endat, parents=[]
			const node=new ReactQuery(line).findFirst((node,parent)=>{
				if(parent){
					let i=parents.indexOf(parent)
					if(i!=-1)
						parents.splice(-i)
					parents.push(parent)
				}

				if(node.props["data-content"]==id){
					endat=node.props["data-endat"]
					if(endat==undefined || endat>=at){
						return true
					}
				}
			}).get(0)

			let x=parents.reduce((X,{props:{x=0}})=>X+x,0)
			let y=(({y=0},{height=0,descent=0})=>y-(height-descent))(line.props,node.props);
			const composer=getComposer(id)
			if(composer.getComposeType()=="text"){
				if(endat>at){
					const text=node.props.children
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
