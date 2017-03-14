import React, {Component, PropTypes} from "react"

export default class Section extends Component{
	static propTypes={
		pgSz: PropTypes.shape({
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired
		}),
		pgMar: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number,
			bottom: PropTypes.number,

			header: PropTypes.number,
			footer: PropTypes.number,

			gutter: PropTypes.number,
		}),
		cols: PropTypes.shape({
			num: PropTypes.number,
			space: PropTypes.number,
			data: PropTypes.arrayOf(PropTypes.shape({
				width: PropTypes.number,
				space: PropTypes.number
			}))
		}),
		headers: PropTypes.shape({
			first: PropTypes.element,
			even: Proptypes.element,
			odd: PropTypes.element,
			default: PropTypes.element,
		}),
		footers: PropTypes.shape({
			first: PropTypes.element,
			even: Proptypes.element,
			odd: PropTypes.element,
			default: PropTypes.element,
		})
	}
}