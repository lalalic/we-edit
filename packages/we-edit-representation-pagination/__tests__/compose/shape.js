import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render,context} from "../context"
import {define} from "./index"

define("paragraph compose",
({dom:{Paragraph, Text,Shape,Frame,Table,Row,Cell}, testing, WithTextContext, WithParagraphContext,ConstraintSpace})=>{
    const parent={}, size={width:100,height:100}
    const geometry=Shape.Path.fromRect(size).toString()
    const Context=context({
        contextTypes:{
            parent:PropTypes.any,
            ModelTypes:PropTypes.any,
            shouldContinueCompose: PropTypes.func,
        },
        context:{
            parent,
            ModelTypes:{Frame},
            shouldContinueCompose:()=>true,
        }
    })

    beforeEach(()=>{
        parent.nextAvailableSpace=jest.fn()
        parent.appendComposed=jest.fn()
    })

    it("can be empty",()=>{
        parent.nextAvailableSpace.mockReturnValueOnce(ConstraintSpace.create(size))
        const {}=render(<Context><Shape {...{geometry, id:"shape"}}/></Context>)
    })

    it("with text",()=>{
        var composed
        parent.nextAvailableSpace.mockReturnValueOnce(ConstraintSpace.create(size))
        parent.appendComposed.mockImplementationOnce(a=>composed=a)
        render(
            <Context>
                <Shape {...{geometry,id:"shape"}}>
                    <Frame {...size} id="f0">
                        <Paragraph id="p">
                            <Text children="hello" id="text"/>
                        </Paragraph>
                    </Frame>
                </Shape>
            </Context>)
        expect(parent.appendComposed).toHaveBeenCalledTimes(1)
        expect(new ReactQuery(composed).find(`[data-type="text"]`).attr("children")).toBe("hello")
    })

    it("with table",()=>{
        var u=9
        var composed
        parent.nextAvailableSpace.mockReturnValueOnce(ConstraintSpace.create(size))
        parent.appendComposed.mockImplementationOnce(a=>composed=a)
        render(
            <Context>
                <Shape {...{geometry, id:"shape"}}>
                    <Frame {...size} id="f0">
                        <Table id={`${u++}`} width={8}>
                            <Row id={`${u++}`} cols={[{x:0,width:6}]} >
                                <Cell id={`${u++}`}>
                                    <Paragraph id={`${u++}`}>
                                        <Text id={`${u++}`}>hello</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Frame>
                </Shape>
            </Context>)
        expect(parent.appendComposed).toHaveBeenCalledTimes(1)
    })

    describe("size",()=>{
        const test=(props={geometry})=>{
            var composed
            parent.nextAvailableSpace.mockReturnValueOnce(ConstraintSpace.create(size))
            parent.appendComposed.mockImplementationOnce(a=>composed=a)
            render(<Context><Shape {...{...props,id:"shape"}}/></Context>)
            expect(parent.appendComposed).toHaveBeenCalledTimes(1)
            return new ReactQuery(composed)
        }

        it("without outline",()=>{
            const composed=test()
            expect(composed.attr("width")).toBe(100)
            expect(composed.attr("height")).toBe(100)
        })

        it("outline should be counted",()=>{
            const width=10
            const composed=test({geometry,outline:{width}})
            expect(composed.attr("width")).toBe(100+width)
            expect(composed.attr("height")).toBe(100+width)
        })

        xit("rotate",()=>{

        })
    })
})
