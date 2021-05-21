import React from "react"
import {Toolbar, ToolbarGroup, Tab} from "material-ui"

export default ({children, ...props})=>(
    <Tab {...props}>
        <Toolbar>
            <ToolbarGroup>
                {children}
            </ToolbarGroup>
        </Toolbar>
    </Tab>
)