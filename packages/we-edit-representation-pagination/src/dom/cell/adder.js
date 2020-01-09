import React, { Component } from "react"
import { Group } from "../../composed"
class Adder extends Component {
	state = { show: false };
	render() {
		const { show } = this.state;
		const { x, y, onAdd, type } = this.props;
		return (<Group x={x} y={y}>
			<Group x={-12} y={-22}>
				<Group rotate={`${type == "row" ? "-90 12 22" : ""}`}>
					<use xlinkHref="#table.adder" stroke={show ? "black" : "transparent"} 
					onMouseOver={e => this.setState({ show: true })} 
					onMouseLeave={e => this.setState({ show: false })} 
					onClick={onAdd} />
				</Group>
			</Group>
		</Group>);
	}
}
const RowAdder = props => <Adder {...props} type="row" />;
const ColAdder = props => <Adder {...props} type="col" />;
