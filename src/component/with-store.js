import React, {Component} from "react"
import LocalStore from "state/local-store"


export default class WithStore extends Component{
	static contextTypes={
		store: PropTypes.object
	}
	
	static childContextTypes={
		store: PropTypes.object
	}
	
	constructor(){
		super(...arguments)
		this.store=new LocalStore(this.context.store,this.props.key)
	}
	
	getChildContext(){
		return {store:this.store}
	}
	
	render(){
		return Children.only(this.props.children)
	}
}