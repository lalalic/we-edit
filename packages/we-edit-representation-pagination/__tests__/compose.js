import React from "react"
import TestRender from "react-test-renderer"
import {ReactQuery} from "we-edit"
import {Viewers, Editors} from "../src"
import provider from "./context"

describe("compose", ()=>{
	const {Document, Template, Frame, Paragraph, Text, Image,Table,Row,Cell}=Viewers
	class Measure{
		constructor({size}){
			this.defaultStyle={height:size}
		}

		widthString(x,text){
			return text.substring(0,x)
		}
		stringWidth(text){
			return text.length
		}
	}
	const WithTextContext=provider(Text,{Measure})
	const WithParagraphContext=provider(Paragraph)

	describe("text",()=>{
		const contextFactory=({width=5,height=100})=>({
			parent:{
				appendComposed(){

				}
			},
			Measure,
			getMyBreakOpportunities(text){
				return text.split(/\s+/)
			}
		})
		const Default="hello world"
		const test=(width=5,text=Default,expects=a=>a)=>()=>{
			const context=contextFactory({width})
			const getMyBreakOpportunities=context.getMyBreakOpportunities=jest.fn(context.getMyBreakOpportunities)
			const appendComposed=context.parent.appendComposed=jest.fn()

			const renderer=TestRender.create(
				<WithTextContext context={context}>
					<Text id="0" fonts="arial" size={12}>{text}</Text>
				</WithTextContext>
			)
			expect(appendComposed).toHaveBeenCalled()
			expects(appendComposed)
		}

		it("basic process", test())
	})
	describe("paragraph",()=>{
		const TEXT="hello world"
		const test=(lineWidth=5,spacing={}, indent={},align)=>{
			const context={parent:{}}
			const nextAvailableSpace=context.parent.nextAvailableSpace=jest.fn(()=>({
				width:lineWidth,height:100,
				frame:{
					exclusive(){
						return []
					}
				}
			}))
			const appendComposed=context.parent.appendComposed=jest.fn()
			const renderer=TestRender.create(
				<WithParagraphContext context={context}>
					<WithTextContext>
						<Paragraph id="1" spacing={spacing} indent={indent} align={align} defaultStyle={{fonts:"arial",size:10}}>
							<Text id="0" fonts="arial" size={10}>{TEXT}</Text>
						</Paragraph>
					</WithTextContext>
				</WithParagraphContext>
			)
			expect(nextAvailableSpace).toHaveBeenCalled()
			expect(appendComposed).toHaveBeenCalled()
			return Object.assign(appendComposed.mock.calls.map(([line])=>line),{dom:renderer.root})
		}

		describe("indent",()=>{
			const indent=indent=>test(10,undefined,indent).map(line=>line.props.children)
			it("left",()=>{
				const lines=indent({left:1})
				expect(lines.length>0).toBe(true)
				lines.forEach(line=>expect(line.props.x).toBe(1))
			})

			it("right",()=>{
				const lines=indent({right:2})
				expect(lines.length>0).toBe(true)
				lines.forEach(line=>expect(line.props.width).toBe(10-2))
			})

			it("firstLine",()=>{
				const lines=indent({firstLine:2})
				expect(lines.length>0).toBe(true)
				expect(lines[0].props.x).toBe(2)
			})

			it("hanging",()=>{
				const lines=indent({firstLine:-2})
				expect(lines.length>0).toBe(true)
				expect(lines[0].props.x).toBe(-2)
			})
		})

		describe("spacing",()=>{
			const lineHeight=10
			it("line height(number)",()=>{
				const lines=test(5,{lineHeight:11})
				expect(lines.length>0).toBe(true)
				lines.forEach(a=>expect(a.props.height).toBe(11))
			})

			it("line height(120%)",()=>{
				const lines=test(5,{lineHeight:"120%"})
				expect(lines.length>0).toBe(true)
				lines.forEach(a=>expect(a.props.height).toBe(lineHeight*1.2))
			})


			it("top",()=>{
				const lines=test(5,{top:7})
				expect(lines[0].props.height).toBe(lineHeight+7)
			})

			it("bottom",()=>{
				const lines=test(5,{bottom:7})
				expect(lines[lines.length-1].props.height).toBe(lineHeight+7)
			})
		})

		xdescribe("align",()=>{
			const align=(align,lineWidth=10)=>{
				let lines=test(lineWidth,undefined,undefined,align)
				const dom=lines.dom
				lines=lines.map(line=>line.props.children)
				expect(lines.length>0).toBe(true)
				return Object.assign(lines,{dom})
			}
			it("left",()=>{

			})

			it("right",()=>{


			})

			it("center",()=>{

			})
		})

		xdescribe("wordwrap",()=>{

		})
	})

	describe("template",()=>{
		const WithTemplateContext=provider(Template)

		const document={
			appendComposed(page){
				this.computed.composed.push(page)
			},
			getComposeType(){
				return "document"
			},
			computed:{
				composed:[]
			}
		}
		const template=(id=0)=>(
			<Template create={(props,context)=>new Frame({...props,width:10,height:10},context)} id={`${id}.2`} key={id}>
				<WithParagraphContext>
					<WithTextContext>
						<Paragraph id={`${id}.1`}>
							<Text id={`${id}.0`} fonts="arial" size={10}>hello</Text>
						</Paragraph>
					</WithTextContext>
				</WithParagraphContext>
			</Template>
		)

		it("template",()=>{
			document.appendComposed=jest.fn()
			const renderer=TestRender.create(
				<WithTemplateContext context={{parent:document}}>
					{template()}
				</WithTemplateContext>
			)
			expect(document.appendComposed).toHaveBeenCalledTimes(1)
		})

		it("template",()=>{
			document.appendComposed=jest.fn()
			const renderer=TestRender.create(
				<WithTemplateContext context={{parent:document}}>
					{[1,2,3,4,5].map(template)}
				</WithTemplateContext>
			)
			expect(document.appendComposed).toHaveBeenCalledTimes(5)
		})


		describe("table",()=>{
			let u=0
			const template=table=>(
				<Template create={(props,context)=>new Frame({...props,width:10,height:20},context)} id={0} key={0}>
					<WithParagraphContext>
						<WithTextContext>
							{table}
						</WithTextContext>
					</WithParagraphContext>
				</Template>
			)

			describe("one column",()=>{
				fit("basic",()=>{
					let page
					document.appendComposed=jest.fn(a=>page=a)
					const rendered=TestRender.create(
						<WithTemplateContext context={{parent:document}}>
							{template(
								<Table id={u++} cols={[6]} width={8}>
									<Row id={u++}>
										<Cell id={u++}>
											<Paragraph id={u++} defaultStyle={{size:10}}>
												<Text id={u++} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>
									</Row>
								</Table>
							)}
						</WithTemplateContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(1)
					expect(page.lastLine).toBeDefined()
					debugger
					const table=new ReactQuery(page.lastLine)
						.findFirst(`[data-type="table"]`)
						.get(0)
					expect(table).toBeDefined()
					expect(table.props.height).toBe(12)
				})

				it("cell can be splitted into pages",()=>{
					document.appendComposed=jest.fn()
					const rendered=TestRender.create(
						<WithTemplateContext context={{parent:document}}>
							{template(
								<Table id={u++} cols={[7]} width={8}>
									<Row id={u++}>
										<Cell id={u++}>
											<Paragraph id={u++} defaultStyle={{size:10}}>
												<Text id={u++} fonts="arial" size={10}>hello hello hello</Text>
											</Paragraph>
										</Cell>
									</Row>
								</Table>
							)}
						</WithTemplateContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(3)
				})

				it("nested cell can be splitted into pages",()=>{
					document.appendComposed=jest.fn()
					const rendered=TestRender.create(
						<WithTemplateContext context={{parent:document}}>
							{template(
								<Table id={u++} cols={[7]} width={10}>
									<Row id={u++}>
										<Cell id={u++}>
											<Table id={u++} cols={[7]} width={8}>
												<Row id={u++}>
													<Cell id={u++}>
														<Paragraph id={u++} defaultStyle={{size:10}}>
															<Text id={u++} fonts="arial" size={10}>hello hello hello</Text>
														</Paragraph>
													</Cell>
												</Row>
											</Table>
										</Cell>
									</Row>
								</Table>
							)}
						</WithTemplateContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(3)
				})
			})

			describe("two columns",()=>{
				it("[[hello ][hello],[hello]]",()=>{
					let u=0
					const pages=[]
					document.appendComposed=jest.fn(page=>pages.push(page))
					const rendered=TestRender.create(
						<WithTemplateContext context={{parent:document}}>
							{template(
								<Table id={u++} cols={[5,5]} width={10}>
									<Row id={u++}>
										<Cell id={u++}>
											<Paragraph id={u++} defaultStyle={{size:10}}>
												<Text id={u++} fonts="arial" size={15}>hello hello</Text>
											</Paragraph>
										</Cell>
										<Cell id={u++}>
											<Paragraph id={u++} defaultStyle={{size:10}}>
												<Text id={u++} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>
									</Row>
								</Table>
							)}
						</WithTemplateContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(2)
				})
				it("[[hello],[hello ][hello]]",()=>{
					const pages=[]
					document.appendComposed=jest.fn(page=>pages.push(page))
					const rendered=TestRender.create(
						<WithTemplateContext context={{parent:document}}>
							{template(
								<Table id={u++} cols={[5,5]} width={10}>
									<Row id={u++}>
										<Cell id={u++}>
											<Paragraph id={u++} defaultStyle={{size:10}}>
												<Text id={u++} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>
										<Cell id={u++}>
											<Paragraph id={u++} defaultStyle={{size:10}}>
												<Text id={u++} fonts="arial" size={15}>hello hello</Text>
											</Paragraph>
										</Cell>

									</Row>
								</Table>
							)}
						</WithTemplateContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(2)
				})

				it("[[hello],[[hello ][hello]]]",()=>{
					const pages=[]
					document.appendComposed=jest.fn(page=>pages.push(page))
					const rendered=TestRender.create(
						<WithTemplateContext context={{parent:document}}>
							{template(
								<Table id={u++} cols={[5,5]} width={10}>
									<Row id={u++}>
										<Cell id={u++}>
											<Paragraph id={u++} defaultStyle={{size:10}}>
												<Text id={u++} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>

										<Cell id={u++}>
											<Table id={u++} cols={[5,5]} width={10}>
												<Row id={u++}>
													<Cell id={u++}>
														<Paragraph id={u++} defaultStyle={{size:10}}>
															<Text id={u++} fonts="arial" size={15}>hello hello</Text>
														</Paragraph>
													</Cell>
													<Cell id={u++}/>
												</Row>
											</Table>
										</Cell>

									</Row>
								</Table>
							)}
						</WithTemplateContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(2)
				})
			})
		})
	})

	describe("image",()=>{
		const WithParagraphContext=provider(Paragraph)
		xit("basic image", ()=>{
			const rendered=TestRender.create(
				<WithParagraphContext>
					<Paragraph>
						<Image/>
					</Paragraph>
				</WithParagraphContext>
			)
		})
	})

	it("can compose in any container", ()=>{

	})
})
