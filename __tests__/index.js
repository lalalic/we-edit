import React from "react"
import Path from "path"
import {Loader, Emitter, Stream, render} from "../packages/we-edit/src"
import "../packages/we-edit-representation-pagination/src"
import "../packages/we-edit-representation-html/src"
import "../packages/we-edit-representation-text/src"
        
import "../packages/we-edit-input-docx/src"
import "../packages/we-edit-input-json/src"
        
import "../packages/we-edit-output-pdf/src"
import "../packages/we-edit-output-html/src"
import "../packages/we-edit-output-svg/src"
import "../packages/we-edit-output-input/src"
        
import "../packages/we-edit-loader-stream-file/src"
import "../packages/we-edit-loader-stream-browser/src"

const {Format}=Emitter

describe("we-edit integration", function(){
	const template=(format="svg")=>(
		<Loader type="file" path={Path.resolve(__dirname, "basic.docx")}>
			<Emitter>
				<Stream type="file" path={Path.resolve(__dirname, "test.svg")}>
					<Format type={format}/>
				</Stream>
			</Emitter>
		</Loader>
	)
	
	it("",()=>render(template()))
})