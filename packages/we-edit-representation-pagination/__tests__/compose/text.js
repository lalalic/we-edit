import React from "react"
import PropTypes from "prop-types"

import {render} from "../context"
import {define} from "./index"

define("text compose", ({dom:{Text},testing,Context, WithTextContext})=>{
    const test=text=>{
        const context={...Context}
        const appendComposed=context.parent.appendComposed=jest.fn()

        const renderer=render(
            <WithTextContext context={context}>
                <Text id="0" fonts="arial" size={12}>{text}</Text>
            </WithTextContext>
        )

        return {context}
    }

    it("should append to parent", ()=>{
        const {context:{parent}}=test("hello world")
        expect(parent.appendComposed).toHaveBeenCalled()
    })


    it("'hello world' should append 3 times as [hello, ' ', world]",()=>{
        const {context:{parent:{appendComposed}}}=test("hello world")
        
    })

    it("whitespace should have .whitespace, with minWidth=0",()=>{

    })
})
