if (!String.prototype.splice) {
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import ReactDOMServer from "react-dom/server"

export {loadFont} from "./fonts"
import Content, {Text} from "./content"
import Editor from "./editor"

import SVGWordWrapper from "./wordwrap/svg"
import CanvasWordWrapper from "./wordwrap/canvas"
import NodeWordWrapper from "./wordwrap/node"

import Input from "./input/"

export function edit(input,container){
	Editor.Text.WordWrapper=SVGWordWrapper
    ReactDOM.unmountComponentAtNode(container)
	return Input.load(input)
		.then(doc=>ReactDOM.render(doc.createReactElement(Editor), container))
}

export function compose(input){
	return Input.load(input)
		.then(doc=>ReactDOMServer.renderToStaticMarkup(doc.createReactElement(Content)))
}

export function preview(input,container){
    ReactDOM.unmountComponentAtNode(container)
	return Input.load(input)
		.then(doc=>ReactDOM.render(doc.createReactElement(Content), container))
}

/*
export function test(){
	let A=Content
    //Text.WordWrapper=NodeWordWrapper
	loadFont().then(fonts=>
		ReactDOM.render((
			<A.Document>
				<A.Section>
					<A.Paragraph>
						<A.Inline><A.Text>{Array(1).fill("over").join(" ")}</A.Text></A.Inline>
						<A.Image width={100} height={100}
							src="http://n.sinaimg.cn/news/transform/20160629/gbf3-fxtniax8255947.jpg"/>

						<A.Inline><A.Text>{Array(100).fill("hello1, let's edit").join(" ")}</A.Text></A.Inline>

						<A.Inline><A.Text>{Array(1).fill("over").join(" ")}</A.Text></A.Inline>
					</A.Paragraph>
				</A.Section>
			</A.Document>
		),document.querySelector('#app'))
	)
}
*/
