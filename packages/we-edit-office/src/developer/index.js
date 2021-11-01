import React, {PureComponent,Fragment} from "react"
import {ToolbarSeparator} from "material-ui/Toolbar"
import FilterDocumentTree  from "./filter-document-tree"
import Tester from "./tester"
import DiffInput from "./diff-input"

export class Ribbon extends PureComponent{
    static displayName="Developer Tools"
    render(){
        const {diff, tester, docTree, children}=this.props
        return (
            <Fragment>
                <FilterDocumentTree.Button {...docTree}/>
                <DiffInput.Button {...diff}/>
                <Tester.Button {...tester}/>
                {children}
                <ToolbarSeparator/>
            </Fragment>
        )
    }
}


