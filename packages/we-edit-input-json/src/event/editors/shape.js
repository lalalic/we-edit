import Editor from "./base"
import {dom} from "we-edit"
const {UnitShape}=dom.Unknown
export default class Shape extends Editor{
    size({width,height}){
        let raw=this.node.attr('geometry')
        const geometry=dom.Shape.propTypes.geometry.normalize(raw=raw.toJS?.()||raw)
        const {width:w,height:h}=geometry.bounds()
        const [W=w,H=h]=[width!=undefined && UnitShape.normalize(width)||width,height!=undefined && UnitShape.normalize(height) ||height]
        const scaledGeometry=geometry.clone().scale(W/w,H/h)

        this.node.attr('geometry',dom.Shape.propTypes.geometry.denormalize(raw,scaledGeometry,{width,height}))

        const frame=this.node.findFirst('frame')
        if(frame.length==1){
            const size=scaledGeometry.bounds()
            if(width!=undefined)
                size.width=UnitShape.denormalize(width,size.width)
            else
                delete size.width
            
            if(height!=undefined)
                size.height=UnitShape.denormalize(height,size.height)
            else
                delete size.height       
            
            this.reducer.createEditor('frame',frame).update(size)
        }
    }

    width(width){
        this.size({width})
    }

    height(height){
        this.size({height})
    }

    geometry(geometry){
        const raw=this.node.attr('geometry')
        this.node.attr('geometry',dom.Shape.propTypes.geometry.denormalize(raw,geometry))
    }
}