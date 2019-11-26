import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom, ReactQuery} from "we-edit"

import {Rect} from "../../tool/geometry"
import composable,{HasParentAndChild} from "../../composable"
import {Frame as ComposedFrame, Group} from "../../composed"

const Super=HasParentAndChild(dom.Frame)

/**
 * Layout engine is how to layout content in a constraint space
 * so it includes: a constraint space + layout algorithm + content
 * Layout algorithm includes Block algorithm and Inline algorithm
 * Block algorithm is to layout in block direction, move by block size, 
 * 			each block element should at first decide block offset in space, then layout content
 * Inline algorithm is to layout content in inline direction, move by inline size, 
 * 			each layout element should have an inline offset
 */

/**
 * space is immutable, and should NOT provide any layout function, 
 * but can help decide on geometry functions, such as intersection
 */

/**
 * layout content in a space with excludable areas
 * inline excludable & block excludable
 * excludable areas is changing along with content appended, then
 * inline re-layout and/or block re-layout
 * excludable space can answer if content can layout without/with space change
 * layout algorithm itself(such as line, page, and etc) decide how to re-layout
 */
class Block extends Super{
	constructor(){
		super(...arguments)
		this.computed.anchors=[]
		this.defineProperties()
	}

	defineProperties(){
		Object.defineProperties(this,{
			firstLine:{
				enumerable:true,
				configurable:true,
				get(){
					return this.lines[0]
				}
			},
			lastLine:{
				enumerable:true,
				configurable:true,
				get(){
					const lines=this.lines
					return lines[lines.length-1]
				}
			},
			lines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed
				},
				set(values){
					this.computed.composed=values
				}
			},
			totalLines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.lines.length
				}
			},
			blockOffset:{//current composed y IN frame
				enumerable:false,
				configurable:true,
				get(){
					const {margin:{top=0}={}}=this.props
					return this.lines.reduce((Y, {props:{height=0}})=>Y+height,top)
				}
			},
			availableBlockSize:{
				enumerable:true,
				configurable:true,
				get(){
					const {height=Number.MAX_SAFE_INTEGER, margin:{top=0,bottom=0}={}}=this.props
					return height-this.blockOffset-bottom
				}
			},
			anchors: {
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.anchors
				},
				set(values){
					this.computed.anchors=values
				}
			},
			wrappees: {
				enumerable:true,
				configurable:true,
				get(){
					return this.anchors.filter(({props:{wrap}})=>!!wrap)
				}
			},
			contentHeight:{
				enumerable:true,
				configurable:true,
				get(){
					return this.lines.reduce((H,{props:{height:h=0}})=>h+H,0)
				}
			}
		})
	}

	onAllChildrenComposed(){
		const content=this.createComposed2Parent()
		this.context.parent.appendComposed(content)
		super.onAllChildrenComposed()
	}

	appendComposed(line){
		const {props:{y:positioned}}=line
		if(positioned!=undefined){
			this.anchors.push(line)
		}else{
			this.lines.push(line)
		}
	}

	getSpace(){
		return this.props.space
	}

	/**
	 * only when there are avaialable block 
	 * Not allow empty frame
	 * @param {*} param0 
	 */
	nextAvailableSpace({height:requiredBlockSize=0}={}){
		if(this.isEmpty()
			||this.availableBlockSize>=requiredBlockSize){
			return {
				...this.getSpace(),
				blockOffset:this.blockOffset,
				frame:this,
				findInlineSegments:(requiredBlockSize,left,right)=>{
					const blockOffset=this.blockOffset
					var wrappees=this.exclusive(blockOffset,blockOffset+requiredBlockSize,left,right)
					var top=0
					while(typeof(wrappees)=="number"){
						top=wrappees
						wrappees=this.exclusive(top,top+requiredBlockSize,left,right)
					}
					const space=this.nextAvailableSpace({height:top-blockOffset+requiredBlockSize})
					if(space){
						return {
							top,
							segments:wrappees.reduce((ops,{x,width})=>{
								const [last]=ops.splice(-1)
								return [...ops, {x:last.x,width:x-last.x},{x:x+width,width:right-x-width}]
							},[{x:left,width:right-left}])
						}
					}
					return space
				},
				isAnchored:id=>this.isAnchored(id)
			}
		}
		return false
	}

	/**
	 * exclude area in rect {x1,y1, x2,y2}
	 * @param {*} y1 
	 * @param {*} y2 
	 * @param {*} x1 
	 * @param {*} x2 
	 * @returns 
	 * 	[{x,width},...]: exclude areas
	 * 	number: there's opportunity until the value
	 */
	exclusive(y1,y2,x1=0,x2=this.props.width){
		const line={x1,x2,y1,y2}
		
		var excludes=this.wrappees.reduce((collected,{props:{wrap}})=>{
			const blocks=wrap(line)
			collected.splice(collected.length,0,...(Array.isArray(blocks) ? blocks : [blocks]))
			return collected
		},[])
			.filter(a=>!!a)
			.filter(a=>a.width>0)
			.sort((a,b)=>a.x-b.x)
		
		const clears=excludes.filter(a=>a.type=="clear")
		if(clears.length>0){
			return Math.max(...clears.map(a=>a.y))
		}

		if(excludes.length>1){
			//merge such as [{x:3,width:5},{x:4,width:6}]=>[{x:3,width:7}]
			excludes.forEach(a=>a.x2=a.x+a.width)
			excludes=excludes.reduce((wrapees,a)=>{
				const b=wrapees[wrapees.length-1]
				if(a.x2>b.x2){
					if(a.x>b.x2){//seperated
						wrapees.push(a)
					}else{//intersect
						b.x2=a.x2
						b.width=b.x2-b.x
					}
				}
				return wrapees
			},[excludes[0]])
			excludes.forEach(a=>delete a.x2)
		}

		return excludes
	}

	/**
	 * layout after pre() for only already layouted lines
	 * It's presumed: *** all content are in paragraphs, otherwise just append it directly***
	 * so it's should work to recommit alreay layouted paragraphs
	 * @returns: function to rollback/recover to last state
	 */
	recompose(pre=a=>a){
		/**
		 * if it's empty frame, recompose would not happen
		 */
		if((this.lines.length+this.anchors.length)==0){
			pre()
			return a=>a
		}

		const lastLines=[...this.lines]
		const lastAnchors=[...this.anchors]
		const lastColumns=this.isMultiBlocks ? [...this.columns] : undefined

		const rollback=()=>{
			this.lines=lastLines
			this.anchors=lastAnchors
			if(lastColumns)
				this.columns=lastColumns
		}

		try{
			this.computed.recomposing=pre()
			this.lines=[]
			this.anchors=[]
			const lines=[...lastLines]
			var currentParagraph=null
			var currentParagraphLines=[]
			for(let i=0, line;i<lines.length;i++){
				line=lines[i]
				const linePID=this.getFlowableComposerId(line,`[data-type="paragraph"]`)
				if(!linePID){//not paragraph, then append directly
					if(currentParagraph){
						this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
						currentParagraph=null
						currentParagraphLines=[]
					}
					this.appendComposed(line)
				}else{
					if(!currentParagraph){
						currentParagraph=linePID
						currentParagraphLines.push(line)
					}else{
						if(linePID!==currentParagraph){
							this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
							currentParagraph=linePID
							currentParagraphLines=[line]
							continue
						}else{
							currentParagraphLines.push(line)
							continue
						}
					}
				}
			}
			if(currentParagraph){
				this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
			}
		}catch(e){
			console.error(e)
		}finally{
			delete this.computed.recomposing
			return rollback
		}
	}

	/**
	 * to re-layout last n lines
	 * anchors in line should be removed too
	 * @param {number} n 
	 * @returns [...removed line].anchros=[...removed anchor id]
	 */
	rollbackLines(n){
		if(n==0){
			return Object.assign([],{anchors:[]})
		}
		const  removedLines=this.lines.splice(-n)

		const removedAnchors=(lines=>{
			const remove=a=>this.anchors.splice(this.anchors.indexOf(a),1)[0]
			const anchorId=a=>new ReactQuery(a).findFirst('[data-type="anchor"]').attr("data-content")
			const removingAnchorIds=Array.from(lines.reduce((ps, a)=>(ps.add(anchorId(a)),ps),new Set())).filter(a=>!!a)
			return this.anchors.filter(a=>removingAnchorIds.includes(anchorId(a))).map(remove)
		})(removedLines);

		/**
		 * @TODO: should consider recompose?
		const asRect=({x=0,y=0,width,height,wrap},a={})=>({x,y,width,height,...a})
		const intersectWithContent=!!removedAnchors.find(a=>{
			if(!a.props.wrap)
				return false

			const wrapRect=asRect(a.props)
			return !!this.columns.find(b=>this.isIntersect(wrapRect, asRect(b,{height:b.height-b.availableBlockSize})))
		})

		if(intersectWithContent){
			this.recompose()
		}
		*/

		return Object.assign(removedLines,{anchors:removedAnchors})
	}
}

