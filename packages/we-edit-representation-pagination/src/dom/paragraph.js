import React from "react"
import PropTypes from "prop-types"

import {dom, ReactQuery} from "we-edit"
import memoize from "memoize-one"

import Frame from "./frame"
import {HasParentAndChild,Layout, editable} from "../composable"
import breakOpportunities from "../wordwrap/line-break"
import {Text as ComposedText,  Group} from "../composed"

const Tokenizers=[dom.Text.LineBreak, dom.Text.PageBreak,dom.Text.Tab]
class Paragraph extends HasParentAndChild(dom.Paragraph){
    static contextTypes={
		...super.contextTypes,
		Measure: PropTypes.func,
		numbering: PropTypes.func,
		editable: PropTypes.any,
	}
	static propTypes={
		...super.propTypes,
		defaultStyle:PropTypes.object.isRequired,	
	}

   constructor(){
		super(...arguments)
		this.computed.atoms=[]
		Object.defineProperties(this,{
			lines:{
				get(){
					return this.computed.composed
				},
				set(v){
					this.computed.composed=v
				}
			},
			atoms:{
				get(){
					return this.computed.atoms
				},
				set(v){
					return this.computed.atoms=v
				}
			}
		})
	}

	get enderWidth(){
		return this.atoms[this.atoms.length-1].props.width
	}

	get currentLine(){
		if(this.lines.length==0){
			this.lines.push(this.createLine())
		}
		return this.lines[this.lines.length-1]
	}

	getDefaultMeasure=memoize((style=this.props.defaultStyle)=>{
		return new this.context.Measure(style)
	})

    /**
	 * to collect atomic inline items
	 * a text start may merge with last text to compute break opportunity
	 * `${lastText}${text}` should be good enough
	 * @param {*} content
	 */
    appendComposed(content){
		if(Tokenizers.includes(content.props.tokenizeOpportunity)){
			this.atoms.push(content)
			return 
		}
		const last=this.atoms[this.atoms.length-1]
		if(last?.props.tokenizeOpportunity && 
			content.props.tokenizeOpportunity &&
			!Tokenizers.includes(last.props.tokenizeOpportunity)
			){
			const lastText=last.props.tokenizeOpportunity
			const text=content.props.tokenizeOpportunity
			const ops=breakOpportunities(`${lastText}${text}`)
			switch(ops.length){
			case 1:{//merge content into last atom
				const height=Math.max(last.props.height, content.props.height)
				const descent=Math.max(last.props.descent, content.props.descent)
				const width=last.props.width+content.props.width
				const {props:{"data-content":isRawAtom, children,tokenizeOpportunity}}=last
				this.atoms.splice(-1,1,
					<Group {...{width,height,descent,tokenizeOpportunity:`${tokenizeOpportunity}${content.props.tokenizeOpportunity}`}}>
						{isRawAtom ? 
						[React.cloneElement(last,{key:0}),React.cloneElement(content,{x:last.props.width,key:1})]
						: [...children,React.cloneElement(content,{x:last.props.width,key:children.length})]
						}
					</Group>
				)
				return 
			}
			case 2:
				if(lastText===ops[0]){//don't need merge
					break
				}
			default:
				console.warn(`error: "${lastText}${text}" break opportunities: [${ops.join(",")}]`)
			}
		}
		
		this.atoms.push(content)
	}


	onAllChildrenComposed(){//need append last non-full-width line to parent ???
		this.atoms.push(this._createEndAtom())
		this.commit()
		super.onAllChildrenComposed()
	}
	
	_createEndAtom(){
		const {props:{End="", id}}=this
		const measure=this.getDefaultMeasure()
		return (
			<ComposedText
					{...measure.defaultStyle}
					width={measure.stringWidth(End)}
					minWidth={0}
					children={End}
					className="ender"
					/>
		)
	}

	rollbackLines(n){
		this.lines.splice(-n)
	}

