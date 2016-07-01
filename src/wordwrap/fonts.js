var fonts={}

export default {
    get(name){
		if(!fonts[name]){
			return fonts[name]=loadFont(name)
		}
    }
}

function loadFont(name){
	return {
		metrics(word){
			return {width:0, height:0, glyphs:[]}
		}
	}
}
