import {Dict} from "./primitives"

export default class DictElement extends Dict{
    constructor(){
        super(...arguments)
        this.children=[]
    }

    appendChild(child){
        this.children.push(child)
    }
}