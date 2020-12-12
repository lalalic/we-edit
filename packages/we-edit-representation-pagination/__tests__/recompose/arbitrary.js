import React from "react"
import {context, $, State, render, defaultProps, nthUseCached} from "../context"
import {Editors} from "../../src"

describe("continuable", ()=>{
	const pageGap=12
	const {Document, Section, Frame, Paragraph, Text}=Editors
	const Canvas=Document.defaultProps.canvas.type
		
	const Context=context({dom:Editors})
	const size={width:816,height:1056,
		composedHeight(){
			return this.height
		}
	}

	const section=(id,ps=1)=>(
		<Section id={`${id}.0`} key={`${id}.0`}
			createLayout={(props,context)=>{
				const page=new Section.Layout({...props,...size},context)
				Object.defineProperties(page,{
					composedHeight:{
						value:size.composedHeight()
					}
				})
				return page
			}}>
			<Paragraph id={`${id}.1`} key={`${id}.1`}>
				<Text  id={`${id}.2`} key={`${id}.2`} fonts="arial" size={12}>hello{id||""}</Text>
			</Paragraph>
			{
				new Array(ps-1)
					.fill(0)
					.map((a,i)=>
						<Paragraph id={`${id}.1.${i+1}`} key={`${id}.1.${i+1}`}>
							<Text  id={`${id}.2.${i+1}`} key={`${id}.2.${i+1}`} fonts="arial" size={12}>hello{`${id}.${i+1}`}</Text>
						</Paragraph>
					)
			}
		</Section>
	)

	beforeAll(()=>{
		defaultProps(Editors)()
		Paragraph.defaultProps.End=""
		console.debug=console.log=jest.fn()
		Canvas.prototype.asViewportPoint=jest.fn(a=>a)
	})

	describe("compose to Y", ()=>{	
		const compose2Y=(y,n)=>it(`${y},pages=${n}`,()=>{
			const renderer=render(
				<Context>
					<Document
						pageGap={pageGap}
						viewport={{width:500,height:y,node:{scrollTop:0}}}
						screenBuffer={0}
						scale={1}>
						{section(1)}
						{section(2)}
						{section(3)}
					</Document>
				</Context>
			)
			const doc=renderer.root.findByType(Document).instance
			const pages=doc.computed.composed
			expect(pages.length).toBe(n)
		})

		compose2Y(10,1)
		compose2Y(size.height,1)
		compose2Y(size.height+pageGap+1,2)
		compose2Y(size.height*1.9,2)
		compose2Y(size.height*2,2)
		compose2Y(size.height*2+2*pageGap+1,3)
		compose2Y(size.height*3,3)
		compose2Y(size.height*5,3)
	})

	describe("compose to id",()=>{
		const compose2Id=(id,n)=>it(`${id},pages=${n}`,()=>{
			State.toJS=jest.fn(()=>({start:{id,at:0},end:{id,at:0}}))
			
			const renderer=render(
				<Context>
					<Document viewport={{width:500,height:100,node:{scrollTop:0}}} screenBuffer={0} scale={1}>
						{section(1)}
						{section(2)}
						{section(3)}
					</Document>
				</Context>
			)
			const doc=renderer.root.findByType(Document).instance
			const pages=doc.computed.composed
			expect(pages.length).toBe(n)
		})

		compose2Id('1.0',1)
		compose2Id('1.1',1)
		compose2Id('1.2',1)

		compose2Id('2.2',2)

		compose2Id('3.2',3)
	})

	describe("compose to y/id then y/id",()=>{
		function compose2(node,state,i){
			let root=null
			Object.keys(state).map(k=>State[k]=jest.fn(function(){return state[k](...arguments)}))
			const renderer=render(
				<Context key="test">
					<Document id="root" pageGap={pageGap} viewport={{width:500,height:size.height/2,node}} screenBuffer={0} scale={1}>
						{section(1,i)}
						{section(2,i)}
						{section(3,i)}
					</Document>
				</Context>
			)
			return Object.assign(renderer.root.findByType(Document).instance,{renderer,root})
		}

		it("compose to y then to 2y",()=>{
			const node={scrollTop:0}
			const state={
				toJS(){
					return {start:{},end:{}}
				}
			}
			size.composedHeight=jest.fn(()=>size.height/2)
			const doc=compose2(node,state)
			let pages=doc.computed.composed

			expect(pages.length).toBe(1)
			expect($(pages).text()).toBe("hello1")
			
			return new Promise((resolve, reject)=>{
				node.scrollTop=size.height/2+pageGap
				doc.setState({mode:"viewport",time:Date.now()},()=>{
					let pages=doc.computed.composed
					expect(pages.length).toBe(2)
					expect($(pages).text()).toBe("hello1hello2")
					resolve()
				})
			})
		})

		it("compose to y then to id",()=>{
			const node={scrollTop:0}
			const state={
				toJS(){
					return {start:{},end:{}}
				}
			}
			const doc=compose2(node,state)

			let pages=doc.computed.composed

			expect(pages.length).toBe(1)
			expect($(pages).text()).toBe("hello1")
			
			return new Promise((resolve, reject)=>{
				state.toJS=jest.fn(()=>{
					return {start:{id:"3.2",at:0},end:{id:"3.2",at:0}}
				})
				doc.setState({mode:"viewport",time:Date.now()},()=>{
					let pages=doc.computed.composed
					expect(pages.length).toBe(3)
					expect($(pages).text()).toBe("hello1hello2hello3")
					resolve()
				})
			})

		})

		it("compose to id then to id",()=>{
			const node={scrollTop:0}
			const state={
				toJS(){
					return {start:{id:"2.2",at:0},end:{id:"2.2",at:0}}
				}
			}
			const doc=compose2(node,state)

			const pages=doc.computed.composed
			expect(pages.length).toBe(2)
			expect($(pages).text()).toBe("hello1hello2")

			return new Promise((resolve, reject)=>{
				state.toJS=jest.fn(()=>{
					return {start:{id:"3.2",at:0},end:{id:"3.2",at:0}}
				})

				doc.setState({mode:"viewport",time:Date.now()},()=>{
					const pages=doc.computed.composed
					expect(pages.length).toBe(3)
					expect($(pages).text()).toBe("hello1hello2hello3")

					resolve()
				})
			})
		})

		describe("cache", ()=>{
			it("scroll with cache(all) compose",()=>{
				const node={scrollTop:0}
				const state={
					toJS(){
						return {start:{id:"2.2",at:0},end:{id:"2.2",at:0}}
					}
				}
				const SectionRender=jest.spyOn(Section.prototype,"render")
				const ParagraphRender=jest.spyOn(Paragraph.prototype,"render")
				const doc=compose2(node,state)

				const pages=doc.computed.composed
				expect(pages.length).toBe(2)
				expect($(pages).text()).toBe("hello1hello2")
				expect(SectionRender).toHaveBeenCalledTimes(3)
				expect(SectionRender).lastReturnedWith(null)
				expect(ParagraphRender).toHaveBeenCalledTimes(2)


				return new Promise((resolve, reject)=>{
					state.toJS=jest.fn(()=>{
						return {start:{id:"3.2",at:0},end:{id:"3.2",at:0}}
					})

					doc.setState({mode:"viewport",time:Date.now()},()=>{
						const pages=doc.computed.composed
						expect(pages.length).toBe(3)
						expect($(pages).text()).toBe("hello1hello2hello3")

						/**section1&section2 should not be recomposed
						1. section1/2.render should be return null
						2. so paragraph1/2.render should not be called
						*/
						expect(SectionRender).toHaveBeenCalledTimes(6)
						expect(ParagraphRender).toHaveBeenCalledTimes(3)

						expect(nthUseCached(SectionRender,4)).toBe(true)
						expect(nthUseCached(SectionRender,5)).toBe(true)
						expect(nthUseCached(SectionRender,6)).toBe(false)
						
						SectionRender.mockRestore()
						ParagraphRender.mockRestore()
						resolve()
					})
				})
			})

			it("scroll with cache(part)/template compose",()=>{
				const node={scrollTop:0}
				const state={
					toJS(){
						return {start:{id:"2.2",at:0},end:{id:"2.2",at:0}}
					}
				}
				const SectionRender=jest.spyOn(Section.prototype,"render")
				const ParagraphRender=jest.spyOn(Paragraph.prototype,"render")
				const doc=compose2(node,state,2)

				const pages=doc.computed.composed
				expect(pages.length).toBe(2)
				expect($(pages).text()).toBe(`hello1hello1.1hello2`)
				//section 3 render to null since selection is on section2.paragraph1
				expect(SectionRender).toHaveBeenCalledTimes(3)
				expect(nthUseCached(SectionRender,3)).toBe(true)

				//section2.paragraph2 render to null since selection is on first paragraph
				expect(ParagraphRender).toHaveBeenCalledTimes(4)
				expect(nthUseCached(ParagraphRender,4)).toBe(true)


				return new Promise((resolve, reject)=>{
					state.toJS=jest.fn(()=>{
						return {start:{id:"3.2",at:0},end:{id:"3.2",at:0}}
					})
					doc.setState({mode:"selection",time:Date.now()},()=>{
						const pages=doc.computed.composed
						expect(pages.length).toBe(3)
						expect($(pages).text()).toBe("hello1hello1.1hello2hello2.1hello3")

						/**section1&section2 should not be recomposed
						1. section1/2.render should be return null
						2. so paragraph1/2.render should not be called
						*/
						expect(SectionRender).toHaveBeenCalledTimes(3+3)
						expect(nthUseCached(SectionRender,4)).toBe(true)
						
						expect(ParagraphRender).toHaveBeenCalledTimes(4+3)

						expect(nthUseCached(SectionRender,6)).toBe(false)
						
						SectionRender.mockRestore()
						ParagraphRender.mockRestore()
						resolve()
					})
				})
			})

		})
	})
})
