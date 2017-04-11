import {uuid} from "tools/uuid"

export default class{
	static support(){
		return false
	}

	load(url){
		return Promise.reject(new Error("need implementation to load and parse content at "+url))
	}

	create(){
		throw new Error("not support")
	}

	/**
	* render a loaded doc, loaded by this._loadFile, with models in domain to a element tree,
	* whose element is created with createElement
	*/
	render(loaded, domain, createElement/*(TYPE, props, children, rawcontent)*/, createElementFactory){
		return "Input.render should be implemented"
	}

	/**
	* a higher-order component of models
	*
	*/
	transform(domain){
		return domain
	}

	/**
	* to identify raw content node with an id, so editor can specify what is changed
	*/
	identify(content){
		return uuid()
	}

	/**
	*
	*/
	onChange(loaded, selection, action){
		return true
	}

	save(loaded, name, option){
		throw new Error("not support")
	}

	static createStyles(){
		return {}
	}
}
