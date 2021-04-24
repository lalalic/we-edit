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
            }
        }),

        y: this.normalizeChecker(PropTypes.oneOfType([
            PropTypes.shape({
                base: this.BaseShape,
                offset: this.UnitShape,
                align: this.AlignShape,
            }),
            this.UnitShape,//base is closest parent frame
        ]),{
            normalize:value=>this.propTypes.x.normalize(value)
        }),

        wrap:this.normalizeChecker(PropTypes.oneOfType([
            PropTypes.shape({
                mode: this.WrapModeShape,
                side: this.WrapSideShape,
                
                geometry:  this.GeometryShape,//priority: anchor's > content > content rect

                geometryFn: PropTypes.func,//fn(geometry shape, {anchored x,y}): which can enhance a geometry, such as adjust according to border/distance
            }),
            PropTypes.func,
        ]),{
            normalize:value=>{
                switch(typeof(value)){
                    case "object":{
                        const {geometry,...wrap}=value
                        if(geometry!=undefined)
                            wrap.geometry=this.GeometryShape.normalize(geometry)
                        return wrap
                    }
                    case "string":
                        return {mode:value}
                    default:
                        return value
                }
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
