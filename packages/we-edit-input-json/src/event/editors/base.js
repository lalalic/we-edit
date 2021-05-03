import {Input, dom} from "we-edit"
import inherit from "lodash.defaults"

export default class extends Input.Editable.Reducer.Editor{
    get Type(){
        return dom[this.__type__.replace(/^(\w)/,a=>a.toUpperCase())]
    }
    apply(props){
        for(let k in props){
            const v=props[k]
            if(k in this){
                this[k](v, props)
            }else if(this.Type?.propTypes[k]){
                this.attr(k,v)
            }
        }
        return this.node
    }

    attr(k,v){
        const raw=this.node.attr(k)
        if(raw!=null && raw!=undefined){
            const normalizedRaw=(this.Type.propTypes[k].normalize||(a=>a))(raw)
            const normalizedV=(this.Type.propTypes[k].normalize||(a=>a))(v)
            const normalized=typeof(normalizedV)=="object" && typeof(normalizedRaw)=="object" ? inherit(normalizedV,normalizedRaw) : normalizedV
            const denormalized=(this.Type.propTypes[k].denormalize||((a,b)=>b))(raw, normalized)
            this.node.attr(k, denormalized)
        }else{
            this.node.attr(k,v)
        }
    }
}