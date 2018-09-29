import React,{Fragment} from "react"
import TestRender from "react-test-renderer"

import {Viewers, Editors} from "../src"
import {withContext} from "recompose"

const provider=(A,Default={})=>withContext(A.contextTypes,({context})=>({...Default,...context}))(({children})=><Fragment>{children}</Fragment>)

describe("compose", ()=>{
	const {Document, Section, Paragraph, Text, Image}=Viewers
	describe("text",()=>{
		const WithContext=provider(Text,{
			parent:{
				appendComposed(){

				},
				nextAvailableSpace(){
					return {width:3,height:100}
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
		it("base",()=>{
			const appendComposed=context.parent.appendComposed=jest.fn()

			const renderer=TestRender.create(
				<WithContext context={context}>
					<Text fonts="arial" size={12}>hello world</Text>
				</WithContext>
			)
			expect(appendComposed.mock.calls.length).toBe(1)
			console.dir(appendComposed.mock.calls)
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
