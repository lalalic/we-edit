import React, {PureComponent, Fragment} from "react"
import {Workers} from "../cursor/workers"
export default class Selection extends PureComponent{
    render(){
        const {children, workerShape, ...props}=this.props
        return (
            <Fragment>
                {React.cloneElement(children,props)}
                {workerShape && <Workers shape={workerShape}/>}
            </Fragment>
        )
    }
}