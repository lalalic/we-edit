import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {withContext} from "recompose"
import TestRenderer from "react-test-renderer"

jest.mock("../../we-edit-representation-pagination/src/composed/locator")

import dom from "../src/dom/edit"

var uuid=10

describe("html", ()=>{

	const {Document, Section, Paragraph, Text}=dom

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
					return x
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
		const doc=renderer.root.find(a=>a.type.displayName && a.type.displayName.endsWith("composable-document")).instance
		const composedDoc=renderer.root.find(a=>a.type.displayName=="composed").instance
		const pages=composedDoc.props.pages
		return {renderer, doc, pages, page:pages[0],composed:composedDoc}
	}

	it("basic editor compose",function(){
		const {page, pages}=render(undefined, {margin})
		expect(pages.length).toBe(1)
		expect(page.props.margin).toMatchObject(margin)
		expect(page.props.height).toBe(viewport.height)
	})


	it("two section, two pages, sum(height)>=viewport.height",()=>{
		const {pages}=render(
			<Fragment>
				<Section id={`${++uuid}`}>
					<Paragraph id={`${++uuid}`}>
						<Text id={`${++uuid}`}>Hello</Text>
					</Paragraph>
				</Section>
				<Section id={`${++uuid}`}>
					<Paragraph id={`${++uuid}`}>
						<Text id={`${++uuid}`}>Hello</Text>
					</Paragraph>
				</Section>
			</Fragment>
		)
		expect(pages.length).toBe(2)
		expect(pages.reduce((X,a)=>X+a.props.height,0)==viewport.height).toBe(true)
	})
})
