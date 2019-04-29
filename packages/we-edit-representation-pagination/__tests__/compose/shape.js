import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render,context} from "../context"
import {define} from "./index"

define("paragraph compose",
({dom:{Paragraph, Text,Shape,Frame,Table,Row,Cell}, testing, WithTextContext, WithParagraphContext})=>{
    const parent={}
    const Context=context({
        contextTypes:{
            parent:PropTypes.any,
            ModelTypes:PropTypes.any,
            shouldContinueCompose: PropTypes.func,
            getMyBreakOpportunities:PropTypes.func,
        },
        context:{
            parent,
            ModelTypes:{Frame},
            shouldContinueCompose:()=>true,
            getMyBreakOpportunities:jest.fn(),
        }
    })

    beforeEach(()=>{
        parent.nextAvailableSpace=jest.fn()
        parent.appendComposed=jest.fn()
    })

    it("can be empty",()=>{
        parent.nextAvailableSpace.mockReturnValueOnce({width:100,height:100})
        const {}=render(<Context><Shape {...{width:100,height:100,id:"shape"}}/></Context>)
    })

    it("with text",()=>{
        var composed
        parent.nextAvailableSpace.mockReturnValueOnce({width:100,height:100})
        parent.appendComposed.mockImplementationOnce(a=>composed=a)
        render(
            <Context>
                <Shape {...{width:100,height:100,id:"shape"}}>
                    <Paragraph id="p">
                        <Text children="hello" id="text"/>
                    </Paragraph>
                </Shape>
            </Context>)
        expect(parent.appendComposed).toHaveBeenCalledTimes(1)
        expect(new ReactQuery(composed).find(`[data-type="text"]`).attr("children")).toBe("hello")
    })

    it("with table",()=>{
        var u=9
        var composed
        parent.nextAvailableSpace.mockReturnValueOnce({width:100,height:100})
        parent.appendComposed.mockImplementationOnce(a=>composed=a)
        render(
            <Context>
                <Shape {...{width:100,height:100,id:"shape"}}>
                    <Table id={`${u++}`} width={8}>
                        <Row id={`${u++}`} cols={[{x:0,width:6}]} >
                            <Cell id={`${u++}`}>
                                <Paragraph id={`${u++}`}>
                                    <Text id={`${u++}`}>hello</Text>
                                </Paragraph>
                            </Cell>
                        </Row>
                    </Table>
                </Shape>
            </Context>)
        expect(parent.appendComposed).toHaveBeenCalledTimes(1)
    })

    describe("size",()=>{
        const test=(props={width:100,height:100})=>{
            var composed
            parent.nextAvailableSpace.mockReturnValueOnce({width:100,height:100})
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
            const composed=test({width:100,height:100, outline:{width}})
            expect(composed.attr("width")).toBe(100+width)
            expect(composed.attr("height")).toBe(100+width)
        })

        xit("rotate",()=>{

        })
    })
})
