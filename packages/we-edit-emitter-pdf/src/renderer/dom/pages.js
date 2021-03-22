import DictElement from "./dict-element"
export default class Pages extends DictElement{
    static Type="Pages"
    constructor(){
        super({
            Kids:[],
            Count:0,
        })
    }

    appendChild(child){
        this._map.Kids.push(child.ref)
        this.set('Count',this._map.Kids.length)
        child.set("Parent",this.ref)
    }
}