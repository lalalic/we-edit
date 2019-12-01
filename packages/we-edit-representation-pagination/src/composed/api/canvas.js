import {Component} from "react"
import PropTypes from "prop-types"

export default class Canvas extends Component{
	static propTypes={
		layouts: PropTypes.arrayOf(PropTypes.object),
		document: PropTypes.object,
	}
	/**it usualy must be implemented to get layouts and canvas props from document */
	static getDerivedStateFromProps({document:{layouts}, ...mySelf}){
        return {layouts}
	}

	constructor(){
		super(...arguments)
		this.state={}
    }
}