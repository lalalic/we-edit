import react, {Component, PropTypes} from "react"
import models from "pagination"

export class Pagination extends Component{
	static propTypes={
		domain: PropTypes.oneOf([models])
	}
	
	static defaultProps={
		domain:models
	}
}
export default Pagination