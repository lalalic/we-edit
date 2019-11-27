/**
 * it's to describe space that layout engine use
 * left <--> right: inline size
 * blockOffset: current block offset
 * height: available block size, blockOffset <--->last block layout opportunities
 * wrappees: excluded areas in a space
 */

/**
 * space can be constrained by inline size, block size, or both, 
 * and exclusive wrappees
 */
import React,{Component} from "react"
import PropTypes from "prop-types"
import Group from "../../composed/group"

 export default class MySpace{
    static create(){
        return new MySpace(...arguments)
    }

     constructor(props={}){
        Object.assign(this,props)
        this.props=props
     }

     clone(props){
        return new MySpace({...this.props, ...props})
     }
 }
 
 class Space extends Component{
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
     * @param {*} blockOffset 
     */
    getInlineSegements(height,left,right){
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
        left: PropTypes.number,
        segments:PropTypes.arrayOf(InlineSegment)
    }

    static create({segments=[],...props}){
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

    get currentX(){
        const {x=0,items}=this.current
        return items.reduce((X,{props:{width=0}})=>X+width,x)
    }

    shouldRelayout({segments}){
        const bSame=segments 
            &&this.segments.length==segments.length 
            &&!this.segments.find(({props:a},i,c,b=segments[i])=>!(b && a.x==b.x && a.width==b.width))

        return segments && !bSame
    }

    relayout(props,...atoms){
        const relayout=this.constructor.create({...this.props,...props})
        const items=[...this.items,...atoms]
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
        return relayout
    }

    push(){
        const i=this.segments.findLastIndex((a,i)=>a.items.length>0||i==0)
        return !!this.segments.slice(i).find(a=>{
                if(a.push(...arguments)!==false){
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
        const {left=0}=this.props
        const {flat}=this.segments
            .reduce(({X,flat},{items,props:{x=0,width=0}},i)=>{
                flat.splice(flat.length,0,...(X!=x ? [<Group x={X-left} width={x-X}/>,...items] : items))
                return {X:x+width,flat}
            },{flat:[],X:left})
        return <Group {...{x:left,children:flat}}/>
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

    push(atom,must){
        if(must){
            this.items.push(atom)
            return
        }
        const {width=0, minWidth=width}=atom.props
        if(minWidth==0 || this.availableWidth>=minWidth){
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