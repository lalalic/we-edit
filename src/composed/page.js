import React, {Component, PropTypes} from "react"
import Group from "./group"
import Line from "./line"

export default class Page extends Component{
    render(){
        const {width, height, margin, columns, header, footer}=this.props
        return (
            <Group>
                <rect width={width} height={height} fill="white"/>
                {header}
                {columns.map((a,i)=><Column key={i} {...a}/>)}
                {footer}
            </Group>
        )
    }

    static propTypes={
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        header: PropTypes.element,
        footer: PropTypes.element
    }
}

class Column extends Group{}
