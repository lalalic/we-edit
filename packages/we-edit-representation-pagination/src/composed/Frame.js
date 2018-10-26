import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"
import Group from "./group"

export default class Layer extends Component{
    static propTypes={
        z:PropTypes.number
    }

    static defaultProps={
        z:0
    }

    render(){
        return (
            <Group {...this.props} className="frame"/>
        )
    }
}
