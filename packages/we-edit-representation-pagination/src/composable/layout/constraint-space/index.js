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
 export default class Space{
    static create(source){
        if(source instanceof Space)
            return source
        return new Space(...arguments)
    }

     constructor({width,left=0,right,...props}={}){
        Object.assign(this,props)
        this.props=arguments[0]||{}
     }

     get width(){
        return this.right-this.left
     }

     get left(){
         const {left=0}=this.props
         return left
     }

     get right(){
         const {width,right=width}=this.props
         return right
     }

     findInlineSegments(){
         return {segments:[{x:this.left,width:this.width}]}
     }

     findBlockSegments(){
         return [{y:this.blockOffset, height:this.height}]
     }

     clone(modifier){
         if(modifier instanceof Space){
            modifier=modifier.props
         }
         return new Space({...this.props, ...modifier,edges:{...this.props.edges, ...modifier.edges,}})
     }

     anchor({base, offset=0, align},{width=0,height=0}={}){
        const {edges}=this.props
        if(!edges || !edges[base] || !(align in edges[base]))
            return offset
        
        const {[base]:{[align]:v=0}={}}=edges
        switch(align){
            case "right": 
                return v-offset-width
            case "bottom": 
                return v-offset-height
            default: 
                return v+offset 
        }
     }

     isInlineSizeDifferent(that){
        if(!!this.cols!==!!that.cols)
            return true
        const {width,cols}=that
        if(!cols)
            return width!=this.width
        if(cols.length!=this.cols.length)
            return true
        if(this.cols.find((a,i,_,$,b=cols[i])=>a.width!=b.width))
            return true
     }

     equals(that){
         if(!this.isInlineSizeDifferent(that)){
            return this.height==that.height
         }
         return false
     }
 }
 
