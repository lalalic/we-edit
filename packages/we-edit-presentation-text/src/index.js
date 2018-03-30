import React, {PureComponent as Component} from "react"
import {Presentation} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"


export default class Text extends Component{
	render(){
		return <Presentation {...{ViewerTypes,EditorTypes,...this.props}}/>
	}
}

Presentation.support(Text,"text")