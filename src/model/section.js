import React, {PureComponent as Component,PropTypes} from "react"

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
			odd: PropTypes.element,
			default: PropTypes.element,
		}),
		footers: PropTypes.shape({
			first: PropTypes.element,
			even: PropTypes.element,
			odd: PropTypes.element,
			default: PropTypes.element,
		})
	}

	static defaultProps={
		pgSz: {
			width:876,
			height:980
		},
		pgMar: {
			left: 20,
			right: 20,
			top: 20,
			bottom: 20,

			header: 10,
			footer: 10
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