	/**
	* line.appendComposed can rollback to a specified atom
	* parent.appendComposed can rollback lines
	**/
	commit(start=0, end=Number.MAX_SAFE_INTEGER){
        const {context:{parent}, computed:{atoms}}=this

		const rollbackToLineWithFirstAtomIndex=at=>{
			const {lines,atoms}=this
			const i=lines.findIndex(a=>atoms.indexOf(a.atoms[0])==at)
			if(i==-1){
				throw new Error(`failed rollback to line with first Atom index=${at}`)
			}
			this.rollbackLines(lines.length-i)
		}

		const appendComposedLine=bLastLine=>{
			this.currentLine.freeze()
			return parent.appendComposed(this.createComposed2Parent(this.currentLine,bLastLine))
		}

		const atomIndexOfLastNthLine=i=>{
			const lines=this.lines
			const lastNthLine=lines[lines.length-i]
			return atoms.indexOf(lastNthLine.atoms[0])
		}

		const createAndAppendLine=(...args)=>{
			const line=this.createLine(...args)
			if(!line)
				return false
			this.lines.push(line)
			return line
		}

		const len=atoms.length
		const DEAD=5
		var nested=0

		if(!createAndAppendLine())
			return 

		const commitFrom=(start=0)=>{
			let last=0, times=0
			for(let i=start;i<len;){
				if(i>end){
					return
				}

				if(i==last){
					times++
					if(times>DEAD){
						throw Error(`it may be dead loop on ${i}th atoms`)
					}
				}else{
					last=i
					times=0
				}
				const next=this.currentLine.appendAtom(atoms[i])
				if(next===false || next===true){
					//current line is full, atoms[i] not assembled, commit to block layout
					const rollbackLines=appendComposedLine(false)
					if(!Number.isInteger(rollbackLines)){
						//line committed
						if(!createAndAppendLine())
							return 
					}else{
						//fail committed, and rollback lines
						if(rollbackLines==Layout.IMMEDIATE_STOP)
							return Layout.IMMEDIATE_STOP

						const at=atomIndexOfLastNthLine(rollbackLines)
                        if(at>-1){
							rollbackToLineWithFirstAtomIndex(at)
							if(!createAndAppendLine())
								return 
        					i=at
        				}else{
							debugger
							throw new Error("unknown error")
						}
					}
					if(next===true){
						i++
					}
				}else{
					i++
					if(i>end){
						//it's recommitting since end is reasonable value
						if(appendComposedLine(i==atoms.length)==Layout.IMMEDIATE_STOP)
							return Layout.IMMEDIATE_STOP
					}
				}
			}

			if(++nested>DEAD){
				console.error(`it may be dead loop on since commit nested ${nested}, ignore and continue`)
				return
			}

			if(this.lines.length==1 || !this.currentLine.isEmpty()){
				const rollbackLines=appendComposedLine(true)
				if(Number.isInteger(rollbackLines)){
					if(rollbackLines===Frame.IMMEDIATE_STOP)
						return Frame.IMMEDIATE_STOP
					const next=atomIndexOfLastNthLine(rollbackLines)
					rollbackToLineWithFirstAtomIndex(next)
					if(!createAndAppendLine())
						return 
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
	recommit(lastLines=this.lines){
		const {atoms, lines}=this
		lastLines=lines.slice(-lastLines.length)

		this.rollbackLines(lastLines.length)

		const start=atoms.findIndex(a=>a==lastLines[0].firstAtom)
		const end=atoms.slice(start+1).findIndex(a=>a==lastLines[lastLines.length-1].lastAtom)+start+1
		return this.commit(start, end==atoms.length-1 ? undefined : end)
	}

	/**
	 * Story can handle it, so it can be in Line as normal atom
	 * firstLine is usually minus for numbering
	 */
	getNumberingAtom(){
		const {props:{numbering:{style}, indent:{firstLine=0},id},context:{Measure, numbering}}=this
		const {defaultStyle}=new Measure(style)

		return <ComposedText.Dynamic
			{...defaultStyle}
			key="numbering"
			className="numbering"
			x={firstLine}
			width={-firstLine}
			children={(...args)=>numbering(id, ...args)}
		/>
	}

	nextAvailableSpace(required){
		const space=super.nextAvailableSpace(required)
		if(!space)
			return space
		const {width,left=0,right=width}=space
		const {indent:{left:indentLeft=0,right:indentRight=0,firstLine=0}, numbering,wrap=true}=this.props
		const bFirstLine=this.lines.length==0
		return space.clone({
			left:left+indentLeft+(bFirstLine&&!numbering&&firstLine||0), 
			right:(wrap ? right : Number.MAX_SAFE_INTEGER)-indentRight,
		})
	}

	/**
	 * Block offset/top must be decided, so the following must be handled here
	 * top, firstLine, numbering 
	 * paragraph bottom doesn't affect current line's block offset, so don't handle it here
	 * *** every created line is appended IMMEDIATELY into composed, so the line index is from 1 in createComposed2Parent 
	 */
    createLine(required){
		const space=this.nextAvailableSpace(required)
		if(!space)
			return space
		const {numbering, align,spacing:{lineHeight,top}}=this.props
		const bFirstLine=this.lines.length==0

		const line=new this.constructor.Line({
			space,
			positioned: bFirstLine&&numbering ? [this.getNumberingAtom()] : [],
			top: bFirstLine ? top : undefined, 
			lineHeight,
			align,
		},{parent:this})

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
		const {height,width, anchor, topToBlockOffset}=line
		const {
			numbering,
			indent:{left=0,right=0, firstLine=0},
			spacing:{bottom=0},
			orphan,widow,keepWithNext,keepLines,
			}=this.props
		
		const bFirstLine=this.lines.length==1
		return (
			<Group className="line"
				height={topToBlockOffset+height+(bLastLine&&bottom||0)} 
				width={left+(bFirstLine&&!numbering&&firstLine||0)+width+right} 
				pagination={{
					id:this.props.id,
					orphan,widow,keepWithNext,keepLines, 
					i:this.lines.length,
					last:bLastLine,
					break: line.pageBreak
				}} 
				anchor={anchor} 
				>
				<Group 
					x={left+(bFirstLine&&!numbering&&firstLine||0)} 
					y={topToBlockOffset} 
					width={width} 
					height={height}>
					{line.render(bLastLine)}
                </Group>
            </Group>
        )
	}
	
	static Line=class Line extends Layout.Inline{
		/**where does last atom end with in inline size, for positioning only */
		get currentX(){
			return this.inlineSegments.currentX
		}
	}
}

export default class EditableParagraph extends editable(Paragraph,{stoppable:true}){
	_hasAnchor(){
		return this.atoms.find(a=>a.props.anchor)
	}

	/**to sync lastComposed with composed */
	rollbackLines(n){
		super.rollbackLines(n)
		this.computed.lastComposed.splice(-n)
	}
	
	cancelUnusableLastComposed({hash,changed=hash!=this.props.hash}){
		if(changed || this._hasAnchor()){
			this.atoms=[]
			super.cancelUnusableLastComposed(...arguments)
		}
	}

	/**if lineSegments is same, last layouted line should be able to fit in without relayout */
	appendLastComposed(){
		const lines=this.lines
		this.lines=[]
		const spaceChangedAt=this.computed.lastComposed.findIndex((a,i)=>{
			var line=lines[i]
			const newLine=this.createLine({height:a.props.height})
			if(!newLine)
				return true
			const space=newLine.props.space
			if(line.isFitTo(space)){
				line=line.clone4Space(space)
				this.lines.push(line)
				this.context.parent.appendComposed(a)
				return false
			}else{
				this.computed.lastComposed.splice(i)
				return true
			}
		})

		if(spaceChangedAt==0){
			this.cancelUnusableLastComposed({changed:true})
			return false
		}
		
		if(spaceChangedAt>0){
			this.commit(this.atoms.indexOf(lines[spaceChangedAt].firstAtom))
		}
		return true
	}
}

