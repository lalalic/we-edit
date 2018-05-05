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

import "we-edit-loader-stream-file"
import "we-edit-loader-stream-browser"

const {Format}=Emitter


describe("we-edit integration", function(){
	const template=(format="svg")=>(
		<Loader type="file" path={require.resolve("../dist/basic.docx")}
			readonly={true} release={true}>
			<Emitter>
				<Stream type="file"
					path={Path.resolve(__dirname)}
					name={({format})=>`test.${format}`}
					>
					<Format type={format}/>
				</Stream>
			</Emitter>
		</Loader>
	)

	it("svg",()=>{
		return render(template())
	})
})
