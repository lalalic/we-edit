import React from "react"
import PropTypes from "prop-types"
import { dom, ReactQuery } from "we-edit"
import { HasParentAndChild } from "../.."
import { Group } from "../../../composed"
import ConstraintSpace from "../space"
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
 * constraint space:{left,right, height, blockOffset}
 */
export default class Flow extends HasParentAndChild(dom.Container) {
	static IMMEDIATE_STOP = Number.MAX_SAFE_INTEGER;
	static propTypes = {
		balance: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
		balanceThreshold: PropTypes.number,
		space: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number,
			blockOffset: PropTypes.number,
			height: PropTypes.number,
			wrappees: PropTypes.arrayOf(PropTypes.object)
		}),
		cols: PropTypes.arrayOf(PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number,
			width: PropTypes.number,
			height: PropTypes.number,
		})),
		inheritExclusives: PropTypes.bool,
		allowOverflow: PropTypes.bool,
	};
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
					const me = this;
					return new Proxy(lines[lines.length - 1], {
						get(line, prop) {
							if (prop == "replaceWith") {
								return replacement => me.lines.splice(-1, 1, replacement);
							}
							else if (prop == "detach") {
								return () => me.lines.splice(-1, 1);
							}
							return line[prop];
						}
					});
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
					const { height } = this.getSpace();
					return height - this.contentHeight;
				}
			},
			anchors: {
				enumerable: true,
				configurable: true,
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
					return this.anchors.filter(({ props: { wrap } }) => !!wrap);
				}
			},
			contentHeight: {
				enumerable: true,
				configurable: true,
				get() {
					return this.lines.reduce((H, { props: { height: h = 0 } }) => h + H, 0);
				}
			}
		});
	}
	onAllChildrenComposed() {
		const content = this.createComposed2Parent();
		this.context.parent.appendComposed(content);
		super.onAllChildrenComposed();
	}
	appendComposed(line) {
		const { props: { y: positioned } } = line;
		if (positioned != undefined) {
			this.anchors.push(line);
		}
		else {
			this.lines.push(line);
		}
	}
	//default use props.space
	getSpace() {
		return this.props.space;
	}

	positionLines(lines) {
		var y = 0;
		const content = lines.map((a, i, me, ctx, { props: { height = 0 } } = a) => {
			const b = React.cloneElement(a, { key: i, y });
			y += height;
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
		const { allowOverflow = false } = this.props;
		if (this.isEmpty()
			|| this.availableBlockSize >= requiredBlockSize) {
			return ConstraintSpace.create({
				...this.getSpace(),
				blockOffset: this.blockOffset,
				height: !allowOverflow ? this.availableBlockSize : Number.MAX_SAFE_INTEGER,
				frame: this,
				findInlineSegments: (requiredBlockSize, left, right) => {
					const blockOffset = this.blockOffset;
					var wrappees = this.exclusive(blockOffset, blockOffset + requiredBlockSize, left, right);
					var top = 0;
					while (typeof (wrappees) == "number") {
						top = wrappees;
						wrappees = this.exclusive(top, top + requiredBlockSize, left, right);
					}
					const space = this.nextAvailableSpace({ height: top - blockOffset + requiredBlockSize });
					if (space) {
						return {
							top,
							segments: wrappees.reduce((ops, { x, width }) => {
								const [last] = ops.splice(-1);
								return [...ops, { x: last.x, width: x - last.x }, { x: x + width, width: right - x - width }];
							}, [{ x: left, width: right - left }])
						};
					}
					return space;
				},
				isAnchored: id => this.isAnchored(id)
			});
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
		return excludes;
	}
    /**
     * layout after pre() for only already layouted lines
     * It's presumed: *** all content are in paragraphs, otherwise just append it directly***
     * so it's should work to recommit alreay layouted paragraphs
     * @returns: function to rollback/recover to last state
     */
	recompose(pre = a => a) {
        /**
         * if it's empty frame, recompose would not happen
         */
		if ((this.lines.length + this.anchors.length) == 0) {
			pre();
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
			this.computed.recomposing = pre();
			this.lines = [];
			this.anchors = [];
			const lines = [...lastLines];
			var currentParagraph = null;
			var currentParagraphLines = [];
			for (let i = 0, line; i < lines.length; i++) {
				line = lines[i];
				const linePID = this.getFlowableComposerId(line, `[data-type="paragraph"]`);
				if (!linePID) { //not paragraph, then append directly
					if (currentParagraph) {
						this.context.getComposer(currentParagraph).recommit(currentParagraphLines);
						currentParagraph = null;
						currentParagraphLines = [];
					}
					this.appendComposed(line);
				}
				else {
					if (!currentParagraph) {
						currentParagraph = linePID;
						currentParagraphLines.push(line);
					}
					else {
						if (linePID !== currentParagraph) {
							this.context.getComposer(currentParagraph).recommit(currentParagraphLines);
							currentParagraph = linePID;
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
		if (n == 0) {
			return Object.assign([], { anchors: [] });
		}
		const removedLines = this.lines.splice(-n);
		const removedAnchors = (lines => {
			const remove = a => this.anchors.splice(this.anchors.indexOf(a), 1)[0];
			const anchorId = a => new ReactQuery(a).findFirst('[data-type="anchor"]').attr("data-content");
			const removingAnchorIds = Array.from(lines.reduce((ps, a) => (ps.add(anchorId(a)), ps), new Set())).filter(a => !!a);
			return this.anchors.filter(a => removingAnchorIds.includes(anchorId(a))).map(remove);
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
		return Object.assign(removedLines, { anchors: removedAnchors });
	}

	getFlowableComposerId(line,filter){
		return new ReactQuery(line)
			.findFirst(`[data-type="paragraph"],[data-type="table"]`)
			.filter(filter)
			.attr("data-content")
	}

	isEmpty(){
		return (this.lines.length+this.anchors.length)==0
	}
	
	belongsTo(a,id){
		return new ReactQuery(a).findFirst(`[data-content="${id}"]`).get(0)
	}

	isAnchored(id){
		return !!this.anchors.find(a=>this.belongsTo(a,id))
	}

	isIntersect(A,B){
		return new Rect(A.x, A.y, A.width, A.height).intersects(new Rect(B.x, B.y, B.width, B.height))
	}
}
