import Path from "svgpath"
import simplify from "simplify-path"
import contours from "svg-path-contours"

class Shape extends Path{
	get isGeometry(){
		return true
	}
	toJSON(){
		return this.toString()
	}

    bounds(){
        const {left,right,top,bottom}=this.contour()
			.reduce(({left,top,right,bottom},[x,y])=>({
				left:Math.min(left,x),
				top:Math.min(top,y),
				right:Math.max(right,x),
				bottom:Math.max(bottom,y)
			}),{
				left:Number.MAX_SAFE_INTEGER,
				top:Number.MAX_SAFE_INTEGER,
				right:Number.MIN_SAFE_INTEGER,
				bottom:Number.MIN_SAFE_INTEGER,
			})
		return {left,right,top,bottom, width:right-left, height:bottom-top}
    }

	boundRect(){
		const {left,top,width,height}=this.bounds()
		return this.constructor.create({width,height,x:left,y:top})
	}

    contour(tolerance){
		this.__evaluateStack()
        return contours(this.segments)
            .map(a=>a.map(([x,y])=>[Math.ceil(x), Math.ceil(y)]))
            .map(a=>simplify(a,tolerance))
            .reduce((all,a)=>[...all,...a],[])
    }

    intersects(line/*{x1,x2,y1,y2}*/, tolerance){
        const points=this.contour(tolerance)
        return points.slice(1)
			.map(([x2,y2],i)=>{
				const [x1,y1]=points[i]
				return {x1,y1,x2,y2}
			})
			.map(line1=>line_line_intersect(line1,line))
			.filter(a=>!!a)
			.sort((a,b)=>a.x-b.x)
    }

    center(){
        const {left,right,top,bottom,x=(left+right)/2, y=(top+bottom)/2}=this.bounds()
        return {x,y}
    }

    clone(){
        return new this.constructor(this.toString())
    }

    size(strokeWidth=0){
        const {left,right,top,bottom,width=right-left,height=bottom-top}=this.bounds()
        return {width:width+strokeWidth,height:height+strokeWidth}
    }
	/**
	 * to extend or thrink shape vertically
	 * @param {*} changed 
	 * @returns 
	 */
	verticalExtend(changed){
		changed && console.error(`path.verticalExtend not implemented yet!`)
		return this
	}

	isIntersectedWith(another){
		const me=this.bounds(), other=another.bounds()
		if (me.width*me.height*other.width*other.height==0)
			return false;

		const x1 = Math.max(me.left, other.left);
		const x2 = Math.min(me.right, other.right);
		const y1 = Math.max(me.top, other.top);
		const y2 = Math.min(me.bottom, other.bottom);
		return x1 < x2 && y1 < y2
	}

	get width(){
		return this.size().width
	}

	get height(){
		return this.size().height
	}

	changeWidth(w){

	}

	changeHeight(h){

	}
}

export default class path extends Shape{
	static create(props){
		if(props instanceof Path)
			return props.clone()
		const created=(()=>{
			if(typeof(props)=="string"){
				return new path(props)
			}
			const {type="rect",...props0}=props
			if(!Shapes[type.toLowerCase()])
				throw new Error(`Shape doesn't support ${type} type`)
			return new Shapes[type.toLowerCase()](props0)
		})();
		if(created.err)
			throw new Error(created.err)
		return created
	}
	
	get type(){
		return "path"
	}

	get props(){
		return {d:this.toString()}
	}
}

class rect extends Shape{
	get type(){
		return "rect"
	}

	constructor({x=0,y=0,width=0,height=0,rx=0,ry=0}){
		super(`M${x},${y} h${width} v${height} h${-width}z`)
		this._rx=rx
		this._ry=ry
	}

	get props(){
		const {left:x, top:y,width,height}=super.bounds()
		return {x,y,width,height,rx:this._rx,ry:this._ry}
	}

	clone(){
		return new this.constructor(this.props)
	}

	bounds(){
		this.__evaluateStack()
		const [,left,top]=this.segments[0]
		const [,width]=this.segments[1]
		const [,height]=this.segments[2]
		return {left,top,width,height,right:left+width,bottom:top+height}
	}

	intersects({x1,x2=x1,y1,y2=y1}){
		if(y1==y2){
			const {left,right,top,bottom}=this.bounds(), y=y1
			if(y>=top && y<=bottom){
				const pos=[x1,x2,left,right].sort()
				const i=pos.indexOf(x1), j=pos.lastIndexOf(x2)
				return pos.slice(i+1,j).map(x=>({x,y}))
			}
			return []
		}else if(x1==x2){
			const {left,right,top,bottom}=this.bounds(),x=x1
			if(x>=left && x<=right){
				const pos=[y1,y2,top,bottom].sort()
				const i=pos.indexOf(y1), j=pos.lastIndexOf(y2)
				return pos.slice(i+1,j).map(y=>({y,x}))
			}
			return []
		}
		return super.intersects(...arguments)
	}

	changeWidth(width){
		return new this.constructor({...this.props,width}) 
	}

	changeHeight(){
		return new this.constructor({...this.props,height}) 
	}
}

class ellipse extends Shape{
	get type(){
		return "ellipse"
	}

	constructor({cx=0,cy=0,rx,ry=rx}){
		super(
			`M${cx},${cy} 
			 m -${rx} 0
			 a ${rx},${ry} 0 1,1 ${rx * 2},0
			 a ${rx},${ry} 0 1,1 -${rx * 2},0
			 z`
		)
	}

	get props(){
		this.__evaluateStack()
		const [,cx,cy]=this.segments[0]
		const [,rx,ry,xAxisRotation=0]=this.segments[2]
		return xAxisRotation==90 ? {cx,cy,rx:ry,ry:rx} : {cx,cy,rx,ry}
	}

	bounds(){
		const {cx,cy,rx,ry}=this.props
		return {left:cx-rx,right:cx+rx, top:cy-ry, bottom:cy+ry}
	}

	clone(){
		return new this.constructor(this.props)
	}

	changeWidth(w){
		return new this.constructor({...this.props, rx:w/2})
	}

	changeHeight(w){
		return new this.constructor({...this.props, ry:w/2})
	}
}

const Shapes={ellipse, rect}

const between=(a,b1,b2)=>((a >= b1) && (a <= b2))||((a >= b2) && (a <= b1))
function line_line_intersect(line1, line2) {
	var x1 = line1.x1, x2 = line1.x2, x3 = line2.x1, x4 = line2.x2;
	var y1 = line1.y1, y2 = line1.y2, y3 = line2.y1, y4 = line2.y2;
	var pt_denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	var pt_x_num = (x1*y2 - y1*x2) * (x3 - x4) - (x1 - x2) * (x3*y4 - y3*x4);
	var pt_y_num = (x1*y2 - y1*x2) * (y3 - y4) - (y1 - y2) * (x3*y4 - y3*x4);
	if (pt_denom == 0) {
		if(pt_x_num==0 && pt_y_num==0){//overlapped
			
		}
		//return "parallel"
	}else{
		var pt = {
			x: pt_x_num / pt_denom,
			y: pt_y_num / pt_denom
		}

		if ( between(pt.x, x1, x2)
			&& between(pt.y, y1, y2)
			&& between(pt.x, x3, x4)
			&& between(pt.y, y3, y4)) {
				return pt
		} else {
			//return "not in range"
		}
	}
}
