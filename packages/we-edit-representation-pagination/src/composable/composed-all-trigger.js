import React from "react"
/**
 * it's to make sequential render, check hasChildren.render
 * It's a KEY for whole composable 
 * ****every customized render should use this component as last one***
 */
export default Object.assign(
    ({host})=>(host.onAllChildrenComposed()||null),{
    displayName:"__end__",
    createElement(host){
        return <this host={host} key={`${host.getComposeType()}[${host.props.id}]`}/>
    }
})
