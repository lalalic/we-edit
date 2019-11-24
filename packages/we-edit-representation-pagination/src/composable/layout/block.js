import React, {} from "react"
import PropTypes from "prop-types"
import {dom, ReactQuery} from "we-edit"

import HasParentAndChild from "../hasParentAndChild"
import Group from "../../composed/group"
import Space from "./space"

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
class Block extends HasParentAndChild(dom.Container){
	static IMMEDIATE_STOP=Number.MAX_SAFE_INTEGER
	static propTypes={
		balance:PropTypes.bool, 
		balanceThreshold:PropTypes.number, 
		space:PropTypes.shape({
			width:PropTypes.number,
			height:PropTypes.number,
			cols:PropTypes.arrayOf(PropTypes.shape({
				x:PropTypes.number,
				width: PropTypes.number,
			})),	
			blockOffset: PropTypes.number,
			areas: PropTypes.arrayOf(PropTypes.object)
		}).isRequired,
		inheritExclusives:PropTypes.bool,
		allowOverflow:PropTypes.bool,
	}
	constructor(){
		super(...arguments)
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
					return this.computed.composed.filter(a=>a.props.y==undefined)
				}
			},
			totalLines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.lines.length
				}
			},
			anchors: {
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed.filter(a=>a.props.y!==undefined)
				}
			},
			wrappees: {
				enumerable:true,
				configurable:true,
				get(){
					return this.anchors.filter(({props:{wrap}})=>!!wrap)
				}
			},
			blockOffset:{//current block offset
				enumerable:true,
				configurable:true,
				get(){
					return this.lines.reduce((Y,{props:{height=0}})=>Y+height,0)
				}
			},
		})
	}

	appendComposed(content){
		this.computed.composed.push(content)
	}

	getSpace(){
		return this.props.space
	}

	/**
     * anchors with wrap can affect exclusives, so it need re-layout
     * anchor need know anchor host to position itself
     * **** so we'd better to give space of anchor host, 
     * **** so even anchor can position itself, and layout itself then
     */
    nextAvailableSpace({height:requiredBlockSize=0}={}){
		const {space={}, inheritExclusives,allowOverflow=false}=this.props
        var mySpace=Space.create({
            ...this.getSpace(),
			height:allowOverflow ? Number.MAX_SAFE_INTEGER : space.height||Number.MAX_SAFE_INTEGER,
			blockOffset:this.blockOffset,
            frame:this,
		})

		if(space.availableBlockSize<requiredBlockSize){
			return false
		}

		if(inheritExclusives){
			const parentSpace=this.context.parent.nextAvailableSpace()
			if(parentSpace && parentSpace.areas && parentSpace.areas.length>0)
				mySpace=mySpace.clone({areas})
		}

		if(this.wrappees.length>0){
            mySpace=mySpace.clone({areas:this.wrappees})
		}
		
		return mySpace
	}

	onAllChildrenComposed(){
		const content=this.createComposed2Parent()
		this.context.parent.appendComposed(content)
		super.onAllChildrenComposed()
	}

	createComposed2Parent(){
        const content=this.positionLines(this.lines)
		return (
			<Group height={content.props.height}>
                {this.anchros}
                {content}
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

	isAnchored(id){
		return !!this.anchors.find(a=>{
			return new ReactQuery(a).findFirst(`[data-content="${id}"]`).length==1
		})
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

	/**
	 * layout after pre() for only already layouted lines
	 * It's presumed: *** all content are in paragraphs, otherwise just append it directly***
	 * so it's should work to recommit alreay layouted paragraphs
	 * @returns: function to rollback/recover to last state
	 */
	recompose(pre=a=>a){
		const lastComposed=[...this.computed.composed]
		const rollback=()=>{
			this.computed.composed=lastComposed	
		}
		const recomposing=pre()
		try{
			this.computed.recomposing=true
			this.computed.composed=[]
			const lines=[...lastComposed]
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
		const remove=a=>this.computed.composed.splice(this.computed.composed.indexOf(a),1)[0]
		
		const  removedLines=this.lines.splice(-n).map(remove)

		const removedAnchors=(lines=>{
			const anchorId=a=>new ReactQuery(a).findFirst('[data-type="anchor"]').attr("data-content")
			const removingAnchorIds=Array.from(lines.reduce((ps, a)=>(ps.add(anchorId(a)),ps),new Set())).filter(a=>!!a)
			return this.computed.composed.filter(a=>removingAnchorIds.includes(anchorId(a))).map(remove)
		})(removedLines);

		return Object.assign(removedLines,{anchors:removedAnchors})
	}
}

/**
 * anchorable can layout positioned content, and ***MAY change space if supporting wrap***
 */
class Anchorable extends Block{
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
			if(this.recomposing){
				/**
				 * when space infeasible and recomposing
				 * paragraph must immediate stop, so to return back to outer layout
				 */
				return this.constructor.IMMEDIATE_STOP
			}
			return false
		}

        if(!anchor){
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

        const {geometry, y=0,"data-content":anchorId}=anchored.props
        if(!space.hasIntersection(geometry)){
            super.appendComposed(anchored)
            return 1
        }
        
        const anchoredBelowCurrentBlockOffset=y>space.blockOffset
        if(anchoredBelowCurrentBlockOffset){
            /**
             * it must be override with exclusive area
             * **keep block offset, and adjust inline offset
             */
            const x=space.getInlineSegements(y).segments.pop().props.x
            const relocatedAnchor=anchor.props.translate(x)
            super.appendComposed(relocatedAnchor)
            return 1
        }

        /**
		 * the area above current block offset is affected by this wrap area
		 * temporarily anchor it to exlude the wrap area, and relayout whole to see:
		 * if the anchor can be layouted within the space, keep re-layout result and continue 
		 * if not, rollback to last layout result, and return false
		 */ 
        let rollback
        try{
            rollback=this.recompose(()=>{
				super.appendComposed(anchored)
				super.appendComposed(line)
				return anchorId
			})

			const anchorPlaced=!!this.lines.findLast(a=>new ReactQuery(a).findFirst(`[data-anchor="${anchorId}]`).length==1)
            if(anchorPlaced){
                //current anchor wrap content can layout correctly as of now
                //then keep exclusives, and ignore current line
                return 1
            }else{
                //can't correctly layout
                //then keep last
                rollback()
                //notify space is not good enough, and ignore current line
                return false
            }
        }catch(e){
			rollback()
			return false
            console.warn(`recompose for anchor failed, and rollback also failed, but continue with unknown result`)
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
					return this.context.prevLayout && this.context.prevLayout(this)
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
		if(this.totalLines==0 && this.prev){
			/**
			 * current line must be recomposed if any rollback happens
			 */
			const {pagination:{widow,orphan,keepLines,last}={}}=line.props
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
}

/**
 * 
 * Layout for multiple ordered blocks, especially for columns
 * 1. share excluding areas
 * 2. more than one seperated block areas
 * cols:[{x,width,height}]
 * 
 * layout algorithm: 
 * still keep all lines in computed.composed
 * computed.columns keep information of each column
 */
class MultiBlocks extends OrphanControlable{
	isMultiBlocks(){
		const {cols}=this.getSpace()
		if(!cols || cols.length==0){
			return false
		}
		return true
	}

	get cols(){//normalize props.cols
		const {height:H,cols}=this.getSpace()
		return cols.map(({height=H,x=0,y=0,...a})=>({height,x,y,...a}))
	}

	/**
	 * context: use col's height to distribute lines to column.lines
	 */
	get columns(){
		const cols=this.cols
		const columns=this.lines.reduce(({offset,columns},a,i)=>{
			const col=cols[columns.length-1]
			const {height:lineHeight}=a.props
			if(offset+lineHeight<=col.height){
				columns[columns.length-1].push(a)
				offset+=lineHeight
			}else if(cols.length>columns.length){
				columns.push([a])
				offset=lineHeight
			}else{
				columns[columns.length-1].push(a)
			}
			return {offset,columns}
		},{offset:0,columns:[[]]}).columns
		return columns.map((lines,i)=>({...cols[i],lines}))
	}

	/**
	 * use col's height to distribute lines to column.lines
	 */
	getCurrent(requiredBlockSize=0){
		const cols=this.cols
		const columns=this.columns
		const i=columns.length-1
		const current=columns[i]
		const blockOffset=current.lines.reduce((H,{props:{height:h=0}})=>h+H,0)
		if(requiredBlockSize+blockOffset>current.height){
			if(cols.length>columns.length){
				return {col:cols[i+1],blockOffset:0}
			}else{
				return {}
			}
		}else{
			return {col:cols[i], blockOffset}
		}
	}

	/**
	 * When next col's space should be used?
	 * when a line is appended, it also should be appended to corresponding col, so
	 * when current col space is not feasible, next col should be used.
	 * *** transform original block space by current col{x,y,areas} ***
	 */
	nextAvailableSpace({height:requiredBlockSize=0}={}){
		if(!this.isMultiBlocks()){
			return super.nextAvailableSpace(...arguments)
		}

		const space=super.nextAvailableSpace()
		const {col:current,blockOffset}=this.getCurrent(requiredBlockSize)
	
		if(current){
			return space.clone({...current,blockOffset})
		}
		return false
	}
	
	positionLines(){
		if(!this.isMultiBlocks()){
			return super.positionLines(...arguments)
		}

		/**
		 * use col's height to distribute lines to column.lines
		 */
		const columns=this.columns
        const height=Math.max(...columns.map(({height:h})=>h))

		return (
			<Group height={height}>
				{columns.map(({lines,x,y,width,height},i)=>{
					return (
						<Group {...{x,y,width,height,key:`column${i}`}}>
							{super.positionLines(lines)}
						</Group>
					)
				})}
			</Group>
		)
	}


}

/**
 * to balance layout content in multiple blocks
 */
class BalanceableMultiBlocks extends MultiBlocks{
	onAllChildrenComposed(){
		if(this.isMultiBlocks() && this.props.balance){
			this.balance()
		}

		super.onAllChildrenComposed(...arguments)
	}

	balance(){
		const {balance}=this.props
		if(typeof(balance)=="function"){
			return balance.call(this)
		}

		const {space:{cols},balanceThreshold=1}=this.props
		const width=cols[0].width
		if(!this.cols.find(a=>Math.abs(width-a.width)<=balanceThreshold)){
			this.equalBalance()
		}else{
			this.anyBalance()
		}
	}

	/**
	 * if there's anchored wrappees, it should recompose
	 * otherwise do nothing 
	 */
	equalBalance(){
		const wrappees=this.wrappees
		if(wrappees.length==0)
			return
		this.anyBalance()
	}

	/**
	 * re-layout by total cols' width to get layout height
	 * then use it as each block height to re-layout again
	 */
	anyBalance(){
		const {space:{cols}}=this.props
		try{
			const superNextAvailableSpace=super.nextAvailableSpace.bind(this)
			//re-layout into col with totalWidth to get total height
			const totalWidth=cols.reduce((w,a)=>w+a.width,0)
			this.recompose(()=>{
				this.nextAvailableSpace=function(){
					const space=superNextAvailableSpace(...arguments)
					if(space){
						return space.clone({width:totalWidth,height:Number.MAX_SAFE_INTEGER})
					}
					return space
				}
			})
			const totalHeight=this.blockOffset

			//re-layout with totalHeight for each col
			this.recompose(()=>{
				this.nextAvailableSpace=function(){
					const space=superNextAvailableSpace(...arguments)
					if(space){
						return space.clone({height:totalHeight})
					}
					return space
				}
			})
		}finally{
			delete this.nextAvailableSpace
		}
    }
    
    positionLines(lines){
		const {balance}=this.props
		const {cols}=this.getSpace()
		if(!(balance && this.isMultiBlocks())){
			return super.positionLines(...arguments)
        }

        const colHeight=this.blockOffset/cols.length
        
		const {columns}=lines.reduce(function reduce(a,line){
			if(a.blockOffset+line.props.height<=colHeight || cols.length-1==a.col){
				a.blockOffset+=line.props.height
				a.columns[a.columns.length-1].lines.push(line)
			}else {
				a.col++
				a.blockOffset-=colHeight
				return reduce(...arguments)
			}
			return a
        },{blockOffset:0,columns:[{lines:[]}], col:0})

        const height=Math.max(...columns.map(({lines})=>lines.reduce((H,{props:{height:h=0}})=>h+H,0)))
        
		return (
			<Group height={height}>
				{columns.map((column,i)=>{
					const {x,y,width}=cols[i]
					return (
						<Group {...{x,y,width,height,key:`column${i}`}}>
							{OrphanControlable.prototype.positionLines.call(this,column.lines)}
						</Group>
					)
				})}
			</Group>
		)
	}
}

export default BalanceableMultiBlocks

/**
<Layout space={{width,height,areas}}>
	<Paragraph>
		<Text>hello</Text><Text>hello</Text><Image>hello</Image><Text>hello</Text>
	</Paragraph>
	<Paragraph>
		<Text>hello</Text><Text>hello</Text><Image>hello</Image><Text>hello</Text>
	</Paragraph>
</Layout>
 */