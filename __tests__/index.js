import {compose} from "../src"
import Input from "input"
import Docx from "input/docx"
import docx4js from "docx4js"

describe("we-edit api", function(){
	it("can compose",function(){
		expect(!!(compose)).toBe(true)
	})
	
	describe("input API", function(){
		beforeAll(()=>Input.support(Docx))
		
		it("can load/create file", function(){
			expect(Input.load).toBeDefined()
			expect(Input.create).toBeDefined()
		})
		
		it("can be extended with Input.support", function(){
			expect(Input.support).toBeDefined()
		})
		
		describe("loaded API", function(){
			let loaded
			
			beforeAll(()=>
				docx4js.create()
					.then(file=>Input.load(file))
					.then(docx=>loaded=docx)
			)
			
			it("provide store",function(){
				expect(loaded.Store).toBeDefined()
			})
			
			it("can be saved/rendered, can get state, can dispatch action",function(){
				expect(loaded.save).toBeDefined()
				expect(loaded.render).toBeDefined()
				expect(loaded.getState).toBeDefined()
				expect(loaded.dispatch).toBeDefined()
			})
		})
	})
})