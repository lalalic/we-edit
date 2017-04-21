jest.mock("react-redux", ()=>{
	return {
		connect:()=>A=>A
	}
})

import React,{Component} from "react"
import {mount as rawMount} from "enzyme"

import Page from "composed/page"
import Pagination from "pagination"
import Editable from "pagination/edit"
import {Cursor} from "state/cursor"

const DOMAIN={Pagination, Editable}

let mount=rawMount

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
					
					spyOn(Cursor.prototype,"componentDidMount").and.callFake(()=>1)
				})
				
				class Wrapper extends Component{
					static childContextTypes={
						store: React.PropTypes.any
					}
					getChildContext(){
						return {
							store:{
								getState(){
									return {
										get(a){
											return {}
										}
									}
								},
								dispatch(){
									
								}
							}
						}
					}
					render(){
						return React.Children.only(this.props.children)
					}
				}
				
				mount=a=>rawMount(<Wrapper>{a}</Wrapper>)
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
					
				spyOn(Domain.Paragraph.prototype,"getBreakOpportunities").and.callThrough()	

				let node=mount(
					<Domain.Document>
						<Domain.Section>
							<Domain.Paragraph>
								<Domain.Text>Hello</Domain.Text>
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
					
				expect(Domain.Paragraph.prototype.getBreakOpportunities.calls.count()).toBe(1)

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
			
			describe("composed content", function(){
				it("<p><t>hello</t><t> world</t></p>", function(){
					let node=mount(
						<Domain.Document>
							<Domain.Section>
								<Domain.Paragraph>
									<Domain.Text>Hello</Domain.Text>
								</Domain.Paragraph>
								<Domain.Paragraph>
									<Domain.Text> world</Domain.Text>
								</Domain.Paragraph>
							</Domain.Section>
						</Domain.Document>
					)
					let texts=node.find("text")
					expect(texts.length).toBe(2)
					expect(texts.at(0).text()).toBe("Hello")
					expect(texts.at(1).text()).toBe(" world")
				})
				
				it("2*<sect><p><t>hello</t><t> world</t></p></sect>", function(){
					let node=mount(
						<Domain.Document>
							<Domain.Section>
								<Domain.Paragraph>
									<Domain.Text>Hello</Domain.Text>
								</Domain.Paragraph>
								<Domain.Paragraph>
									<Domain.Text> world</Domain.Text>
								</Domain.Paragraph>
							</Domain.Section>
							<Domain.Section>
								<Domain.Paragraph>
									<Domain.Text>Hello</Domain.Text>
								</Domain.Paragraph>
								<Domain.Paragraph>
									<Domain.Text> world</Domain.Text>
								</Domain.Paragraph>
							</Domain.Section>
						</Domain.Document>
					)
					
					expect(node.find("g.page").length).toBe(2)
					let texts=node.find("text")
					expect(texts.length).toBe(4)
					expect(texts.at(0).text()).toBe("Hello")
					expect(texts.at(1).text()).toBe(" world")
					expect(texts.at(2).text()).toBe("Hello")
					expect(texts.at(3).text()).toBe(" world")
				})
			
			})
			

			describe("direct style", function(){
				it("style inherited from document", function(){
					let node=mount(
						<Domain.Document>
							<Domain.Section>
								<Domain.Paragraph>
									<Domain.Text>Hello</Domain.Text>
								</Domain.Paragraph>
							</Domain.Section>
						</Domain.Document>
					)

					let text=node.find("text")
					expect(text.prop("fontFamily")).toBe(Domain.Text.defaultProps.fonts)
					expect(text.prop("fontSize")).toBe(Domain.Text.defaultProps.size+'pt')
				})

				it("style inherited from paragraph", function(){
					let node=mount(
						<Domain.Document>
							<Domain.Section>
								<Domain.Paragraph fonts="SimSun">
									<Domain.Text>Hello</Domain.Text>
								</Domain.Paragraph>
							</Domain.Section>
						</Domain.Document>
					)

					let text=node.find("text")
					expect(text.prop("fontFamily")).not.toBe("SimSun")
					expect(text.prop("fontFamily")).toBe(Domain.Text.defaultProps.fonts)
					expect(text.prop("fontSize")).toBe(Domain.Text.defaultProps.size+'pt')
				})

				it("direct style", function(){
					let node=mount(
						<Domain.Document>
							<Domain.Section>
								<Domain.Paragraph>
									<Domain.Text fonts="Symbol">Hello</Domain.Text>
								</Domain.Paragraph>
							</Domain.Section>
						</Domain.Document>
					)

					let text=node.find("text")
					expect(text.prop("fontFamily")).toBe("Symbol")
					expect(text.prop("fontSize")).toBe(Domain.Text.defaultProps.size+'pt')
				})
			})
			
			
			
		})
	)
})
