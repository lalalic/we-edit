export default class Style {
    constructor(styles){
        this.styles=styles
    }

    get(path){
		let value=path.split(".").reduce((p,key)=>p ? p[key] : p,this)
		if(value==undefined)
			value=this.getFromBasedOn(...arguments)
		return value
	}

	getBasedOn(){
		const {basedOn}=this.metadata||{}
		if(basedOn){
			switch(typeof(basedOn)){
			case 'string':
				return this.styles[basedOn]
			case 'object':
				return basedOn
			}
		}
	}

	getFromBasedOn(path){
		let basedOn=this.getBasedOn()
		if(basedOn)
			return basedOn.get(...arguments)
		return undefined
	}
}