/**
 * anchorable can layout positioned content, and ***MAY change space if supporting wrap***
 */
class Anchorable extends Block{
	static IMMEDIATE_STOP=Number.MAX_SAFE_INTEGER
	/**
     * line with/without anchors
     * anchors with wrap can affect exclusives, so it need re-layout
     * anchor need know anchor host to position itself
     * anchor host 
     */
    /**
     * @param {*} line 
     * @returns
     * int: rollback n unpositioned lines
     * false: space can't flow more content
     * Number.SAFE_MAX_INTEGER: let descendant stop layout
     * else: good
     */    
	appendComposed(line){
		const {props:{anchor,height:requiredBlockSize=0}}=line
		const space=this.nextAvailableSpace({height:requiredBlockSize})
		if(space==false){
			if(this.computed.recomposing){
				/**
				 * when space infeasible and recomposing
				 * paragraph must immediate stop, so to return back to outer layout
				 */
				return this.constructor.IMMEDIATE_STOP
			}
			return false
		}
		const anchorPlaced=(anchorId,line)=>new ReactQuery(line).findFirst(`[data-anchor="${anchorId}]`).length==1

		if(!anchor){
			if(this.computed.recomposing){
				if(anchorPlaced(this.computed.recomposing,line)){
					return Frame.IMMEDIATE_STOP
				}
			}

			return super.appendComposed(...arguments)
		}

		/**
		 * it's only to append anchored content, 
		 * anchor placeholder in line will be relayouted later, 
		 * so from here
		 * return 1 to ignore and relayout current line or 
		 * return false to notify infeasible space, and ignore and re-layout current line and anchor
		 */
        const anchored=anchor(this,line)
        const {wrap, geometry, y=0,"data-content":anchorId}=anchored.props

		/**
		 * @TODO: wrap each other with already anchored wrappees, and this wrappees
		 */
		if( !(wrap && this.isDirtyIn(geometry))){
			super.appendComposed(anchored)
			return 1
		}

		/**
		 * the area above current block offset is affected by this wrap area
		 * temporarily anchor it to exclude the wrap area, and relayout whole to see:
		 * ** always rollback to current stack
		 * if the anchor can be layouted within the space, rollback and keep this wrappee, relayout this line
		 * if not, rollback to last layout result, and return false
		 */

		const rollback=this.recompose(()=>{
			/**add anchored and line arbitarily, then recompose to check */
			super.appendComposed(anchored)
			super.appendComposed(line)
			return anchorId
		})

		/**
		 * then check if this anchor is in this page
		 * data-anchor is placeholder specification in inline layout
		 * */
		if(this.lines.findLast(a=>anchorPlaced(anchorId,a))){
			/**
			 * anchor and placeholder can be on same frame, so keep anchor, 
			 * and re-layout the line
			 */
			rollback()
			super.appendComposed(anchored)
			return 0+1
		}else{
			/**
			 * anchor and placeholder can NOT be on same frame, so throw to parent
			 */
			rollback()
			return false
		}
	}
}

