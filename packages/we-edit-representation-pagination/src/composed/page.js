import React, {Component} from "react"
import PropTypes from "prop-types"

import Group from "./group"
import Frame from "./frame"
import Line from "./line"

export default class Page extends Component{
	static propTypes={
		columns: PropTypes.arrayOf(PropTypes.object).isRequired,
		size: PropTypes.object.isRequired,
		margin: PropTypes.object,
		header: PropTypes.element,
		footer: PropTypes.element,
		i: PropTypes.number.isRequired,
	}

	render(){
		let {
			size:{width, height},
			margin:{left,top, right,bottom, header:headerStartAt=0, footer:footerEndAt=0},
			padding,
			columns,
			header,
			footer,
			}=this.props

		return(
			<Group className="page" width={width} height={height}>
				{header &&
					<Group
						x={left} y={headerStartAt}
						className="header">
						{header}
					</Group>
				}

				<Group
					x={left} y={top+(padding.top||0)}
					className="content">
					{columns.map((a,i)=>a.createComposed2Parent())}
				</Group>

				{footer &&
					<Group
						x={left}
						y={height-footerEndAt-footer.props.height}
						className="footer">
						{footer}
					</Group>
				}

			</Group>
		)
	}
}
