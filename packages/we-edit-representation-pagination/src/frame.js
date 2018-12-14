import React, {Component} from "react"
import PropTypes from "prop-types"
import {Rect} from "./tool/geometry"


import composable,{HasParentAndChild} from "./composable"
import {models, ReactQuery} from "we-edit"
const {Frame:Base}=models

import {Frame as ComposedFrame, Group} from "./composed"

const Super=HasParentAndChild(Base)

class Flowable extends Super{
	static IMMEDIATE_STOP=Number.MAX_SAFE_INTEGER
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			firstLine:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed.find(a=>a.props.y==undefined)
				}
			},
			lastLine:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed.findLast(a=>a.props.y==undefined)
				}
			},
			totalLines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed.reduce((count,a)=>count+(a.props.y==undefined?1:0),0)
				}
			},
			currentY:{
				enumerable:true,
				configurable:true,
				get(){
					const {props:{height},computed:{composed:children}}=this
					return children.reduce((y, a)=>y+(a.props.y==undefined ? a.props.height : 0),0)
				}
			},

		})
	}

	nextAvailableSpace(required={}){
		const {width:maxWidth}=this.props
		const {height:minHeight}=required
		const availableHeight=(()=>{
			if(this.props.height==undefined)
				return Number.MAX_SAFE_INTEGER

			const {props:{height},computed:{composed:children}}=this
			return children.reduce((h, a)=>h-(a.props.y==undefined ? a.props.height : 0),height)
		})();

		return {
			maxWidth,
			width:maxWidth,
			height:availableHeight,
			frame:this,
		}
	}

	appendComposed(content){
		this.computed.composed.push(content)
	}

	onAllChildrenComposed(){
		this.context.parent.appendComposed(this.createComposed2Parent())
		super.onAllChildrenComposed()
	}

	createComposed2Parent(lines=this.computed.composed) {
		let {width,height=this.currentY, x,y,z,named}=this.props
		return (
			<Group {...{width,height,x,y,z,named, className:"frame"}}>
				{lines.reduce((state,a,i)=>{
					if(a.props.y==undefined){
						state.positioned.push(React.cloneElement(a,{y:state.y,key:i}))
						state.y+=a.props.height
					}else{
						state.positioned.push(React.cloneElement(a,{key:i}))
					}
					return state
				},{y:0,positioned:[]}).positioned}
			</Group>
		)
    }

	belongsTo(a,id){
		return new ReactQuery(a).findFirst(`[data-content="${id}"]`).get(0)
	}

	composed(id){
		return !!this.computed.composed.find(a=>this.belongsTo(a,id))
	}

	paragraphY(id){
		const lines=this.computed.composed

		const lastLineNotBelongTo=((id)=>{
			for(let k=lines.length-1;k>=0;k--){
				let line=lines[k]
				if(line.props.y==undefined && !this.belongsTo(line,id)){
					return line
				}
			}
		})(id)

		if(!lastLineNotBelongTo){
			return 0
		}

		const lineEndY=line=>{
			return lines.slice(0,lines.indexOf(line)+1).reduce((Y,{props:{y,height}})=>Y+(y==undefined ? height : 0),0)
		}

		return lineEndY(lastLineNotBelongTo)
	}

	getFlowableComposerId(line,filter){
		return new ReactQuery(line)
			.findFirst(`[data-type="paragraph"],[data-type="table"]`)
			.filter(filter)
			.attr("data-content")
	}

	isEmpty(){
		return this.totalLines==0
	}

	reset4Recompose(){
		const lines=this.computed.composed
		this.computed.composed=[]
		return lines
	}

	recompose(){
		var currentParagraph=null
		var currentParagraphLines=[]
		const lines=this.reset4Recompose()
		for(let j=0;j<lines.length;j++){
			const linePID=this.getFlowableComposerId(lines[j],`[data-type="paragraph"]`)
			if(!linePID){//not paragraph, then append directly
				if(currentParagraph){
					this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
					currentParagraph=null
					currentParagraphLines=[]
				}
				this.appendComposed(lines[j])
			}else{
				if(!currentParagraph){
					currentParagraph=linePID
					currentParagraphLines.push(lines[j])
				}else{
					if(linePID!==currentParagraph){
						this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
						currentParagraph=linePID
						currentParagraphLines=[lines[j]]
						continue
					}else{
						currentParagraphLines.push(lines[j])
						continue
					}
				}
			}
		}
		this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
	}
	static Group=Group

	static Line=class extends Component{
		constructor({width,maxWidth,height,blocks=[],frame}){
			super(...arguments)
			this.maxWidth=maxWidth
			this.content=[]
			this.blocks=blocks
			this.frame=frame
			Object.defineProperties(this,{
				height:{
					enumerable:true,
					configurable:true,
					get(){
						return this.content.reduce((h,{props:{height}})=>Math.max(h,height),0)
					}
				},
				children:{
					enumerable:true,
					configurable:true,
					get(){
						return this.content
					}
				},
				availableHeight:{
					enumerable:false,
					configurable:false,
					get(){
						return height
					}
				},
				availableWidth:{
					enumerable:false,
					configurable:false,
					get(){
						return width-this.currentX
					}
				},
				currentX:{
					enumerable:false,
					configurable:false,
					get(){
						return this.content.reduce((x,{props:{width,x:x0}})=>x0!=undefined ? x0+width : x+width,0)
					}
				},
				width:{
					enumerable:true,
					configurable:false,
					get(){
						return width
					}
				},
				first:{
					enumerable:false,
					configurable:false,
					get(){
						const first=this.content.find(a=>a.props.x===undefined)
						if(first.props.atom)
							return first.props.atom
						return first
					}
				},
				paragraph:{
					enumerable:false,
					configurable:false,
					get(){
						return this.context.parent
					}
				}
			})
		}

		appendComposed(atom,at){
			const {width,minWidth=parseInt(width),anchor}=atom.props
			if(anchor){
				this.content.push(React.cloneElement(
					new ReactQuery(atom).findFirst('[data-type="anchor"]').get(0),
					{children:null,width:0,height:0, atom}
				))
				if(!this.frame.composed(anchor.props.id)){
					this.anchor=atom
					return false
				}
			}else{
				const containable=()=>minWidth==0 || this.availableWidth>=minWidth || this.availableWidth==this.maxWidth
				if(containable()){
					this.blocks=this.blocks.map((a,i)=>{
						if((this.currentX+minWidth)>a.x){
							this.content.push(<Group {...a} height={0}/>)
							this.blocks[i]=null
						}else{
							return a
						}
					}).filter(a=>!!a)

					if(containable()){
						let height=this.lineHeight()
						this.content.push(atom)
						let newHeight=this.lineHeight()
						if(height!=newHeight){
							const newBlocks=this.frame.exclusive(newHeight)
							if(this.shouldRecompose(newBlocks)){
								const flowCount=this.content.reduce((count,a)=>a.props.x==undefined ? count+1 : count,0)
								at=at-flowCount
								this.content=[]
								return at
							}
						}
						return
					}else{
						return false
					}
				}else{

					return false
				}
			}
		}

		lineHeight(){
			return this.paragraph.lineHeight(this.height)
		}

		shouldRecompose(newBlocks){
			const applied=this.content.filter(a=>a.props.x!==undefined)
			const notShould=applied.reduce((notShould,{props:{x,width}},i)=>{
				if(notShould){
					let a=newBlocks[i]
					return!!a && parseInt(Math.abs(a.x-x))==0 && a.width==width
				}
				return false
			}, true)
			if(notShould){
				let notApplied=newBlocks.slice(applied.length)
				if(notApplied.slice(0,1).reduce((should,a)=>a.x<this.currentX,false)){
					this.blocks=newBlocks
					return true
				}else{
					this.blocks=notApplied
				}
				return false
			}else{
				this.blocks=newBlocks
				return true
			}
		}

		commit(){
			this.blocks.forEach(a=>this.content.push(<Group {...a} height={0}/>))
			this.blocks=[]
			return this
		}
	}
}

