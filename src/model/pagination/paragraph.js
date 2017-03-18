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

	   return this.computed.breakOpportunities
    }

    getChildContext(){
        let opportunities=this.getBreakOpportunities()
        return {
            ...super.getChildContext(),
            getMyBreakOpportunities({props:{id}}){
				return opportunities.filter(({start,end})=>start.itemId==id || (end && end.itemId==id))
            }
        }
    }

    _newLine(){
        return new LineInfo(this.lineWidth(),this)
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
            if(this.availableSpace.height<minRequiredH)
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
        let {height, width, paragraph, ...others}=props
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
                <Group x={contentX} y={contentY}>
                    <Line width={width} height={height} {...others}/>
                </Group>
            </Group>
        )
    }
}


class LineInfo{
	constructor(width,p){
		this.paragraph=p
		this.width=width
		this.children=[]
	}

	get height(){
		return this.children.reduce((h,{props:{height}})=>Math.max(h,height),0)
	}

	get availableWidth(){
		return this.children.reduce((w,{props:{width}})=>w-width,this.width)
	}

	rollback({type}){
		let removed=[]
		for(let i=this.children.length-1;i>-1;i--){
			let text=this.children[i]
			if(text.type!=ComposedText)
				break
			let {width,children:pieces}=text.props

			let j=pieces.length-1
			for(;j>-1;j--){
				let chars=pieces[j]
				if(chars.type!=type){
					break
				}
			}

			if(j==-1){
				removed.unshift(this.children.pop())
				continue;
			}else if(j==pieces.length-1){
				break
			}else {
				let removedPieces=pieces.splice(j)
				this.children[i]=React.cloneElement(text,{children:pieces, width:pieces.reduce((w,{width})=>w+width,0)})
				removed.unshift(React.cloneElement(text,{children:removedPieces,width:removedPieces.reduce((w,{width})=>w+width,0)}))
				break
			}
		}

		this.paragraph.commitCurrentLine(true)

		removed.map(a=>this.paragraph.appendComposed(a))
	}

	commit(needNewLine){
		this.paragraph.commitCurrentLine(needNewLine)
	}

	canSeperateWith({type}){
		if(this.children.length==0)
			return true

		let text=this.children[this.children.length-1]
		let pieces=text.props.children
		let lastPiece=pieces[pieces.length-1]
		return type.canSeperateWith && type.canSeperateWith(lastPiece.type)
	}

	allCantSeperateWith({type}){
		return this.children.reduce((cantSeperate,text)=>{
			if(!cantSeperate)
				return false

			return text.props.children.reduce((state,a)=>{
				if(!state)
					return false
				return !type.canSeperateWith || !type.canSeperateWith(a.type)
			},true)

		},true)
	}

}
