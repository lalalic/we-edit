import reducer from "./base"

export class undo extends reducer{
	/**
	 * not need to record for undo
	 **/
	undo({changed:updated,selection}){
		let orphans={}
		const recoverId=node=>{
			return node.find("[_id]")
				.each((i,el)=>this.file.makeId(el,el.attribs._id))
				.removeAttr("_id")
		}

		const pre=(i,keys)=>{
			let found
			while(i>0){
				if((found=this.file.getNode(keys[--i])).length>0)
					return found
			}
			return null
		}

		const next=(i,keys)=>{
			let found,len=keys.length
			while(i<len){
				if((found=this.file.getNode(keys[++i])).length>0)
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
            if(changing.cheerio){//a content node
                let last=updated[k].clone()
                let current=this.file.getNode(k)
				if(current.length==0){
					orphans[k]=last
				}else{
					recoverId(last)
					current.replaceWith(last)
					this.file.makeId(last.get(0),k)
					this.renderChanged(k)
				}
            }else if(changing.children){
				this._updated[k]={children:changing.children}
				this._state.updateIn(["_content",k,"children"],c=>new List(changing.children))

				changing.children.forEach((a,i)=>{
					let target=orphans[a]
					if(target){
						let n
						target.attr("id",a)
						if(n=pre(i,changing.children)){
							target.insertAfter(n)
						}else if(n=next(i,changing.children)){
							target.insertBefore(n)
						}

						let attached=this.file.getNode(a)
						recoverId(attached)
						attached.removeAttr("id")
						this.file.makeId(attached.get(0),a)
						this.renderChanged(a)
						this._state.setIn(["_content",a,"parent"],k)
					}
				})
            }
        })
        this._selection={...this._selection,...selection}
        return this
	}
}
