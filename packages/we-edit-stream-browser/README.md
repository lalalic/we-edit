# we-edit-stream-browser

Browser stream to show output immediately

## install
```sh
npm install we-edit-stream-browser
```

## options
>name: file name to download or
>target: target window to show, could be [_blank|_self|_parent|_top|framename]
>windowFeatures: menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes

## example
```jsx
<Stream.Collection>
	<Stream type="browser" target="_blank">
		<Emitter.Format type="pdf"/>
	</Stream>
	<Stream type="browser" target="previewer2">
		<Emitter.Format type="svg"/>
	</Stream>
	<Browser target="_self">
		<Emitter.Format type="svg"/>
	</Browser>
</Stream.Collection>
```