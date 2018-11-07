import React, {Children,} from "react"
import PropTypes from "prop-types"


import {HasParentAndChild} from "./composable"
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
		return composed[composed.length-1]
	}
	
    _newLine({width,...availableSpace}){
		const composableWidth=this.composableWidth(width)
        let line=new LineInfo(composableWidth)
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
        if(!this.currentLine)
            width-=firstLine

        return width
    }

    appendComposed(content, il=0){//@TODO: need consider availableSpace.height
        const {width,minWidth=width,height,split}=content.props

        const {composed}=this.computed
		const createLine=()=>{
			const availableSpace=this.context.parent.nextAvailableSpace({width,height})
			composed.push(this._newLine({...availableSpace,height}))
		}
		
		if(!this.currentLine)
           createLine()
	   
	    if(height>this.currentLine.height){//
			const currentLine=this.currentLine
			this.computed.composed.pop()
			createLine()
			currentLine.content.forEach(a=>this.appendComposed(a))
		}
        
        const availableWidth=this.currentLine.availableWidth(parseInt(minWidth))

		if((availableWidth+1)>=minWidth || il>1){
			this.currentLine.push(content)
        }else {
			if(composed.length==1 && this.currentLine.isEmpty()){//empty first line
				if(split && false){
					const [p0,p1]=split(content,availableWidth)
					this.currentLine.push(p0)
					this.appendComposed(p1)
				}else{
					this.currentLine.push(content)
				}
			}else{
				this.commitCurrentLine()
				createLine()
				this.appendComposed(content,++il)
			}
        }
    }

    commitCurrentLine(){
        if(this.currentLine){
			this.context.parent.appendComposed(this.createComposed2Parent(this.currentLine))
		}
    }

    onAllChildrenComposed(){//need append last non-full-width line to parent
		super.onAllChildrenComposed()
		this.commitCurrentLine()
    }

    createComposed2Parent(props){
        const {height, width, ...others}=props
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

        if(this.isAllChildrenComposed()){//last line
            lineHeight+=bottom
        }

        let contentWidth=props.children.slice(0,-1)
				.reduce((w,{props:{width}})=>w+width,
					props.children.slice(-1).reduce((w,{props:{width,minWidth=width}})=>w+minWidth,0))

		switch(align){
		case "right":
			contentX+=(width-contentWidth)
			break
		case "center":
			contentX+=(width-contentWidth)/2
			break
		case "justify":
			if(!this.isAllChildrenComposed()){
				const isWhitespace=a=>a.props.minWidth==0
				const countWhiteSpace=a=>{
					while(a && a.type!=ComposedText){
						if(a.props && a.props.children){
							a=React.Children.only(a.props.children)
						}else{
							a=null
						}
					}

					if(a && isWhitespace(a)){
						return a.props.children.length
					}

					return 0
				}

				const content=props.children.reduce((state,child,i)=>{
					const {props:{width,minWidth=width}}=child
					state.width+=minWidth
					if(isWhitespace(child)){
						const count=countWhiteSpace(child.props.children)
						if(count>0){
							state.whitespaces+=count
							state[`${i}`]=count
						}
					}
					return state
				},{width:0,whitespaces:0,});

				if(content.whitespaces>0){
					const whitespaceWidth=(width-content.width)/content.whitespaces
					others.children=props.children.map((a,i)=>{
						if(content[`${i}`]){
							return React.cloneElement(a,{width:content[`${i}`]*whitespaceWidth})
						}
						return a
					})
				}
			}
			break
		}

        return (
            <Line height={lineHeight} width={width} contentWidth={contentWidth}>
                <Group x={contentX} y={contentY} width={width} height={height}>
                   <Story width={width} height={height} {...others}/>
                </Group>
            </Line>
        )
    }
}



export default Paragraph
