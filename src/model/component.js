import {Component} from "react"

export default class Base extends Component{
	static mixin(mix){
		class A extends this{}

		Object.keys(mix).reduce((p,k)=>{
			p[k]=mix[k]
			return p
		},A.prototype)

		return A
	}
}