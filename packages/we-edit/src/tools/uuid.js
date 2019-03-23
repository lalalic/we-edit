import shortid from "shortid"

var i=10
function uuid(){
	return `${++i}`
	return shortid.generate()
}

export default uuid
