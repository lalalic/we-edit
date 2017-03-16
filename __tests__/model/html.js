import React from "react"
import {shallow, render, mount} from "enzyme"
import Models, {Document, Section, Paragraph, Text} from "html"

describe("html", function(){
	it("basic",function(){
		let node=render(
			<Document>
				<Section>
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