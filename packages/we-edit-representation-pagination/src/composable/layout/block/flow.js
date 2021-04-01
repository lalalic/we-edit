import React,{Component, Fragment} from "react"
import PropTypes from "prop-types"
import { dom, ReactQuery } from "we-edit"
import memoize from "memoize-one"
import { HasParentAndChild } from "../.."

import { Group } from "../../../composed"
import ConstraintSpace from "../constraint-space"
import {Rect} from "../../../tool/geometry"
import Path from "../../../tool/path"
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
 * line procols:
 * {props:{width,height,dy:block offset for a line,}}
 */
/**
 * layout content in a space with excludable areas
 * inline excludable & block excludable
 * excludable areas is changing along with content appended, then
 * inline re-layout and/or block re-layout
 * excludable space can answer if content can layout without/with space change
 * layout algorithm itself(such as line, page, and etc) decide how to re-layout
 * constraint space:{left,right, height, blockOffset}
 */
class Flow extends HasParentAndChild(dom.Frame) {
	static IMMEDIATE_STOP = Number.MAX_SAFE_INTEGER;
	
	constructor() {
		super(...arguments);
		this.computed.anchors = [];
		this.defineProperties();
	}
	defineProperties() {
		Object.defineProperties(this, {
			firstLine: {
				enumerable: true,
				configurable: true,
				get() {
					return this.lines[0];
				}
			},
			/**it provides replaceWith and detach */
			lastLine: {
				enumerable: true,
				configurable: true,
				get() {
					const lines = this.lines;
					return lines[lines.length - 1]
				}
			},
			lines: {
				enumerable: true,
				configurable: true,
				get() {
					return this.computed.composed;
				},
				set(values) {
					this.computed.composed = values;
				}
			},
			totalLines: {
				enumerable: true,
				configurable: true,
				get() {
					return this.lines.length;
				}
			},
			blockOffset: {
				enumerable: false,
				configurable: true,
				get() {
					const { blockOffset = 0 } = this.getSpace();
					return blockOffset + this.contentHeight;
				}
			},
			availableBlockSize: {
				enumerable: true,
				configurable: true,
				get() {
					if(this.lastLine?.props.pagination?.break){
						return 0
					}
					const {allowOverflow}=this.props
					if(allowOverflow||typeof(this.props.height)=="undefined")
						return Number.MAX_SAFE_INTEGER
					const { height=Number.MAX_SAFE_INTEGER } = this.getSpace();
					return height - this.contentHeight;
				}
			},
			anchors: {
				enumerable: true,
				configurable: false,
				get() {
					return this.computed.anchors;
				},
				set(values) {
					this.computed.anchors = values;
				}
			},
			wrappees: {
				enumerable: true,
				configurable: true,
				get() {
					const {space:{wrappees=[]}={}}=this.props
					return [...wrappees, ...this.anchors.filter(({ props: { wrap } }) => !!wrap)];
				}
			},
			contentHeight: {
				enumerable: true,
				configurable: true,
				get() {
					return this.lines.reduce((H, { props: { height: h = 0, dy=0 } }) => h + H+dy, 0);
				}
			},
			inclusiveGeometry: {
				enumerable:false,
				configurable:true,
				get(){
					const {space:{inclusive}={}}=this.props
					if(inclusive){
						return createInclusive(inclusive)
					}
				}
			}
		});

		const createInclusive=memoize(path=>new Path(inclusive))
	}
	
	onAllChildrenComposed() {
		const {autoCompose2Parent=true}=this.props
		const content = autoCompose2Parent ? this.createComposed2Parent() : this
		this.context.parent.appendComposed(content);
		super.onAllChildrenComposed();
	}

 	/**
	* use x as positioned indicator, 
	* @TODO: in future y MAY be used for a positioned line on following situations to make layout engine simpler??!!, current inline layout use dy to prepend to a line
	* 1. wrappee with CLEEAR mode, which will create a block unavailable for inline layout
	* 2. wrappee is larger than inline size, or is large enough not able to layout an atom for inline layout
	* @resolved: use dy to indicate block offset layout
	*/
	appendComposed(line) {
		const {x:positioned, height: requiredBlockSize=0}=line.props
		if (positioned!=undefined) {
			this.anchors.push(line);
		} else if (this.nextAvailableSpace({ height: requiredBlockSize })){
			return this.appendFlowBlock(line)
		} else {
			return false
		}
	}

