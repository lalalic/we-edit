import Editor from "./base"
import {dom} from "we-edit"
export default class Anchor extends Editor{
    dx(d, props, which='x'){debugger
        const raw=this.node.attr(which)?.toJS()
        const value=dom.Anchor.propTypes[which].normalize(raw)
        const changed={...value, offset:(value.offset||0)+d}
        this.node.attr(which, dom.Anchor.propTypes[which].denormalize(raw, changed))
    }

    dy(d){
        this.dx(...arguments, 'y')
    }
}