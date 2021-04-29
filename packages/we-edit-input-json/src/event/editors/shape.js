import Editor from "./base"
import {dom} from "we-edit"
export default class Shape extends Editor{
    size({width,height}){
        let raw=this.node.attr('geometry')
        const geometry=dom.Shape.propTypes.geometry.normalize(raw=raw.toJS?.()||raw)
        const {width:w,height:h}=geometry.bounds(),[W=w,H=h]=[width,height]
        const changed=dom.Shape.propTypes.geometry.denormalize(raw,geometry.clone().scale(W/w,H/h))
        this.node.attr('geometry',changed)

        const frame=this.node.findFirst('frame')
        if(frame.length==1){
            this.reducer.createEditor('frame',frame).update({width,height})
        }
    }
}