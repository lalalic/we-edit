import React from "react"
import Path from "path"
import {Loader, Emitter, Stream, render} from "we-edit"

import Pagination from "we-edit-representation-pagination"

import SVG from "we-edit-output-svg"
import File from "we-edit-loader-stream-file"
import iDocx from "we-edit-input-docx"


const {Format}=Emitter

xdescribe("we-edit integration", function(){
	beforeAll(()=>{
		SVG.install()
		PDF.install()
		File.install()
		iDocx.install()

		Pagination.defaultProps.measure=class {
			defaultStyle={

			}

			lineHeight(){
				return {height:1,descent:0}
			}

			stringWidth(string){
				return string.length
			}

			widthString(width,string){
				return string
			}
		}
	})

	afterAll(()=>{
		SVG.uninstall()
		File.uninstall()
		iDocx.uninstall()
		Pagination.defaultProps.measure=undefined
	})
	const template=(format="svg")=>(
		<Loader type="file"
			path={require.resolve("./basic.docx")}
			readonly={true}
			release={true}>
			<Emitter>
				<Stream type="file"
					path={Path.resolve(__dirname)}
					name={({format})=>`test.${format}`}
					>
					<Format type={format}/>
				</Stream>
			</Emitter>
		</Loader>
	);


	it("svg",()=>{
		return render(template())
	})
})
