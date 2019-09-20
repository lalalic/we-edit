import React, {PureComponent, Component, Fragment} from "react"
import PropTypes from "prop-types"
import {getSelection, ACTION} from "we-edit"

import Base from "../document"
import Responsible from "../../composed/responsible"

import editable from "./editable"

const Super=editable(Base,{continuable:true})
export default class Document extends Super{
	static propTypes={
		...Super.propTypes,
		pageGap: PropTypes.number,
		screenBuffer: PropTypes.number
	}

	static defaultProps={
		...Super.defaultProps,
		pageGap:12,
		screenBuffer: 1
	}
	static contextTypes={
		...Super.contextTypes,
		activeDocStore: PropTypes.any,
	}

	constructor({screenBuffer,viewport}){
		super(...arguments)
		this.state={mode:"content",viewport, ...this.state}
	}

	get bufferHeight(){
		return this.props.screenBuffer*this.state.viewport.height
	}

	render(){
		if(!this.state.viewport){//to find container width, height
			return <div ref="viewporter" />
		}

        return super.render()
    }

	renderComposed(){
		const {canvas,scale,pageGap,canvasId,content}=this.props
		const {viewport}=this.state
		const pages=this.computed.composed
		return (
				<Responsible
					viewport={viewport}
					dispatch={this.context.activeDocStore.dispatch}
					canvasId={canvasId}
					content={content}
					getComposer={this.getComposer}
					scale={scale}
					pgGap={pageGap}
					pages={pages}
					continueCompose={{
						isAllComposed: ()=>this.isAllChildrenComposed(),
						isSelectionComposed:selection=>this.isSelectionComposed(selection),
						compose4Selection:()=>this.setState({mode:"selection",y:0}),
						compose4Scroll: y=>this.setState({mode:"scroll",y}),
						composedY:()=>this.composedY()
					}}
					/>

		)
	}

	static getDerivedStateFromProps({content},state){
		if(content && !content.equals(state.content)){
			return {
				content,
				mode:"content",
				y:0
			}
		}
		return null
	}
	
	componentDidMount(){
		if(!this.state.viewport){
			this.initViewport(this.refs.viewporter)
		}

		super.componentDidMount()
	}

	componentDidUpdate(){
		this.dispatch(ACTION.Statistics({
			pages:this.computed.composed.length,
			allComposed:this.isAllChildrenComposed(),
			words: this.composedWords()
		}))
	}

	composedWords(){
		return Array.from(this.composers.values())
			.filter(a=>!!a)
			.reduce((words,a)=>words+=(a.computed.atoms ? a.computed.atoms.length : 0),0)
	}

	/**
	* 1. selection end
	* 2. viewport: viewporter.scrollTop+viewporter.height
	**/
	shouldContinueCompose(a){
		const aboveViewableBottom=()=>{
			const {y=0,viewport:{height,node:{scrollTop}},mode}=this.state
			const composedY=this.composedY() * this.props.scale
			return composedY<Math.max(scrollTop,y)+height+this.bufferHeight
		}

		const should=aboveViewableBottom() || !this.isSelectionComposed()

		if(!should  && a){
			this.notifyNotAllComposed(a)
		}
		return should
	}

	composedY(){
		const {computed:{composed:pages}, props:{pageGap}}=this
		return pages.reduce((w,page)=>w+page.composedHeight+pageGap,0)
	}

	isSelectionComposed(selection){
		const {end,start}=selection||getSelection(this.context.activeDocStore.getState())
		return !start.id ? true :
			this.composers.has(start.id) && this.getComposer(start.id).isAllChildrenComposed() &&
			this.composers.has(end.id) && this.getComposer(end.id).isAllChildrenComposed()
	}

	initViewport(viewporter){
		const container=(function getFrameParent(node){
			const {overflowY,width,height} = window.getComputedStyle(node);
			if(parseInt(width)>0 && parseInt(height)>0)
				return node
			const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
			if(isScrollable)
				return node

			if (!node) {
				return null;
			}

			return getFrameParent(node.closest('[style*="overflow"]')) || document.body;
		})(viewporter);

		const {height}=container.getBoundingClientRect()

		let a=viewporter, width
		while((width=a.getBoundingClientRect().width)==0){
			a=a.parentNode
		}
		this.setState({viewport:{width:parseInt(width),height:parseInt(height||1056),node:container}})
	}

	get viewport(){
		return this.state.viewport
	}

	getPages(){
		return this.computed.composed
	}

	//when it can be used???
	getRangeRects(p0,p1, pageXY){
		const getComposer=id=>this.getComposer && this.getComposer(id) || this.context.getComposer && this.context.getComposer(id)
		const pages=this.getPages()

		const composer0=getComposer(p0.id)
		p0=composer0.position(p0.id,p0.at)
		p1=getComposer(p1.id).position(p1.id,p1.at)//no context
		if(!p0 || !p1){
			return []
		}
		if(p0.id==p1.id && p0.page==p1.page && !composer0.splittable){
			const [start,end]=[p0,p1].sort((a,b)=>a.at-b.at);
			const {x,y}=pageXY(pages.find(a=>a.props.I==start.page))
			return [{left:x+start.x,top:y+start.y,right:x+end.x,bottom:y+end.y}]
		}

		p0.page=pages.find(a=>a.props.I==p0.page)
		p1.page=pages.find(a=>a.props.I==p1.page)

		//convert paragraph line index to page line index
		p0.line=p0.page.lineIndexOf(p0)
		p1.line=p1.page.lineIndexOf(p1)

		const rects=[]
		const lineRectsInPage=(page,start=0,end)=>{
			const {x,y}=pageXY(page)
			page.lines.slice(start,end).forEach((a,i)=>{
				const {left,top,width,height}=page.lineRect(start+i)
				rects.push({left:left+x,top:top+y,right:left+width+x,bottom:top+height+y})
			})
		}

		const [start,end]=(()=>{
            if(p0.page.props.I>p1.page.props.I){
                return [p1,p0]
            }else if(p0.page.props.I==p1.page.props.I){
                if(p0.line>p1.line){
                    return [p1,p0]
                }
            }
            return [p0,p1]
        })();

		if(start.page==end.page){
			lineRectsInPage(start.page, start.line, end.line+1)
		}else{
			lineRectsInPage(start.page, start.line)
			pages.slice(start.page.props.I+1, end.page.props.I).forEach(page=>lineRectsInPage(page))
			lineRectsInPage(end.page,0,end.line+1)
		}

		if(rects.length){
			Object.assign(rects[0],{left:pageXY(start.page).x+start.x})

			Object.assign(rects[rects.length-1], {right:pageXY(end.page).x+end.x})
		}
		return rects
	}

	nextLine(id,at){
		const lastParagraph=this.query(`#${id}`).findLast("paragraph").attr("id")
		if(lastParagraph){
			return this.getComposer(lastParagraph).nextLine(lastParagraph,1)
		}
	}

	prevLine(id,at){
		const lastParagraph=this.query(`#${id}`).findFirst("paragraph").attr("id")
		if(lastParagraph){
			return this.getComposer(lastParagraph).prevLine(lastParagraph,1)
		}
	}

	composeFrames(){
		return [this.props.id]
	}
}
