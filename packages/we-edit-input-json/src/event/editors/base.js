import {Input} from "we-edit"

export default class extends Input.Editable.Reducer.Editor{
    apply(props){
        const target=this.target
        for(let k in props){
            if(k in this){
                this[k](props[k], props)
            }else{
                target.attr(k, props[k])
            }
        }
        return this.node
    }
}