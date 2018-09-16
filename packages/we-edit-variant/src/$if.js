import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import Component from "./$"


export default ({$if})=>class extends Component{
    static displayName="$if"
    static propTypes={
		condition: PropTypes.string.isRequired
    }

    static defaultProps={
		condition: "true"
    }

    render(){
        if(this.canAssemble){
            if(this.meet(this.context.variantContext,this.props.condition)){
                return (
                    <Fragment>
                        {this.props.children}
                    </Fragment>
                )
            }
            return null
        }

        return super.render()
    }

    meet=memoize((variantContext, condition)=>!!this.eval(condition))
}
