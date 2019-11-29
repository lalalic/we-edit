import React from "react"
import OrphanControlable from "./orphan-controlable"
import {Group} from "../../../composed"
/**
 * {props:{space, cols=[{x,width,[y,height]}, ...]}}
 * space is shared by cols, including wrappees, left,right, blockOffset, and height
 * each col is a rect relative to space(left, this.blockOffset) if space exist
 * otherwise each col shape a space {x as left, right:x+width, height, y as blockOffset}
 */
export default class Columnable extends OrphanControlable {
	defineProperties() {
		super.defineProperties();
		if (!this.props.cols)
			return;
		this.computed.columns = [];
		Object.defineProperties(this, {
			blockOffset: {
				enumerable: false,
				configurable: true,
				get() {
					return this.currentColumn.blockOffset;
				}
			},
			availableBlockSize: {
				enumerable: true,
				configurable: true,
				get() {
					return this.currentColumn.availableBlockSize;
				}
			},
			contentHeight: {
				enumerable: false,
				configurable: true,
				get() {
					return Math.max(...this.columns.map(a => a.height));
				}
			},
			currentColumn: {
				enumerable: true,
				configurable: true,
				get() {
					const columns = this.columns;
					if (columns.length == 0)
						this.createColumn();
					return columns[columns.length - 1];
				}
			},
			cols: {
				enumerable: true,
				configurable: true,
				get() {
					return this.props.cols;
				}
			},
			columns: {
				enumerable: true,
				configurable: true,
				get() {
					return this.computed.columns;
				},
				set(values) {
					return this.computed.columns = values;
				}
			}
		});
	}
	createColumn() {
		const column = {
			...this.cols[this.columns.length],
			children: ColumnChildren.create(this, ...arguments),
			get isEmpty() {
				return this.children.length == 0;
			},
			get availableBlockSize() {
				const { height = Number.MAX_SAFE_INTEGER, y = 0 } = this;
				return height - (this.blockOffset - y);
			},
			get blockOffset() {
				const { y = 0 } = this;
				return this.children.reduce((Y, { props: { height = 0 } }) => Y + height, y);
			},
			get contentHeight() {
				return this.lines.reduce((H, { props: { height: h = 0 } }) => h + H, 0);
			}
		};
		this.columns.push(column);
		return column;
	}

	/**check class explaination */
	getSpace(column) {
		const space = super.getSpace(...arguments);
		if (!this.cols)
			return space;
		const { left = 0, right = 0, blockOffset = 0, height: H } = space || {};
		const { width = right - left, x = left, height = H, y = blockOffset } = column||this.currentColumn;
		return {
			...space,
			left: x,
			right: x + width,
			blockOffset: y,
			height,
		};
	}
	nextAvailableSpace() {
		const space = super.nextAvailableSpace(...arguments);
		if (space == false && this.cols) {
			if (this.currentColumn.isEmpty) {
				/** not allow empty column, so ignore required*/
				return super.nextAvailableSpace();
			}
			const hasMoreColumn = this.cols.length > this.columns.length;
			if (hasMoreColumn) {
				this.createColumn();
				/** ignore required for a new column*/
				return super.nextAvailableSpace();
			}
		}
		return space;
	}

	positionLines() {
		if(!this.cols)
			return super.positionLines(...arguments)
		const height=Math.max(...this.columns.map(({height=0})=>height))
		return (
			<Group height={height}>
				{this.columns.map(({x,y,width,height,children},i)=>{
					return React.cloneElement(super.positionLines(children),{x,y,width,height,key:i})
				})}
			</Group>
		)
	}
}

class ColumnChildren{
    constructor(frame,startIndex=frame.computed.composed.length){
		this.frame=frame
        this.startIndex=startIndex
    }
    
    static create(){
        return new Proxy(new ColumnChildren(...arguments),{
            get(obj, prop){
                switch(prop){
                case Symbol.isConcatSpreadable:
                    return true 
                case "target":
                    return obj
                default:
                    if(prop in obj)
                        return obj[prop]
                    const items=obj.items
                    if(prop in items){
                        const f=items[prop]
                        if(typeof(f)=="function"){
                            return f.bind(items)
                        }
                        return f
                    }
                    return ()=>obj.unsupport(`not supported ColumnChildren[${prop}]`)
                }
            }
        })
    }

	get endIndex(){
		const columns=this.frame.columns
		const i=columns.findIndex(a=>a.children.target==this)
		const nextColumn=columns[i+1]
		return nextColumn ? nextColumn.startIndex : this.frame.lines.length
    }
    
    get items(){
        return this.frame.lines.slice(this.startIndex,this.endIndex)
    }

    get length(){
        return this.endIndex-this.startIndex
    }

    unsupport(msg){
        console.error(msg)
    }

    push(){
		this.frame.lines.splice(this.endIndex,0,...arguments)
    }
    
    splice(i,j,...as){
        throw new Error("not supported")
    }
}