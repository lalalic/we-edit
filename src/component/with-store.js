import React, {Component, Children} from "react"
import PropTypes from "prop-types"
import LocalStore from "state/local-store"


export class WithStore extends Component{
	static buildStoreKeyReducer=LocalStore.buildStoreKeyReducer

	static contextTypes={
		store: PropTypes.object
	}

	static childContextTypes={
		store: PropTypes.object
	}

	constructor(){
		super(...arguments)
		this.store=new LocalStore(this.context.store,this.props.storeKey, this.props.getState)
	}

	getChildContext(){
		return {store:this.store}
	}

	render(){
		return Children.only(this.props.children)
	}
}
