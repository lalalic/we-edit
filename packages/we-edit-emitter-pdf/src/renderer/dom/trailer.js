import DictElement from "./dict-element"
export default class Trailer extends DictElement{
    constructor(xref){
        super({
            Info:xref.getNewDict(),
            Size:1,
        })
    }
}