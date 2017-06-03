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
        Object.keys(updated).forEach(k=>{
            let last=updated[k].clone()
            let current=this.getNode(k)
            current.replaceWith(last)
            this.identify(last.get(0),k)
            this.renderChanged(last.get(0))
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
