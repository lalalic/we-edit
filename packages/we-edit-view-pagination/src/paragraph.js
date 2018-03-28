import React, {Children,} from "react"
import PropTypes from "prop-types"


import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Paragraph:Base}=models

import opportunities from "./wordwrap/line-break"
import Group from "./composed/group"
import Line, {Info as LineInfo} from "./composed/line"
import ComposedText from "./composed/text"

const Super=HasParentAndChild(Base)
export default class Paragraph extends Super{
    static childContextTypes={
        ...Super.childContextTypes,
        getMyBreakOpportunities: PropTypes.func
    }

	static propTypes={
		...Super.propTypes,
		getChildText: PropTypes.func
	}

	static defaultProps={
		...Super.defaultProps,
		getChildText(el){
			while(typeof(el.props.children)!=="string"){
				if(!el.props.children || !(el=el.props.children[0]) || !React.isValidElement(el))
					return null
			}
			return el.props.children
		}
	}


    constructor(){
        super(...arguments)
        this.computed.breakOpportunities=this.getBreakOpportunities(Children.toArray(this.props.children))
    }

    getBreakOpportunities(children){
		return Object.freeze(opportunities(children,this.props.getChildText))
    }

	componentDidMount(){
		this.emit("words",this.computed.breakOpportunities.length)
	}

    getChildContext(){
        let self=this
        return {
            ...super.getChildContext(),
            getMyBreakOpportunities(){
				const {getChildText}=self.props
				let index=self.computed.children.length
				let opportunities=self.computed.breakOpportunities.filter(({start,end})=>{
					return start.itemIndex<=index && end.itemIndex>=index
				})

				if(opportunities.length){
                    if(opportunities[0].start.itemIndex!=index){
       					let {start:{itemIndex,at}, end, word}=opportunities[0]
                        let children=self.props.children
                        let remove=getChildText(children[itemIndex]).length-at
       					for(let i=itemIndex+1;i<index;i++)
       						remove+=getChildText(children[i]).length

       					let adjusted={end, word: word.substring(remove), start:{at:0, itemIndex:index}}
       					opportunities[0]=adjusted
       				}

                    let len=opportunities.length,last=opportunities[len-1]
                    if(last.end.itemIndex!=index){
                        let {end:{itemIndex,at}, start, word}=last
                        let children=self.props.children
                        let remove=at
       					for(let i=itemIndex-1;i>index;i--)
       						remove+=getChildText(children[i]).length

       					let adjusted={
                            start,
                            word: word.substring(0,word.length-remove),
                            end:{at:getChildText(children[index]).length-1, itemIndex:index}
                        }
       					opportunities[len-1]=adjusted
                    }

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

        let availableWidth=currentLine.availableWidth(minRequiredW)
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
		let {width:contentWidth}=content.props

        let currentLine=composed[composed.length-1]
        const availableWidth=currentLine.availableWidth(contentWidth)


		if(il>2)
			throw new Error("infinite loop")

        if(availableWidth>=contentWidth){
          currentLine=currentLine.push(content)
		  composed.pop()
		  composed.push(currentLine)
        }else {
            this.commitCurrentLine(true)
            this.appendComposed(content,++il)
        }
    }

    commitCurrentLine(needNewLine=false){
        const {composed}=this.computed
        const {parent}=this.context
		if(composed.length>0){
			let currentLine=composed[composed.length-1]

			parent.appendComposed(this.createComposed2Parent(currentLine))
		}

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

        let contentWidth=props.children.reduce((w,{props:{width}})=>w+width,0)

        return (
            <Group height={lineHeight} width={width} contentWidth={contentWidth}>
                <Group x={contentX} y={contentY} width={width} height={height}>
                    <Line width={width} height={height} {...others}/>
                </Group>
            </Group>
        )
    }
}
