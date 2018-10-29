import React from "react"
import TestRender from "react-test-renderer"

import {Viewers, Editors} from "../src"
import provider from "./context"

describe("compose", ()=>{
	const {Document, Section, Paragraph, Text, Image}=Viewers
	const lineHeight=10
	class Measure{
		height=lineHeight
		defaultStyle={height:this.height}
		widthString(x,text){
			return text.substring(0,x)
		}
		stringWidth(text){
			return text.length
		}

		static factory=height=>class extends Measure{
			height=height
		}
	}
	const WithTextContext=provider(Text,{Measure})


	describe("text",()=>{
		const contextFactory=({width=5,height=100})=>({
			parent:{
				appendComposed(){

				},
				nextAvailableSpace(){
					return {width,height}
				},
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
					<Text fonts="arial" size={12}>{text}</Text>
				</WithTextContext>
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
		const WithParagraphContext=provider(Paragraph)
		const test=(lineWidth=5,spacing={}, indent={})=>{
			const context={parent:{}}
			const nextAvailableSpace=context.parent.nextAvailableSpace=jest.fn(()=>({width:lineWidth,height:100}))
			const appendComposed=context.parent.appendComposed=jest.fn()
			const renderer=TestRender.create(
				<WithParagraphContext context={context}>
					<WithTextContext>
						<Paragraph spacing={spacing} indent={indent}>
							<Text fonts="arial" size={12}>hello world</Text>
						</Paragraph>
					</WithTextContext>
				</WithParagraphContext>
			)
			expect(nextAvailableSpace).toHaveBeenCalled()
			expect(appendComposed).toHaveBeenCalled()
			return appendComposed.mock.calls.map(([line])=>line)
		}

		describe("indent",()=>{
			const indent=indent=>test(10,undefined,indent).map(line=>line.props.children)
			it("left",()=>{
				const lines=indent({left:1})
				expect(lines.length>0).toBe(true)
				lines.forEach(line=>expect(line.props.x).toBe(1))
			})

			xit("right",()=>{

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
	describe("table",()=>{

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
