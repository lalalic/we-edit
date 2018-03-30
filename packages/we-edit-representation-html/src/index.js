import React,{PureComponent as Component} from "react"
import {Representation} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"

export default class Html extends Component{
	render(){
		return <Representation {...{ViewerTypes,EditorTypes,...this.props}}/>
	}
}

Representation.support(Html,"html")