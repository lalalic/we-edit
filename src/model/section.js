import React, {PropTypes} from "react"
import Component from "./component"

export default class Section extends Component{
	static displayName="section"
	static propTypes={
		pgSz: PropTypes.shape({
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired
		}),
		pgMar: PropTypes.shape({
			left: PropTypes.number.isRequired,
			right: PropTypes.number.isRequired,
			top: PropTypes.number.isRequired,
			bottom: PropTypes.number.isRequired,

			header: PropTypes.number.isRequired,
			footer: PropTypes.number.isRequired,

			gutter: PropTypes.number
		}),
		cols: PropTypes.shape({
			num: PropTypes.number.isRequired,
			space: PropTypes.number,
			data: PropTypes.arrayOf(PropTypes.shape({
				width: PropTypes.number,
				space: PropTypes.number
			}))
		}),
		headers: PropTypes.shape({
			first: PropTypes.element,
			even: PropTypes.element,
			odd: PropTypes.element
		}),
		footers: PropTypes.shape({
			first: PropTypes.element,
			even: PropTypes.element,
			odd: PropTypes.element
		})
	}

	static defaultProps={
		pgSz: {
			width:816,
			height:1056
		},
		pgMar: {
			left: 96,
			right: 120,
			top: 120,
			bottom: 96,

			header: 48,
			footer: 48
		},
		cols:{
			num:1
		}
	}

	static childContextTypes={
		pgSz: PropTypes.object,
		pgMar: PropTypes.object
	}

	getChildContext(){
		const {pgSz, pgMar}=this.props
		return {pgSz, pgMar}
	}
}
