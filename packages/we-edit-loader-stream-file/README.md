# we-edit-stream-file

file stream to show output immediately

## install
```sh
npm install we-edit-stream-file
```

## options
>name: string|function
>path: string|function

## example
```jsx
<Stream.Collection>
	<Stream type="file" path=".">
		<Emitter.Format type="pdf"/>
	</Stream>
	<Stream type="file" path="." name={({format})=>`test-${format}.${format}`}>
		<Emitter.Format type="svg"/>
	</Stream>
</Stream.Collection>
```