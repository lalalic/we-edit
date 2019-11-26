import React, {Children,Component} from "react"
import PropTypes from "prop-types"

import {dom, ReactQuery} from "we-edit"

import {HasParentAndChild,} from "../../composable"
import breakOpportunities from "../../wordwrap/line-break"
import {Text as ComposedText,  Group} from "../../composed"
import Frame from "../frame"

import ParagraphEnd from "./ender"
import Line from "./line"
import Story from "./story"

const Super=HasParentAndChild(dom.Paragraph)
const isText=a=>new ReactQuery(a).findFirst(`[data-type="text"]`).length==1
const getText=a=>{
	const $=new ReactQuery(a).find(`[data-type="text"]`)
	let text=""
	for(let i=0,len=$.length;i<len;i++){
		text+=$.eq(i).attr("children")
	}
	return text
}
const shouldAtomMerge=(a,b)=>{
	if(!a || !b){
		return false
	}
	a=new ReactQuery(a).findLast(`[data-type="text"]`)
	b=new ReactQuery(b).findLast(`[data-type="text"]`)
	if(a.length==0 || b.length==0){
		return false
	}
	if([a,b].find(a=>a.attr("className"))){//special control
		return false
	}

	if(a.attr('data-content')!=b.attr('data-content')){
		return true
	}
	return false
}

export default class Paragraph extends Super{
    static Line=Line
    static Story=Story
    static End=ParagraphEnd

	static contextTypes={
		...Super.contextTypes,
		Measure: PropTypes.func,
	}
   constructor(){
		super(...arguments)
		this.computed.atoms=[]
	}

	get enderWidth(){
		return this.computed.atoms[this.computed.atoms.length-1].props.width
	}

	get currentLine(){
		const {composed}=this.computed
		if(composed.length==0){
			this.createLine()
		}
		return composed[composed.length-1]
	}

	children(){
        return [
			...Children.toArray(this.props.children),
            this.createEnder(),
		]
	}

    createEnder(){
        return <this.constructor.End {...this.props.defaultStyle}
            End={""}
            key={`${this.props.id}-end`}
            id={`${this.props.id}-end`}/>
    }

    /**
	 * to collect atomic inline items
	 * a text start may merge with last text to compute break opportunity
	 * `${lastText}${text}` should be good enough
	 * @param {*} content
	 */
    appendComposed(content){
		const last=this.computed.atoms[this.computed.atoms.length-1]
		if(shouldAtomMerge(last,content)){//possible merge with last if last is text
			if( isText(last)){
				const lastText=getText(last)
				const text=getText(content)
				const ops=breakOpportunities(`${lastText}${text}`)
				switch(ops.length){
				case 1:{//merge content into last atom
					const height=Math.max(last.props.height, content.props.height)
					const descent=Math.max(last.props.descent, content.props.descent)
					const width=last.props.width+content.props.width
					this.computed.atoms.pop()
					this.computed.atoms.push(
						<Group {...{width,height,descent}}>
							{last}
							{React.cloneElement(content,{x:last.props.width})}
						</Group>
					)
					return 
				}
				case 2:
					if(lastText===ops[0]){
						break
					}
				default:
					console.warn(`error: "${lastText}${text}" break opportunities: [${ops.join(",")}]`)
				}
			}
		}
		
		this.computed.atoms.push(content)
	}


    onAllChildrenComposed(){//need append last non-full-width line to parent
		this.commit()
		super.onAllChildrenComposed()
    }

	rollbackLines(n){
		this.computed.composed.splice(-n)
	}

