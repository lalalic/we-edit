# we-edit

## install
```sh
npm install we-edit
```

## design
* Loader (input) -> we-edit models
* Viewer/Editor/Emitter -> we-edit document
* Represenation(pagination/html/text) -> view document
* Emitter.Format -> output document
* Streamer -> file/url/...

###example
```js
	//to convert docx to pdf, svg, and html on console
	//you have to install 
	// and we-edit-input-docx
	// and we-edit-output-(pdf|svg|html), 
	// and we-edit-representation-(pagination|html),
	// and we-edit-loader-stream-file
	import {Loader, Emitter, Stream, render} from "we-edit"
	render(
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
	//you have to install 
	// and we-edit-input-docx
	// and we-edit-representation-pagination,
	// and we-edit-loader-stream-file	
	import {Loader, Viewer, Representation} from "we-edit"
	import ReactDOM from "react-dom"
		ReactDOM.render(
			<Loader type="file" path="./test.docx">
				<Viewer representation={<Representation type="pagination"/>}>
			</Loader>,
			document.body
		)
	
	//to edit test.docx in browser in pages
	//you have to install 
	// and we-edit-input-docx
	// and we-edit-representation-pagination,
	// and we-edit-loader-stream-file		
	import {Loader, Editor, Representation} from "we-edit"
	import ReactDOM from "react-dom"
		ReactDOM.render(
			<Loader type="file" path="./test.docx">
				<Editor representation={<Representation type="pagination"/>}/>
			</Loader>,
			document.body
		)
		
	//to edit test.docx in browser in pages, and view in html
	//you have to install 
	// and we-edit-input-docx
	// and we-edit-representation-pagination&html,
	// and we-edit-loader-stream-file		
	import {Loader, Editor, Representation} from "we-edit"
	import ReactDOM from "react-dom"
		ReactDOM.render(
			<Loader type="file" path="./test.docx">
				<div style={{position:"absolute",left:0,width:500}}>
					<Editor representation={<Representation type="pagination"/>}/>
				</div>
				
				<div style={{position:"absolute",right:0,width:500}}>
					<Viewer representation={<Representation type="html"/>}/>
				</div>
			</Loader>,
			document.body
		)
	
	//for more featur office, check  we-edit-office
```


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

* Loader[type]

* Editor
* Viewer
* Emitter
* Emitter.Format[type]

* models

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