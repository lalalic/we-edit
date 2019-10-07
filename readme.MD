# [we-edit](https://wenshubu.com)

we-edit is a JavaScript library for building text editor.


* **Declarative** 
* **React Component Based** 
* **Easy extend** 

[Learn how to use we-edit in your own project](https://github.com/lalalic/we-edit/tree/master/packages/we-edit).

## Documentation

You can find the documentation [on the website](https://github.com/lalalic/we-edit), and check each package for details.  
It is divided into several sections:

* [Quick Start](https://wenshubu.com/)
* [API Reference](https://wenshubu.com/docs/api.html)
* [Tutorial](https://wenshubu.com/tutorial/tutorial.html)
* [Where to Get Support](https://wenshubu.com/docs/support.html)
* [Contributing Guide](https://wenshubu.com/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/lalalic/we-edit).

## Examples

We have several examples [on the website](https://wenshubu.com/). Here is the first one to get you started:

```jsx
	ReactDOM.render(
		<WeEdit>
			<WeEditUI fonts={["Arial", "Calibri", "Cambria"]}>
				<Workspace accept="*.docx" layout="print" debug={false}>
					<Viewer
						toolBar={null} ruler={false}
						layout="read" icon={<IconRead/>}
						channel={<Pagination/>}>

					</Viewer>

					<Editor
						layout="print" 
						icon={<IconPrint/>}
						channel={<Pagination/>}
						>

					</Editor>

					<Editor ruler={false}
						layout="web" icon={<IconWeb/>}
						channel={<Html/>}>

					</Editor>
				</Workspace>
			</WeEditUI>
		</WeEdit>,
		document.querySelector("#OfficeContainer")
	)
```
This example will render we-edit-office into a container on the page.

## Installation

```sh
npm install we-edit we-edit-office
```

we-edit is available as the `we-edit` package on [npm](https://www.npmjs.com/). 

we-edit is flexible and can be used in a variety of projects. You can create new apps with it, but you can also gradually introduce it into an existing codebase without doing a rewrite.

The recommended way to install we-edit depends on your project. Here you can find short guides for the most common scenarios:

* [Trying Out we-edit](https://wenshubu.com/docs/try.html)
* [Creating a New Application](https://wenshubu.com/docs/add-we-edit-to-a-new-app.html)
* [Adding we-edit to an Existing Application](https://wenshubu.com/docs/add-we-edit-to-an-existing-app.html)

## Contributing

The main purpose of this repository is to continue to evolve we-edit core, making it faster and easier to use. Development of we-edit happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving we-edit.

### License

we-edit is [MIT licensed](./LICENSE).

