import Immutable, {List} from "immutable"
import Query from "../../../state/selector/query"

export default class xQuery extends Query{
    //override
	_getContent(){
		return this.state.get("_content")
	}

	remove(deep=true){
		const clear=k=>{//clear the tree
			if(!deep){
                this._content.remove(k)
                return
            }

			let children=this._content.getIn([k,"children"])
			if(children instanceof List){
				children.forEach(id=>clear(id))
			}
            this._content.remove(k)
		}
		this._nodes.forEach(k=>{
            let parentId=this._content.getIn([k,"parent"])
            let children=this._content.getIn([parentId,"children"])
            if(children instanceof List){
                let i=children.indexOf(k)
                if(i!=-1){
                    this._content.removeIn([parentId,"children",i])
                }
            }
			clear(k)
		})
		return this
	}

	toString(){
		return this._nodes.map(id=>this.file.toString(id)).join("\r\n")
	}
}
