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

## Components

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
