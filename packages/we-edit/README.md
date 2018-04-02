# we-edit

## install
```sh
npm install we-edit
```

## design
* load (input)->
* render to (we-edit document)->
* render to (represenation document) to Viewer/Editor/Emitter->
* render to (output document)


## API

### top level

#### input
* support
* load
* create
* Viewable
* Editable
* EditableDocument

#### components
* WeEdit

* Editor
* Viewer
* Emitter
* Emitter.Format[type]

* models domain

* Represenation[type]

* Stream[type]
* Stream.Collection

* WithStore
* WithSelection

* onlyWhen
* when

* Cursor
* Selection

#### state
* ACTION
* DOMAIN="we-edit"
* reducer
* getActive
* getContent
* getSelection
* getFile
* getUndos
* getRedos

#### tools
* getClientRect
* shallowEqual
* uuid

### models
* Document
* Section
* Paragraph
* Text
* Header
* Footer
* Image
* Table
* Row
* Cell
* List
* Frame
* Shape

###example
```js
import {Input} from "we-edit"
import ReactDOMServer from "reactDOM/server"

Input.load("test.docx")
	.then(doc=>ReactDOMServer.renderToString(
		<doc.Store>
			<Emitter>
				<Stream type="file" path="./test">
					<Emitter.Format type="pdf"/>
					<Emitter.Format type="svg"/>
					<Emitter.Format type="html"/>
				</Stream>
			</Emitter>
		</doc.Store>
	))

```