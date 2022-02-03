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


## PropTypesUI 
PropTypesUI is to create UI based on component's propTypes for ribbon, menu, tree UI mode. It support configurations through theme. Support following proptypes
### shape
### oneOf[wrapper1(checked,onClick,primaryText,leftIcon), equal, values, ]

### oneOfType
### arrayOf
```js
    /**
     * onAdd identify controlled/uncontrolled,
     * controlled: state.activeValue keeps changes, onAdd should handle activeValue submit when click add
     * uncontrolled: click add to add(initNewValue), then select it as active 
     
     * <PropTypesUI.wrappers.ArrayOf layout={({actions, collection, active})=><div/>}/>
     */
```
### link : link a property to a dialog
```js
    <link dialog={dialogName|component}><button/></link>
```
### bool, string, number
### customized: UnitShape, FontsShape
### wrapers: each prop node can be wrapped with a wrapper to customize UI layout, 
```js
    Wrapper=({host/*UI node, such as shape|oneOf|...*/, children/*raw UI*/})=><div/>
```
### Theme
theme is a central configuration for UI
```js
{
	$Types:{

	},
	$settingDialogs:{//register dialogs, so dialog can be called with context.dialogManager.show(dialogName)

	},
	$settingPanels:{//register panels, so panel can be toggled by context.panelManager.toggle()

	},
	//...Customized Shapes,
	UnitShape:{
		style:{width:100},//for all UI
		Dialog:{//UI Mode
			style:{width:150},//specific for dialog
		},
		Ribbon:{
			style:{width:50},
		},
		Tree:{
			style:{width:20},
		}
	}
	//...we-edit.dom,
	Paragraph:{
		indent:{
			
		}
	}
}
```


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