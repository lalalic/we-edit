import React from "react"
import TestRenderer from "react-test-renderer"

import Document from "../src/dom/document"
//import Section from "../src/dom/section"
import Paragraph from "../src/dom/paragraph"
import Text from "../src/dom/text"

const render=element=>TestRenderer.create(element).root
const TEXT={fonts:"arial",size:11}
xdescribe("html", function(){
	it("basic",function(){
		let node=render(
			<Document>
				<Section>
					<Paragraph>
						<Text {...TEXT}>Hello</Text>
					</Paragraph>
				</Section>
			</Document>
		)

		"article,p,span"
			.split(",")
			.forEach(a=>expect(node.findAllByType(a).length).toBe(1))

		expect(node.find(a=>a.type=="span").props.children).toBe("Hello")
	})

	it("basic",function(){
		let node=render(
			<Document>
				<Section>
					<Paragraph>
						<Text {...TEXT}>Hello0</Text>
					</Paragraph>
				</Section>
				<Section>
					<Paragraph>
						<Text {...TEXT}>Hello1</Text>
					</Paragraph>
				</Section>
			</Document>
		)
		expect(node.findAllByType("article").length).toBe(1)
		"p,span"
			.split(",")
			.forEach(a=>expect(node.findAllByType(a).length).toBe(2))
		node.findAllByType("span")
			.forEach((a,i)=>expect(a.props.children).toBe(`Hello${i}`))
	})
})
