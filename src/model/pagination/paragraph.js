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

    compose(){
        delete this.computed.breakOpportunities
        this.getBreakOpportunities()
    }

    getBreakOpportunities(){
		if(this.computed.breakOpportunities)
			return this.computed.breakOpportunities

        const children=React.Children.toArray(this.props.children)

        function getText({props:{children:text}}){
            return text
        }

        function breakable({type,props:{children:text}}){
            return typeof(text)=="string"
        }

        function reviver(opportunity){
            opportunity.start.itemId=children[opportunity.start.itemIndex].props.id
            if(opportunity.end)
                opportunity.end.itemId=children[opportunity.end.itemIndex].props.id
            return opportunity
        }

        this.computed.breakOpportunities=opportunities(children,getText, breakable, reviver)
		console.dir(this.computed.breakOpportunities)
	    return this.computed.breakOpportunities
    }

    getChildContext(){
        let opportunities=this.computed.breakOpportunities
        return {
            ...super.getChildContext(),
            getMyBreakOpportunities({props:{id}}){
				return opportunities.filter(({start,end})=>start.itemId==id || (end && end.itemId==id))
            }
        }
    }

    _newLine(){
        return new LineInfo(this.lineWidth())
    }

    lineWidth(){
        const {indent:{left=0,right=0,firstLine=0,hanging=0}}=this.style
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

    appendComposed(content){//@TODO: need consider availableSpace.height
        const {composed}=this.computed
        const {parent}=this.context

        let currentLine=composed[composed.length-1]
        let availableWidth=currentLine.availableWidth
        let {width:contentWidth}=content.props

        if(availableWidth>contentWidth){
          currentLine.children.push(content)
        }else {
            this.commitCurrentLine(true)
            this.appendComposed(content)
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
        let {spacing:{lineHeight="100%",top=0, bottom=0}, indent:{left=0,right=0,firstLine=0,hanging=0}}=this.style
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
