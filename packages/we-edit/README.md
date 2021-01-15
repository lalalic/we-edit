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

### collaborative edit
* document load by Loader.Collaborative implementation support collaborative editing
* Input Type must implement
	* getPatch(lastPatchState): {status, patch:[{target, op, data}]}
		* the patch data must include content id, such as <t xxid="2345"/>
		* the default implementation is to replace whole data with {status:crc, patch:[{target:'*', data:file data}]}
* Loader.Collaborative implementation must implement
	* load[must] : load your document content
		* return/resolved as {data, ..., 
			* id: unique document/collaborative session id
			* uid: worker unique id, which must be integer, and each uid should have big enough space to make content unique id, such as there are 100000 content objects between uid 10*100000 and 11*100000. normally, 
				* design uid as [session space:auto incre][content space: always 0...0]
					* content space decides how big document can be supported
					* session space decides how many workers can be supported to collaboratively edit one document
			 
	* remoteDispatch(action)[must]: dispatch local action to other workers
	* patch(state,{payload:lastPatchState})[must]: patch document accoring to current state, and last patch state
		* the default implemenation calls input <Strong>document.getPatch(state, lastPatchState)</Strong>, so the implemenation should call super.patch and then save to somewhere
		* patch action type is "<Strong>we-edit/collaborative/patch</Strong>"
		* a common implementation 
			1. when a collaborative session initiated, patch action should be fired with falsy last patch state
			2. the first worker should respond to patch action to send persisted file content with ids to server
			3. the server keep the patch
			4. next worker request collaborative editing 
			5. the server send document data to next worker
			6. the server send patch action from time to time to a worker to pull patch
			7. targeted worker respond patch to server
	* onNext(remoteAction,worker): this function must be called when remote action accept. Usually the client subscribe to server, and when client should call this function every time a message received
	* resolveConflict: this function is supposed to resolve selection conflict when a remote action happens
		* on selection not exist any more
		* or selection unexpectedly moved, such as delete text ahead of same text piece selection
		* the default implementation is to call document.onChange to resolve action "<Strong>we-edit/collaborative/conflict</Strong>"
			* Input Type implementation can resolve it in reducer
			* or leave it to editor