/**
 * widow and orpahn control layout
 * there must be prevLayout, otherwise it's not supported
 * it support line.props.pagination={
 * widow, boolean, identify if widow is supported  
 * orphan, boolean, identify if orphan is supported
 * keepLines, boolean, identify if all lines should be layouted together
 * 
 * //this layout also depends on following line indicator:
 * last, boolean, identify if it's last line of paragraph
 * i: number[start from i], identify if it's nth line of paragraph
 * }
 */
class OrphanControlable extends Anchorable{
	static contextTypes={
		...Anchorable.contextTypes,
		prevLayout:PropTypes.func,
	}

	defineProperties(){
		super.defineProperties()
		Object.defineProperties(this,{
			prev:{
				enumerable:false,
				configurable:true,
				get(){
					var {parent, prevLayout}=this.context
					prevLayout=prevLayout||(parent&&parent.context&&parent.context.prevLayout)||(a=>null)
					return prevLayout(this)
				}
			}
		})
	}

	/**
	 * how many last lines from same paragraph of input line
	 * @param {*} line 
	 */
	orphanCount(line=this.lastLine){
		const pid=this.getFlowableComposerId(line,'[data-type="paragraph"]')
		if(!pid)
			return 0
		const lines=this.lines
		const i=lines.findLastIndex(a=>this.getFlowableComposerId(a)!==pid)
		return i==-1 ? lines.length : i+1
	}

