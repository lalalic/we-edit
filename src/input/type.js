import * as reducer from "./reducer"

export class Viewable{
	static support(file){
		return false
	}
	//doc=null//injected from load/create
	load(url){
		return Promise.reject(new Error("need implementation to load and parse content at "+url))
	}

	release(){
		
	}
	
	/**
	* a higher-order component to transform basic components to your typed components
	* components may be model/html, model/pagination, model/pagination/edit depending on
	* outer component[editor, html, viewer, pagination, plain]
	*/
	transform(components){
		return components
	}
	
	/**
	* render a loaded/created doc, loaded by this._loadFile, with models in domain to a element tree,
	* whose element is created with createElement
	*/
	render(createElement/*(TYPE, props, children, rawcontent)*/,components){
		return "Input.render should be implemented"
	}		
}

export class Editable extends Viewable{
	static createStyles(){
		return {}
	}
	
	create(){
		throw new Error("not support")
	}
	
	serialize(option){
		throw new Error("not support")
	}
	
	makeId(content){
		throw new Error("make your own uuid")
	}
	
	renderNode(node, createElement/*(TYPE, props, children, rawcontent)*/){
		
	}

	/**
	*return:
	- false: no state change
	- {
		selection: change of selection,
		styles: all styles if any style changed,
		updated: updated content,
		undoables: saved changed content for history
	}: all these changes will be applied on state
	- any else: reduce selection action
	*/
	onChange(state,{type,payload},createElement){
		let params=[state]
		switch(type){
			case `text/RETURN`:
				return new reducer.text(...params)
					.insert("\r")
					.state()
			case `text/INSERT`:
				return new reducer.text(...params)
					.insert(payload)
					.state()
			case `text/REMOVE`:
				return new reducer.text(...params)
					.remove(payload)
					.state()
			case "entity/RESIZE":
				return new reducer.entity(...params)
					.resize(payload)
					.state()
			case "entity/ROTATE":
				return new reducer.entity(...params)
					.rotate(payload)
					.state()
			case "entity/CREATE":
				return new reducer.entity(...params)
					.create(payload)
					.state()
			case "selection/MOVE":
				return new reducer.entity(...params)
					.move(payload)
					.state()
		}
		return true
	}	
}

export default Editable
