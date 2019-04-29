import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render,context} from "../context"
import {define} from "./index"

define("section compose",
({dom, testing, WithTextContext, WithParagraphContext, uuid=0})=>{
    const {Page,Frame, Paragraph, Text, Anchor, Shape}=dom
    const document={}
    const Context=context({
        contextTypes:{
            parent:PropTypes.any,
            ModelTypes:PropTypes.any,
            shouldContinueCompose: PropTypes.func,
            getMyBreakOpportunities:PropTypes.func,
        },
        context:{
            parent:document,
            ModelTypes:{Frame},
            shouldContinueCompose:()=>true,
            getMyBreakOpportunities:jest.fn(),
        }
    })
    describe("position",()=>{
        const size={width:10,height:10}
        const pg={width:100,height:100, margin:{left:10,right:10,top:10,bottom:10}}
        const test=(props,content)=>{
            var page
            document.appendComposed=jest.fn(p=>page=p)
            const rendered=render(
                <Context>
                    <Page {...{...pg, id:uuid++}}>
                        <WithParagraphContext>
                            <WithTextContext>
                                <Paragraph {...{id:uuid++}}>
                                    <Anchor {...{id:"anchor",wrap:{}, x:{base:"page"}, y:{base:"page"}, ...props}}>
                                        <Shape {...{...size, id:uuid++}}/>
                                    </Anchor>
                                    {content}
                                </Paragraph>
                            </WithTextContext>
                        </WithParagraphContext>
                    </Page>
                </Context>
            )

            expect(document.appendComposed).toHaveBeenCalled()
            expect(page).toBeDefined()
            const {first,parents}=new ReactQuery(page.render()).findFirstAndParents('[data-type="anchor"]')
            expect(first.length).toBe(1)
            return {
                x:()=>([...parents,first.get(0)].reduce((X,{props:{x=0}})=>X+x,0)),
                y:()=>([...parents,first.get(0)].reduce((Y,{props:{y=0}})=>Y+y,0)),
            }

        }
        describe("x",()=>{
            it("{base:'page', offset:1} should anchored at offset",()=>{
                expect(test({x:{base:"page",offset:1}}).x()).toBe(1)
            })

            it("{base:'margin', align:'left/right', offset:1} should anchored at x=1",()=>{
                expect(test({x:{base:"margin",align:"left",offset:1}}).x()).toBe(pg.margin.left+1)
                expect(test({x:{base:"margin",align:"right",offset:1}}).x()).toBe(pg.width-pg.margin.right-size.width-1)
            })

            it("{base:'column', offset:1} should anchored at x=1",()=>{

            })

            it("{base:'character', offset:1} should anchored at x=1",()=>{

            })

            it("{base:'leftMargin', offset:1} should anchored at leftMargin+offset",()=>{
                expect(test({x:{base:"leftMargin",offset:1}}).x()).toBe(pg.margin.left+1)
            })

            it("{base:'rightMargin', offset:1} should anchored at page.width-rightMargin-anchor.width-offset",()=>{
                expect(test({x:{base:"rightMargin",offset:1}}).x()).toBe(pg.width-pg.margin.right-size.width-1)
            })

            it("unsupported base should not anchor",()=>{

            })
        })

        describe("y",()=>{
            it("{base:'page', offset:1} should anchored at y=1",()=>{
                expect(test({y:{base:"page",offset:1}}).y()).toBe(1)
            })

            it("{base:'margin', align:'top/bottom', offset:1} should anchored at y=1",()=>{
                expect(test({y:{base:"margin",align:"top",offset:1}}).y()).toBe(pg.margin.top+1)
                expect(test({y:{base:"margin",align:"bottom",offset:1}}).y()).toBe(pg.height-pg.margin.bottom-size.height-1)
            })

            it("{base:'paragraph', offset:1} should anchored",()=>{

            })

            it("{base:'line', offset:1} should anchored",()=>{

            })

            it("{base:'topMargin', offset:1} should anchored",()=>{
                expect(test({y:{base:"topMargin",offset:1}}).y()).toBe(pg.margin.top+1)
            })

            it("{base:'bottomMargin', offset:1} should anchored",()=>{
                expect(test({y:{base:"bottomMargin",offset:1}}).y()).toBe(pg.height-pg.margin.bottom-size.height-1)
            })

            it("unsupported base should not anchor",()=>{

            })
        })
    })

    describe("wrap",()=>{
        it("Square should around rect boundary",()=>{
            
        })

        it("Tight should around geometry right and left boundary",()=>{

        })

        it("Through should around geometry boundary including inside of left and right margin",()=>{

        })

        it("TopAndBottom should occupy whole line",()=>{

        })

        it("multiple TopAndBottom can intersect line space",()=>{

        })

        it("multiple different mode of anhors should be supported",()=>{

        })

        describe("text",()=>{
            it("right",()=>{

            })

            it("left",()=>{

            })

            it("both",()=>{

            })

            it("largest",()=>{

            })
        })
    })
})
