import {Ref, Dict} from "./primitives"

export default class XRef{
    constructor(){
        let ref
        this.entries=[ref=new Ref(0,0)]
        ref.offset=65535
    }

    getNewRef(obj){
        const ref=new Ref(this.entries.length,0)
        if(obj){
            obj.ref=ref
            ref.obj=obj
        }
        this.entries.push(ref)
        return ref
    }

    getNewDict(){
        return new Dict(...arguments)
    }
}
