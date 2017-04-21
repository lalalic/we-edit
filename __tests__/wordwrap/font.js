import fonts from "fonts"
import WordWrapper from "wordwrap/node"

describe("fonts", function(){
	beforeAll(()=>fonts.fromPath(`${__dirname}/fonts`))
	
	it("can load", function(){
		expect(fonts.names().length).toBe(4)
	})
	
	it("stringWidth/lineHeight",function(){
		let ww=new WordWrapper({fonts:"verdana", size:11})
		let width=ww.stringWidth("hello")
		expect(width>0).toBe(true)
	})
})