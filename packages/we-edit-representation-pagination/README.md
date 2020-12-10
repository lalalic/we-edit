# we-edit-representation-pagination

Pagination representation is used to compose document to pages, and then you can use composed document to output PDF/PCL/.... 
Pagination representation is based on svg, so the composed pages are all svg elements.

## example
```jsx
	<Representation type="pagination"/>
```
or

```js
import Pagination from "we-edit-representation-pagination"
let representation=<Pagination/>
ReactDOM.render(<Editor representation={<Pagination/>}/>)
```
## Picture
* composable: define capabilities of layout component
	* layout: based on space
		* constraint-space: layout always happens in a constraint space
			* width: left <-> right
			* height: top <-> bottom
			* wrappees: excluded areas in the space
		* block: vertical layout, progressive implementation based on following capabilities
			* flow: flow content
			* anchorable: anchor some content when flow
			* widow-orphan controllable
			* columnable
			* balanceable: balance content in columns
			* autofitable: autofit content into the space
		* inline: horizontal layout, line height/decend, justify, and merge words for performance improvement
			* appendAtom
			* appendAnchor
			* appendTab
			* appendLineBreak
			* appendPageBreak
			* appendParagraphEnd

	* noChild
	* hasChild
	* hasParentAndChild
	* locatable: make everything locatable in composed result
		* locatorize: manage locatable components
	* recomposable: how to use cache when compose again
	* stoppable: how to stop myself when layout stop
	* continuable: control whole layout continue/stop in a component
	* composed-all-trigger: sequentialize layout
	* use-cached
		* help manage cached layout components with locatorized component
		* help understanding recompose process when inspecting doc tree
* composed : view DOM
	* svg
		* component of composed document tree
		* responsible: for viewer/editor
			* react to events
			* cursor shape, selection shape
			* control layout process by compose-more-trigger
			* positioning
			* movable, resizeable, ..., to support object modification
	* canvas: *in future*
* dom: represenation DOM, layout components
* fonts: font management
* measure: word/string measure
* output: based on view DOM
	* default based on event: onDocument, onPage, ...
	* react-render model also supported as advanced feature
* wordwrap: line break oppotunity

## Components
* Document
	* props
		* canvas
		* __sequentialCompose
* Section: a Page Layout creator
* Template: a reusable content as template
	* Use: a reference to template in layout
* Frame: layout management
* Paragraph: word wrap, break to atoms, and layout inline
* Text
	* Tab, LineBreak, PageBreak, FormFeed, ...
* Container: customizable type, and createComposed2Parent for special atoms
* ....


###Pagination: default, auto registration as representation[type="pagination"]
###Output: inherit Emitter.Format to provide output interface with following functions
>onDocument()
>onDocumentEnd()
>onPage({})
>onText({})
>onImage({})
>on[ElementName of svg]
more functions if you know what you are doing
>render
>output(content stream)
>on...
>addAsyncJob: push your async promise if you have
>.offset: current offset position 

#### output implementation example
```js
import PDFDocument from "pdfkit"

class PDF extends Output{
	onDocument(){
		this.pdf=new PDFDocument()
		this.pdf.pipe(this.props.stream)
	}
	
	onDocumentEnd(){
		this.pdf.end()
	}
	
	onText({text,x,y,fontSize, fontFamily, fontWeight, fill,...props}){
		this.pdf
			.fontSize(fontSize)
			.fontFamily(fontFamily)
			.fillColor(fill)
			.text(text, this.offset.x+x, this.offset.y+y)
	}
	
	onImage({xlink:href, width,height,x=0,y=0}){
		this.addAsyncJob(
			fetch(xlink:href)
				.then(res=>res.arrayBuffer())
				.then(buffer=>{
					this.pdf
					.image(buffer,this.offset.x+x, this.offset.y+y,width,height)
				})
		)
	}
}

```
## API
* template positioning is not implemented, so it always go to first page that included the template content
	* which is cheapest and acceptable
* tempate positioning need implementation of getComposer for template layout
	* Template doesn't keep composers of template instance
		* Template can implement itself special Locatorize to hold its own composers, and
			* hold template instances, then template composer can give instance  
