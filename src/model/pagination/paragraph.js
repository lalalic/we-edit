import React, {PropTypes} from "react"

import {HasParentAndChild} from "./composable"
import Base from "../paragraph"

import opportunities from "./wordwrap/line-break"
import Group from "./composed/group"
import Line from "./composed/line"
import ComposedText from "./composed/text"

import Text from "../text"

const Super=HasParentAndChild(Base)
export default class Paragraph extends Super{
    static childContextTypes={
        ...Super.childContextTypes,
        getMyBreakOpportunities: PropTypes.func
    }
    constructor(){
        super(...arguments)
        this.computed.breakOpportunities=this.getBreakOpportunities(this.props.children)
    }

    getBreakOpportunities(children){
		function getText({props:{children:text}}){
            return text
        }

        function breakable({type,props:{children:text}}){
            return typeof(text)=="string"
        }

		return Object.freeze(opportunities(children,getText, breakable))
    }

    getChildContext(){
        let self=this
        return {
            ...super.getChildContext(),
            getMyBreakOpportunities(){
				let index=self.computed.children.length
				let opportunities=self.computed.breakOpportunities.filter(({start,end})=>{
					return start.itemIndex<=index && end.itemIndex>=index
				})
				if(opportunities.length && opportunities[0].start.itemIndex!=index){
					let {start:{itemIndex,at}, end, word}=opportunities[0]
                    let children=self.props.children
                    let remove=children[itemIndex].props.children.length-at
					for(let i=itemIndex+1;i<index;i++)
						remove+=children[i].props.children.length

					let adjusted={end, word: word.substring(remove), start:{at:0, itemIndex:index}}
					opportunities[0]=adjusted
				}
				return [index,opportunities]
            }
        }
    }

    _newLine(){
        return new LineInfo(this.lineWidth())
    }

    lineWidth(){
        const {indent:{left=0,right=0,firstLine=0,hanging=0}}=this.props
        let {width}=this.availableSpace
        width-=(left+right)
        if(this.computed.composed.length==0)
            width-=firstLine
        else
            width-=hanging
        return width
    }

    nextAvailableSpace(required={}){
        const {width:minRequiredW=Number.MIN_VALUE,height:minRequiredH=Number.MIN_VALUE,splitable=true}=required
        const {composed}=this.computed
        if(0==composed.length){
            let {width,height}=this.context.parent.nextAvailableSpace(required)
            this.availableSpace={width,height}
            composed.push(this._newLine())
        }
        let currentLine=composed[composed.length-1]

        let {width,availableWidth}=currentLine
        if(availableWidth<minRequiredW || this.availableSpace.height<minRequiredH){
            this.commitCurrentLine(true)
            this.availableSpace=this.context.parent.nextAvailableSpace(required)

            availableWidth=this.lineWidth()
        }
        return {
            width:availableWidth,
            height:this.availableSpace.height
        }
    }

    appendComposed(content, il=0){//@TODO: need consider availableSpace.height
        const {composed}=this.computed
        const {parent}=this.context

        let currentLine=composed[composed.length-1]
        let availableWidth=currentLine.availableWidth
        let {width:contentWidth}=content.props
		
		if(il>2)
			throw new Error("infinite loop")

        if(availableWidth>=contentWidth){
          currentLine.children.push(content)
        }else {
            this.commitCurrentLine(true)
            this.appendComposed(content,++il)
        }
    }

    commitCurrentLine(needNewLine=false){
        const {composed}=this.computed
        const {parent}=this.context
        let currentLine=composed[composed.length-1]

        parent.appendComposed(this.createComposed2Parent(currentLine))

        if(needNewLine)
            composed.push(this._newLine())
    }

    onAllChildrenComposed(){//need append last non-full-width line to parent
        this.commitCurrentLine()

        this.availableSpace={width:0, height:0}

        super.onAllChildrenComposed()
    }

    createComposed2Parent(props){
        let {height, width, ...others}=props
        let {spacing:{lineHeight="100%",top=0, bottom=0}, indent:{left=0,right=0,firstLine=0,hanging=0}}=this.props
        let contentY=0, contentX=left

       lineHeight=typeof(lineHeight)=='string' ? Math.ceil(height*parseInt(lineHeight)/100.0): lineHeight

        if(this.computed.composed.length==1){//first line
            lineHeight+=top
            contentY+=top
            contentX+=firstLine
        }else{
            contentX+=hanging
        }

        if(this.isAllChildrenComposed()){//last line
            lineHeight+=bottom
        }

        this.availableSpace.height-=lineHeight

        return (
            <Group height={lineHeight} width={width}>
                <Group x={contentX} y={contentY} width={width} height={height}>
                    <Line width={width} height={height} {...others}/>
                </Group>
            </Group>
        )
    }
}


class LineInfo{
	constructor(width,p){
		this.width=width
		this.children=[]

		Object.defineProperties(this,{
			height:{
				enumerable:true,
				get(){
					return this.children.reduce((h,{props:{height}})=>Math.max(h,height),0)
				}
			},
			availableWidth:{
				enumerable:true,
				get(){
					return this.children.reduce((w,{props:{width}})=>w-width,this.width)
				}
			}
		})
	}
}
