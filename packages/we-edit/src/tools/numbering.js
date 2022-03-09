//start from n=1
export default class {
    static decimal(n){
		return n
	}

	static decimalZero(n){
		return `0${this.decimal(n)}`.substr(-2)
	}

	static lowerLetter(n){
		return String.fromCharCode("a".charCodeAt(0)+n-1)
	}
	
	static upperLetter(n){
		return String.fromCharCode("A".charCodeAt(0)+n-1)
	}
	
	static lowerRoman(n){
		return Roman[n-1].toLowerCase()
	}
	
	static upperRoman(n){
		return Roman[n-1]
	}

    static chinese(n){
        return Chinese[n-1]
    }
}

const Roman=["I","II","III","IV","V","VI","VII","VIII","IX"]
const Chinese=["一","二","三","四","五","六","七","八","九","十"]