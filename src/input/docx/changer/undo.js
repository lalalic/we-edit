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

    run({changed:updated,selection}){
        Object.keys(updated).forEach(k=>{
            let changing=updated[k]
            if(changing instanceof Array){
                this.updateChildren(k,children=>{
                    children.splice(0,children.length,...updated[k])
                })
            }else if(changing.cheerio){
                let last=updated[k].clone()
                last.find("[_id]")
                    .each((i,el)=>this.identify(el,el.attribs._id))
                    .removeAttr("_id")
                let current=this.getNode(k)
                current.replaceWith(last)
                this.identify(last.get(0),k)
                this.renderChanged(last.get(0))
            }
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
