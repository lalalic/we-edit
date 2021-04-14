import React from "react"
import {ReactQuery} from "we-edit"
import {render} from "../context"
import {define} from "./index"

define("Frame", ({dom:{Document, Frame, Paragraph, Text}, WithTextContext, WithParagraphContext, uuid=0})=>{

    describe("block layout",()=>{
        describe("async",()=>{
            it("should show composed without canvas, and also commit to parent",()=>{
                const text="hello world"
                const rendered=render(
                    <Document canvas={null}>
                        <Frame {...{id:"frame", width:10, async:true, autoCompose2Parent:false}}>
                            <WithParagraphContext>
                                <WithTextContext>
                                    <Paragraph>
                                        <Text>{text}</Text>
                                    </Paragraph>
                                </WithTextContext>
                            </WithParagraphContext>
                        </Frame>
                    </Document>
                )
                const doc=rendered.getInstance()
                expect(doc.pages.length).toBe(1)
                expect(new ReactQuery(doc.pages[0].createComposed2Parent()).text().replace(/[^\s\w]/g,"")).toBe(text)
            })        
        })
    })
})