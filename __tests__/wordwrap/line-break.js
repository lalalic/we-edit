import opportunities from "wordwrap/line-break"

describe("opportunities", function(){
	const text=[	"hello world ",
		"Video provides a powerful way to help ",
		"nobreakable ",
		"you prove your point. When you ",
		"click Online Video, you can paste in the embed"]
	
	const fromArray=opportunities(text)
	const fromJoined=opportunities([text.join("")])
		
	text.forEach(target=>
		it(`opportunities:"${target}"`, function(){
			let ops=opportunities([target])
			let first=ops[0]
			let last=ops[ops.length-1]
			expect(first.start.itemIndex).toBe(0)
			expect(first.start.at).toBe(0)
			
			expect(target.substring(first.start.at,first.end.at)).toBe(first.word)
			expect(first.end.itemIndex).toBe(0)
			
			
			expect(last.start.itemIndex).toBe(0)
			expect(last.end.at).toBe(target.length)
			expect(target.substring(last.start.at,last.end.at)).toBe(target.substr(last.start.at-last.end.at))
		})
	)
	
	it("[a,..,b]",function(){
		let content=text.join("")
		let first=fromArray[0]
		let last=fromArray[fromArray.length-1]
		expect(first.start.itemIndex).toBe(0)
		expect(first.start.at).toBe(0)
		expect(first.end.itemIndex).toBe(0)
		
		expect(text[0].substring(first.start.at,first.end.at)).toBe(first.word)
		
		
		
		expect(last.start.itemIndex).toBe(text.length-1)
		expect(last.end.itemIndex).toBe(text.length-1)
		expect(last.end.at).toBe(text[text.length-1].length)
		expect(text[text.length-1].substring(last.start.at,last.end.at))
			.toBe(text[text.length-1].substr(last.start.at-last.end.at))
	})
	
	it(`opportunities(joined)=opportunities(["","",""])`, function(){
		expect(fromArray.length).toBe(fromJoined.length)
		fromArray.forEach((a,i)=>expect(fromJoined[i].word).toBe(a.word))
	})
	
	it("{getText}", function(){
		class Wrapper{
			constructor(content){
				this.content=content
			}
		}
		let wrapped=text.map(a=>new Wrapper(a))
		let fromWrapper=opportunities(wrapped,wrapper=>wrapper.content)
		expect(fromArray.length).toBe(fromWrapper.length)
		fromArray.forEach((a,i)=>expect(fromWrapper[i].word).toBe(a.word))
	})
	
	it("breakable", function(){
		class Wrapper{
			constructor(content){
				this.content=content
			}
		}
		let wrapped=text.map(a=>new Wrapper(a))
		let fromWrapper=opportunities(wrapped,wrapper=>wrapper.content, wrapper=>wrapper.content!="nobreakable ")
		let fromArray1=opportunities(text.filter(a=>a!="nobreakable "))
		expect(fromArray1.length).toBe(fromWrapper.length-1)
		
		let found=fromArray1.reduce((found,a,i)=>{
			if(found!=-1)
				return found
			if(a.word==fromWrapper[i].word)
				return -1
			return i
		},-1)
		
		let index=text.indexOf("nobreakable ")
		
		expect(fromWrapper[found].start.itemIndex).toBe(index)
		expect(fromWrapper[found].start.at).not.toBeDefined()
		expect(fromWrapper[found].end).not.toBeDefined()
	})
	
	it("reviver", function(){
		let items=opportunities(text,undefined,undefined,a=>({...a,id:a.start.itemIndex}))
		items.forEach(a=>expect(a.id).toBe(a.start.itemIndex))
	})
	
	it("boundary:[hello ][world]",function(){
		let items=opportunities(["hello ","world"])
		let [first,second]=items
		expect(items.length).toBe(2)
		expect(second.start.itemIndex).toBe(1)
		expect(second.start.at).toBe(0)
	})
	
})

