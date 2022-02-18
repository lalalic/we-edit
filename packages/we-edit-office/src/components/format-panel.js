import React from "react"
import {Tabs, Tab} from "material-ui"
import {whenSelectionChangeDiscardable} from "we-edit"

export default whenSelectionChangeDiscardable(({selection,children})=>{
    return {
        children: children.filter(({props:{target}})=>{
                if(typeof(target)=="string")
                    return selection?.props(target)
                else if(typeof(target)=="function")
                    return target(selection)
            })
    }
})(({children})=>{
    if(children.length<2)
        return children
    return (
        <Tabs>
            {children.map(a=>{
                const {target, label=target, icon}=a.props
                return <Tab key={target} label={!icon ? label : null} icon={icon}>{a}</Tab>
            })}
        </Tabs>
    )
})