# we-edit-representation-html
HTML representation show the content as html content without pages, header/footer, section, and etc. 

## example
```jsx
	<Representation type="html"/>
```
or

```js
import HTML from "we-edit-representation-html"
ReactDOM.render(<Editor representation={<HTML/>}/>)
```

## components
### Html: default, auto register representation[type="html"]
### Output: inherit Emitter.Format to provide output interface with following functions
>output(content stream)
