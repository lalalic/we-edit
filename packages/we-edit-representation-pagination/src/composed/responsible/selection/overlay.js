import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import Top from "./top"
import {Group} from "../../composed"


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
