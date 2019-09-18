# we-edit-office

It provide an example to create document editor with all we-edit parts.
It would create a default office for quick playaround if 
* process.env.NODE_ENV!=="production", or 
* an element with id=OfficeContainer in html page

##components
* DefaultOffice
* WeEditUI : hasActiveWorkspace will be injected into non-workspace children
* Workspace
* Dashboard

## exported domains for development
* weedit
* React
* ReactDOM

## function
* create(container, office=<DefaultOffice/>)


## example
```jsx
	<WeEdit>
        <WeEditUI fonts={["Arial", "Calibri", "Cambria"]}>
            <Workspace accept="*.docx" layout="print" debug={false}>
                <Viewer
                    toolBar={null} 
					ruler={false}
                    layout="read" 
					icon={<IconRead/>}
                    representation={<Representation type="pagination"/>}>

                </Viewer>

                <Editor
                    layout="print"
					icon={<IconPrint/>}
                    representation={<Representation type="pagination"/>}
					>

                </Editor>

                <Editor 
					ruler={false}
                    layout="web" 
					icon={<IconWeb/>}
                    representation={<Representation type="html"/>}>

                </Editor>
            </Workspace>
        </WeEditUI>
    </WeEdit>
```