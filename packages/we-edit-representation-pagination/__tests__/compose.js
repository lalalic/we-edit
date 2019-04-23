import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render, provider, Measure, defaultProps,context,$} from "./context"

import {Viewers, Editors} from "../src"

describe.each([
	["viewer",Viewers],
	["editor", Editors,{shouldContinueCompose:()=>true}]
])("%s",(testing,dom,CONTEXT={})=>{
	const {Document, Section, Frame, Paragraph, Text, Image,Table,Row,Cell, Shape}=dom

	const WithTextContext=provider(Text,{Measure})
	const WithParagraphContext=provider(Paragraph)
	const Context={
		parent:{},
		Measure,
	}

	beforeAll(()=>{
		defaultProps(dom)()
	})


	describe("text",()=>{
		const test=(text,expects=a=>a)=>()=>{
			const context={...Context,getMyBreakOpportunities:text=>text.split(/\s+/)}
			const getMyBreakOpportunities=context.getMyBreakOpportunities=jest.fn(context.getMyBreakOpportunities)
			const appendComposed=context.parent.appendComposed=jest.fn()

			const renderer=render(
				<WithTextContext context={context}>
					<Text id="0" fonts="arial" size={12}>{text}</Text>
				</WithTextContext>
			)

			expects(appendComposed)
		}

		it("basic process", test("hello world",appendComposed=>expect(appendComposed).toHaveBeenCalled()))

		if(testing=="editor"){
			it("empty",test("",appendComposed=>expect(appendComposed).toHaveBeenCalled()))
		}else{
			it("empty",test("",appendComposed=>expect(appendComposed).not.toHaveBeenCalled()))
		}
	})

	describe("paragraph",()=>{
		const TEXT="hello world"
		const test=(lineWidth=5,spacing={}, indent={},align, text=TEXT, numbering)=>{
			const context={...Context,exclusive:()=>[],...CONTEXT}
			if(testing=="editor"){
				context.numbering=()=>'*'
			}
			const nextAvailableSpace=context.parent.nextAvailableSpace=jest.fn(()=>({
				width:lineWidth,height:100
			}))
			const appendComposed=context.parent.appendComposed=jest.fn()
			const renderer=render(
				<WithParagraphContext context={context}>
					<WithTextContext>
						<Paragraph id="1" {...{spacing,indent,align, numbering}}>
							<Text id="0" fonts="arial" size={10}>{text}</Text>
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

		describe("align",()=>{
			const LineWidth=20
			const align=(align,lineWidth=LineWidth,text)=>{
				let lines=test(lineWidth,undefined,undefined,align,text)
				const dom=lines.dom
				lines=lines.map(line=>line.props.children)
				expect(lines.length>0).toBe(true)
				return Object.assign(lines,{dom})
			}
			it("left",()=>{
				[align(),align("left")].forEach(([line])=>{
					const story=new ReactQuery(line).find(".story")
					expect(story.children().length).toBe(1)
					expect(story.children().eq(0).attr('x')).toBe(0)
				})
			})

			it("right",()=>{
				const [line]=align("right")
				const story=new ReactQuery(line).find(".story")
				expect(story.children().length).toBe(1)
				expect(story.children().eq(0).attr('x')).toBe(LineWidth-TEXT.length)

			})

			it("center",()=>{
				const [line]=align("center")
				const story=new ReactQuery(line).find(".story")
				expect(story.children().length).toBe(1)
				expect(story.children().eq(0).attr('x')).toBe((LineWidth-TEXT.length)/2)
			})

			it("justify: ^hello world$, last line not justify",()=>{
				const [line,last]=align("justify", 12, "hello world cool stuff")
				const story=new ReactQuery(line).find(".story")
				expect(story.children().length).toBe(4)
				expect(story.children().eq(0).attr('x')).toBe(0)
				expect(story.children().eq(1).attr('x')).toBe(5)
				expect(story.children().eq(2).attr('x')).toBe(12-5)
				//last line not justify
				expect(new ReactQuery(last).find(".story").children().length).toBe(1)
			})

			describe("<Text>  hello  world  </Text>",()=>{
				const TEXT="  hello  world   "
				const LineWidth=TEXT.length+5
				const align=(align,lineWidth=LineWidth,text=TEXT)=>{
					let lines=test(lineWidth,undefined,undefined,align,text)
					const dom=lines.dom
					lines=lines.map(line=>line.props.children)
					expect(lines.length>0).toBe(true)
					return Object.assign(lines,{dom})
				}
				it("left",()=>{
					[align(),align("left")].forEach(([line])=>{
						const story=new ReactQuery(line).find(".story")
						expect(story.children().length).toBe(1)
						expect(story.children().eq(0).attr('x')).toBe(0)
					})
				})

				it("right",()=>{
					const [line]=align("right")
					const story=new ReactQuery(line).find(".story")
					expect(story.children().eq(0).attr('x')).toBe(LineWidth-TEXT.length+3)

				})

				it("center",()=>{
					const [line]=align("center")
					const story=new ReactQuery(line).find(".story")
					expect(story.children().eq(0).attr('x')).toBe((LineWidth-TEXT.length+3)/2)
				})

				it("justify",()=>{
					const lines=align("justify",14,"  Hello World Good Example  ")
					expect(lines.length).toBe(2)
					const story=new ReactQuery(lines[0]).find(".story")
					expect(story.children().eq(0).attr('x')).toBe(0)
					const whitespaces=story.find(".whitespace")
					expect(whitespaces.length).toBe(4)
					{
						const {last,parents}=story.findLastAndParents(".whitespace")
						expect(last.length).toBe(1)
						expect([last.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)).toBe(14)
					}
					const texts=story.find(a=>typeof(a.props.children)=="string" && a.props.className!="whitespace")
					expect(texts.length).toBe(2)
					expect(texts.eq(1).attr('children')).toBe("World")
					{
						const {first,parents}=story.findFirstAndParents(`[children="World"]`)
						expect(first.length).toBe(1)
						expect([first.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)).toBe(14-"World".length)
					}

					{//not justify the last line
						const lastLine=new ReactQuery(lines[1])
						expect(lastLine.find(`[data-type="text"]`).length).toBe(1)
						const {first,parents}=lastLine.findFirstAndParents(`[data-type="text"]`)
						expect([first.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)).toBe(0)
					}
				})
			})
		})

		describe("wordwrap",()=>{
			it("atom width>line width",()=>{
				const lines=test(4)
				expect(lines.length).toBe(2)
				expect(new ReactQuery(lines[0]).findFirst(`[data-type="text"]`).attr("children")).toMatch("hello")
				expect(new ReactQuery(lines[1]).findFirst(`[data-type="text"]`).attr("children")).toBe("world")
			})
		})

		describe("numbering",()=>{
			const numbering=numbering=>test(TEXT.length+10,undefined,undefined,undefined,undefined,numbering)
			it("*",()=>{
				const lines=numbering({label:'*', style:{fonts:"arial",size:10}})
				expect(lines.length).toBe(1)
				const line=new ReactQuery(lines[0])
				const label=line.find(".numbering")
				expect(label.length).toBe(1)
				expect(label.findFirst(`[children="*"]`).length).toBe(1)
			})

			it("label baseline same with first line",()=>{
				const lines=numbering({label:'*', style:{fonts:"arial",size:10}})
				const line=new ReactQuery(lines[0])
				const label=line.findFirstAndParents(`[children="*"]`)
				const text=line.findFirstAndParents(`[data-type="text"]`)
				expect(label.first.length).toBe(1)
				expect(text.first.length).toBe(1)

				expect([label.first.get(0),...label.parents].reduce((Y,{props:{y=0}})=>Y+y,0))
					.toBe([text.first.get(0),...text.parents].reduce((Y,{props:{y=0}})=>Y+y,0))
			})

			describe("align", ()=>{
				const LineWidth=20
				const align=(align,lineWidth=LineWidth,text,numbering={label:'*', style:{fonts:"arial",size:10}})=>{
					let lines=test(lineWidth,undefined,{left:2,firstLine:-2},align,text,numbering)
					const dom=lines.dom
					lines=lines.map(line=>line.props.children)
					expect(lines.length>0).toBe(true)
					return Object.assign(lines,{dom})
				}
				it("left",()=>{
					[align(),align("left")].forEach(([line])=>{
						const story=new ReactQuery(line).find(".story")
						expect(story.children().length).toBe(1)
						expect(story.children().eq(0).attr('x')).toBe(0)
					})
				})

				it("right",()=>{
					const [line]=align("right")
					const $line=new ReactQuery(line)
					const numbering=$line.findFirstAndParents(".numbering")
					expect(numbering.first.length).toBe(1)
					expect([numbering.first.get(0), ...numbering.parents]
						.reduce((X,{props:{x=0}})=>X+x,0))
						.toBe(LineWidth-TEXT.length-2)

					const text=$line.findLastAndParents(`[data-type="text"]`)
					expect(text.last.length).toBe(1)
					const len=text.last.attr("children").length
					expect([text.last.get(0), ...text.parents]
						.reduce((X,{props:{x=0}})=>X+x,0))
						.toBe(LineWidth-len)

				})

				it("center",()=>{
					const [line]=align("center")
					const $line=new ReactQuery(line)
					const numbering=$line.findFirstAndParents(".numbering")
					expect(numbering.first.length).toBe(1)
					const leftSpace=(LineWidth-TEXT.length-2)/2
					expect([numbering.first.get(0), ...numbering.parents]
						.reduce((X,{props:{x=0}})=>X+x,0))
						.toBe(leftSpace)

					const text=$line.findLastAndParents(`[data-type="text"]`)
					expect(text.last.length).toBe(1)
					const len=text.last.attr("children").length
					expect([text.last.get(0), ...text.parents]
						.reduce((X,{props:{x=0}})=>X+x,0))
						.toBe(LineWidth-leftSpace-len)
				})

				it.each([
					[14],
					[15],
					[16]
					])("justify with line width %d",(lineWidth)=>{
					const [line,last]=align("justify", lineWidth, "hello world cool stuff")
					expect(!!last).toBe(true)
					const story=new ReactQuery(line).find(".story")
					expect(story.find(`[data-type="text"]`)
						.toArray()
						.map(a=>a.props.children)
						.join("")).toMatch(/^hello.world.$/)
					expect(story.children().length).toBe(5)
					expect(story.children().eq(0).attr('x')).toBe(0)//*
					expect(story.children().eq(1).attr('x')).toBe(2)//hello
					expect(story.children().eq(2).attr('x')).toBe(2+5)//whitespace
					expect(story.children().eq(3).attr('x')).toBe(lineWidth-5)//world
					expect(story.children().eq(4).attr('x')).toBe(lineWidth)//whitesapce
					//last line not justify
					expect(new ReactQuery(last).find(".story").children().length).toBe(1)
				})
			})
		})

		describe("empty paragraph should also append line to parent",()=>{
			it("no error",()=>{
				const [line]=test(undefined,undefined,undefined,"left","")
				expect(line.props.height).toBe(10)
			})
		})
	})

	describe("Section",()=>{
		const WithSectionContext=provider(Section,{ModelTypes:Viewers})

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
		const context={parent:document,...CONTEXT}

		const section=(id=0)=>(
			<Section create={(props,context)=>new Frame({...props,width:10,height:10},context)} id={`${id}.2`} key={id}>
				<WithParagraphContext>
					<WithTextContext>
						<Paragraph id={`${id}.1`}>
							<Text id={`${id}.0`} fonts="arial" size={10}>hello</Text>
						</Paragraph>
					</WithTextContext>
				</WithParagraphContext>
			</Section>
		)

		it("basic",()=>{
			document.appendComposed=jest.fn()
			const renderer=render(
				<WithSectionContext context={context}>
					{section()}
				</WithSectionContext>
			)
			expect(document.appendComposed).toHaveBeenCalledTimes(1)
		})

		it("a few sections",()=>{
			document.appendComposed=jest.fn()
			const renderer=render(
				<WithSectionContext context={context}>
					{[1,2,3,4,5].map(section)}
				</WithSectionContext>
			)
			expect(document.appendComposed).toHaveBeenCalledTimes(5)
		})


		describe("table",()=>{
			let u=1
			const section=table=>(
				<Section create={(props,context)=>new Frame({...props,width:10,height:20},context)} id={0} key={0}>
					<WithParagraphContext>
						<WithTextContext>
							{table}
						</WithTextContext>
					</WithParagraphContext>
				</Section>
			)

			describe("one column",()=>{
				it("basic",()=>{
					let page
					document.appendComposed=jest.fn(a=>page=a)
					const rendered=render(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={8}>
									<Row id={`${u++}`} cols={[{x:0,width:6}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`}>
												<Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>
									</Row>
								</Table>
							)}
						</WithSectionContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(1)

					expect(page.lastLine).toBeDefined()
					const table=new ReactQuery(page.lastLine)
						.findFirst(`[data-type="table"]`)
						.get(0)
					expect(table).toBeDefined()
					expect(table.props.height).toBe(12)
				})

				it("empty cell should be ok",()=>{
					let page
					document.appendComposed=jest.fn(a=>page=a)
					const rendered=render(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={8}>
									<Row id={`${u++}`} cols={[{x:0,width:6}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`}/>
										</Cell>
									</Row>
								</Table>
							)}
						</WithSectionContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(1)

					expect(page.lastLine).toBeDefined()
					const table=new ReactQuery(page.lastLine)
						.findFirst(`[data-type="table"]`)
						.get(0)
					expect(table).toBeDefined()
					expect(table.props.height).toBe(12)
				})

				it("row height can be enlarged when content height>setting height",()=>{
					let page
					document.appendComposed=jest.fn(a=>page=a)
					const rendered=render(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={8}>
									<Row id={`${u++}`} height={2} cols={[{x:0,width:6}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`}>
												<Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>
									</Row>
								</Table>
							)}
						</WithSectionContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(1)

					expect(page.lastLine).toBeDefined()
					const row=new ReactQuery(page.lastLine)
						.findFirst(`[data-type="row"]`)
					expect(row.length).toBe(1)
					expect(row.attr('height')).toBe(10+2)
				})

				it("column width can be enlarged when content width>setting width",()=>{

				})


				it("cell can be splitted into pages",()=>{
					document.appendComposed=jest.fn()
					const rendered=render(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={8}>
									<Row id={`${u++}`} cols={[{x:0,width:7}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`}>
												<Text id={`${u++}`} fonts="arial" size={10}>hello hello hello</Text>
											</Paragraph>
										</Cell>
									</Row>
								</Table>
							)}
						</WithSectionContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(3)
				})

				it("nested cell can be splitted into pages",()=>{
					document.appendComposed=jest.fn()
					const rendered=render(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={10}>
									<Row id={`${u++}`} cols={[{x:0,width:7}]} >
										<Cell id={`${u++}`}>
											<Table id={`${u++}`} width={8}>
												<Row id={`${u++}`} cols={[{x:0,width:7}]}>
													<Cell id={`${u++}`}>
														<Paragraph id={`${u++}`}>
															<Text id={`${u++}`} fonts="arial" size={10}>hello hello hello</Text>
														</Paragraph>
													</Cell>
												</Row>
											</Table>
										</Cell>
									</Row>
								</Table>
							)}
						</WithSectionContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(3)
				})
			})

			describe("two columns",()=>{
				it("[[hello ][hello],[hello]]",()=>{
					let u=0
					const pages=[]
					document.appendComposed=jest.fn(page=>pages.push(page))
					const rendered=render(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${`${u++}`}`} width={10}>
									<Row id={`${u++}`} cols={[{x:0,width:5},{x:5,width:5}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`}>
												<Text id={`${u++}`} fonts="arial" size={15}>hello hello</Text>
											</Paragraph>
										</Cell>
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`}>
												<Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>
									</Row>
								</Table>
							)}
						</WithSectionContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(2)
				})
				it("[[hello],[hello ][hello]]",()=>{
					const pages=[]
					document.appendComposed=jest.fn(page=>pages.push(page))
					const rendered=render(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={10}>
									<Row id={`${u++}`} cols={[{x:0,width:5},{x:5,width:5}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`}>
												<Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`}>
												<Text id={`${u++}`} fonts="arial" size={15}>hello hello</Text>
											</Paragraph>
										</Cell>

									</Row>
								</Table>
							)}
						</WithSectionContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(2)
				})

				it("[[hello],[[hello ][hello]]]",()=>{
					const pages=[]
					document.appendComposed=jest.fn(page=>pages.push(page))
					const rendered=render(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={10}>
									<Row id={`${u++}`} cols={[{x:0,width:5},{x:5,width:5}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`}>
												<Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>

										<Cell id={`${u++}`}>
											<Table id={`${u++}`} width={10}>
												<Row id={`${u++}`} cols={[{x:0,width:5},{x:5,width:5}]}>
													<Cell id={`${u++}`}>
														<Paragraph id={`${u++}`}>
															<Text id={`${u++}`} fonts="arial" size={15}>hello hello</Text>
														</Paragraph>
													</Cell>
													<Cell id={`${u++}`}/>
												</Row>
											</Table>
										</Cell>

									</Row>
								</Table>
							)}
						</WithSectionContext>
					)
					expect(document.appendComposed).toHaveBeenCalledTimes(2)
				})
			})
		})
	})

	describe("image",()=>{
		const test=props=>{
			const context={...Context,exclusive:()=>[],...CONTEXT}
			const nextAvailableSpace=context.parent.nextAvailableSpace=jest.fn(()=>({
				width:10,height:100
			}))
			const appendComposed=context.parent.appendComposed=jest.fn()
			const renderer=render(
				<WithParagraphContext context={context}>
					<WithTextContext>
						<Paragraph id="2">
							<Image id="1" {...props}/>
						</Paragraph>
					</WithTextContext>
				</WithParagraphContext>
			)
			return Object.assign(appendComposed.mock.calls.map(([line])=>line),{dom:renderer.root})
		}
		it("image(size<=capacitty)", ()=>{
			const [line]=test({width:8,height:50})
			const image=new ReactQuery(line).findFirst("[xlinkHref]")
			expect(image.length).toBe(1)
			expect(line.props.width).toBe(10)
			expect(image.attr('width')).toBe(8)
		})

		it("image(size.width>capacity)", ()=>{
			const lines=test({width:11,height:50})
			const line=new ReactQuery(lines[0])
			const image=line.find("[xlinkHref]")
			expect(image.length).toBe(1)
			expect(line.attr('width')).toBe(10)
			expect(image.attr('width')).toBe(11)
			expect(line.attr('height')).toBe(50)
		})

		it("image(size.height>capacity)", ()=>{
			const lines=test({width:5,height:110})
			expect(lines.length).toBe(1)
			const line=new ReactQuery(lines[0])
			const image=line.find("[xlinkHref]")
			expect(image.length).toBe(1)
			expect(line.attr('width')).toBe(10)
			expect(line.attr('height')).toBe(110)
			expect(image.attr('width')).toBe(5)
			expect(image.attr('height')).toBe(110)
		})

		describe("anchored",()=>{

		})

		describe("rotate",()=>{

		})
	})

	describe("shape",()=>{
		const parent={}
		const Context=context({
			contextTypes:{
				parent:PropTypes.any,
				ModelTypes:PropTypes.any,
				shouldContinueCompose: PropTypes.func,
				getMyBreakOpportunities:PropTypes.func,
			},
			context:{
				parent,
				ModelTypes:{Frame},
				shouldContinueCompose:()=>true,
				getMyBreakOpportunities:jest.fn(),
			}
		})

		beforeEach(()=>{
			parent.nextAvailableSpace=jest.fn()
			parent.appendComposed=jest.fn()
		})

		it("can be empty",()=>{
			parent.nextAvailableSpace.mockReturnValueOnce({width:100,height:100})
			const {}=render(<Context><Shape {...{width:100,height:100,id:"shape"}}/></Context>)
		})

		it("with text",()=>{
			var composed
			parent.nextAvailableSpace.mockReturnValueOnce({width:100,height:100})
			parent.appendComposed.mockImplementationOnce(a=>composed=a)
			render(
				<Context>
					<Shape {...{width:100,height:100,id:"shape"}}>
						<Paragraph id="p">
							<Text children="hello" id="text"/>
						</Paragraph>
					</Shape>
				</Context>)
			expect(parent.appendComposed).toHaveBeenCalledTimes(1)
			expect(new ReactQuery(composed).find(`[data-type="text"]`).attr("children")).toBe("hello")
		})

		it("with table",()=>{
			var u=9
			var composed
			parent.nextAvailableSpace.mockReturnValueOnce({width:100,height:100})
			parent.appendComposed.mockImplementationOnce(a=>composed=a)
			render(
				<Context>
					<Shape {...{width:100,height:100,id:"shape"}}>
						<Table id={`${u++}`} width={8}>
							<Row id={`${u++}`} cols={[{x:0,width:6}]} >
								<Cell id={`${u++}`}>
									<Paragraph id={`${u++}`}>
										<Text id={`${u++}`}>hello</Text>
									</Paragraph>
								</Cell>
							</Row>
						</Table>
					</Shape>
				</Context>)
			expect(parent.appendComposed).toHaveBeenCalledTimes(1)
		})

		describe("size",()=>{
			const test=(props={width:100,height:100})=>{
				var composed
				parent.nextAvailableSpace.mockReturnValueOnce({width:100,height:100})
				parent.appendComposed.mockImplementationOnce(a=>composed=a)
				render(<Context><Shape {...{...props,id:"shape"}}/></Context>)
				expect(parent.appendComposed).toHaveBeenCalledTimes(1)
				return new ReactQuery(composed)
			}

			it("without outline",()=>{
				const composed=test()
				expect(composed.attr("width")).toBe(100)
				expect(composed.attr("height")).toBe(100)
			})

			it("outline should be counted",()=>{
				const width=10
				const composed=test({width:100,height:100, outline:{width}})
				expect(composed.attr("width")).toBe(100+width)
				expect(composed.attr("height")).toBe(100+width)
			})

			xit("rotate",()=>{

			})
		})
	})
})
