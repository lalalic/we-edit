import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render,context} from "../context"
import {define} from "./index"

define("section compose",
({dom, testing, WithTextContext, WithParagraphContext, uuid=0})=>{
    const {Page,Frame, Paragraph, Text, Anchor, Shape}=dom
    const document={get computed(){}}
    const Context=context({
        contextTypes:{
            parent:PropTypes.any,
            ModelTypes:PropTypes.any,
            shouldContinueCompose: PropTypes.func,
        },
        context:{
            parent:document,
            ModelTypes:{Frame},
            shouldContinueCompose:()=>true,
        }
    })
    const size={width:10,height:10}
    const pg={width:100,height:100, margin:{left:10,right:10,top:10,bottom:10}}
    const baseline=9
    const test=(props,content=(
            <Paragraph {...{id:uuid++}}>
                <Text id={uuid++}>hello</Text>
                <Anchor {...{id:"anchor",wrap:{}, x:{base:"page"}, y:{base:"page"}, ...props}}>
                    <Shape {...{...size, id:uuid++}}/>
                </Anchor>
                <Text id={uuid++}>world</Text>
            </Paragraph>)
        )=>{
        var page
        document.appendComposed=jest.fn(p=>page=p)
        const rendered=render(
            <Context>
                <Frame {...{...pg, id:uuid++}}>
                    <WithParagraphContext>
                        <WithTextContext>
                            {content}
                        </WithTextContext>
                    </WithParagraphContext>
                </Frame>
            </Context>
        )

        expect(document.appendComposed).toHaveBeenCalled()
        expect(page).toBeDefined()
        const renderedPage=page
        const $page=new ReactQuery(renderedPage)
        const xy=(selector)=>{
            const {first,parents}=$page.findFirstAndParents(selector)
            expect(first.length).toBe(1)
            return [...parents,first.get(0)].reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x,xy.y+=y,xy),{x:0,y:0})
        }
        const anchorXY=xy('[data-type="anchor"]')
        return {
            $page,
            xy,
            x:()=>anchorXY.x,
            y:()=>anchorXY.y,
        }

    }
    describe("position",()=>{
        describe("x",()=>{
            it("{base:'page', offset:1} should anchored at offset",()=>{
                expect(test({x:{base:"page",offset:1}}).x()).toBe(1)
            })

            it("{base:'margin', align:'left/right', offset:1} should anchored at x=1",()=>{
                expect(test({x:{base:"margin",align:"left",offset:1}}).x()).toBe(pg.margin.left+1)
                expect(test({x:{base:"margin",align:"right",offset:1}}).x()).toBe(pg.width-pg.margin.right-size.width-1)
            })

            it("{base:'column', offset:1} should anchored at x=col.x+1",()=>{
                try{
                    const col={x:20,width:40}
                    pg.cols=[col]
                    expect(test({x:{base:"column",offset:1}}).x()).toBe(col.x+1)
                }finally{
                    delete pg.cols
                }
            })

            it("{base:'character', offset:1} should anchored at x=1",()=>{
                expect(test({x:{base:"character",offset:1}}).x()).toBe(pg.margin.left+"hello".length+1)
            })

            it("unsupported base would always anchor at offset",()=>{
                console.error=jest.fn()
                expect(test({x:{base:"unknown",offset:1}}).x()).toBe(1)
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

            it("{base:'paragraph', offset:1} should anchored at the first paragraph line of current page",()=>{
                expect(test({y:{base:"paragraph",offset:1}}).y()).toBe(pg.margin.top+1)
            })

            it("{base:'line', offset:1} should anchored at current line y",()=>{
                expect(test({y:{base:"line",offset:1}}).y()).toBe(pg.margin.top+1)
            })

            it("unsupported base should anchor at offset",()=>{
                console.error=jest.fn()
                expect(test({y:{base:"unknown",offset:1}}).y()).toBe(1)
            })
        })
    })

    xdescribe("wrap",()=>{
        it("Square should around rect boundary",()=>{
            const props={x:{base:"page",offset:16},y:{base:"page",offset:12},wrap:{mode:"Square"}}

            const doc1=test(props)
            expect(doc1.xy(`[children="hello"]`).x).toBe(pg.margin.left)
            expect(doc1.xy(`[children="world"]`).x).toBe(props.x.offset+size.width)

            const doc2=test({...props, x:{base:"page",offset:2}})
            expect(doc2.xy(`[children="hello"]`).x).toBe(12)
            expect(doc2.xy(`[children="world"]`).x).toBe(12+5)

            const doc3=test({...props, x:{base:"character"}, y:{base:"line"}})
            expect(doc3.xy(`[children="hello"]`).x).toBe(pg.margin.left)
            expect(doc3.xy(`[children="world"]`).x).toBe(pg.margin.left+"hello".length+size.width)
        })

        it("anchor content bigger than line/column/page should work like TopAndBottom",()=>{
            try{
                size.width=90
                const props={x:{base:"page",offset:12},y:{base:"page",offset:12},wrap:{mode:"Square"}}
                const doc1=test(props)
                const y=props.y.offset+size.height+baseline
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({y,x:pg.margin.left})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({y,x:pg.margin.left+"hello".length})
            }finally{
                size.width=10
            }
        })

        xit("Tight should around geometry right and left boundary",()=>{
            const computed=jest.spyOn(document,'computed','get')
            computed.mockReturnValue({composed:[]})
            const content=(x,y)=>(
                <Paragraph {...{id:uuid++}}>
                    <Text id={uuid++}>hello</Text>
                    <Anchor {...{id:"anchor",x:{base:"page",x},y:{base:"page",y},wrap:{mode:"Tight"}}}>
                        <Shape {...{width:20,height:20, geometry:"M10 0L0 20 20 20Z", id:uuid++}}/>
                    </Anchor>
                    <Text id={uuid++}>world</Text>
                </Paragraph>
            )
            const doc1=test(undefined,content(10,10))
            expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+baseline})

            const doc2=test(undefined,content(0,5))
            expect(doc2.xy(`[children="hello"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+baseline})
        })

        xit("Through should around geometry boundary including inside of left and right margin",()=>{

        })

        it("TopAndBottom should occupy whole line",()=>{
            const props={x:{base:"page",offset:16},y:{base:"page",offset:12},wrap:{mode:"TopAndBottom"}}

            const doc1=test(props)
            expect(doc1.xy(`[children="hello"]`).x).toBe(pg.margin.left)
            expect(doc1.xy(`[children="world"]`).x).toBe(pg.margin.left+"hello".length)
            expect(doc1.xy(`[children="hello"]`).y).toBe(props.y.offset+size.height+baseline)

        })

        xit("multiple TopAndBottom can intersect line space",()=>{

        })

        xit("multiple different mode of anhors should be supported",()=>{

        })

        describe("text",()=>{
            it("left",()=>{
                const doc1=test({wrap:{wrapText:"left", mode:"Square"},x:{base:"page",offset:16},y:{base:"page",offset:12}})
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+baseline})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+10+baseline})
            })

            it("both",()=>{
                const doc1=test({wrap:{wrapText:"both", mode:"Square"},x:{base:"page",offset:16},y:{base:"page",offset:12}})
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+baseline})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({x:16+size.width,y:pg.margin.top+baseline})
            })


            it("right",()=>{
                const doc1=test({wrap:{wrapText:"right", mode:"Square"},x:{base:"page",offset:16},y:{base:"page",offset:12}})
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:16+size.width,y:pg.margin.top+baseline})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({x:16+size.width+"hello".length,y:pg.margin.top+baseline})
            })

            it("largest at right",()=>{
                const doc1=test({wrap:{wrapText:"largest", mode:"Square"},x:{base:"page",offset:16},y:{base:"page",offset:12}})
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:16+size.width,y:pg.margin.top+baseline})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({x:16+size.width+"hello".length,y:pg.margin.top+baseline})
            })

            it("largest at left",()=>{
                const doc1=test({wrap:{wrapText:"largest", mode:"Square"},x:{base:"page",offset:50},y:{base:"page",offset:12}})
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+baseline})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({x:pg.margin.left+"hello".length,y:pg.margin.top+baseline})
            })
        })
    })
})
