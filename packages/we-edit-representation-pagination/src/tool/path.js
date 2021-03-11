import Path from "svgpath"
import simplify from "simplify-path"
import contours from "svg-path-contours"
import memoize from "memoize-one"

export default class __$1 extends Path{
    static fromRect({x,y,width:w,height:h}){
        return new this(`M${x} ${y} h${w} v${h} h${-w}z`)    
    }

	static fromCircle({cx,cy,r}){
		const circle=`M (${cx - r}), ${cy}
		a ${r},${r} 0 1,0 (${r * 2}),0
		a ${r},${r} 0 1,0 -(${r * 2}),0`
		return new this(circle)
	}

	static fromEllipse({cx,cy,rx,ry}){
		
	}

    toString(){
        this.__evaluateStack()
        return memoize(d=>super.toString())(this.segments.map(a=>a.join("")).join(""))
    }

    bounds(){
        return this.contour()
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
