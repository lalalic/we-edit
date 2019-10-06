# we-edit-office

It provide an example to create an office suites with all we-edit parts.
It would create a default office for quick playaround if 
* document.title==="test", or 
* an element with id=OfficeContainer in html page

## components
* WeEditUI : setup UI
* Office: a default office to manage workspaces  
* Workspace: a workspace for a type/group of document, such as *.doc
  * Workspace.Desk: to define a uniform workspace desk style[layout,toolbar,...]
  * Workspace.Layout: to define layout of workspace[left,canvas,right]

* Ribbon: a domain to help create ribbons
  * Ribbon, 
  * Toolbar, 
  * ToolbarSeparator, 
  * Text : text content toolbar, 
  * Paragraph: paragraph content toolbar,
  * File: file functional toolbar,
  * History: undo/redo toolbar,
  * Table: table content toolbar,
  * Picture: picture content toolbar,
  * Layout: layout toolbar, 
  * Tabs, Tab, 
  * CheckIconButton,
  * DropDownButton
* Dashboard:  

## short-cut function
* create(container, office=<Office/>)


## install
```bash
    npm install we-edit
```

## example
```jsx
import {WeEdit,Viewer, Editor} from "we-edit"
import {WeEditUI, Office, Workspace } from "we-edit/office"
import iDocx from "we-edit/input-docx"

    iDocx.install()

    const IconRead=props=><span/>
    const IconPrint=props=><span/>
    const IconWeb=props=><span/>

    const docxWorkspace=(
        <Workspace accept="*.docx" layout="print" debug={false}>
            <Viewer
                toolBar={null} 
                ruler={false}
                layout="read" 
                icon={<IconRead/>}
                representation="pagination">

            </Viewer>

            <Editor
                layout="print"
                icon={<IconPrint/>}
                representation="pagination"
                >

            </Editor>

            <Editor 
                ruler={false}
                layout="web" 
                icon={<IconWeb/>}
                representation="html">

            </Editor>
        </Workspace>
    )
    const inddWorkspace=(
        <Workspace accept="*.indd">
            <Viewer
                layout="print"
                icon={<IconPrint/>}
                representation="pagination"
                />
        </Workspace>
    )

    const notSupported=(
        <Workspace accept="*">
            not supported content
        </Workspace>
    )

    //you can manage office by yourself as following
    const myOffice=(
        <WeEdit>{/*manage multiple document state*/}
            <WeEditUI fonts={["Arial", "Calibri", "Cambria"]}>{/* setup UI and manage workspaces*/}
                {docxWorkspace}
                {inddWorkspace}
                {notSupported}
            </WeEditUI>
        </WeEdit>
    )
    ReactDOM.render(myOffice, document.querySelector("#officeContainer"))
    /* //or you can use default office to install/uninstall workspace
        //install order is critical, first in, last chance
        Office.install(notSupported)
        Office.insall(inddWorkspace)
        ReactDOM.render(<Office/>, document.querySelector("#officeContainer"))
        Office.install(docxWorkspace)
    */  
```