class Anchorable extends Flowable{
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			blocks:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed.filter(({props:{wrap}})=>!!wrap)
				}
			}
		})
	}

	nextAvailableSpace(required={}){
		const space=super.nextAvailableSpace(...arguments)
		const {height:minHeight}=required
		space.blocks=this.exclusive(minHeight)
		return space
	}

	reset4Recompose(){
		const {anchros,lines}=this.computed.composed
			.reduce((categorized,a)=>{
				const {anchors,lines}=categorized
				const {props:{x,y}}=a
				if(x!==undefined || y!==undefined){
					anchors.push(a)
				}else{
					lines.push(a)
				}
				return categorized
			},{anchors:[], lines:[]})

		this.computed.composed=[...anchors]
		return lines
	}

	isIntersect(A,B){
		return new Rect(A.x, A.y, A.width, A.height).intersects(new Rect(B.x, B.y, B.width, B.height))
	}

	isDirtyIn(rect){
		if(this.blocks.find(({props:{x,y,width,height}})=>this.isIntersect(rect,{x,y,width,height}))){
			return true
		}
		if(this.isIntersect(rect,{x:0,y:0,width:this.props.width,height:this.currentY})){
			return 1
		}
		return false
	}

	exclusive(height,current){
		current=current||(({x=0,y=0,width})=>({x1:x,x2:x+width,y2:y+this.currentY}))(this.props);
		const x0=current.x1
		const lines=[current]
		if(height)
			lines.push({...current, y2:current.y2+height})

		return this.blocks.reduce((collected,{props:{wrap}})=>{
			lines.forEach(line=>collected.push(wrap(line)))
			return collected
		},[])
		.filter(a=>!!a)
		.sort((a,b)=>a.x-b.x)
		.reduce((all,{x,width},key)=>{
			all.push({key,pos:"start",x})
			all.push({key,pos:"end",x:x+width})
			return all
		},[])
		.sort((a,b)=>a.x-b.x)
		.reduce((state,a,i)=>{
			state[`${a.pos}s`].push(a)
			if(a.pos=="end"){
				if(state.ends.reduce((inclusive,end)=>inclusive && !!state.starts.find(start=>start.key==end.key),true)){
					let x0=state.starts[0].x
					let x1=a.x
					state.merged.push({x:x0, width:x1-x0})
					state.starts=[]
					state.ends=[]
				}
			}
			return state
		},{merged:[],starts:[], ends:[]})
		.merged
		.map(a=>(a.x-=x0,a))
		.map(({x,width})=>({x:Math.floor(x), width:Math.floor(width)}))
	}

	static Line=class extends Flowable.Line{

	}
}

export default Anchorable
