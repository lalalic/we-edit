# we-edit-representation-html

Pagination representation is used to compose document to pages, and then you can use composed document to output PDF/PCL/...

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

## components
### Html: default, auto register representation[type="html"]
### Output: inherit Emitter.Format to provide output interface with following functions
>output(content stream)
