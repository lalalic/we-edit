import React, {Component,Fragment} from "react"
import Top from "./top"

export default class Overlay extends Component{
    render(){
        const {children,...props}=this.props
        return (
            <Fragment>
                {children}
                <Top x={0} y={0}>
					<rect {...{width:"100%",height:"100%",fill:"transparent"}} {...props}/>
				</Top>
            </Fragment>
        )
    }
}
