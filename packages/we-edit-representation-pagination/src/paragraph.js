import React, {Children,} from "react"
import PropTypes from "prop-types"


import composable, {HasParentAndChild,} from "./composable"
import {models} from "we-edit"
const {Paragraph:Base}=models

import opportunities from "./wordwrap/line-break"
import LineBreaker from "linebreak"
import {Text as ComposedText,  Group, Line, Story} from "./composed"

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
		const composableWidth=this.composableWidth(width)
        let line=new LineInfo({...space, width:composableWidth})
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

    composableWidth(width){
        const {indent:{left=0,right=0,firstLine=0}}=this.props
        width-=(left+right)
        if(this.computed.composed.length==0)
            width-=firstLine

        return width
    }

    appendComposed(content){//@TODO: need consider availableSpace.height
		this.computed.atoms.push(content)
    }

    commitCurrentLine(){
		this.context.parent.appendComposed(this.createComposed2Parent(this.currentLine.commit()))
    }

    onAllChildrenComposed(){//need append last non-full-width line to parent
		let i=this.commit()
		while(Number.isInteger(i)){
			i=this.commit(i)
		}

		super.onAllChildrenComposed()
		this.commitCurrentLine()
    }

	/**@Todo
	* frame dirty change, or current line height change, so refresh line
	* i: need recompose line from atoms[i]
	* true: not need recompose, continue compose
	**/
	refreshCurrentLine(height=this.currentLine.height){
		const space=this.context.parent.nextAvailableSpace({width:this.currentLine.availableWidth, height})
		if(this.currentLine.spaceEquals(space)){
			return true
		}else{
			let first=this.currentLine.first
			this.computed.composed.pop()
			this.computed.composed.push(this._newLine(space))
			if(!first){
				return -1
			}else{
				return this.computed.atoms.indexOf(first)
			}
		}
	}

	commitAnchored(anchor){
		if(this.frame.appendComposed(content,this.currentLine)===false){
			//need recompose for current page
			//so stop here
			return false
		}else{
			let i=0
			if((i=this.refreshCurrentLine())===true){//to get line dirty areas
				//placeholder already in this.currentLine.blocks
			}else{
				return i
			}
		}
	}

	commit(from=0){
		const append=(content,il=0)=>{
			const {width,minWidth=width,height,anchor}=content.props
	        if(anchor){
				let anchoredReturn=this.commitAnchored(content)
				if(anchoredReturn!=undefined)
					return anchoredReturn
			}

			if(this.currentLine.availableHeight<height){
				let i=0
				if((i=this.refreshCurrentLine(height))===true){

				}else{
					return i
				}
			}

	        const availableWidth=this.currentLine.availableWidth(minWidth)

			if(availableWidth>=minWidth || il>1){
				this.currentLine.push(content)
	        }else{
				if(this.computed.composed.length==1 && this.currentLine.isEmpty()){//empty first line
					//split word or hyphen word for availableWidth, and leave left part to next line
					const [content0,content1]=this.split(content, availableWidth)
					if(content0){
						this.currentLine.push(content0)
						content=content1
						il=0
					}
				}
				this.commitCurrentLine()
				this.computed.composed.push(this._newLine(this.context.parent.nextAvailableSpace({width,height})))
				append(content,++il)
	        }
		}

		for(let i=from,len=this.computed.atoms.length,b;i<len;i++){
			if((b=append(this.computed.atoms[i]))===false){
				return
			}else if(Number.isInteger(b)){
				if(b==-1)
					return i
				return b
			}
		}
	}

	get frame(){
		let current=this.context.parent
		while(current){
			if(current.isFrame())
				return current
			current=current.context.parent
		}
		return current
	}



    createComposed2Parent(line){
        const {height, width, ...others}=line
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
                   <Story width={width} height={height} {...others} align={align}/>
                </Group>
            </Line>
        )
    }
}



export default Paragraph
