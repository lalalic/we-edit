import react, {Component, PropTypes} from "react"
import models from "pagination"
import edits from "pagination/edit"

export class Pagination extends Component{
	static displayName="pagination"
	static propTypes={
		domain: PropTypes.func
	}
	
	static defaultProps={
		domain(type){
			switch(type){
			case "editor":
				return edits
			default:
				return models
			}
		}
	}
}
export default Pagination