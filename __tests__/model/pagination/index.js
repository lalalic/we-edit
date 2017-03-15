import React from "react"
import {shallow, render, mount} from "enzyme"
import Models, {Document, Section, Paragraph, Text} from "../../../src/model/pagination"
import Page from "../../../src/model/pagination/composed/page"

describe("composer", function(){
    describe("basic", function(){
       

        it("composable interface", function(){
			"Document,Section,Paragraph,Text".split(",")
				.forEach(a=>spyOn(Models[a].prototype,"compose").and.callThrough())
			
			"Section,Paragraph,Text".split(",")
				.forEach(a=>spyOn(Models[a].prototype,"createComposed2Parent").and.callThrough())
				
			"Document,Section,Paragraph".split(",")
				.forEach(a=>spyOn(Models[a].prototype,"onAllChildrenComposed").and.callThrough())
				
			"Document,Section,Paragraph".split(",")
				.forEach(a=>spyOn(Models[a].prototype,"appendComposed").and.callThrough())
				
			let node=mount(
				<Document>
					<Section>
						<Paragraph>
							<Text>Hello</Text>
						</Paragraph>
					</Section>
				</Document>
			)
			
			"Document,Section,Paragraph,Text".split(",")
				.forEach(a=>expect(Models[a].prototype.compose).toHaveBeenCalled())
				
			"Section,Paragraph,Text".split(",")
				.forEach(a=>expect(Models[a].prototype.createComposed2Parent).toHaveBeenCalled())
				
			"Document,Section,Paragraph".split(",")
				.forEach(a=>expect(Models[a].prototype.onAllChildrenComposed).toHaveBeenCalled())
				
			"Document,Section,Paragraph".split(",")
				.forEach(a=>expect(Models[a].prototype.appendComposed).toHaveBeenCalled())
				
			expect(node.find("svg").length).toBe(1)
        })

        it("svg g.page", function(){
			let node=mount(
				<Document>
					<Section>
						<Paragraph>
							<Text>Hello</Text>
						</Paragraph>
					</Section>
				</Document>
			)
			expect(node.find("g.page").length).toBe(1)
			expect(node.find("svg").text()).toBe("Hello")
        })
		
		describe("style", function(){
			it("style inherited from document > paragraph > Text", function(){
				let node=mount(
					<Document>
						<Section>
							<Paragraph>
								<Text>Hello</Text>
							</Paragraph>
						</Section>
					</Document>
				)
				
				let text=node.find("text")
				expect(text.prop("fontFamily")).toBe(Document.defaultProps.fonts)
				expect(text.prop("fontSize")).toBe(Document.defaultProps.size+'pt')
			})
			
			it("style inherited from document > paragraph", function(){
				let node=mount(
					<Document>
						<Section>
							<Paragraph fonts="SimSun">
								<Text>Hello</Text>
							</Paragraph>
						</Section>
					</Document>
				)
				
				let text=node.find("text")
				expect(text.prop("fontFamily")).toBe("SimSun")
				expect(text.prop("fontSize")).toBe(Document.defaultProps.size+'pt')
			})
			
			it("style inherited from document > paragraph", function(){
				let node=mount(
					<Document>
						<Section>
							<Paragraph>
								<Text fonts="Symbol">Hello</Text>
							</Paragraph>
						</Section>
					</Document>
				)
				
				let text=node.find("text")
				expect(text.prop("fontFamily")).toBe("Symbol")
				expect(text.prop("fontSize")).toBe(Document.defaultProps.size+'pt')
			})
		})
    })
})
