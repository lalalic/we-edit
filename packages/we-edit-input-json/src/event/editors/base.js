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
            }else if(this.node.attr(k) && this.Type?.propTypes[k] && typeof(v)=="object"){
                this.attr(k,v)
            }else{
                this.node.attr(k,v)
            }
        }
        return this.node
    }

    attr(k,v){
        let raw=this.node.attr(k)
        raw=raw.toJS?.()||raw
        const Shape=this.Type.propTypes[k]
        const normalize=Shape.normalize?.bind(this)||(a=>a)
        const denormalize=Shape.denormalize?.bind(this)||((a,b)=>b)
        const normalizedRaw=normalize(raw), normalizedV=normalize(v)
        const normalized=typeof(normalizedV)=="object" && typeof(normalizedRaw)=="object" ? inherit(normalizedV,normalizedRaw) : normalizedV
        const denormalized=denormalize({...(typeof(raw)=="object" ? raw : {}), ...v}, normalized)
        this.node.attr(k, denormalized)
    }
}