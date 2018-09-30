import React from "react"
import TestRender from "react-test-renderer"

import {Viewers, Editors} from "../src"
import provider from "./context"

describe("compose", ()=>{
	const {Document, Section, Paragraph, Text, Image}=Viewers
	describe("text",()=>{
		const WithContext=provider(Text)
		const contextFactory=({width=5,height=100})=>({
			parent:{
				appendComposed(){

				},
				nextAvailableSpace(){
					return {width,height}
				},
			},
			Measure:class{
				height=10
				defaultStyle={}
				widthString(x,text){
					return text.substring(0,x)
				}

				stringWidth(text){
					return text.length
				}
			},
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
				<WithContext context={context}>
					<Text fonts="arial" size={12}>{text}</Text>
				</WithContext>
			)
			expect(appendComposed).toHaveBeenCalled()
			expects(appendComposed)
		}

		it("basic process", test())

		describe("text wrap",()=>{
			const wrap=width=>it(`${Default}[${width}]`,test(width))

			//wrap(1)
			//wrap(5)
		})

	})
	describe("paragraph",()=>{
		describe("wordwrap",()=>{
			xit("",()=>{
				const renderer=TestRenderer.create(
					<WithContext context={{
						parent:{},
						Measure:{},

					}}>
						<Paragraph>
							<Text>hello</Text>
							<Text>world</Text>
						</Paragraph>
					</WithContext>
				)

			})
		})
	})
	describe("table",()=>{

	})
	describe("image",()=>{})

	it("can compose in any container", ()=>{

	})
})
