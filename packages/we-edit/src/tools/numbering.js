export default class {
    static decimal(n){
		return n+1
	}

	static lowerLetter(n){
		return String.fromCharCode("a".charCodeAt(0)+n)
	}
	
	static upperLetter(n){
		return String.fromCharCode("A".charCodeAt(0)+n)
	}
	
	static lowerRoman(n){
		return Roman[n].toLowerCase()
	}
	
	static upperRoman(n){
		return Roman[n]
	}

    static chinese(n){
        return Chinese[n]
    }
}

const Roman=["I","II","III","IV","V","VI","VII","VIII","IX"]
const Chinese=["一","二","三","四","五","六","七","八","九","十"]