	/**
	 * start from new layout
	 * @param {} line 
	 */
	appendComposed(line){
		if(this.isEmpty() && this.prev){
			/**
			 * current line must be recomposed if any rollback happens
			 */
			const {pagination={}}=line.props
			const {widow,orphan,keepLines,last}=pagination
			if(keepLines){
				if(this.prev.shouldKeepLinesWith(line)){//i!=1
					let lineCount=this.prev.orphanCount()
					this.prev.rollbackLines(lineCount)
					return lineCount+1
				}
			}else{
				if(orphan){
					if(this.prev.orphanCount(line)==1 && this.prev.lines.length>1){
						this.prev.rollbackLines(1)
						return 1+1
					}
				}

				if(widow){
					if(last){
						const orphanCount=this.prev.orphanCount(line)
						if(orphanCount>0 && this.prev.lines.length>orphanCount){
							this.prev.rollbackLines(1)
							if(orphan){
								if(orphanCount==2){
									this.prev.rollbackLines(1)
									return 2+1
								}
							}
							return 1+1
						}
					}
				}
			}

			if(this.prev.shouldKeepWithNext(line)){
				let removedLines=this.prev.rollbackLines(this.prev.orphanCount())
				//re-submit last paragraph
				const pid=this.getFlowableComposerId(removedLines[0])
				this.context.getComposer(pid).recommit()
				return 0+1
			}
		}

		return super.appendComposed(...arguments)
	}

	shouldKeepLinesWith(line){
		const pid=this.getFlowableComposerId(line)
		return this.getFlowableComposerId(this.lastLine)==pid &&
			this.getFlowableComposerId(this.firstLine)!=pid
	}

	shouldKeepWithNext(line){
		const should=
			(this.lastLine.props.pagination||{}).keepWithNext &&
			this.orphanCount(line)==0 &&
			this.getFlowableComposerId(this.firstLine)!==this.getFlowableComposerId(this.lastLine)
		return should
	}
	static Fixed=OrphanControlable
}

class Fixed extends OrphanControlable{
	static Fixed=Fixed
	getSpace(){
		const {width,height,margin:{left=0,right=0}={},x,y}=this.props
		return {
			x,y,
			left,
			right:width-right,
			blockSize:height,
		}
	}
	defineProperties(){
		super.defineProperties()
		Object.defineProperties(this,{
			composedHeight:{
				enumerable:true,
				configurable:true,
				get(){
					return this.blockOffset
				}
			}
		})
	}
	

	createComposed2Parent() {
		const {width,height=this.contentHeight, x,y,z,named}=this.props
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
		const content=this.positionLines(this.lines)
		return (
			<Group {...{width,height,x,y,z,named, className:"frame"}}>
				{this.anchors.map((a,i)=>React.cloneElement(a,{key:i}))}
				{React.cloneElement(content,{y:alignY(content.props.height)})}
			</Group>
		)
    }

	positionLines(lines){
		var y=0
		const content=lines.map((a,i,me,{props:{height=0}}=a)=>{
			const b=React.cloneElement(a,{key:i,y})
			y+=height
			return b
		})
        return (
            <Group height={y}>
                {content}
            </Group>    
        )
	}

	belongsTo(a,id){
		return new ReactQuery(a).findFirst(`[data-content="${id}"]`).get(0)
	}

	isEmpty(){
		return (this.lines.length+this.anchors.length)==0
	}

	isAnchored(id){
		return !!this.anchors.find(a=>this.belongsTo(a,id))
	}

	isIntersect(A,B){
		return new Rect(A.x, A.y, A.width, A.height).intersects(new Rect(B.x, B.y, B.width, B.height))
	}

	isDirtyIn(rect){
		if(this.wrappees.find(({props:{x,y,width,height}})=>this.isIntersect(rect,{x,y,width,height}))){
			return true
		}

		return this.isIntersect(rect,{x:0,y:0,width,height:this.blockOffset})
	}

	paragraphY(id){
		const prevLineOfThisParagraph=this.lines.findLast(line=>this.getParagraph(line)!=id)
		if(prevLineOfThisParagraph){
			return this.lineY(prevLineOfThisParagraph)
		}
		return 0
	}

	lineY(line){
		return this.lines.slice(0,this.lines.indexOf(line)+1)
			.reduce((Y,{props:{height=0}})=>Y+height,0)
	}

	lineX(line){
		return 0
	}

	getFlowableComposerId(line,filter){
		return new ReactQuery(line)
			.findFirst(`[data-type="paragraph"],[data-type="table"]`)
			.filter(filter)
			.attr("data-content")
	}
	getParagraph(line){
		return new ReactQuery(line)
			.findFirst(`[data-type="paragraph"]`)
			.attr("data-content")
	}

	layoutOf(){
		const {width,height}=this.props
		return {width,height}
	}

	//to make caller simple
	columnIndexOf(){
		return 0
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


export default Fixed

