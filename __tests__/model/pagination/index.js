import React from "react"
import {shallow, render, mount} from "enzyme"
import {Document, Section, Paragraph, Text} from "../../../src/model/pagination"

describe("composer", function(){
    describe("basic", function(){
        let node=mount(
            <Document>
                <Section>
                    <Paragraph>
                        <Text>Hello</Text>
                    </Paragraph>
                </Section>
            </Document>
        )

        it("<svg>", function(){
            expect(node.find("svg").length).toBe(1)
        })

        it("g.page", function(){
            expect(node.find("g.page").length).toBe(1)
        })
    })
})
