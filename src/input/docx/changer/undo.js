import Base from "state/reducer/text"
import mixin from "./mixin"

export class undo extends Base{
    constructor(state,renderChanged){
		super(state)
		mixin.bind(this)(renderChanged)
	}

    updateSelection(selection){
        return this._selection={...this._selection,...selection}
    }

    run({changed:{updated},selection}){
        let xml=this.xml.bind(this)
        Object.keys(updated).forEach(k=>{
            let last=updated[k].clone()
            let current=this.getNode(k)
            last.attr("id",k)
            current.replaceWith(last)
            current=this.getNode(k)
            current.removeAttr("id")
            this.identify(current.get(0),k)
            this.renderChanged(current.get(0))
        })
        this.updateSelection(selection)
        return this
    }

    identify(node,id){
        Object.defineProperty(node.attribs,"id",{
			enumerable: false,
			configurable: false,
			writable: false,
			value: id
		})
    }
}
