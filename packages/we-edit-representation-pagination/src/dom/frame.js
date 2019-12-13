import React from "react"
import {dom, ReactQuery} from "we-edit"

import {Layout, HasParentAndChild, Cacheable, editable} from "../composable"
import {Group} from "../composed"

class Frame extends Layout.Block{
	static displayName=HasParentAndChild(dom.Frame).displayName
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			uuid:{
				get(){
					const {props:{i,id}}=this
					return `${id}${i!=undefined ? "_"+i : ""}`
				}
			}
		})
	}

	get isFrame(){
		return true
	}

	getSpace(){
		const space=super.getSpace()
		const {width,height=Number.MAX_SAFE_INTEGER,margin:{left=0,right=0,top=0,bottom=0}={},x=0,y=0}=this.props
		const edges={
			[this.getComposeType()]:{left:x,top:y,right:x+width,bottom:y+height},
			margin:{left:x+left,top:y+top,right:width+x-right,bottom:y+height-bottom}
		}
		if(this.cols)
			return Layout.ConstraintSpace.create(space).clone({edges})

		return Layout.ConstraintSpace.create(space).clone({
			left:x+left,
			right:x+width-right,
			blockOffset:y+top,
			height:height-top-bottom,
			edges
		})
	}

	defineProperties(){
		super.defineProperties()
		Object.defineProperties(this,{
			composedHeight:{
				enumerable:true,
				configurable:true,
				get(){
					if(this.cols)
						return Math.max(...this.columns.map(a=>a.y+(a.height-a.availableBlockSize)))
					return this.blockOffset
				}
			}
		})
	}
	
	/**
	 * always use space to locate since layout using it 
	 */
	createComposed2Parent() {
		const {width,height=this.contentHeight, margin:{left=0,top=0,bottom=0,right=0}={}, x,y,z,named}=this.props
		const alignY=contentHeight=>{
			if(contentHeight==undefined)
				return undefined
			const {height=contentHeight, vertAlign}=this.props
			switch(vertAlign){
				case "bottom":
					return height-contentHeight
				case "center":
				case "middle":
					return (height-contentHeight)/2
				default:
					return 0
			}
		}
		var content=this.positionLines(this.lines)
		content=React.cloneElement(content,{y:alignY(content.props.height)})
		if(!this.cols && (left||top)){
			content=(<Group x={left} y={top}>{content}</Group>)
		}
		return (
			<Group {...{width,height,x,y,z,named, className:"frame", "data-frame":this.uuid}}>
				{this.anchors.map((a,i)=>React.cloneElement(a,{key:i}))}
				{content}
			</Group>
		)
	}

	//y in frame
	lineY(line){
		if(!this.cols){
			const {margin:{top=0}={}}=this.props
			return this.lines.slice(0,this.lines.indexOf(line)).reduce((Y,{props:{height=0}})=>Y+height,top)
		}

		const {y:y0=0,children:lines}=this.columns.find(a=>a.children.includes(line))||this.currentColumn
		return lines.slice(0,lines.indexOf(line)).reduce((Y,{props:{height=0}})=>Y+height,y0)
	}

	//x in frame
	lineX(line){
		if(!this.cols){
			const {margin:{left=0}={}}=this.props
			return left
		}
		return this.columns.find(a=>a.children.includes(line)).x
	}

	lineXY(line){
		return {x:this.lineX(line),y:this.lineY(line)}
	}

	isDirtyIn(rect){
		//wrappee already take up
		if(this.wrappees.find(({props:{x,y,width,height}})=>this.isIntersect(rect,{x,y,width,height}))){
			return true
		}

		//content already take up
		if(this.isIntersect(rect,{x:0,y:0,width:this.props.width,height:this.blockOffset})){
			return true
		}

		if(this.cols){
			//if any non-current column content already take up
			return !!this.columns
				.filter(a=>a!=this.currentColumn)//current block has already checked in super as normal space
				.find(({x=0,y=0,width,blockOffset:height})=>this.isIntersect(rect,{x,y,width,height}))
		}

		return false
	}

	columnIndexOf(line){
		if(!this.cols)
			return 0
		return this.columns.reduce((c,column,i)=>{
			if(c.count>0){
				c.count-=column.children.length
				c.i=i
			}
			return c
		},{count:line+1,i:0}).i
	}

	layoutOf(){
		const {width,height}=this.props
		if(!this.cols)
			return {width,height}
		return {width,height,cols:this.cols}
	}

	includeContent(id){
		if(this.cols && !!this.columns.find(a=>a.id==id)){
			return true
		}
		return !![...this.lines,...this.anchors].find(a=>this.belongsTo(a,id))
	}

	getParagraph(line){
		return new ReactQuery(line)
			.findFirst(`[data-type="paragraph"]`)
			.attr("data-content")
	}

	lineIndexOf(position){
        const lines=this.lines
        const {lineIndexOfParagraph,paragraph,id,at}=position
        if(paragraph){
            return lines.findIndex(a=>new ReactQuery(a)
                .findFirst(({props:{"data-content":content,"data-type":type,pagination:{i}={}}})=>{
                    if(content==paragraph && i==lineIndexOfParagraph+1){
                        return true
                    }
                    if(type=="paragraph"){
                        return false
                    }
                }).length)
        }else{
            return lines[`find${at==0?"":"Last"}Index`](a=>new ReactQuery(a)[at==0 ? "findFirst" : "findLast"](`[data-content="${id}"]`).length)
        }
    }

	clone(props={}){
		const {computed}=this
		return Object.assign(new this.constructor({...this.props, ...props},this.context),{computed})
	}
}

export default Cacheable(class EditableFrame extends editable(Frame){
    clearComposed(){
        this.computed.anchors=[]
        return super.clearComposed(...arguments)
    }

    appendLastComposed(){
        const lastComposed=[...this.computed.lastComposed]
        this.computed.lastComposed=[]
        lastComposed.forEach(a=>{
            this.context.parent.appendComposed(this.createComposed2Parent())
        })
    }

    removeChangedPart(removedChildren){
        const findChangedContentId=line=>{
			const id=this.findContentId(line)
			return (id!==undefined && removedChildren.includes(id))
		}

        const lineIndex=this.lines.findIndex(line=>findChangedContentId(line))
        this.rollbackLines(this.lines.slice(lineIndex))
        return true
    }

    findLastChildIndexOfLastComposed(){
        return this.findContentId(this.lastLine)
    }
    
	removeFrom(lineIndex){
		//remove content
		return super.rollbackLines(this.lines.length-lineIndex,false)
	}
},undefined,["hash","width"])
