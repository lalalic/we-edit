import React, {Fragment} from "react"
import {Toolbar, ToolbarGroup, Tab} from "material-ui"

export default ({children, label, ...props})=><Fragment {...props}>{children}</Fragment>
/*(
    <Tab {...props}>
        <Toolbar>
            <ToolbarGroup>
                {children}
            </ToolbarGroup>
        </Toolbar>
    </Tab>
)*/