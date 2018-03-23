# [we-edit](https://we-edit.org)

we-edit is a JavaScript library for building text editor.


* **Declarative:** 
* **React Component Based:** 
* **Easy extend:** 

[Learn how to use we-edit in your own project](https://we-edit.org/docs/getting-started.html).

## Documentation

You can find the documentation [on the website](https://we-edit.org/docs).  
It is divided into several sections:

* [Quick Start](https://we-edit.org/docs/hello-world.html)
* [Advanced Guides](https://we-edit.org/docs/jsx-in-depth.html)
* [API Reference](https://we-edit.org/docs/react-api.html)
* [Tutorial](https://we-edit.org/tutorial/tutorial.html)
* [Where to Get Support](https://we-edit.org/community/support.html)
* [Contributing Guide](https://we-edit.org/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/lalalic/we-edit).

## Examples

We have several examples [on the website](https://we-edit.org/). Here is the first one to get you started:

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

we-edit is available as the `we-edit` package on [npm](https://www.npmjs.com/). It is also available on a [CDN](https://we-edit.org/docs/cdn-links.html).

we-edit is flexible and can be used in a variety of projects. You can create new apps with it, but you can also gradually introduce it into an existing codebase without doing a rewrite.

The recommended way to install we-edit depends on your project. Here you can find short guides for the most common scenarios:

* [Trying Out React](https://we-edit.org/docs/try.html)
* [Creating a New Application](https://we-edit.org/docs/add-we-edit-to-a-new-app.html)
* [Adding we-edit to an Existing Application](https://we-edit.org/docs/add-we-edit-to-an-existing-app.html)

## Contributing

The main purpose of this repository is to continue to evolve we-edit core, making it faster and easier to use. Development of we-edit happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving we-edit.

### [Code of Conduct](https://we-edit.org/codeofconduct)


### [Contributing Guide](https://we-edit.org/contributing/how-to-contribute.html)

Read our [contributing guide](https://we-edit.org/contributing/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to we-edit.

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/lalalic/we-edit/labels/good%20first%20issue) that contain bugs which have a relatively limited scope. This is a great place to get started.

### License

we-edit is [MIT licensed](./LICENSE).

