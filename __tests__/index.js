import React from "react"
import Path from "path"
import {Loader, Emitter, Stream, render} from "we-edit"
import "we-edit-representation-pagination"
import "we-edit-representation-html"
import "we-edit-representation-text"

import "we-edit-input-docx"
import "we-edit-input-json"

import "we-edit-output-pdf"
import "we-edit-output-html"
import "we-edit-output-svg"
import "we-edit-output-input"

import "we-edit-loader-stream-file"
import "we-edit-loader-stream-browser"

const {Format}=Emitter

describe("we-edit integration", function(){
	const template=(format,)=>(
		<Loader type="file" path={Path.resolve(__dirname, "test.docx")}>
			<Emitter>
				<Stream type="file" path={Path.resolve(__dirname, "test.docx")}>
					<Format type={format}/>
				</Stream>
			</Emitter>
		</Loader>
	)
	
	it("",()=>render(template()))
})