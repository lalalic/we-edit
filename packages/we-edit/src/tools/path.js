import Path from "svgpath"
import simplify from "simplify-path"
import contours from "svg-path-contours"
import memoize from "memoize-one"

export default class __$1 extends Path{
    static fromRect({x=0,y=0,width:w,height:h}){
        return new this(`M${x} ${y} h${w} v${h} h${-w}z`)    
    }

	static fromCircle({cx=0,cy=0,r}){
		return this.fromEllipse({cx,cy,rx:r, ry:r})
	}

	static fromEllipse({cx=0,cy=0,rx,ry}){
		return new this(`z`)
	}

	static fromElement({type, props}){
		switch(type){
			case "circle":
				return this.fromCircle(props)
			case "ellipse":
				return this.fromEllipse(props)
			case "rect":
				return this.fromRect(props)
			case "polyline":
			case "polygon":{
				const [a,...points]=props.points.trim().split(/\s+/g)
				return new this(`M${a} ${points.map(b=>`L${b}`).join(" ")} ${type=="polygon" ? "Z" : ""}`)
			}
			case "path":
				return new this(props.d)
		}
	}

	static toElement(path, source){
		const {type,props}=source
		switch(type){
			case "circle":{
				const {width:w,height:h}=this.fromCircle(props).bounds()
				const {W,H}=path.bounds()
				if(W==H){
					return {type, props:{...props,r:W/2}}
				}else{
					return {type:"ellipse", props:{...props, r:undefined, rx: props.r*W/w, ry: props.r*H/h}}
				}
			}
			case "ellipse":{
				const {width:w,height:h}=this.fromEllipse(props).bounds()
				const {W,H}=path.bounds()
				return {type, props:{...props, rx: props.rx*W/w, ry: props.ry*H/h}}
			}
			case "rect":{
				const {width,height}=path.rounds()
				return {type, props:{...props,width,height}}
			}
			case "polyline":
			case "polygon":{
				const data=path.toString().split(/[wlz\s,]/gi).map(a=>a.trim()).filter(a=>!!a)
				return {type, props:{...props, points:data.reduce((pos,a,i)=>{
					if(i%2 ===1){
						pos.push([parseFloat(data[i-1]), parseFloat(data[i])])
					}
					return pos
				},[])}}
			}
			case "path":
				return {type, props:{...props, d:path.toString()}}
		}
	}

    toString(){
        this.__evaluateStack()
        return memoize(d=>super.toString())(this.segments.map(a=>a.join("")).join(""))
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
		return this.constructor.fromRect({width,height,x:left,y:top})
	}

    contour(tolerance=1,d=this.toString()){
        return memoize((tolerance, d)=>contours(this.segments)
            .map(a=>a.map(([x,y])=>[Math.ceil(x), Math.ceil(y)]))
            .map(a=>simplify(a,tolerance))
            .reduce((all,a)=>[...all,...a],[])
        )();
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
}

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
