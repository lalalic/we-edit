import {uuid} from "tools/uuid"
import {getFile} from "state/selector"
import * as reducer from "state/reducer"

export default class{
	static support(){
		return false
	}
	
	static createStyles(){
		return {}
	}	

	load(url){
		return Promise.reject(new Error("need implementation to load and parse content at "+url))
	}

	create(){
		throw new Error("not support")
	}

	/**
	* render a loaded/created doc, loaded by this._loadFile, with models in domain to a element tree,
	* whose element is created with createElement
	*/
	render(doc, domain, createElement/*(TYPE, props, children, rawcontent)*/){
		return "Input.render should be implemented"
	}

	/**
	* a higher-order component of standard models
	*
	*/
	transform(domain){
		return domain
	}

	/**
	* to identify raw content node with an id, so editor can specify what is changed
	*/
	makeId(content){
		return uuid()
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
		let	docx=getFile(state)
		docx.renderChanged=changed=>docx.renderChangedNode(changed,createElement)

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
			case "selection/MOVE":
				return new reducer.entity(...params)
					.move(payload)
					.state()
			case "history/UNDO":
				return new reducer.undo(...params)
					.undo(payload)
					.state()
			case 'style/ADD':{
				const {type,id,name,isDefault=false,...others}=payload
				let $=docx.officeDocument.styles
				let styleNode=docx4js.parseXml(`
					<w:style w:type="${type}" ${isDefault ? 'w:default="1"' : ""} w:styleId="${id}">
						<w:name w:val="${name}"/>
						<w:uiPriority w:val="1"/>
						<w:semiHidden/>
						<w:unhideWhenUsed/>
					</w:style>`).root().children().get(0)
				$(styleNode).appendTo("w\\:styles")
				this.renderChanged(styleNode)
				return {styles: this.styles}
			}
			case `style/UPDATE`:{
				return {styles: this.styles}
			}
			case 'style/REMOVE':{
				delete this.styles[payload]
				return {styles: this.styles}
			}
		}
		return true
	}

	save(loaded, name, option){
		throw new Error("not support")
	}
}
