# we-edit
a document editing library

## install
```sh
npm install we-edit
```
## Picture
Preceding DOM can be rendered(evolved) to next DOM for different purpose, which exactly match **Reactjs Component **concept.
* Evolve in order: 
	* File 
	* content state:{root:{children:[...]},001:{},...}
	* Content DOM
	* Representation DOM
	* View DOM
	* Emit DOM/Event
* content state as store to support multiple view/edit/emit tasks for same state
* utilize React to evolve DOM for different purpose, and to improve performance 
* installable plugin to extend system, including Input, Loader, Stream, Emitter Format, Representation


## design
Loader load input file by Stream, convert it to redux store, create representation document based on state in the store to view/edit in browser, or emit to a file format 
* Loader (Input) -> we-edit models
* Viewer/Editor/Emitter -> we-edit document
* Represenation(pagination/html/text) -> view document
* Emitter.Format -> output document
* Stream(load,write) -> file/url/object/...



###example
```js
	//to convert docx to pdf, svg, and html on console
	import {Loader, Emitter, Stream, render} from "we-edit"
	import iDocx from "we-edit/input-docx"
	import lsFile from "we-edit/loader-stream-file"
	import * from "we-edit/representation-pagination"
	import * from "we-edit/representation-html"
	
	iDocx.install()
	lsFile.install()

	render(// loade file and then emit to a file stream with formats of pdf, svg, and html
		<Loader type="file" path="./test.docx">
			<Emitter>
				<Stream type="file" path="./test" name={({format})=>`test.${format}`}>
					<Emitter.Format type="pdf"/>
					<Emitter.Format type="svg"/>
					<Emitter.Format type="html"/>
				</Stream>
			</Emitter>
		</Loader>
	)
		.then(a=>console.log(a))
		.catch(e=>console.error(e))
		
	//to view test.docx in browser in pages
	import {Loader, Viewer, Representation} from "we-edit"
	import iDocx from "we-edit/input-docx"
	import lsBrowser from "we-edit/loader-stream-browser"
	import * from "we-edit/representation-pagination"
	import ReactDOM from "react-dom"

	iDocx.install()
	lsBrowser.install()
	ReactDOM.render(//load from browser to view in pages
		<Loader type="browser">
			<Viewer representation={<Representation type="pagination"/>}>
		</Loader>,
		document.body
	)
	
	//to edit test.docx in browser in pages
	import {Loader, Editor, Representation} from "we-edit"
	import iDocx from "we-edit/input-docx"
	import lsBrowser from "we-edit/loader-stream-browser"
	import * from "we-edit/representation-pagination"
	import ReactDOM from "react-dom"

	iDocx.install()
	lsBrowser.install()
	ReactDOM.render(// load from browser to edit in pages
		<Loader type="browser">
			<Editor representation="pagination"/>
		</Loader>,
		document.body
	)
	
	//or without loader to use load of Input Type
	iDocx.load(file)
		.then(doc=>{
			return ReactDOM.render(//edit an existing document store in pages
				<doc.Store>
					<Editor representation="pagination"/>
				</doc.Store>,
				document.body
			)
		})

	//to edit test.docx in browser in pages, and view in html
	import {Loader, Editor, Representation} from "we-edit"
	import iDocx from "we-edit/input-docx"
	import lsBrowser from "we-edit/loader-stream-browser"
	import * from "we-edit/representation-pagination"
	import * from "we-edit/representation-html"
	import ReactDOM from "react-dom"
		iDocx.install()
		lsBrowser.install()
		ReactDOM.render(//load document from browser to view in html, and to edit in pages at same time
			<Loader type="browser">
				<div style={{position:"absolute",left:0,width:500}}>
					<Editor representation="pagination"/>
				</div>
				
				<div style={{position:"absolute",right:0,width:500}}>
					<Viewer representation="html"/>
				</div>
			</Loader>,
			document.body
		)
	
	//for more featur office, check  we-edit-office
```


## API

### top level

#### Input: API to extend supported files
* Viewable: base class to extend view only file
* Editable: base class to extend editable file
* get(type:string): get Viewable/EditableDocument type
* resolveFileType({data,ext,name,type,mimeType, ...extendedProps}): try to find supported document type according to props
* parse(file:Blob|Object|Buffer|...): parse input file to a we-edit models
	* return object with following important fields
		* Store: redux store reprensenting the input file
		* doc: [Input Type].parse() return
		* name, id, 
		* buildReducer: to extend reducer of Store

#### React components
* WeEdit: auto manage multiple document state stores
* WeEditUI, Office, Workspace, 
  * Ribbon, 
  * StatusBar, TitleBar, Canvas, Dashboard, 
  * reducer, 
  * create	

* Loader[type]: input
* Stream[type]: output
* Stream.Collection

* Editor 
* Viewer
* Emitter
* Emitter.Format[type]

* document models

* Represenation[type]
* Representation.[html|text|pagination|...].Output


* Cursor: wrapper of cursor shape
* Selection: wrapper of selection shape

* DocumentTree: tree structure of document

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

### document models
* Unknown,
* Ignore,
* Container,
* Document,
* Section,
* Paragraph,
* Text,
* Image,
* Table,
* Row,
* Cell,
* Frame,
* Shape,
* Anchor,
* Page,
* Template,

### state
* Selection: {start:{id,at},end:{id,at}, cursorAt:[start|end]}
	* cursor, range
	* not supported
		* template: need page
		* multiple ranges 
	* refactor: {start:{id,at}, end:{id,at}, page}, and cursor always on end, 
		* represtention doesn't need ordered start/end
			* when select/cursor, don't fix
		* reducer should need ordered start/end, fix start/end==> upper/lower
		* *Base Reducer is responsible for ordering start/end, and restore it when output state, so API is simpler and make start/end meaningful*
### corperation ready
* state.workers: [{id,name, selection}]
* actions
	* SELECT
	* dispatch: change event to remote,which should be customized by client
	* merge: remote change to local, which should be customized by local reducer
		* we-edit/content/async: is responsible for async loading content and render, could it be used to push remote change?!!
* process: load->create session with docid(as local doc id)
