import React from "react"
import TestRenderer from "react-test-renderer"

import Document from "../src/document"
import Section from "../src/section"
import Paragraph from "../src/paragraph"
import Text from "../src/text"

const render=element=>TestRenderer.create(element).root

describe("html", function(){
	fit("basic",function(){
		let node=render(
			<Document>
				<Section cols={{}}>
					<Paragraph>
						<Text>Hello</Text>
					</Paragraph>
				</Section>
			</Document>
		)
		expect(node.find("article,section,p,span").length).toBe(4)
		expect(node.find("span").text()).toBe("Hello")
	})
	
	it("basic",function(){
		let node=render(
			<Document>
				<Section>
					<Paragraph>
						<Text>Hello</Text>
					</Paragraph>
				</Section>
				<Section>
					<Paragraph>
						<Text>Hello</Text>
					</Paragraph>
				</Section>
			</Document>
		)
		expect(node.find("article,section,p,span").length).toBe(7)
		expect(node.find("span").text()).toBe("HelloHello")
	})
})