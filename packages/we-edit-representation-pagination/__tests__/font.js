import fonts from "../src/fonts"
import FontMeasure from "../src/measure/font"

describe("fonts", function(){
	beforeAll(()=>fonts.fromPath(`${__dirname}/fonts`))
	
	it("can load", function(){
		expect(fonts.names.length).toBe(4)
	})
	
	it("stringWidth/lineHeight",function(){
		let ww=new FontMeasure({fonts:"verdana", size:11})
		let width=ww.stringWidth("hello")
		expect(width>0).toBe(true)
	})
})