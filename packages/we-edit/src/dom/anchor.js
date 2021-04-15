import PropTypes from "prop-types"
import Component from "./component"

/**
 * anchor can be positioned seperatedly x and y, and also can be wrapped
 * wrap:
 * wrap is based on a wrap function to exclude horizontal spaces
 * wrap({x1,y1,x2,y2}, anchored position:{x,y}): in practice y2===y1
 * return [{x,width},...], which should be excluded to flow content
*/
export default class Anchor extends Component{
    static displayName="anchor"
    static propTypes={
        x: PropTypes.oneOfType([
            PropTypes.shape({
                base: this.BaseShape,
                offset: this.UnitShape,
                align: this.AlignShape,
            }),
            this.UnitShape,//base is closest parent frame
        ]),

        y: PropTypes.oneOfType([
            PropTypes.shape({
                base: this.BaseShape,
                offset: this.UnitShape,
                align: this.AlignShape,
            }),
            this.UnitShape,//base is closest parent frame
        ]),

        wrap:PropTypes.oneOfType([
            PropTypes.shape({
                mode: this.WrapModeShape,
                side: this.WrapSideShape,
                
                geometry:  this.GeometryShape,

                geometryFn: PropTypes.func,//fn(geometry shape, {anchored x,y}): which can enhance a geometry, such as adjust according to border/distance
            }),
            PropTypes.func,
        ])
    }
    static WrapModeShape=PropTypes.oneOf(["square", "tight", "clear","no"])
    static WrapSideShape=PropTypes.oneOf(["both","left","right","largest"])
    static BaseShape=PropTypes.oneOf(["character","line","paragraph","page","frame","margin", "closest"])

    static defaultProps={
        x:{base:"character",offset:0,align:"left"},
        y:{base:"line",offset:0,align:"top"},
    }
}
