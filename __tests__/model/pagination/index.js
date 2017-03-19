jest.mock("react-redux", ()=>{
	return {
		connect:()=>A=>A
	}
})
import React from "react"
import {shallow, render, mount} from "enzyme"

import Page from "composed/page"
import Pagination from "pagination"
import Editable from "pagination/edit"



const DOMAIN={Pagination, Editable}

describe("composer", function(){
	"Pagination,Editable".split(",").forEach(domain=>
		describe(domain, function(){
			let Domain=DOMAIN[domain]

			if(domain=="Editable"){
				beforeAll(()=>{
					let i=0
					function withDefaultId(Model){
						return class extends Model{
							static defaultProps={
								...(Model.defaultProps||{}),
								id:i++
							}

							componentDidMount(){

							}
						}
					}
					Domain=Object.keys(Pagination).reduce((EditablesWithId,key)=>{
						EditablesWithId[key]=withDefaultId(EditablesWithId[key])
						return EditablesWithId
					},{...Domain})
				})
			}

			it("composable interface", function(){
				"Document,Section,Paragraph,Text".split(",")
					.forEach(a=>spyOn(Domain[a].prototype,"compose").and.callThrough())

				"Section,Paragraph,Text".split(",")
					.forEach(a=>spyOn(Domain[a].prototype,"createComposed2Parent").and.callThrough())

				"Document,Section,Paragraph".split(",")
					.forEach(a=>spyOn(Domain[a].prototype,"onAllChildrenComposed").and.callThrough())

				"Document,Section,Paragraph".split(",")
					.forEach(a=>spyOn(Domain[a].prototype,"appendComposed").and.callThrough())

				let node=mount(
					<Domain.Document>
						<Domain.Section>
							<Domain.Paragraph>
								<Domain.Text id="100">Hello</Domain.Text>
							</Domain.Paragraph>
						</Domain.Section>
					</Domain.Document>
				)

				"Document,Section,Paragraph,Text".split(",")
					.forEach(a=>expect(Domain[a].prototype.compose).toHaveBeenCalled())

				"Section,Paragraph,Text".split(",")
					.forEach(a=>expect(Domain[a].prototype.createComposed2Parent).toHaveBeenCalled())

				"Document,Section,Paragraph".split(",")
					.forEach(a=>expect(Domain[a].prototype.onAllChildrenComposed).toHaveBeenCalled())

				"Document,Section,Paragraph".split(",")
					.forEach(a=>expect(Domain[a].prototype.appendComposed).toHaveBeenCalled())

				expect(node.find("svg").length).toBe(1)
			})

			it("svg g.page", function(){
				let node=mount(
					<Domain.Document>
						<Domain.Section>
							<Domain.Paragraph>
								<Domain.Text id="100">Hello</Domain.Text>
							</Domain.Paragraph>
						</Domain.Section>
					</Domain.Document>
				)
				expect(node.find("g.page").length).toBe(1)
				expect(node.find("svg").text()).toBe("Hello")
			})

			describe("style", function(){
				it("style inherited from document > paragraph > Text", function(){
					let node=mount(
						<Domain.Document>
							<Domain.Section>
								<Domain.Paragraph>
									<Domain.Text id="100">Hello</Domain.Text>
								</Domain.Paragraph>
							</Domain.Section>
						</Domain.Document>
					)

					let text=node.find("text")
					expect(text.prop("fontFamily")).toBe(Domain.Document.defaultProps.fonts)
					expect(text.prop("fontSize")).toBe(Domain.Document.defaultProps.size+'pt')
				})

				it("style inherited from document > paragraph", function(){
					let node=mount(
						<Domain.Document>
							<Domain.Section>
								<Domain.Paragraph fonts="SimSun">
									<Domain.Text id="100">Hello</Domain.Text>
								</Domain.Paragraph>
							</Domain.Section>
						</Domain.Document>
					)

					let text=node.find("text")
					expect(text.prop("fontFamily")).toBe("SimSun")
					expect(text.prop("fontSize")).toBe(Domain.Document.defaultProps.size+'pt')
				})

				it("style inherited from document > paragraph", function(){
					let node=mount(
						<Domain.Document>
							<Domain.Section>
								<Domain.Paragraph>
									<Domain.Text id="100" fonts="Symbol">Hello</Domain.Text>
								</Domain.Paragraph>
							</Domain.Section>
						</Domain.Document>
					)

					let text=node.find("text")
					expect(text.prop("fontFamily")).toBe("Symbol")
					expect(text.prop("fontSize")).toBe(Domain.Document.defaultProps.size+'pt')
				})
			})
		})
	)
})
