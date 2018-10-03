import React,{Fragment} from "react"
import TestRender from "react-test-renderer"
import ReactDOMServer from 'react-dom/server'
import cheerio from "cheerio"

import {Viewers, Editors} from "../src"
import Responsible from "../src/composed/responsible"
import Locator from "../src/composed/locator"
import ComposedDocument from "../src/composed/document"
import provider from "./context"

const {Document, Section, Paragraph, Text, Image}=Editors
Document.defaultProps.id="root"

const $=pages=>{
	const html=ReactDOMServer.renderToString(<ComposedDocument pages={pages}/>)
	const $=cheerio.load(html)
	return $("svg")
}

jest.mock("../src/composed/locator")
describe("continuable", ()=>{
	const store=(state={
			equals({start,end}){
				return false
			},
			toJS(){
				return {start:{},end:{}}
			},
			hashCode(){
				return "1234"
			}
		})=>({activeDocStore:{
				subscribe(){},
				dispatch(){},
				getState(){
					return {
						get(){
							return state
						}
					}
				}
			}
		})

	const StoreContext=provider(Responsible,store())
	const TextContext=provider(Text,{
			Measure:class{
				height=10
				defaultStyle={height:10}
				widthString(x,text){
					return text.substring(0,x)
				}

				stringWidth(text){
					return text.length
				}
			}
		})
	const size={width:816,height:1056}
	const section=id=>(<Section id={`${id}.0`}
					pgSz={size}
					pgMar={{
						left: 96,
						right: 120,
						top: 120,
						bottom: 96,

						header: 48,
						footer: 48
					}}
				>
					<Paragraph id={`${id}.1`}>
						<Text  id={`${id}.2`} fonts="arial" size={12}>hello{id||""}</Text>
					</Paragraph>
				</Section>
	)
	const pageGap=12

	describe("compose to Y", ()=>{
		const compose2Y=(y,n)=>it(`${y},pages=${n}`,()=>{
			const renderer=TestRender.create(
				<StoreContext>
					<TextContext>
						<Document pageGap={pageGap} viewport={{width:500,height:y,node:{scrollTop:0}}} screenBuffer={()=>0} scale={1}>
							{section()}
							{section()}
							{section()}
						</Document>
					</TextContext>
				</StoreContext>
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
			const renderer=TestRender.create(
				<StoreContext context={store({
					equals(){
						return false
					},
					toJS(){
						return {start:{id,at:0},end:{id,at:0}}
					},
					hashCode(){
						return "1234"
					}
				})}>
					<TextContext>
						<Document viewport={{width:500,height:100,node:{scrollTop:0}}} screenBuffer={()=>0} scale={1}>
							{section(1)}
							{section(2)}
							{section(3)}
						</Document>
					</TextContext>
				</StoreContext>
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
		function compose2(node,state){
			const renderer=TestRender.create(
				<StoreContext context={store(state)}>
					<TextContext>
						<Document pageGap={pageGap} viewport={{width:500,height:size.height/2,node}} screenBuffer={()=>0} scale={1}>
							{section(1)}
							{section(2)}
							{section(3)}
						</Document>
					</TextContext>
				</StoreContext>
			)
			return renderer.root.findByType(Document).instance
		}

		it("compose to y then to 2y",()=>{
			const node={scrollTop:0}
			const state={
				equals(){
					return false
				},
				toJS(){
					return {start:{},end:{}}
				},
				hashCode(){
					return "1234"
				}
			}
			const doc=compose2(node,state)
			let pages=doc.computed.composed

			expect($(pages).text()).toBe("hello1")
			expect(pages.length).toBe(1)

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
				equals(){
					return false
				},
				toJS(){
					return {start:{},end:{}}
				},
				hashCode(){
					return "1234"
				}
			}
			const doc=compose2(node,state)

			let pages=doc.computed.composed

			expect($(pages).text()).toBe("hello1")
			expect(pages.length).toBe(1)

			return new Promise((resolve, reject)=>{
				state.toJS=jest.fn(()=>{
					return {start:{id:"3.3",at:0},end:{id:"3.3",at:0}}
				})
				doc.setState({mode:"viewport",time:Date.now()},()=>{
					let pages=doc.computed.composed
					expect(pages.length).toBe(3)
					expect($(pages).text()).toBe("hello1hello2hello3")
					resolve()
				})
			})

		})

		it("compose to id then to id with cache",()=>{
			const node={scrollTop:0}
			const state={
				equals(){
					return false
				},
				toJS(){
					return {start:{id:"2.2",at:0},end:{id:"2.2",at:0}}
				},
				hashCode(){
					return "1234"
				}
			}
			Section.prototype.render=jest.fn(Section.prototype.render)
			Paragraph.prototype.render=jest.fn(Paragraph.prototype.render)
			const doc=compose2(node,state)

			const pages=doc.computed.composed
			expect(pages.length).toBe(2)
			expect($(pages).text()).toBe("hello1hello2")
			expect(Section.prototype.render).toHaveBeenCalledTimes(3)
			expect(Section.prototype.render).lastReturnedWith(null)
			expect(Paragraph.prototype.render).toHaveBeenCalledTimes(2)


			return new Promise((resolve, reject)=>{
				state.toJS=jest.fn(()=>{
					return {start:{id:"3.3",at:0},end:{id:"3.3",at:0}}
				})

				doc.setState({mode:"viewport",time:Date.now()},()=>{
					const pages=doc.computed.composed
					expect(pages.length).toBe(3)
					expect($(pages).text()).toBe("hello1hello2hello3")

					/**section1&section2 should not be recomposed
					1. section1/2.render should be return null
					2. so paragraph1/2.render should not be called
					*/
					expect(Section.prototype.render).toHaveBeenCalledTimes(6)
					expect(Paragraph.prototype.render).toHaveBeenCalledTimes(3)

					expect(Section.prototype.render).nthReturnedWith(4,null)
					expect(Section.prototype.render).nthReturnedWith(5,null)
					expect(React.isValidElement(Section.prototype.render.mock.results[5].value)).toBe(true)
					//expect(section2.render).lastReturnedWith(null)

					resolve()
				})
			})
		})
	})


	xdescribe("locating cursor/selection",()=>{
		it("only when content composed",()=>{

		})

		it("only when cursored content composed",()=>{

		})

		it("only when selected content composed",()=>{

		})
	})

	xdescribe("when selection/cursor changed, cursor should go to viewport",()=>{
		it("input content",()=>{

		})

		it("selection change=>compose=>",()=>{

		})

		it("selection change=>no compose[content,scroll,selection]=>",()=>{

		})

		it("cursor change=>compose=>",()=>{

		})

		it("cursor change=>no compose=>",()=>{

		})
	})


	xdescribe("cacheable", ()=>{

	})

})
