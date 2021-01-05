import React, { Component } from "react";
import { connect } from "../../state";
import { getWorkers } from "../../state/selector";

const COLOR="red,blue,orange,skyblue,aqua,brown".split(",")
export const Workers = connect(state => ({ workers: getWorkers(state) }))(
	class Workers extends Component {
		render() {
			const { workers=[], shape } = this.props;
			return workers.map(({ name, selection:{start,end}={} }, i) => React.cloneElement(shape, { key: i, start,end, name, stroke:COLOR[i] }));
		}
	}
);