	appendFlowBlock(line){
		this.lines.push(line)
	}


	//default use props.space
	getSpace() {
		const {
			width,height=Number.MAX_SAFE_INTEGER,
			margin:{left=0,right=0,top=0,bottom=0}={},
			x=0,y=0,
			edges={
				[this.getComposeType()]:{left:x,top:y,right:x+width,bottom:y+height},
				margin:{left:x+left,top:y+top,right:width+x-right,bottom:y+height-bottom}
			},
			space
		}=this.props
		
		return ConstraintSpace.create(space||{
			left:x+left,
			right:x+width-right,
			blockOffset:y+top,
			height:height-top-bottom,
		}).clone({edges})
	}

	positionLines(lines) {
		var y = 0;
		const content = lines.map((a, i, me, ctx, { props: { height = 0, dy=0, ...props } } = a) => {
			const b = React.cloneElement(a, {...props, key: i, y:y+dy, height });
			y += height+dy;
			return b;
		});
		return (<Group height={y}>{content}</Group>);
	}
    /**
     * only when there are avaialable block
     * Not allow empty frame
     * @param {*} param0
     */
	nextAvailableSpace({ height: requiredBlockSize = 1 } = {}) {
		if (this.isEmpty()
			|| this.availableBlockSize >= requiredBlockSize) {
			const space=this.getSpace()
			const inlineLayoutSpace=ConstraintSpace.create(space||{}).clone({
				blockOffset: this.blockOffset,
				height: this.availableBlockSize,
				frame: this,
				findInlineSegments(requiredBlockSize, atLeastHaveOneSegmentWidth=1, blockOffset=this.blockOffset){
					const left=this.left, right=this.right
					var wrappees = this.frame.exclusive(blockOffset, blockOffset + requiredBlockSize, left, right);
					
					/**find the nearest top that can start flow content if wrappees as number specify next available blockOffset */
					var top = blockOffset;
					while (typeof (wrappees) == "number") {
						top = wrappees;
						wrappees = this.frame.exclusive(top, top + requiredBlockSize, left, right);
					}

					const space = this.frame.nextAvailableSpace({ height: top - this.frame.blockOffset + requiredBlockSize });
					if (!space) 
						return space
					
					/** transform exclusive space to acceptable space */
					const segments=wrappees.reduce((ops, { x, width}) => {
							const [last] = ops.splice(-1);
							return [...ops, { x: last.x, width: x - last.x}, { x: x + width, width: right - x - width }];
						}, [{ x: left, width: right - left }])
						.filter(a=>a.width>0)

					if(wrappees.length==0 || segments.find(a=>a.width>=atLeastHaveOneSegmentWidth)){
						console.debug(`segments: ${JSON.stringify(segments)}`)
						return {
							/**unavailable block to contain flow content*/
							dy:top-this.frame.blockOffset,
							segments
						}
					}else{
						const untilYs=wrappees.map(a=>a.y).filter(y=>y!=undefined)
						if(untilYs.length==0)
							return null
						const maxY=Math.max(...untilYs)
						if(maxY>=this.frame.blockOffset+this.frame.availableBlockSize)
							return null
					
						return inlineLayoutSpace.findInlineSegments(requiredBlockSize, atLeastHaveOneSegmentWidth, maxY)
					}
				},
				isAnchored(id){
					return this.frame.isAnchored(id)
				}
			})
			return inlineLayoutSpace
		}
		return false;
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
	exclusive(y1, y2, x1, x2) {
		const line = { x1, x2, y1, y2 };
		var excludes = this.wrappees.reduce((collected, { props: { wrap } }) => {
			const blocks = wrap(line);
			collected.splice(collected.length, 0, ...(Array.isArray(blocks) ? blocks : [blocks]));
			return collected;
		}, [])
			.filter(a => !!a)
			.filter(a => a.width > 0)
			.sort((a, b) => a.x - b.x);
		const clears = excludes.filter(a => a.type == "clear");
		if (clears.length > 0) {
			return Math.max(...clears.map(a => a.y));
		}
		if (excludes.length > 1) {
			//merge such as [{x:3,width:5},{x:4,width:6}]=>[{x:3,width:7}]
			excludes.forEach(a => a.x2 = a.x + a.width);
			excludes = excludes.reduce((wrapees, a) => {
				const b = wrapees[wrapees.length - 1];
				if (a.x2 > b.x2) {
					if (a.x > b.x2) { //seperated
						wrapees.push(a);
					}
					else { //intersect
						b.x2 = a.x2;
						b.width = b.x2 - b.x;
					}
				}
				return wrapees;
			}, [excludes[0]]);
			excludes.forEach(a => delete a.x2);
		}
		console.debug(`exclude: ${JSON.stringify({line, excludes})}`)
		return excludes;
	}
    /**
     * recompose for space since layouted space will be changed, such as wrap and balance
	 * layout after pre() for only already layouted lines
     * It's presumed: *** all content are in paragraphs, otherwise just append it directly***
     * so it should work to recommit alreay layouted paragraphs
     * @returns: function to rollback/recover to last state
     */
	recompose(init = a => a) {
		if(!this.recompose.deadLoop)
			this.recompose.deadLoop=1
		if(++this.recompose.deadLoop>10000){
			debugger
		}
		/**
         * if it's empty frame, recompose would not happen
         */
		if (this.isEmpty()) {
			init(this.lines,this.anchors);
			return a => a;
		}
		const lastLines = [...this.lines];
		const lastAnchors = [...this.anchors];
		const lastColumns = this.cols ? [...this.columns] : undefined;
		const rollback = () => {
			this.lines = lastLines;
			this.anchors = lastAnchors;
			if (lastColumns)
				this.columns = lastColumns;
		};
		try {
			//reset composed
			this.lines = [];
			this.anchors = [];
			this.columns=[]

			//initialize for recompose
			const lines = [...lastLines]
			this.computed.recomposing = init(lines, [...lastAnchors]);

			const getParagraphId=line=>new ReactQuery(line).findFirst(`[data-type="paragraph"]`).attr("data-content")
			/**
			 * To recommit each paragraph's lines in this block from top to bottom
			 * Every time line paragraph changed, last paragraph would recommit 
			 */
			var currentParagraph = null;
			var currentParagraphLines = [];
			for (let i = 0, line; i < lines.length; i++) {
				line = lines[i];
				const paragraphOfLine = getParagraphId(line)
				if (!paragraphOfLine) { //not paragraph, then append directly
					if (currentParagraph) {
						this.context.getComposer(currentParagraph).recommit(currentParagraphLines);
						currentParagraph = null;
						currentParagraphLines = [];
					}
					this.appendComposed(line);
				}
				else {
					if (!currentParagraph) {
						currentParagraph = paragraphOfLine;
						currentParagraphLines.push(line);
					}
					else {
						if (paragraphOfLine !== currentParagraph) {
							this.context.getComposer(currentParagraph).recommit(currentParagraphLines);
							currentParagraph = paragraphOfLine;
							currentParagraphLines = [line];
							continue;
						}
						else {
							currentParagraphLines.push(line);
							continue;
						}
					}
				}
			}
			//last paragraph 
			if (currentParagraph) {
				this.context.getComposer(currentParagraph).recommit(currentParagraphLines);
			}
		}
		catch (e) {
			console.error(e);
		}
		finally {
			delete this.computed.recomposing;
			return rollback;
		}
	}
    /**
     * to re-layout last n lines
     * anchors in line should be removed too
     * @param {number} n
     * @returns [...removed line].anchros=[...removed anchor id]
     */
	rollbackLines(n) {
		return n==0 ? [] : this.lines.splice(-n);
	}

	isEmpty(){
		return (this.lines.length+this.anchors.length)==0
	}
	
	isAnchored(id){
		return !!this.anchors.find(a=>new ReactQuery(a).findFirst(`[data-content="${id}"]`).length==1)
	}

	_isIntersect(A,B){
		return new Rect(A.x, A.y, A.width, A.height).intersects(new Rect(B.x, B.y, B.width, B.height))
	}

	static get Async(){
		return this.__getAsync(this)
	}

	static __getAsync=memoize(SyncTypeFrame=>{
		return class extends Component{
			static displayName="async"
			static childContextTypes={
				parent: PropTypes.object,
				mount: PropTypes.func,
				getComposer: PropTypes.func,
				shouldContinueCompose: PropTypes.func,
			}
			
			static propTypes={
				"data-nocontent": PropTypes.bool,
				childContext:PropTypes.shape(this.childContextTypes),
			}
			
			static defaultProps={
				"data-nocontent": true,
			}

			static contextTypes={
				responsible: PropTypes.object,
			}

			constructor(){
				super(...arguments)
				this.onComposed=this.onComposed.bind(this)
				this.composedUpdater=React.createRef()
			}

			getChildContext(){
				return {
					parent:{appendComposed:frame=>this.frame=frame,},
					shouldContinueCompose: a=>true,
					...this.props.childContext,
				}
			}

			shouldComponentUpdate({hash}){
				return hash!=this.props.hash
			}

			render(){
				const {props:{children, onComposed, ...props}}=this
				return (
					<Fragment>
						{[
							<this.constructor.Updater ref={this.composedUpdater} key="composed"/>,
							<SyncTypeFrame {...props} key={props.id}>{children}</SyncTypeFrame>
						]}
					</Fragment>
				)
			}

			componentDidMount(){
				this.onComposed()
			}

			componentDidUpdate(){
				this.onComposed()
			}

			onComposed(){
				if(this.frame && this.composedUpdater.current){
					const {onComposed=a=>a}=this.props
					const composed=this.frame.createComposed2Parent().props.children
					this.composedUpdater.current.setState({composed},()=>onComposed(composed, this.context.responsible))
				}
			}

			static Updater=class AsyncUpdater extends Component{
				state={composed:null}
				render(){
					return this.state.composed
				}
			}
		}
	})
}

/**
 * Inclusive Layout Mode for inclusive space
 * conditions:
 * 1. {props:{space:{inclusive:"<path>"}}}
 * 2. 
 */
export default class Inclusive extends Flow{
	defineProperties(){
		super.defineProperties()
		
		const createInclusive=memoize(path=>new Path(path))
		
		Object.defineProperties(this,{
			inclusiveGeometry: {
				enumerable:false,
				configurable:true,
				get(){
					const {cols, space:{inclusive}={}}=this.props
					if(inclusive){
						if(cols && cols.length>0){
							throw new Error(`inclusive layout can't support cols, please remove cols or space.inclusive from Frame`)
						}
						return createInclusive(inclusive)
					}
				}
			}
		});		
	}

