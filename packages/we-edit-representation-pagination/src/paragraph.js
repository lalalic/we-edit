import React, {Children,} from "react"
import PropTypes from "prop-types"


import composable, {HasParentAndChild,} from "./composable"
import {models} from "we-edit"
const {Paragraph:Base}=models

import opportunities from "./wordwrap/line-break"
import LineBreaker from "linebreak"
import {Text as ComposedText,  Group, Line, Story} from "./composed"
import Frame from "./frame"
const {Info:LineInfo}=Story

const Super=HasParentAndChild(Base)
export class Paragraph extends Super{
	static contextTypes={
		...Super.contextTypes,
		Measure: PropTypes.func,
	}
    static childContextTypes={
        ...Super.childContextTypes,
        getMyBreakOpportunities: PropTypes.func,
		getLastText: PropTypes.func
    }

	constructor(){
		super(...arguments)
		this.computed.lastText=""
		this.computed.words=0
		this.computed.atoms=[]
	}

    getChildContext(){
        let self=this
        return {
            ...super.getChildContext(),
			getLastText(){
				return self.computed.lastText
			},
            getMyBreakOpportunities(text){
				const {lastText}=self.computed
				if(!text){
					if(text===null)
						self.computed.lastText=""
					return [""]
				}

				const opportunities=str=>{
					let breaker=new LineBreaker(str)
					let last=0
					var op=[]
					for (let bk;bk = breaker.nextBreak();) {
					  op.push(str.slice(last, bk.position))

					  if (bk.required) {
					    //op.push("\n")
					  }

					  last = bk.position
					}
					return op
				}

				const current=opportunities(self.computed.lastText=`${lastText}${text}`)
				if(!lastText){
					self.computed.words+=current.length
					return current
				}

				const last=opportunities(lastText)
				const i=last.length-1

				let possible=current.slice(i)
				possible[0]=possible[0].substring(last.pop().length)
				self.computed.words+=(possible.length-1)
				return possible
            }
        }
    }

	get currentLine(){
		const {composed}=this.computed
		if(composed.length==0){
			let {context:{Measure,parent},props:{defaultStyle:{fonts,size,bold,italic}}}=this
	        const measure=new Measure({fonts,size,bold,italic})
			const line=this._newLine(parent.nextAvailableSpace({height:measure.defaultStyle.height}))
			composed.push(line)
		}
		return composed[composed.length-1]
	}

    _newLine({width,...space}){
		const composableWidth=(w=>{
	        const {indent:{left=0,right=0,firstLine=0}}=this.props
	        w-=(left+right)
	        if(this.computed.composed.length==0)
	            w-=firstLine

	        return w
	    })(width);

        let line=new Frame.Line({...space, width:composableWidth},{parent:this})
		if(this.props.numbering && this.computed.composed.length==0){
			let {numbering:{label}, indent:{firstLine}}=this.props
			let {defaultStyle}=new this.context.Measure(label.props)
			let hanging=-firstLine
			line.children.push(
				<Group
					descent={defaultStyle.descent}
					width={hanging}
					height={0}>
					<ComposedText {...defaultStyle}
						width={hanging}
						contentWidth={hanging}
						children={[label.props.children]}/>
				</Group>
			)
		}
		return line
    }

    appendComposed(content){
		this.computed.atoms.push(content)
    }

    commitCurrentLine(){
		this.context.parent.appendComposed(this.createComposed2Parent(this.currentLine.commit()))
    }

    onAllChildrenComposed(){//need append last non-full-width line to parent
		this.commit()
		super.onAllChildrenComposed()
		this.commitCurrentLine()
    }


	commit(){
		const len=this.computed.atoms.length
		var last=0, times=0
		for(let i=0,content;i<len;){
			if(i==last){
				times++
				if(times>3){
					throw Error(`it may be dead loop on ${i}th atoms`)
				}
			}else{
				last=i
				times=0
			}
			content=this.computed.atoms[i]
			var appended=this.currentLine.appendComposed(content,i)
			if(appended===false){
				this.commitCurrentLine()
				var {width,minWidth=width,height}=content.props
				this.computed.composed.push(this._newLine(this.context.parent.nextAvailableSpace({width:minWidth,height})))
				continue
			}
			if(Number.isInteger(appended)){
				i=appended
				continue
			}

			i++
		}
	}

	createComposed2Parent(line){
        const {height, width, children, ...others}=line
        let {
			spacing:{lineHeight="100%",top=0, bottom=0},
			indent:{left=0,right=0,firstLine=0},
			align
			}=this.props

       lineHeight=typeof(lineHeight)=='string' ? Math.ceil(height*parseInt(lineHeight)/100.0): lineHeight
	   let contentY=(lineHeight-height)/2
	   let contentX=left

        if(this.computed.composed.length==1){//first line
            lineHeight+=top
            contentY+=top
            contentX+=firstLine
        }

        if(this.isAllChildrenComposed()){//the last line
            lineHeight+=bottom
			if(align=="justify" || align=="both"){//not justify the last line
				align=undefined
			}
        }

        return (
            <Line height={lineHeight} width={width}>
                <Group x={contentX} y={contentY} width={width} height={height}>
                   <Story width={width} height={height} children={children} align={align}/>
                </Group>
            </Line>
        )
    }
}



export default Paragraph
