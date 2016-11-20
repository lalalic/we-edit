import docx from "./docx"

let supported=[docx]
export default {
	load(data){
		let Found=supported.find(TYPE=>TYPE.support(data))
		if(Found){
			return new Found().load(...arguments)
		}else{
			alert(`we cannot edit this type of file`)
		}
	}

	create(){
		return new docx().create()
	}
}
