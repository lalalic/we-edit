import React, {PureComponent} from "react"
import {Loader} from "we-edit"

import ComboBox from "../components/combo-box"

export default class extends PureComponent{
    state={type:this.getSupportedLoaders()[0]}

    getSupportedLoaders(){
        return Object.keys(Loader.supports)
    }

    render(){
        const Loaders=this.getSupportedLoaders()
        if(Loaders.length==1){
            return <Loader type={Loaders[0]} {...this.props}/>
        }else{
            return (
                <div>
                    <div>
                        <ComboBox dataSource={Loaders}
                            onChange={type=>this.setState({type})}
                            value={this.state.type}/>
                    </div>
                    <div>
                        <Loader type={this.state.type} {...this.props}/>
                    </div>
                </div>
            )
        }
    }
}
