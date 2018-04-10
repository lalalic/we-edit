import React, {PureComponent, Fragment} from "react"
import PropTypes from "prop-types"
import {Loader} from "we-edit"

import ComboBox from "../components/combo-box"
import reducer from "../state/reducer"
import ACTION from "../state/action"

export default class extends PureComponent{
    static contextTypes={
        store: PropTypes.object
    }
    state={type:this.getSupportedLoaders()[0]}

    getSupportedLoaders(){
        return Object.keys(Loader.supports)
    }

    render(){
        const Loaders=this.getSupportedLoaders()
        const {onLoad}=this.props
        return (
            <Fragment>
                { Loaders.length>1 ?
                    (<div>
                        <ComboBox dataSource={Loaders}
                            onChange={type=>this.setState({type})}
                            value={this.state.type}/>
                    </div>) : null
                }
                <Loader type={this.state.type}
                    {...this.props}
                    onLoad={
                        loader=>{
                            onLoad()
							if(loader){
								this.context.store.dispatch(ACTION.loader(loader))
							}
                        }
                    }
                    reducer={reducer}
                    />
            </Fragment>
        )
    }
}
