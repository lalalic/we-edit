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
		let orphans={}
		const recoverId=node=>{
			return node.find("[_id]")
				.each((i,el)=>this.identify(el,el.attribs._id))
				.removeAttr("_id")
		}
		
		const pre=(i,keys)=>{
			let found
			while(i>0){
				if((found=this.getNode(keys[--i])).length>0)
					return found
			}
			return null
		}
		
		const next=(i,keys)=>{
			let found,len=keys.length
			while(i<len){
				if((found=this.getNode(keys[++i])).length>0)
					return found
			}
			return null
		}
        Object.keys(updated)
			.reduce((sorted,a)=>{
				sorted[updated[a].cheerio ? "unshift" : "push"](a)
				return sorted
			},[])
		.forEach(k=>{
            let changing=updated[k]
            if(changing.cheerio){
                let last=updated[k]//.clone()
                let current=this.getNode(k)
				if(current.length==0){
					orphans[k]=last
				}else{
					recoverId(last)
					current.replaceWith(last)
				}
				this.identify(last.get(0),k)
				this.renderChanged(last.get(0))
            }else if(changing.children){
                this.updateChildren(k,children=>{
                    children.splice(0,children.length,...changing.children)
                })
				
				changing.children.forEach((a,i)=>{
					if(orphans[a]){
						let n
						if(n=pre(i,changing.children)){
							orphans[a].insertAfter(n)
						}else if(n=next(i,changing.children)){
							orphans[a].insertBefore(n)
						}
					}
				})
            }
        })
        this.updateSelection(selection)
        return this
    }
	
	insertNode(node,index,parentNode){
		let id=node.attr("id")
		if(index==0){
			parentNode.prepend(node)
		}else{
			node.insertBefore(parentNode.children().eq(index))
		}
		console.assert(parentNode.find(`#${id}`).length==1)
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
