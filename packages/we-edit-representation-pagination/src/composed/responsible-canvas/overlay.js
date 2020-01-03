import React, {Component} from "react"
import Top from "./top"
import {Group} from ".."


export default class Overlay extends Component{
    render(){
        let {children,...others}=this.props
        return (
            <Group>
                {children}
				<Top x={0} y={0}>
					<rect {...{width:"100%",height:"100%",fill:"transparent"}} {...others}/>
				</Top>
            </Group>
        )
    }
}
