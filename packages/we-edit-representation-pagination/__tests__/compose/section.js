import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render,provider} from "../context"
import {define} from "./index"

define("section compose",
({dom, testing, CONTEXT, Context, WithTextContext, WithParagraphContext})=>{
    const {Section,Frame, Paragraph, Text,Table,Row,Cell}=dom
    const WithSectionContext=provider(Section,{ModelTypes:dom})

    const document={
        appendComposed(page){
            this.computed.composed.push(page)
        },
        getComposeType(){
            return "document"
        },
        computed:{
            composed:[]
        }
    }
    const context={parent:document,...CONTEXT}

    const section=(id=0)=>(
        <Section createLayout={(props,context)=>new Frame({...props,width:10,height:10},context)} id={`${id}.2`} key={id}>
            <WithParagraphContext>
                <WithTextContext>
                    <Paragraph id={`${id}.1`}>
                        <Text id={`${id}.0`} fonts="arial" size={10}>hello</Text>
                    </Paragraph>
                </WithTextContext>
            </WithParagraphContext>
        </Section>
    )

    it("basic",()=>{
        document.appendComposed=jest.fn()
        const renderer=render(
            <WithSectionContext context={context}>
                {section()}
            </WithSectionContext>
        )
        expect(document.appendComposed).toHaveBeenCalledTimes(1)
    })

    it("a few sections",()=>{
        document.appendComposed=jest.fn()
        const renderer=render(
            <WithSectionContext context={context}>
                {[1,2,3,4,5].map(section)}
            </WithSectionContext>
        )
        expect(document.appendComposed).toHaveBeenCalledTimes(5)
    })
})
