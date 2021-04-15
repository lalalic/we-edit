import React from "react"
import {ReactQuery} from "we-edit"
import {render} from "../context"
import {define} from "./index"

define("Frame", ({dom:{Document, Page, Anchor, Frame, Paragraph, Text}, WithTextContext, WithParagraphContext, uuid=0})=>{
    function test(content){
        const rendered=render(
            <Document canvas={null}>
                <Page {...{width:200, height:500}}>
                    <WithParagraphContext>
                        <WithTextContext>
                            {content}
                        </WithTextContext>
                    </WithParagraphContext>
                </Page>
            </Document>
        )
        const doc=rendered.getInstance()
        return {
            rendered,
            doc,
            $page:(i)=>new ReactQuery(doc.pages[i].createComposed2Parent())
        }
    }

    function trim(s){
        return s.replace(/[^\s\w]/g,"")
    }
    describe("block layout",()=>{
        const text="hello world"
        const paragraph=(<Paragraph><Text>{text}</Text></Paragraph>)
                
        describe("async",()=>{
            it("should show composed without canvas, and also commit to parent",()=>{
                const {doc, $page}=test(paragraph)
                expect(doc.pages.length).toBe(1)
                expect(doc.getComposer('page')).toBeTruthy()
                expect(doc.getComposer('paragraph')).toBeTruthy()
                expect(doc.getComposer('text')).toBeTruthy()
                expect(trim($page(0).text())).toBe(text)
                //how to check rendered with same text output
            }) 
            
        })

        it("anchored children not in paragraph should be layouted",()=>{
            const {doc,$page}=test(
                <Anchor x={{base:"page", offset:5}} y={{base:"page",offset:5}}>
                    <Frame width={10}>
                        {paragraph}
                    </Frame>
                </Anchor>
            )

            expect(doc.getComposer('page').anchors.length).toBe(1)
            expect(doc.getComposer('paragraph')).toBeTruthy()
            expect(trim($page(0).text())).toBe(text)
        })

        it("positioned frame not in paragraph should be layouted",()=>{
            const {doc,$page}=test(
                <Frame id={++uuid} width={10} x={5} y={7}>
                    {paragraph}
                </Frame>
            )
            expect(doc.getComposer('paragraph')).toBeTruthy()
            expect(trim($page(0).text())).toBe(text)
        })
    })

    describe("template",()=>{

    })

    describe("autofit",()=>{

    })
})