	inclusive(y1, y2, x1, x2){
		const {top:min,bottom:max, left,right}=this.inclusiveGeometry.bounds()
		if(Math.max(y1,y2)<min){
			return min
		}else if(Math.min(y1,y2)>max){
			return [{x:left, width:right-left}]
		}
		
		const includes=this.inclusiveGeometry.intersects({ x1, x2, y1, y2:y1})
		if(includes.length<2)
			return y1+5
		includes.sort((a,b)=>a.x-b.x)
		const [{x,width}]=new Array(Math.floor(includes.length/2)).fill(0).map((_,i)=>{
			return {
				x: includes[i].x,
				width:includes[i+1].x-includes[i].x,
			}
		})
		return [{x:left,width:x-left},{x:x+width,width:right-x-width}]
	}

	exclusive(){
		if(this.inclusiveGeometry){
			return this.inclusive(...arguments)
		}
		return super.exclusive(...arguments)
	}

	getSpace(){
		if(this.inclusiveGeometry){
			const {left,right,top,bottom}=this.inclusiveGeometry.bounds()
			return ConstraintSpace.create(this.props.space)
				.clone({
					left:left-1,
					right:right+1,
					height:bottom-top,
					blockOffset:top,
				})
		}

		return super.getSpace()
	}

	positionLines(lines){
		const positioned=super.positionLines(...arguments)
		if(!this.inclusiveGeometry)
			return positioned
		
		const {left:x,top:y}=this.inclusiveGeometry.bounds()
		return React.cloneElement(positioned,{
			children:[
				<path d={this.inclusiveGeometry.toString()} style={{stroke:"black",strokeWidth:1,fill:"none"}}/>,
				React.cloneElement(positioned,{x,y}),
			]
		})
	}
}
