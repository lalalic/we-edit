import React from "react"
import TestRender from "react-test-renderer"
import {ReactQuery} from "we-edit"
import {Viewers, Editors} from "../src"
import provider from "./context"

describe.each([
	["viewer",Viewers],
	["editor", Editors,{shouldContinueCompose:()=>true}]
])("%s",(testing,Composers,CONTEXT={})=>{
	const {Document, Section, Frame, Paragraph, Text, Image,Table,Row,Cell}=Composers
	Paragraph.defaultProps.defaultStyle={fonts:"arial",size:10}

	class Measure{
		constructor({size}){
			this.defaultStyle={height:size,descent:1}
		}

		widthString(x,text){
			return x
		}
		stringWidth(text){
			return text.length
		}
	}
	const WithTextContext=provider(Text,{Measure})
	const WithParagraphContext=provider(Paragraph)
	const Context={
		parent:{},
		Measure,
	}
	describe("text",()=>{
		const test=(text,expects=a=>a)=>()=>{
			const context={...Context,getMyBreakOpportunities:text=>text.split(/\s+/)}
			const getMyBreakOpportunities=context.getMyBreakOpportunities=jest.fn(context.getMyBreakOpportunities)
			const appendComposed=context.parent.appendComposed=jest.fn()

			const renderer=TestRender.create(
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
			const nextAvailableSpace=context.parent.nextAvailableSpace=jest.fn(()=>({
				width:lineWidth,height:100
			}))
			const appendComposed=context.parent.appendComposed=jest.fn()
			const renderer=TestRender.create(
				<WithParagraphContext context={context}>
					<WithTextContext>
						<Paragraph id="1" {...{spacing,indent,align, numbering}} defaultStyle={{fonts:"arial",size:10}}>
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
			const align=(align,lineWidth=LineWidth)=>{
				let lines=test(lineWidth,undefined,undefined,align)
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
			const numbering=label=>test(TEXT.length+10,undefined,undefined,undefined,undefined,{label})
			it("*",()=>{
				const lines=numbering(<Text id="numbering" fonts="arial" size={10}>*</Text>)
				expect(lines.length).toBe(1)
				const line=new ReactQuery(lines[0])
				const label=line.find(".numbering")
				expect(label.length).toBe(1)
				expect(label.findFirst(`[children="*"]`).length).toBe(1)
			})

			it("label baseline same with first line",()=>{
				const lines=numbering(<Text id="numbering" fonts="arial" size={20}>*</Text>)
				const line=new ReactQuery(lines[0])
				const label=line.findFirstAndParents(`[children="*"]`)
				const text=line.findFirstAndParents(`[data-type="text"]`)
				expect(label.first.length).toBe(1)
				expect(text.first.length).toBe(1)

				expect([label.first.get(0),...label.parents].reduce((Y,{props:{y=0}})=>Y+y,0))
					.toBe([text.first.get(0),...text.parents].reduce((Y,{props:{y=0}})=>Y+y,0))
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
			const renderer=TestRender.create(
				<WithSectionContext context={context}>
					{section()}
				</WithSectionContext>
			)
			expect(document.appendComposed).toHaveBeenCalledTimes(1)
		})

		it("a few sections",()=>{
			document.appendComposed=jest.fn()
			const renderer=TestRender.create(
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
					const rendered=TestRender.create(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={8}>
									<Row id={`${u++}`} cols={[{x:0,width:6}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`} defaultStyle={{size:10}}>
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

				it("row height can be enlarged when content height>setting height",()=>{
					let page
					document.appendComposed=jest.fn(a=>page=a)
					const rendered=TestRender.create(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={8}>
									<Row id={`${u++}`} height={2} cols={[{x:0,width:6}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`} defaultStyle={{size:10}}>
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
					const rendered=TestRender.create(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={8}>
									<Row id={`${u++}`} cols={[{x:0,width:7}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`} defaultStyle={{size:10}}>
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
					const rendered=TestRender.create(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={10}>
									<Row id={`${u++}`} cols={[{x:0,width:7}]} >
										<Cell id={`${u++}`}>
											<Table id={`${u++}`} width={8}>
												<Row id={`${u++}`} cols={[{x:0,width:7}]}>
													<Cell id={`${u++}`}>
														<Paragraph id={`${u++}`} defaultStyle={{size:10}}>
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
					const rendered=TestRender.create(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${`${u++}`}`} width={10}>
									<Row id={`${u++}`} cols={[{x:0,width:5},{x:5,width:5}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`} defaultStyle={{size:10}}>
												<Text id={`${u++}`} fonts="arial" size={15}>hello hello</Text>
											</Paragraph>
										</Cell>
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`} defaultStyle={{size:10}}>
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
					const rendered=TestRender.create(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={10}>
									<Row id={`${u++}`} cols={[{x:0,width:5},{x:5,width:5}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`} defaultStyle={{size:10}}>
												<Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`} defaultStyle={{size:10}}>
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
					const rendered=TestRender.create(
						<WithSectionContext context={context}>
							{section(
								<Table id={`${u++}`} width={10}>
									<Row id={`${u++}`} cols={[{x:0,width:5},{x:5,width:5}]} >
										<Cell id={`${u++}`}>
											<Paragraph id={`${u++}`} defaultStyle={{size:10}}>
												<Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
											</Paragraph>
										</Cell>

										<Cell id={`${u++}`}>
											<Table id={`${u++}`} width={10}>
												<Row id={`${u++}`} cols={[{x:0,width:5},{x:5,width:5}]}>
													<Cell id={`${u++}`}>
														<Paragraph id={`${u++}`} defaultStyle={{size:10}}>
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
			const renderer=TestRender.create(
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
			const [line]=test({size:{width:8,height:50}})
			const image=new ReactQuery(line).findFirst("[xlinkHref]")
			expect(image.length).toBe(1)
			expect(line.props.width).toBe(10)
			expect(image.attr('width')).toBe(8)
			expect(new ReactQuery(line).findFirst(".story").findFirst("[y]").attr('y')).toBe(50)
		})

		it("image(size.width>capacity)", ()=>{
			const lines=test({size:{width:11,height:50}})
			const line=new ReactQuery(lines[0])
			const image=line.find("[xlinkHref]")
			expect(image.length).toBe(1)
			expect(line.attr('width')).toBe(10)
			expect(image.attr('width')).toBe(11)
			expect(line.attr('height')).toBe(50)
		})

		it("image(size.height>capacity)", ()=>{
			const lines=test({size:{width:5,height:110}})
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
})
