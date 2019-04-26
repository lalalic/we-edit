import React, {Children,Component} from "react"
import PropTypes from "prop-types"

import memoize from "memoize-one"
import {dom, ReactQuery} from "we-edit"

import composable, {HasParentAndChild,} from "../../composable"
import opportunities from "../../wordwrap/line-break"
import {Text as ComposedText,  Group} from "../../composed"
import Frame from "../frame"

import ParagraphEnd from "./ender"
import Line from "./line"
import Story from "./story"

const Super=HasParentAndChild(dom.Paragraph)
export default class Paragraph extends Super{
    static Line=Line
    static Story=Story
    static End=ParagraphEnd

	static contextTypes={
		...Super.contextTypes,
		Measure: PropTypes.func,
	}
    static childContextTypes={
        ...Super.childContextTypes,
        getMyBreakOpportunities: PropTypes.func,
    }

	constructor(){
		super(...arguments)
		this.computed.lastText=""
		this.computed.atoms=[]
		this.computed.needMerge=false
        this.computed.hasFrame=false
	}

	get enderWidth(){
		return this.computed.atoms[this.computed.atoms.length-1].props.width
	}

    hasFrame(){
        return this.computed.hasFrame
    }

	getBreakOpportunities(text,isFrame){
		const {lastText}=this.computed
		if(!text){
			if(text===null)
				this.computed.lastText=""

            if(isFrame){
                this.computed.hasFrame=true
            }
			return []
		}

		if(text==" "){
			this.computed.lastText=""
			return [text]
		}

		const current=opportunities(`${lastText}${text}`)
		if(!lastText){
			this.computed.lastText=current[current.length-1]||""
			return current
		}

		const last=opportunities(lastText)
		const i=last.length-1

		let possible=current.slice(i)
		if((possible[0]=possible[0].substring(last.pop().length))==""){
			possible.splice(0,1)
		}else{
			this.computed.needMerge=true
		}
		this.computed.lastText=possible[possible.length-1]||""
		return possible
	}

    getChildContext(){
        return {
            ...super.getChildContext(),
			getMyBreakOpportunities:this.getBreakOpportunities.bind(this)
        }
    }

	get currentLine(){
		const {composed}=this.computed
		if(composed.length==0){
			this.createLine()
		}
		return composed[composed.length-1]
	}

    createLine(required){
		const {width,...space}=this.context.parent.nextAvailableSpace(required)
		const composableWidth=(w=>{
	        const {indent:{left=0,right=0,firstLine=0}, numbering}=this.props
	        w-=(left+right)
	        if(this.computed.composed.length==0){
				if(!numbering){
		            w-=firstLine
				}
			}

	        return w
	    })(width);

        const line=new this.constructor.Line({...space, width:composableWidth},{parent:this})
		this.computed.composed.push(line)
		return line
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

    appendComposed(content){
		if(this.computed.needMerge){
			let last=this.computed.atoms.pop()
			let height=Math.max(last.props.height, content.props.height)
			let descent=Math.max(last.props.descent, content.props.descent)
			let width=last.props.width+content.props.width
			this.computed.atoms.push(
				<Group {...{width,height,descent}}>
					{last}
					{React.cloneElement(content,{x:last.props.width})}
				</Group>
			)
			this.computed.needMerge=false
			return
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
			const i=lines.findIndex(a=>atoms.indexOf(a.first)==at)
			this.rollbackLines(lines.length-i)
		}

		const appendComposedLine=bLast=>parent.appendComposed(this.createComposed2Parent(this.currentLine.commit(),bLast))

		const atomIndexOfLastNthLine=i=>atoms.indexOf(this.computed.composed[this.computed.composed.length-i].first)

		const len=this.computed.atoms.length
		const DEAD=5
		var nested=0

        this.createLine()

		const commitFrom=(start=0)=>{
			var last=0, times=0
			var next, rollbackLines
			for(let i=start,content;i<len;){
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
				next=this.currentLine.appendComposed(atoms[i],i)

                if(Number.isInteger(next)){
                    const currentLine=this.currentLine
					this.rollbackLines(1)//rollbackToLineWithFirstAtomIndex(next)
					this.createLine({height:currentLine.lineHeight()})
					i=next
					continue
				}else if(next===false){//current line is full, atoms[i] not assembled
					if(!Number.isInteger(rollbackLines=appendComposedLine(false))){
						this.createLine()
						continue
					}else{
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

				i++
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

	recommit(lastLines=this.computed.composed){
		const {atoms, composed}=this.computed
		lastLines=composed.slice(-lastLines.length)

		this.rollbackLines(lastLines.length)

		const start=atoms.findIndex(a=>a==lastLines[0].first)
		const end=atoms.slice(start+1).findIndex(a=>a==lastLines[lastLines.length-1].last)+start+1
		return this.commit(start, end)
	}

	lineHeight(height){
		var {spacing:{lineHeight="100%",top=0, bottom=0},}=this.props
       	lineHeight=typeof(lineHeight)=='string' ? Math.ceil(height*parseInt(lineHeight)/100.0): lineHeight
	   	if(this.computed.composed.length==1){//first line
            lineHeight+=top
        }
		return lineHeight
	}

	getNumberingAtom(){
		const {numbering:{style, label}, indent:{firstLine=0}}=this.props
		const {defaultStyle}=new this.context.Measure(style)

		return <ComposedText
			{...defaultStyle}
			className="numbering"
			width={-firstLine}
			children={label}
		/>
	}

	createComposed2Parent(line,last){
		var {height, width, children, anchor,currentX,...others}=line
		const content=[...children]
		let contentWidth=currentX
        let {
			spacing:{lineHeight="100%",top=0, bottom=0},
			indent:{left=0,right=0,firstLine=0},
			align,
			orphan,widow,keepWithNext,keepLines,//all recompose whole paragraph to simplify
			}=this.props

       lineHeight=typeof(lineHeight)=='string' ? height*parseInt(lineHeight)/100.0: lineHeight
	   let contentY=0
	   let contentX=left

        if(this.computed.composed.length==1){//first line
            lineHeight+=top
            contentY+=top
            contentX+=firstLine

			if(this.props.numbering){
				const numbering=this.getNumberingAtom()
				content.unshift(numbering)
				contentWidth+=numbering.props.width
				width+=numbering.props.width
			}
        }

        if(last){//the last line
            lineHeight+=bottom
			if(align=="justify" || align=="both"){//not justify the last line
				align=undefined
			}
        }

		const pagination={orphan,widow,keepWithNext,keepLines, i:this.computed.composed.length,last}

        return (
            <Group height={lineHeight} width={contentX+width} className="line" pagination={pagination} anchor={anchor}>
                <Group x={contentX} y={contentY} width={width} height={height}>
					{new this.constructor.Story({children:content,align,width,contentWidth}).render()}
                </Group>
            </Group>
        )
    }
}
