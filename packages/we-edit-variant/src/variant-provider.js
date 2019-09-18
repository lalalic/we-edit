import React, {PureComponent, Fragment} from "react"
import PropTypes from "prop-types"
import vm from "vm"

export default class __$1 extends PureComponent{
	static displayName="VariantProvider"
    static childContextTypes={
        variantContext: PropTypes.object.isRequired
    }

    getChildContext(){
        return {
            variantContext:vm.createContext(this.props.value)
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
