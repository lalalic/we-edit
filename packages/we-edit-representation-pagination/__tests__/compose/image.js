import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render} from "../context"
import {define} from "./index"

define("paragraph compose",
({dom:{Paragraph, Text, Image}, testing, CONTEXT, Context, WithTextContext, WithParagraphContext,ConstraintSpace})=>{
    const test=props=>{
        const context={...Context,...CONTEXT}
        const nextAvailableSpace=context.parent.nextAvailableSpace=jest.fn(()=>(ConstraintSpace.create({
            width:10,height:100,
        })))
        const appendComposed=context.parent.appendComposed=jest.fn()
        const renderer=render(
            <WithParagraphContext context={context}>
                <WithTextContext>
                    <Paragraph id="2">
                        <Image id="1" {...props}/>
                    </Paragraph>
                </WithTextContext>
            </WithParagraphContext>
        )
        return Object.assign(appendComposed.mock.calls.map(([line])=>line),{dom:renderer.root})
    }
    const imageSelector="[data-type=image]"
    it("image(size<=capacitty)", ()=>{
        const [line]=test({width:8,height:50})
        const image=new ReactQuery(line).findFirst(imageSelector)
        expect(image.length).toBe(1)
        expect(line.props.width).toBe(10)
        expect(image.attr('width')).toBe(8)
    })

    it("image(size.width>capacity)", ()=>{
        const lines=test({width:11,height:50})
        const line=new ReactQuery(lines[0])
        const image=line.find(imageSelector)
        expect(image.length).toBe(1)
        expect(line.attr('width')).toBe(10)
        expect(image.attr('width')).toBe(11)
        expect(line.attr('height')).toBe(50+1)
    })

    it("image(size.height>capacity)", ()=>{
        const lines=test({width:5,height:110})
        expect(lines.length).toBe(1)
        const line=new ReactQuery(lines[0])
        const image=line.find(imageSelector)
        expect(image.length).toBe(1)
        expect(line.attr('width')).toBe(10)
        expect(line.attr('height')).toBe(110+1)
        expect(image.attr('width')).toBe(5)
        expect(image.attr('height')).toBe(110)
    })
})
