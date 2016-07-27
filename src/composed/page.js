import React, {Component, PropTypes} from "react"
import Group from "./group"
import Line from "./line"

export default class Page extends Component{
    render(){
        const {
			size:{width, height}, 
			margin:{left,top, bottom, header:headerStartAt=0, footer:footerEndAt=0}, 
			columns, 
			header, 
			footer}=this.props
        return (
            <Group className="page">
                <Paper width={width} height={height} fill="white"/>
				
				{header && (<Group x={left} y={headerStartAt} className="header">{header}</Group>)}
				
				<Group x={left} y={top} className="content">
					{columns.map((a,i)=><Column key={i} {...a}/>)}
				</Group>
				
                {footer && (<Group x={left} y={height-footerEndAt-footer.props.height} className="footer">{footer}</Group>)}
				
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

class Column extends Group{}

class Paper extends Component{
	render(){
		return <rect {...this.props}/>
	}
}
