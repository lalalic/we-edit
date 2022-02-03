import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

import breakOpportunities from "../wordwrap/line-break"
import {Text as ComposedText, Shape, Group} from "../composed"
import {HasParentAndChild,Layout,editable} from "../composable"

const Tokenizers=[dom.Text.LineBreak, dom.Text.PageBreak,dom.Text.Tab]
class Paragraph extends HasParentAndChild(dom.Paragraph){
    static contextTypes={
		...super.contextTypes,
		Measure: PropTypes.func,
		hintMeasure: PropTypes.shape({
			defaultStyle: PropTypes.object.isRequired,
			stringWidth: PropTypes.func.isRequired
		}),
		numbering: PropTypes.shape({
			get: PropTypes.func
		}),

		editable: PropTypes.any,
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
		this.atoms.push(this.createParagraphEndAtom())
		this.commit()
		super.onAllChildrenComposed()
	}
	
	createParagraphEndAtom(){
		const {props:{End=""}}=this
		const measure=this.context.hintMeasure;
		const width=measure?.stringWidth(End)
		return (
			<ComposedText
					{...measure?.defaultStyle}
					width={width}
					minWidth={0}
					children={End}
					className="ender"
					/>
		)
	}

	rollbackLines(n){
		this.lines.splice(-n)
	}

	killCommit(reason,info){
		console.error(reason)
		return Layout.IMMEDIATE_STOP
	}

