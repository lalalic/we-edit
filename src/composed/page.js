import React, {Component, PropTypes} from "react"
import Group from "./group"
import Line from "./line"

export default class Page extends Component{
    render(){
        const {size:{width, height}, margin:{left,top}, columns, header, footer}=this.props
        return (
            <Group>
                <rect width={width} height={height} fill="white"/>
                {header}
				<Group x={left} y={top}>
					{columns.map((a,i)=><Column key={i} {...a}/>)}
				</Group>
                {footer}
            </Group>
        )
    }

    static propTypes={
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
		size: PropTypes.object.isRequired,
		margin: PropTypes.object,
        header: PropTypes.element,
        footer: PropTypes.element
    }
}

class Column extends Group{
    
}
