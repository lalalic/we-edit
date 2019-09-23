import React, {PureComponent, Fragment} from "react"
import PropTypes from "prop-types"
import {Loader} from "we-edit"

import ComboBox from "../components/combo-box"
import reducer from "../state/reducer"
import ACTION from "../state/action"

export default class __$1 extends PureComponent{
    static contextTypes={
        store: PropTypes.object
    }
	
    state={}
    getSupportedLoaders(){
        return Array.from(Loader.supports.keys())
    }

    render(){
		const Loaders=this.getSupportedLoaders()
        let {type}=this.state
        const {onLoad}=this.props
		
		if(!type && Loaders.length==1){
			type=Loaders[0]
		}
        return (
            <Fragment>
                { Loaders.length>1 &&
                    (<div style={{textAlign:"center"}}>
                        <ComboBox 
							hintText="select a loader..."
							dataSource={Loaders}
                            onChange={type=>this.setState({type})}
                            value={type||""}/>
                    </div>)
                }
				{type && 
					<Loader type={type}
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
				}
            </Fragment>
        )
    }
}