	/**
	* line.appendComposed can rollback to a specified atom
	* parent.appendComposed can rollback lines
	**/
	commit(start=0, end=Number.MAX_SAFE_INTEGER, DEADTolerance=5){
        const {context:{parent}, computed:{atoms}}=this

		const rollbackToLineWithFirstAtomIndex=at=>{
			const {lines,atoms}=this
			const i=lines.findIndex(a=>atoms.indexOf(a.atoms[0])==at)
			if(i==-1){
				throw new Error(`failed rollback to line with first Atom index=${at}`)
			}
			this.rollbackLines(lines.length-i)
		}

		const commitComposedLine=bLastLine=>{
			this.currentLine.freeze()
			return parent.appendComposed(this.createComposed2Parent(this.currentLine,bLastLine))
		}

		const indexOfFirstAtomInLastNthLine=i=>{
			const lines=this.lines
			const lastNthLine=lines[lines.length-i]
			return atoms.indexOf(lastNthLine.atoms[0])
		}

		const createLineAndEnqueue=(...args)=>{
			const line=this.createLine(...args)
			if(!line)
				return false
			this.lines.push(line)
			return line
		}

		if(!createLineAndEnqueue())
			return 

		const commitFrom=(start=0, nestedTimes=0)=>{
			for(let i=start,last=-1, times=0, len=atoms.length;i<len;){
				if(i>end){
					return
				}

				if(i==last){
					if(++times>DEADTolerance){
						return this.killCommit(`it may be dead loop on ${i}th atoms`)
					}
				}else{
					last=i
					times=0
				}
				const next=this.currentLine.appendAtom(atoms[i])
				if(next===false || next===true){
					//current line is full, atoms[i] not assembled, commit to block layout
					const rollbackLines=commitComposedLine(false)
					if(!Number.isInteger(rollbackLines)){
						//line committed
						if(!createLineAndEnqueue())
							return 
					}else{
						//fail committed, and rollback lines
						if(rollbackLines==Layout.IMMEDIATE_STOP)
							return Layout.IMMEDIATE_STOP

						const at=indexOfFirstAtomInLastNthLine(rollbackLines)
                        if(at>-1){
							rollbackToLineWithFirstAtomIndex(at)
							if(!createLineAndEnqueue())
								return 
        					i=at
        				}else{
							return this.killCommit("unknown error")
						}
					}
					if(next===true){
						i++
					}
				}else{
					i++
					if(i>end){
						//it's recommitting since end is reasonable value
						if(commitComposedLine(i==atoms.length)==Layout.IMMEDIATE_STOP)
							return Layout.IMMEDIATE_STOP
					}
				}
			}

			if(++nestedTimes>DEADTolerance){
				return this.killCommit(`it may be dead loop on since commit nested ${nestedTimes}, ignore and continue`,{i})
			}

			if(this.lines.length==1 || !this.currentLine.isEmpty()){
				const rollbackLines=commitComposedLine(true)
				if(Number.isInteger(rollbackLines)){
					if(rollbackLines===Layout.IMMEDIATE_STOP)
						return Layout.IMMEDIATE_STOP
					const next=indexOfFirstAtomInLastNthLine(rollbackLines)
					rollbackToLineWithFirstAtomIndex(next)
					if(!createLineAndEnqueue())
						return 
					commitFrom(next, nestedTimes)
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
	 * numberingAtom doesn't change layout, but it need calculation, so make it dynamic
	 */
	createNumberingAtom(){
		const {props:{numbering, defaultStyle, indent:{firstLine=0}, id},context:{Measure}}=this
		let {style,label,hanging=-firstLine,align="left"}=numbering
		let atom=null
		if(!label){
			label=this.context.numbering.get(numbering, `${id}-create`)
		}
		const props={key:"numbering",className:"numbering",x:-hanging}
		if(typeof(label)=="string"){
			const measure=new Measure({...defaultStyle,...style})
			const {height,descent,x,y}=measure.defaultStyle
			if(!this.computed.numbering)
				this.computed.numbering=this.constructor.NumberingAtom.observable(label)
			else
				this.computed.numbering.next(label)
			atom=(
				<Group {...{height,descent,x,y}}>
					<this.constructor.NumberingAtom {...{measure, key:label, label:this.computed.numbering, align}}/>
				</Group>
			)
		}else if(typeof(label)=="object"){
			atom=<Group><Shape fill={{picture:label}}/></Group>
		}
		props.width=-props.x//to make first atom at x=0
		return React.cloneElement(atom,props)
	}
	/*
	{
		type:"we-edit/entity/UPDATE",
		payload:{id:"19",type:"shape",size:{width:101}}
	}
	*/

	updateCalculationWhenUseCached(){
		const {numbering,id}=this.props
		if(numbering && !numbering.label && this.computed.numbering){
			this.computed.numbering.next(this.context.numbering.get(numbering,`${id}-cached`))
		}
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
		const {numbering, align,spacing:{lineHeight, top}}=this.props
		const bFirstLine=this.lines.length==0

		const line=new this.constructor.Line({
			space,
			positioned: bFirstLine&&numbering ? [this.createNumberingAtom()] : [],
			dy: bFirstLine ? top : undefined, 
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
		const {height,width, anchor, dyBlock, dyLine, topOffset}=line
		const {
			numbering,
			indent:{left=0,right=0, firstLine: firstLineIndent=0},
			spacing:{bottom=0,top=0},
			orphan,widow,keepWithNext,keepLines,
			}=this.props
		
		const bFirstLine=this.lines.length==1
		const nonNumberingFirstLineIndent=(bFirstLine&&!numbering&&firstLineIndent||0);
		const firstLineTopSpace=(bFirstLine&&top||0);
		const lastLineBottomSpace=(bLastLine&&bottom||0);
		return (
			<Group className="line"
				{...(dyBlock ? {dy:dyBlock} : {})}
				height={firstLineTopSpace+height+lastLineBottomSpace} 
				width={left+nonNumberingFirstLineIndent+width+right} 
				pagination={{
					id:this.props.id,
					orphan,widow,keepWithNext,keepLines, 
					i:this.lines.length,
					last:bLastLine,
					break: line.pageBreak
				}} 
				anchor={anchor}
				_inspector={{
					content:{width,height,dx:nonNumberingFirstLineIndent,dy:topOffset+dyLine},
					line:{
						bFirstLine,bLastLine,
						...line._layoutReason,
					},
					paragraph:{
						indent:{left,right,firstLine:firstLineIndent},
						spacing:{top,bottom},
						numbering,
						orphan,widow,keepWithNext,keepLines,
					},
				}}
				>
				<Group 
					x={left+nonNumberingFirstLineIndent} 
					y={topOffset+dyLine} 
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

	static NumberingAtom=class NumberingAtom extends Component{
		static observable(value){
			let current=value
			const subscribers=[]
			return {
				get current(){
					return current
				},
				next(nextValue){
					current=nextValue
					subscribers.forEach(a=>a(current))
				},
				subscribe(f){
					subscribers.push(f)
					return {
						unsubscribe(){
							const i=subscribers.indexOf(f)
							if(i!=-1)
								subscribers.splice(i,1)
						}
					}
				}
			}
		}
		state={label:this.props.label.current}

		shouldComponentUpdate({label:nextLabel}){
			if(this.props.label!=nextLabel){
				this.labelSubscribed?.unsubscribe()
				this.labelSubscribed=nextLabel.subscribe(label=>this.setState({label}))
				this.setState({label:nextLabel.current})
			}
			return true
		}

		componentDidMount(){
			this.labelSubscribed=this.props.label.subscribe(label=>this.setState({label}))
		}

		render(){
			const {state:{label},props:{measure, align}}=this
			const width=measure.stringWidth(label)
			const x=align=="right" ? -width : align=="center" ? -width/2 : 0
			const {height,descent,x:_1,y,...measureStyle}=measure.defaultStyle
			return <ComposedText {...measureStyle} textLength={false} x={x} children={label}/>
		}

		componentWillUnmount(){
			this.labelSubscribed?.unsubscribe()
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
			delete this.computed.numbering
			super.cancelUnusableLastComposed(...arguments)
		}
	}

	/**
	 * be here means paragraph is not changed, so atoms collection should be ignored.
	 * if lineSegments is same, last layouted line should be able to fit in without relayout 
	 * 
	 * */
	appendLastComposed(){
		const lines=this.lines
		this.lines=[]
		const spaceChangedAt=this.computed.lastComposed.findIndex((a,i)=>{
			let line=lines[i]
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
			this._cancelAllLastComposed()
			this.commit(0)
		}else if(spaceChangedAt>0){
			let startAtomIndex=this.atoms.indexOf(lines[spaceChangedAt].firstAtom)
			if(startAtomIndex==-1){//it happens to BlockLayoutTrigger //check Inline.asBlockLayoutTrigger
				startAtomIndex=this.atoms.indexOf(lines[spaceChangedAt-1].lastAtom)+1
			}
			this.commit(startAtomIndex)
		}
		return true
	}
}

