import {Component} from "react"

export default class Base extends Component{
	constructor(){
		super(...arguments)
		const {children,...others}=this.props
		this.style=others
	}
}