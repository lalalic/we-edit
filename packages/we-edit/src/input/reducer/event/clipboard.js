import EventBase from "./base"

export default class extends EventBase{
	cut(){
		clipboard=this.removeSelection(true)
	}

	copy(){
		clipboard=this.serializeSelection()
	}

	paste(){
		this.removeSelection()
	}
}
