import React, {Component, PropTypes} from "react"

import Group from "./group"

export default class Frame extends Component{
    render(){
        const {margin:{left,top}, columns}=this.props
        return (
			<Group x={left} y={top}>
				{columns.map((a,i)=><Column key={i} {...a}/>)}
			</Group>
        )
    }

    static propTypes={
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        size: PropTypes.object.isRequired,
        margin: PropTypes.object
    }
}


class Column extends Group{

}
