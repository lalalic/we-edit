import React from "react"
import {shallow, render, mount} from "enzyme"

import {Editor, Viewer, Composer, Pagination, Html} from "../../src/component"

const file="../docx/basic.docx"
describe("components", function(){
	
	fit("<Compose url=''/>", function(){
		let node=mount(
			<Composer url={file}>
				<Pagination/>
				<Html/>
			</Composer>
		)
		
		console.log(node.html())
	})
	
	it("<Preview url=''/>", function(){
		let node=(
			<Viewer url={file}>
				<Pagination/>
				<Html/>
			</Viewer>
		)
	})
	
	it("<Edit url=''/>", function(){
		let node=(
			<Editor url={file}>
				<Pagination/>
				<Html/>
			</Editor>
		)
	})
})