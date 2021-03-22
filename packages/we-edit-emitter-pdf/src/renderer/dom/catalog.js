import DictElement from "./dict-element"
export default class Catalog extends DictElement{
    static Type="Catalog"

    appendChild(child){
        this._map.Pages.obj.appendChild(child)
    }
}