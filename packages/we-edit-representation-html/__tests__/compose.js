import React,{Fragment} from "react"
import {render as testRender, context, defaultProps, createCanvas} from "../../we-edit-representation-pagination/__tests__/context"

import dom from "../src/dom/edit"

describe("html", ()=>{
	var uuid=10
	const {Document, Section, Paragraph, Text, Table, Row, Cell}=dom
	const Context=context({dom})
	const viewport={width:100,height:200,node:{scrollTop:0}}
	const margin={left:10,right:20,top:10,bottom:10}
	const render=(content,docProps={margin})=>{
		const renderer=testRender(
			<Context>
				<Document
					canvas={createCanvas(Document,{
						viewport,
						screenBuffer:0,
						scale:1
					})}
					
					{...docProps}
					>
					<Fragment>
						{content ||
						<Section id={`${uuid++}`}>
							<Paragraph id={`${uuid++}`}>
								<Text id={`${uuid++}`}>Hello</Text>
							</Paragraph>
						</Section>
						}
					</Fragment>
				</Document>
			</Context>
		)
		const doc=renderer.root.find(a=>a.type.support?.("pageable","document"))
		const responsible=doc.find(a=>a.type.displayName=="responsible-composed-document-default-canvas").instance

		return {renderer, dom:doc,doc:doc.instance, page:doc.instance.page,responsible}
	}

	beforeAll(()=>{
		defaultProps(dom)()
	})

	it("basic editor compose",function(){
		const {page}=render(undefined, {margin})
		expect(page.props.margin).toMatchObject(margin)
		expect(page.createComposed2Parent().props.height).toBe(viewport.height)
	})

	it("doument always has only 1 page",()=>{
		const {dom}=render(
			<Fragment>
				<Section id={`${++uuid}`}>
					<Paragraph id={`${++uuid}`}>
						<Text id={`${++uuid}`}>Hello</Text>
					</Paragraph>
				</Section>
				<Section id={`${++uuid}`}>
					<Paragraph id={`${++uuid}`}>
						<Text id={`${++uuid}`}>World</Text>
					</Paragraph>
				</Section>
			</Fragment>
		)
		expect(dom.findAllByType(Text).length).toBe(2)
	})

	describe("responsible",()=>{
		function test(a, ...args){
			const {responsible}=render(
				a||(<Section id={`${uuid++}`}>
					<Paragraph id={`1`}>
						<Text id={`2`}>Hello</Text>
					</Paragraph>
				</Section>),
				...args
			)
			const positioning=responsible.positioning
			positioning.asCanvasPoint=jest.fn(({left,top})=>({x:left,y:top}))
			positioning.asViewportPoint=jest.fn(({x,y})=>({left:x, top:y}))
			const pageXY=positioning.pageXY=jest.fn(()=>({x:0,y:0}))
			return positioning
		}
		it("position",()=>{
			expect(test().position({id:"2",at:3}))
				.toMatchObject({x:margin.left+3, y:margin.top})
		})

		it("around", ()=>{
			expect(test().around(margin.left+3, margin.top+5))
				.toMatchObject({id:"2",at:3})
		})

		it("range rect",()=>{
			debugger
			expect(test().getRangeRects({id:"2",at:0},{id:"2",at:3}))
				.toMatchObject([{...margin, right:margin.left+3, bottom:margin.top+10}])
		})

		it("next line in a section",()=>{
			const doc=test(
				<Section id={`${uuid++}`}>
					<Paragraph id={`1`}>
						<Text id={`2`}>Hello</Text>
					</Paragraph>
					<Paragraph id={`3`}>
						<Text id={`4`}>World</Text>
					</Paragraph>
				</Section>
			)

			expect(doc.nextLine({id:"2",at:3})).toMatchObject({id:"4",at:3})
		})

		it("next line in two sections",()=>{
			const doc=test(
				<Fragment>
					<Section id={`${uuid++}`}>
						<Paragraph id={`1`}>
							<Text id={`2`}>Hello</Text>
						</Paragraph>
					</Section>
					<Section id={`${uuid++}`}>
						<Paragraph id={`3`}>
							<Text id={`4`}>World</Text>
						</Paragraph>
					</Section>
				</Fragment>
			)

			expect(doc.nextLine({id:"2",at:3})).toMatchObject({id:"4",at:3})
		})

		it("prev line in a section",()=>{
			const doc=test(
				<Section id={`${uuid++}`}>
					<Paragraph id={`1`}>
						<Text id={`2`}>Hello</Text>
					</Paragraph>
					<Paragraph id={`3`}>
						<Text id={`4`}>World</Text>
					</Paragraph>
				</Section>
			)

			expect(doc.prevLine({id:"4",at:3})).toMatchObject({id:"2",at:3})
		})

		it("prev line in two sections",()=>{
			const doc=test(
				<Fragment>
					<Section id={`${uuid++}`}>
						<Paragraph id={`1`}>
							<Text id={`2`}>Hello</Text>
						</Paragraph>
					</Section>
					<Section id={`${uuid++}`}>
						<Paragraph id={`3`}>
							<Text id={`4`}>World</Text>
						</Paragraph>
					</Section>
				</Fragment>
			)

			expect(doc.prevLine({id:"4",at:3})).toMatchObject({id:"2",at:3})
		})
	})

	it("table",()=>{
		const {doc}=render(
			<Section id={`${++uuid}`}>
				<Table id={`${++uuid}`} width={50}cols={[{x:0,width:10}]}>
					<Row id={`${++uuid}`} >
						<Cell id={`${++uuid}`}>
							<Paragraph id={`${++uuid}`}>
								<Text id={`${++uuid}`}>hello</Text>
							</Paragraph>
						</Cell>
					</Row>
				</Table>
			</Section>
		)
	})
})
