# we-edit

## install
```sh
npm install we-edit
```

## design
* load (input)->
* render to (we-edit document)->
* render to (represenation document)->
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

* Represenation
* Emitter

* WithStore
* WithSelection

* onlyWhen
* when

* Cursor
* Selection


#### state
* ACTION
* DOMAIN
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

### model
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
