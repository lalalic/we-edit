/**
 * it's to describe space that layout engine use
 * width: inline size
 * height: block size
 * blockOffset: current block offset
 * exclusives: excluded areas in a space
 */

/**
 * space can be constrained by inline size, block size, or both
 * exclusives affected
 */
import React,{Component} from "react"
import PropTypes from "prop-types"
import Group from "../../composed/group"

 export default class Space extends Component{
    static create({width,height,geometry,...props}){
        return new Rect(...arguments)
    }

    constructor({geometry,wrappees=[]}){
        super(...arguments)
        this.geometry=geometry
        this.areas=wrappees
    }

    /**
     * an inline rect may be intersected with exclusives,
     * so the rect would be splitted to a set of segments like 
     * [{x,width},{x,width},...]
     * @param {*} blockSize 
     */
    getInlineSegements(blockSize=0){
        return 
    }

    exclude(exclusive){
        this.exclusives.splice(this.exclusives.length,0,...arguments)
        return this
    }

    /**
     * 1. translate areas to new {x,y}
     * 2. merge areas
     * @param {*} props 
     */
    clone(props){
        const space=this.constructor.create({...this.props, ...props})
        if(typeof(props.x)!="undefined" || typeof(props.y)!="undefined"){

        }
        return space
    }

    translate(area,left,top){
        return area
    }

    excludeArea(){

    }

    includes(atom){
        return this.props.includes(...arguments)
    }
 }

 export class Rect extends Space{
     constructor({width,height,blockOffset,...others}){
         super({geometry:`m0 0h${width}v${height}h${-width}z`,...arguments[0]})
         this.width=width
         this.height=height
         this.blockOffset=blockOffset
         this.availableBlockSize=height-blockOffset
     }

     getInlineSegements(blockSize=0){
        return new InlineSegments({offset:blockSize, segments:[new InlineSegment({x:0,width:this.width})]})
     }

     exclude({left=0,right=0,top=0,bottom=0}){
        var excluded=this
        if(bottom){
            excluded=excluded.clone({height:excluded.height-bottom})
        }
        if(right){
            excluded=excluded.clone({width:excluded.width-right})
        }
        if(left || top){
            excluded=excluded.clone({
                width:excluded.width-left, 
                height:excluded.height-top,
                exclusives:this.exclusives.map(a=>this.translate(a,left,top))
            })
        }

        return excluded
     }

     hasIntersection(){
         return false
     }
 }


 export class InlineSegments extends Component{
    static propTypes={
        offset: PropTypes.number,
        segments:PropTypes.arrayOf(InlineSegment)
    }

    static create({segments,wrappees,...props}){
        if(wrappees){
            segments=wrappees.reduce(({X, segs},{x,width})=>{
                return {segs:[...segs, {x:X,width:x-X}],X:x+width}
            },{X:0,segs:[]}).segs
        }
        return new InlineSegments({segments:segments.map(a=>new InlineSegment(a)),...props})
    }

    constructor({segments=[]}={segments:[]}){
        super(...arguments)
        this.segments=segments
    }

    get items(){
        return this.segments.reduce((all,segment)=>[...all, ...segment.items],[])
    }

    get current(){
        return this.segments.findLast((a,i)=>a.items.length>0||i==0)
    }

    hold(items){
        let i=0,len=items.length
        for(let j=0,l=this.segments.length;j<l;j++){
            let segment=this.segments[j]
            for(;i<len;i++){
                let item=items[i]
                if(segment.push(item)===false){
                    break
                }else{
                    continue
                }
            }
        }
        if(i<len){
            return false
        }
    }

    push(atom){
        const i=this.segments.findLastIndex((a,i)=>a.items.length>0||i==0)
        return !!this.segments.slice(i).find(a=>{
                if(a.push(atom)!==false){
                    return true
                }
            })
    }

    pushAtomic(){

    }

    pushTab(){

    }

    pushLinebreak(){

    }

    pushHyphen(){
        
    }

    render(){
        const {children,x}=this.segments.reduce((rendered,{items,props:{x=0,width=0}},i)=>{
            if(rendered.x!=x){
                return {x:x+width,children:[...rendered.children, <Group x={rendered.x} width={x-rendered.x}/>,...items]}
            }else{
                return {x:x+width,children:[...rendered.children,...items]}
            }
        },{children:[],x:0})
        return children
    }
}

class InlineSegment extends Component{
    static propTypes={
        x: PropTypes.number,
        width: PropTypes.number,
    }

    constructor({x,width}){
        super(...arguments)
        this.items=[]
    }

    get contentWidth(){
        return this.items.reduce((X,a)=>X+a.props.width,0)
    }

    get availableWidth(){
        return this.props.width-this.contentWidth
    }

    push(atom){
        if(this.availableWidth>=(atom.props.width||0)){
            this.items.push(atom)
        }else{
            return false
        }
    }

    render(){
        const {x=0,width}=this.props
        let X=x
        return (
            <Group x={x} width={width}>
                {this.items.map(a=>{
                    const located=React.cloneElement(a,{x:X})
                    X+=(a.props.width||0)
                    return located
                })}
            </Group>
        )
    }
}



/**
 * <Space inlineSize={} blockSize={} exclusives={[{x,y,geometry},...]}>
 *  <InlineSegments blockAt={} blockSize={}>
 *      <InlineSegment/><InlineSegment/><InlineSegment/>
 *  </InlineSegments>
 * </Space>
 */