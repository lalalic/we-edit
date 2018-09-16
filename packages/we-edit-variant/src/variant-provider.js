import React, {PureComponent, Fragment} from "react"
import PropTypes from "prop-types"

export default class extends PureComponent{
    static childContextTypes={
        variantContext: PropTypes.object.isRequired
    }

    getChildContext(){
        return {
            variantContext:this.props.value
        }
    }

    render(){
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}
