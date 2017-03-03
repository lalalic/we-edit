import React, {Component} from "react"
import {NoChild} from "../any"

class Char extends Component{
	compose(){

	}

	render(){
		return null
	}

	static is(){
		return false
	}

	static ableExceed(){
		return false
	}

	static canSeperateWith(type){
		return this!==type
	}

	static canAtLineEnd(){
		return true
	}
}


const REG_WHITESPACE=/\s/u
const REG_NUMBER=/[0-9]/
const TYPES=[
	 class Letter extends Char{
		static displayName="letter"

		static is(){
			return true
		}
	}

	,class Whitespace extends Char{
		static displayName="whitespace"

		static is(a){
			return REG_WHITESPACE.test(a)
		}

		static ableExceed(){
			return true
		}
	}

	,class Number extends Char{
		static displayName="number"

		static is(a){
			return REG_NUMBER.test(a)
		}
	}
	,class Punctuation extends Char{
		static displayName="punctuation"

		static is(a){
			return a===',' || a==='.' || a==='!'
		}

		static ableExceed(){
			return true
		}
	}
	,class BeginingSymbol extends Char{
		static displayName="beginingSymbol"

		static is(a){
			return a==='(' || a==='{' || a==='<' || a==='['
		}

		static canAtLineEnd(){
			return false
		}
	}
].reverse()

export function category(c,last){
	return TYPES.find(a=>a.is(c))
}
