import PropTypes from "prop-types"
import Component from "./component"

/**
 * anchor can be positioned seperatedly x and y, z as layer 
 *  > position:
 * 
 *  > wrap:
 * wrap is based on a wrap function to exclude horizontal spaces
 * wrap({x1,y1,x2,y2}, anchored position:{x,y}): in practice y2===y1
 * return [{x,width},...], which should be excluded to flow content
*/
export default class Anchor extends Component{
    static displayName="anchor"
    static propTypes={
        x: this.normalizeChecker(PropTypes.oneOfType([
            PropTypes.shape({
                base: this.BaseShape,
                offset: this.UnitShape,
                align: this.AlignShape,
            }),
            this.UnitShape,//base is closest parent frame
        ]),{
            normalize:value=>{
                if(typeof(value)=="object"){
                    const {offset,...x}=value
                    if(offset!=undefined)
                        x.offset=this.UnitShape.normalize(offset)
                    return x
                }
                return {offset:this.UnitShape.normalize(value)}
            },

            denormalize:(value,normalized)=>{
                if(typeof(value)=="object"){
                    const {offset}=value
                    if(offset!=undefined && normalized.offset)
                        normalized.offset=this.UnitShape.denormalize(offset, normalized.offset)
                    return normalized
                }else if(this.propTypes.x.canShorten(normalized)){
                    return this.UnitShape.denormalize(value, normalized.offset)
                }else{
                    normalized.offset=this.UnitShape.denormalize(value, normalized.offset)
                }
                return normalized
            },
            canShorten:value=>{
                if(typeof(value)=="object"){
                    const {base,align}=value
                    return align==undefined && (base==undefined||base=="current")
                }
                return true
            }
        }),

        y: this.normalizeChecker(PropTypes.oneOfType([
            PropTypes.shape({
                base: this.BaseShape,
                offset: this.UnitShape,
                align: this.VertAlignShape,
            }),
            this.UnitShape,//base is closest parent frame
        ]),{
            normalize:value=>this.propTypes.x.normalize(value),
            denormalize:(value, normalized)=>this.propTypes.x.denormalize(value,normalized)
        }),

        z: PropTypes.number,

        wrap:this.normalizeChecker(PropTypes.oneOfType([
            PropTypes.shape({
                mode: this.WrapModeShape,
                side: this.WrapSideShape,
                
                geometry:  this.GeometryShape,//priority: anchor's > content > content rect

                distance: PropTypes.oneOfType([
                    PropTypes.func,//fn(geometry shape, {anchored x,y}): which can enhance a geometry, such as adjust according to border/distance
                    this.MarginShape
                ])
            }),
            PropTypes.func,
        ]),{
            normalize:value=>{
                switch(typeof(value)){
                    case "object":{
                        const {geometry,distance,...wrap}=value
                        if(geometry!=undefined)
                            wrap.geometry=this.GeometryShape.normalize(geometry)
                        if(distance!=undefined){
                            if(typeof(distance)=="function"){
                                wrap.distance=distance
                            }else{
                                const {left:dl=0,right:dr=0,top:dt=0,bottom:db=0}=this.MarginShape.normalize(distance)
                                wrap.distance=(geometry,{x=0,y=0}={})=>{
                                    return {
                                        raw: distance,
                                        geometry:geometry.clone().translate(x,y),
                                        bounds(){
                                            const {left,right,top,bottom}=this.geometry.bounds()
                                            return {
                                                left:left-dl,right:right+dr,top:top-dt,bottom:bottom+db, 
                                                width:right+dr-left+dl,height:bottom+db-top+dt
                                            }
                                        },
                        
                                        intersects(...args){
                                            const segs=this.geometry.intersects(...args)
                                            segs.length>0 && (segs[0].x-=dl);
                                            segs.length>1 && (segs[segs.length-1].x+=dr);
                                            return segs
                                        },
                        
                                        clone(){
                                            return {
                                                ...this,
                                                geometry:this.geometry.clone()
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return wrap
                    }
                    case "string":
                        return {mode:value}
                    default:
                        return value
                }
            },
            denormalize:(value, normalized)=>{
                switch(typeof(value)){
                    case "object":{
                        const {geometry,distance,...wrap}=value
                        if(geometry!=undefined)
                            normalized.geometry=this.GeometryShape.denormalize(geometry,normalized.geometry)
                        if(distance!=undefined){
                            if(typeof(distance)!=="function"){
                                normalized.distance=distance
                            }
                        }
                        return normalized
                    }

                    case "string":{
                        if(Object.keys(normalized).length==1){
                            return normalized.mode
                        }
                    }
                }
                return normalized
            }
        }),
    }
    static WrapModeShape=PropTypes.oneOf(["square", "tight", "clear","no"])
    static WrapSideShape=PropTypes.oneOf(["both","left","right","largest"])
    static BaseShape=PropTypes.oneOf(["character","line","paragraph","page","frame","margin", "closest"])

    static defaultProps={
        x:{base:"character",offset:0,align:"left"},
        y:{base:"line",offset:0,align:"top"},
    }
}
