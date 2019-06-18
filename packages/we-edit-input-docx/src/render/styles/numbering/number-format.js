export default {
	decimal(n){
		return n
	},

	lowerLetter(n){
		return String.fromCharCode("a".charCodeAt(0)+n-1)
	},
	
	upperLetter(n){
		return String.fromCharCode("A".charCodeAt(0)+n-1)
	},
	
	lowerRoman(n){
		return Roman[n].toLowerCase()
	},
	
	upperRoman(n){
		return Roman[n]
	}
}

const Roman=["I","II","III","IV","V","VI","VII","VIII","IX"]