import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {ToolbarSeparator} from "material-ui/Toolbar"
import IconButton from "../components/size-icon-button";

import IconDocTree from "material-ui/svg-icons/action/list"
import IconTest from "material-ui/svg-icons/action/bug-report"
import IconDiff from "material-ui/svg-icons/action/bug-report"


export default Object.assign(({diff, tester, docTree, children},{setting})=>(
    <Fragment>
        <IconButton hint="Document Tree" {...docTree} onClick={() => setting("documentTree")}>
            <IconDocTree />
        </IconButton>
        
        <IconButton hint="Diff" {...diff} onClick={e => setting("diff")}>
            <IconDiff />
        </IconButton>

        <IconButton hint="Tester" {...tester} onClick={() => setting("tester")}>
            <IconTest />
        </IconButton>
        {children}
        <ToolbarSeparator/>
    </Fragment>
),{contextTypes:{setting:PropTypes.func}})


