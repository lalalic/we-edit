import React,{Children} from "react"
import PropTypes from "prop-types"
import {Cacheable} from "../composable"

import {ReactQuery} from "we-edit"

import Base from "../paragraph"
import Text from "./text"
import ParagraphEnd from "./paragraph-end"
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

	children(){
		return [
			...Children.toArray(this.props.children),
			<ParagraphEnd {...this.props.defaultStyle}
				key="end"
				id={`${this.props.id}-end`}
				/>
		]
	}
		
	getPages(){
		var current=this
		while(current){
			if(current.context.parent && current.context.parent.getComposeType()=="document"){
				return current.computed.composed
			}
			current=current.context.parent
		}
	}
	
	

	nextCursorable(id, locator){
		this.query(`#${id}`)
			.parentsUntil(`#${this.props.id`)
			.toArray()
			.reverse()
			.filer()
		
		const {node}=locator.getClientRect(this.props.id)
		const hasText=node.querySelector(`[data-type="text"]`)
		if(!hasText){
			if(at===undefined)
				return 0
		}
		return super.nextCursorable(...arguments)
	}

	prevCursorable(at, locator){
		const {node}=locator.getClientRect(this.props.id)
		const hasText=node.querySelector(`[data-type="text"]`)
		if(!hasText){
			if(at===undefined)
				return 0
		}
		return super.nextCursorable(...arguments)
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

	distanceAt(){
		return 0
	}
	
	position(id,at){
		var atom
		const lineIndexOfParagraph=this.computed.composed.findIndex(line=>{
			return atom=line.children.find(atom=>{
				let node=new ReactQuery(atom).findFirst(`[data-content="${id}"]`)
				if(node.length>0){
					let endat=node.attr("data-endat")
					return endat==undefined || endat>=at
				}
			})
		})
		
		const composed=this.computed.lastComposed[lineIndexOfParagraph]
		const {x,y}=(({x:x0=0,y:y0=0,children:{type:Story, props}})=>{
			let {x,y}=new Story(props).position(id,at,id=>this.context.getComposer(id))
			x+=x0, y+=y0
			return {x,y}
		})(composed.props.children.props);
		
		var page,lineIndexInPage
		for(let pages=this.getPages(),first=-1,linesInNextPage=0,i=0;i<pages.length;i++){
			page=pages[i]
			let lines=page.lines
			if(first!=-1){
				if(lines[lineIndexInPage=linesInNextPage-1]){
					break
				}else{
					linesInNextPage-=lines.length
				}
			}else{
				first=lines.findIndex(a=>
					new ReactQuery(a)
						.findFirst(`[data-type="paragraph"]`)
						.attr("data-content")==this.props.id
				)
				if(lines[lineIndexInPage=first+lineIndexOfParagraph]){
					break
				}else{
					linesInNextPage=lines.length-1-first
				}
			}
		}
		const columnX=page.columns.reduce((state,a)=>{
			if(!state.column){
				if(a.children.length>=state.count){
					state.column=a
				}else{
					state.count-=a.children.length
				}
			}
			return state
		},{count:lineIndexInPage+1}).column.x
		
		const lineY=page.lineY(page.lines[lineIndexInPage-1])
		return {
			page,
			line:lineIndexInPage,
			x:x+columnX,
			y:y+lineY
		}
	}
	
	caretPositionFromPoint(lineIndex,x,y){
		const composedLine=this.computed.lastComposed[lineIndex]
		const position=(({x:x0=0,y:y0=0,children:{type:Story,props}})=>{
			return new Story(props)
				.caretPositionFromPoint(x-x0,y-y0,id=>this.context.getComposer(id))
		})(composedLine.props.children.props);
		return position
	}
	
	static Line=class extends Base.Line{
		
	}
	
	static Story=class extends Base.Story{
		caretPositionFromPoint(x,y,getComposer){
			const content=this.render()
			const node=content.props.children.findLast(a=>a.props.x<=x)
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
		
		position(id,at,getComposer){
			const line=this.render()
			let endat, parents=[]
			const node=new ReactQuery(line).findFirst((node,parent)=>{
				if(node.props["data-content"]==id){
					endat=node.props["data-endat"]
					if(endat==undefined || endat>=at){
						parents=parents.slice(-
							parents.findLastIndex(a=>{
								if(React.Children.toArray(a.props.children).includes(parent)){
									parent=a
								}else{
									return  true
								}
							})
						)
						return true	
					}
				}
				if(parent)
					parents.push(parent)
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
