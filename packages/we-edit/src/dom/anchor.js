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
        x: PropTypes.shape({
            base: PropTypes.string,
            offset: PropTypes.number,
            align: PropTypes.string
        }).isRequired,

        y: PropTypes.shape({
            base: PropTypes.string,
            offset: PropTypes.number,
            align: PropTypes.string
        }).isRequired,

        wrap:PropTypes.oneOfType([
            PropTypes.shape({
                mode: PropTypes.oneOf(["square", "tight", "clear","no"]),
                side: PropTypes.oneOf(["both","left","right","largest"]),
                
                geometry:  PropTypes.shape({
                    intersects: PropTypes.func,//({x1,x2,y2,y1})=>[{x,width},{x,width}]
                    bounds: PropTypes.func,//()=>{left, right, top, bottom}
                    clone: PropTypes.func,//()=>to clone this geometry
                }),

                geometryFn: PropTypes.func,//fn(geometry shape, {anchored x,y}): which can enhance a geometry, such as adjust according to border/distance
            }),
            PropTypes.func,
        ])
    }

    static defaultProps={
        x:{base:"character",offset:0,align:"left"},
        y:{base:"line",offset:0,align:"top"},
    }
}