	/**
	* line.appendComposed can rollback to a specified atom
	* parent.appendComposed can rollback lines
	**/
	commit(start=0, end=Number.MAX_SAFE_INTEGER){
        const {context:{parent}, computed:{atoms}}=this

		const rollbackToLineWithFirstAtomIndex=at=>{
			const {composed:lines,atoms}=this.computed
			const i=lines.findIndex(a=>atoms.indexOf(a.firstAtom)==at)
			this.rollbackLines(lines.length-i)
		}

		const appendComposedLine=bLastLine=>{
			this.currentLine.freeze()
			return parent.appendComposed(this.createComposed2Parent(this.currentLine,bLastLine))
		}

		const atomIndexOfLastNthLine=i=>{
			const lines=this.computed.composed
			const lastNthLine=lines[lines.length-i]
			return atoms.indexOf(lastNthLine.firstAtom)
		}

		const len=atoms.length
		const DEAD=5
		var nested=0

        this.createLine()

		const commitFrom=(start=0)=>{
			let last=0, times=0
			let next, rollbackLines
			for(let i=start;i<len;){
				if(i>end)
					return
				if(i==last){
					times++
					if(times>DEAD){
						throw Error(`it may be dead loop on ${i}th atoms`)
					}
				}else{
					last=i
					times=0
				}
				next=this.currentLine.appendAtom(atoms[i],i)
				if(typeof(next)=="number"){
					//discard current line, and next is requiredHeight
					this.rollbackLines(1)
					this.createLine({height:next})
					continue
				}else if(next!==false){
					i++
					continue
				}else{
					//current line is full, atoms[i] not assembled, commit to block layout
					rollbackLines=appendComposedLine(false)
					if(!Number.isInteger(rollbackLines)){
						//line committed
						this.createLine()
						continue
					}else{
						//fail committed, and rollback lines
						if(rollbackLines==Frame.IMMEDIATE_STOP)
							return Frame.IMMEDIATE_STOP

						next=atomIndexOfLastNthLine(rollbackLines)
                        if(Number.isInteger(next)){
        					rollbackToLineWithFirstAtomIndex(next)
        					this.createLine()
        					i=next
        					continue
        				}
					}
				}
			}

			if(++nested>DEAD){
				console.error(`it may be dead loop on since commit nested ${nested}, ignore and continue`)
				return
			}

			if(this.computed.composed.length==1 || !this.currentLine.isEmpty()){
				rollbackLines=appendComposedLine(true)
				if(Number.isInteger(rollbackLines)){
					if(rollbackLines==Frame.IMMEDIATE_STOP)
						return Frame.IMMEDIATE_STOP
					next=atomIndexOfLastNthLine(rollbackLines)
					rollbackToLineWithFirstAtomIndex(next)
					this.createLine()
					commitFrom(next)
				}
			}
		}

		return commitFrom(start)
	}

	/**
	 * re-commit lastLines
	 * default re-commit all already layouted lines
	 * @param {} lastLines 
	 */
	recommit(lastLines=this.computed.composed){
		const {atoms, composed}=this.computed
		lastLines=composed.slice(-lastLines.length)

		this.rollbackLines(lastLines.length)

		const start=atoms.findIndex(a=>a==lastLines[0].firstAtom)
		const end=atoms.slice(start+1).findIndex(a=>a==lastLines[lastLines.length-1].lastAtom)+start+1
		return this.commit(start, end)
	}

	/**
	 * Story can handle it, so it can be in Line as normal atom
	 * firstLine is usually minus for numbering
	 */
	getNumberingAtom(){
		const {numbering:{style, label}, indent:{firstLine=0},}=this.props
		const {defaultStyle}=new this.context.Measure(style)

		return <ComposedText
			{...defaultStyle}
			key="numbering"
			className="numbering"
			x={firstLine}
			width={-firstLine}
			children={label}
		/>
	}

	/**
	 * Block offset/top must be decided, so the following must be handled here
	 * top, firstLine, numbering 
	 * paragraph bottom doesn't affect current line's block offset, so don't handle it here
	 * *** every created line is appended IMMEDIATELY into composed, so the line index is from 1 in createComposed2Parent 
	 */
    createLine(required){
		const space=this.nextAvailableSpace(required)
		const {width,positioned=[],left=0,right=width}=space
		const {
			indent:{left:indentLeft=0,right:indentRight=0,firstLine=0}, 
			numbering, 
			spacing:{lineHeight,top}
		}=this.props
		const bFirstLine=this.computed.composed.length==0

		if(bFirstLine&&numbering){
			positioned.push(this.getNumberingAtom())
		}
		
		const line=new this.constructor.Line(space.clone({
			...space, 
			positioned, 
			top:bFirstLine ? top : undefined, 
			left:left+indentLeft+(bFirstLine&&!numbering&&firstLine||0), 
			right:right-indentRight,
			lineHeight
		}),{parent:this})

		this.computed.composed.push(line)
		return line
	}
	
	/**
	 * | spacing left | line box | spacing right|
	 * spacing bottom doesn't affect line block offset, so it's ok here
	 * Story: helps 
	 * 1. merge, for performance on view, simpler dom
	 * 2. set baseline
	 * 3. align
	 * 4. justify
	 * @param {*} line 
	 * @param {*} last 
	 */
	createComposed2Parent(line,bLastLine){
		const {height,width, children, anchor, topToBlockOffset}=line
		const {
			numbering,
			indent:{left=0,right=0, firstLine=0},
			spacing:{bottom=0},
			align,
			orphan,widow,keepWithNext,keepLines,
			}=this.props
		
		const bFirstLine=this.computed.composed.length==1
		return (
			<Group className="line"
				height={topToBlockOffset+height+(bLastLine&&bottom||0)} 
				width={left+width+right} 
				pagination={{
					orphan,widow,keepWithNext,keepLines, 
					i:this.computed.composed.length,
					last:bLastLine
				}} 
				anchor={anchor} 
				>
				<Group 
					x={left+(bFirstLine&&!numbering&&firstLine||0)} 
					y={topToBlockOffset} 
					width={width} 
					height={height}>
					{new this.constructor.Story({
						children,
						align:bLastLine && ["justify","both"].includes(align) ? undefined : align,
						width,
					}).render()}
                </Group>
            </Group>
        )
    }
}
