import React from "react"
import Path from "path"
import {Loader, Emitter, Stream, render} from "we-edit"

import Pagination from "we-edit-representation-pagination"
import Html from "we-edit-representation-html"
import Text from "we-edit-representation-text"


import File from "we-edit-loader-stream-file"
import iDocx from "we-edit-input-docx"
import fs from "fs"


const {Format}=Emitter

describe("we-edit integration", function(){
	beforeAll(()=>{
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
		File.uninstall()
		iDocx.uninstall()
		Pagination.defaultProps.measure=undefined
	})
	const template=(format="svg", props={})=>(
		<Loader type="file"
			path={require.resolve("./basic.docx")}
			readonly={true}
			release={true}>
			<Emitter>
				<Stream {...props}>
					<Format type={format}/>
				</Stream>
			</Emitter>
		</Loader>
	);


	it("svg",()=>{
		const svg=[]
		return render(template("svg",{
			write(chunk, encoding, cb){
				svg.push(chunk.toString())
				process.nextTick(cb)
			}
		})).then(([{stream}])=>{
			expect(svg.join("")).toEqual(expect.stringContaining("Video provides a powerful way to help you prove your point"))
		})
	})

	xit("svg",()=>{
		return render(template("svg",{
			type :"file",
			path :Path.resolve(__dirname),
			name :({format})=>`${Date.now()}.${format}`
		})).then(([{stream}])=>{
			const path=stream.path
			expect(fs.existsSync(path)).toBe(true)
			fs.unlinkSync(path)
		})
	})

	it("html",()=>{
		const html=[]
		return render(template("html",{
			write(chunk,encoding,cb){
				html.push(chunk.toString())
				process.nextTick(cb)
			}
		})).then(()=>{
			expect(html.join("")).toEqual(expect.stringContaining("Video provides a powerful way to help you prove your point"))
		})
	})

	it("text",()=>{
		const output=[]
		return render(template("text",{
			write(chunk,encoding,cb){
				output.push(chunk.toString())
				process.nextTick(cb)
			}
		})).then(()=>{
			expect(output.join("")).toEqual(expect.stringContaining("Video provides a powerful way to help you prove your point"))
		})
	})
})
