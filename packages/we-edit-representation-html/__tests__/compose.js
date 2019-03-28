import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {withContext} from "recompose"

import TestRenderer from "react-test-renderer"

jest.mock("../../we-edit-representation-pagination/src/composed/locator")

import dom from "../src/dom/edit"

var uuid=10

describe("html", ()=>{

	const {Document, Section, Paragraph, Text, Table, Row, Cell}=dom

	Paragraph.defaultProps.defaultStyle={fonts:"arial",size:12}
	Text.defaultProps=Object.assign(Text.defaultProps||{},{fonts:"arial",size:12})

	const provider=(A,Default={})=>withContext(A.contextTypes,({context})=>({...Default,...context}))(({children})=><Fragment>{children}</Fragment>)
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
			},
			ModelTypes:dom,
			Measure:class{
				height=10
				defaultStyle={height:10,descent:1}
				widthString(x,text){
					return Math.min(x,text.length)
				}

				stringWidth(text){
					return text.length
				}
			}
		})

	const StoreContext=provider({contextTypes:{
		activeDocStore:PropTypes.any,
		ModelTypes:PropTypes.any,
		Measure: PropTypes.any,
	}},store())

	const viewport={width:100,height:200,node:{scrollTop:0}}
	const margin={left:10,right:20,top:10,bottom:10}
	const render=(content,docProps={margin})=>{
		const renderer=TestRenderer.create(
			<StoreContext>
				<Document
					id="root"
					viewport={viewport}
					screenBuffer={0}
					scale={1}
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
			</StoreContext>
		)
		const doc=renderer.root.find(a=>a.type.displayName && a.type.displayName.endsWith("composable-document"))
		const composedDoc=doc.find(a=>a.type.displayName=="composed").instance
		const pages=composedDoc.props.pages
		const responsible=doc.find(a=>a.type.displayName=="composed-document-with-cursor").instance

		return {renderer, dom:doc,doc:doc.instance, pages, page:pages[0],composed:composedDoc,responsible}
	}

	it("basic editor compose",function(){
		const {page, pages}=render(undefined, {margin})
		expect(pages.length).toBe(1)
		expect(page.props.margin).toMatchObject(margin)
		expect(page.props.height).toBe(viewport.height)
	})

	it("doument always has only 1 page",()=>{
		const {dom, pages}=render(
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
		expect(pages.length).toBe(1)
		expect(dom.findAllByType(Text).length).toBe(2)
	})

	describe("responsible",()=>{
		function test(a, ...args){
			const {doc, responsible}=render(
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
			expect(test().position("2",3))
				.toMatchObject({x:margin.left+3, y:margin.top})
		})

		it("around", ()=>{
			expect(test().around(margin.left+3, margin.top+5))
				.toMatchObject({id:"2",at:3})
		})

		it("range rect",()=>{
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

			expect(doc.nextLine("2",3)).toMatchObject({id:"4",at:3})
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

			expect(doc.nextLine("2",3)).toMatchObject({id:"4",at:3})
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

			expect(doc.prevLine("4",3)).toMatchObject({id:"2",at:3})
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

			expect(doc.prevLine("4",3)).toMatchObject({id:"2",at:3})
		})
	})

	it("table",()=>{
		const {doc}=render(
			<Section id={`${++uuid}`}>
				<Table id={`${++uuid}`} width={50}>
					<Row id={`${++uuid}`} cols={[{x:0,width:10}]}>
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
