import react, {Component, PropTypes} from "react"
import models from "html"

export class Html extends Component{
	static propTypes={
		domain: PropTypes.oneOf([models])
	}
	
	static defaultProps={
		domain:models
	}
}