import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render,context} from "../context"
import {define} from "./index"
import Path from "../../src/tool/path"

define("section compose",
({dom, testing, WithTextContext, WithParagraphContext, uuid=0})=>{
    const {Page,Frame, Paragraph, Text, Anchor, Shape, Table, Row, Cell}=dom
    const document={
        get computed(){

        },
        computed:{},
    }
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
                    <Shape {...{geometry:Shape.Path.fromRect(size).toString(), id:uuid++}}/>
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
                    pg.cols=[col,{x:30,width:20}]
                    expect(test({x:{base:"column",offset:1}}).x()).toBe(col.x+1)
                }finally{
                    delete pg.cols
                }
            })

            it("{base:'character', offset:1} should anchored at x=1",()=>{
                expect(test({x:{base:"character",offset:1}}).x()).toBe(pg.margin.left+"hello".length+1)
            })

            it("unsupported base would always anchor at page offset",()=>{
                console.error=jest.fn()
                expect(test({x:{base:"unknown",offset:1}}).x()).toBe(1)
            })

            it("default is {base:'character', offset:0,align:'left'}",()=>{
                expect(test({x:undefined}).x()).toBe(pg.margin.left+"hello".length)
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

            it("unsupported base should anchor at page offset",()=>{
                console.error=jest.fn()
                expect(test({y:{base:"unknown",offset:1}}).y()).toBe(1)
            })

            it("default is {base:'line',offset:0,align:'top'}",()=>{
                expect(test({y:undefined}).y()).toBe(pg.margin.top)
            })
        })
    })

    describe("wrap",()=>{
        describe("with function wrap({x1,x2,y1,y2}, {anchored x,y})",()=>{
            const t1="hello world I ", t2="can help you to do this job."
            const wrap=({x1,x2,y1,y2},{x,y})=>[{x:pg.margin.left+t1.length, width:10}]//t1|---|t2
            const props={
                x:{base:"page",offset:16},
                y:{base:"page",offset:12},
                wrap
            }
            it("anchor is first",()=>{
                const doc1=test({},(
                    <Paragraph {...{id:uuid++}}>
                        <Anchor {...{id:"anchor", ...props}}/>
                        <Text id={uuid++}>{t1+t2}</Text>
                    </Paragraph>
                ))
                expect(doc1.xy(`[children="${t1}"]`).x).toBe(pg.margin.left)
                expect(doc1.xy(`[children="${t2}"]`).x).toBe(pg.margin.left+t1.length+10)
            })

            it("anchor is last",()=>{
                const doc1=test({},(
                    <Paragraph {...{id:uuid++}}>
                        <Text id={uuid++}>{t1+t2}</Text>
                        <Anchor {...{id:"anchor", ...props}}/>
                    </Paragraph>
                ))
                expect(doc1.xy(`[children="${t1}"]`).x).toBe(pg.margin.left)
                expect(doc1.xy(`[children="${t2}"]`).x).toBe(pg.margin.left+t1.length+10)
            })

            it("has nothing to do with (x,y)",()=>{
                const doc1=test({},(
                    <Paragraph {...{id:uuid++}}>
                        <Text id={uuid++}>{t1+t2}</Text>
                        <Anchor {...{id:"anchor", 
                            ...props,
                            x:{base:"page",offset:1},
                            y:{base:"page",offset:1},
                        }}/>
                    </Paragraph>
                ))
                expect(doc1.xy(`[children="${t1}"]`).x).toBe(pg.margin.left)
                expect(doc1.xy(`[children="${t2}"]`).x).toBe(pg.margin.left+t1.length+10)
            })

            it("relative to anchored position",()=>{
                const doc1=test({},(
                    <Paragraph {...{id:uuid++}}>
                        <Text id={uuid++}>{t1}</Text>
                        <Anchor {...{id:"anchor", 
                            ...props,
                            x:undefined,
                            y:undefined,
                            wrap(line,{x,y}){
                                return [{x,width:10}]
                            }
                        }}/>
                        <Text id={uuid++}>{t2}</Text>
                    </Paragraph>
                ))
                expect(doc1.xy(`[children="${t1}"]`).x).toBe(pg.margin.left)
                expect(doc1.xy(`[children="${t2}"]`).x).toBe(pg.margin.left+t1.length+10)
            })


        })
        
        describe("with {geometry, mode, side, geometryFn}",()=>{
            const geometry=Path.fromRect(size)
            const wrap={mode:"square", geometry}
            const props={wrap,x:{base:"page",offset:16},y:{base:"page",offset:5}}
            
            it("geometry{bounds,intersects},",()=>{
                const doc1=test({},(
                    <Paragraph {...{id:uuid++}}>
                        <Anchor {...{id:"anchor", ...props}}/>
                        <Text id={uuid++}>hello world</Text>
                    </Paragraph>
                ))
                expect(doc1.xy(`[children="hello "]`).x).toBe(pg.margin.left)
                expect(doc1.xy(`[children="world"]`).x).toBe(props.x.offset+size.width)
            })

            it("geometryFn to move left",()=>{
                const doc1=test({},(
                    <Paragraph {...{id:uuid++}}>
                        <Anchor {...{id:"anchor", ...props, wrap:{...wrap, geometryFn:(g,{x,y})=>g.clone().translate(x,y).translate(-4)}}}/>
                        <Text id={uuid++}>hello world</Text>
                    </Paragraph>
                ))
                expect(doc1.xy(`[children="hello world"]`).x).toBe(16-4+size.width)
            })
        })

        it("square should around rect boundary",()=>{
            const props={x:{base:"page",offset:16},y:{base:"page",offset:12},wrap:{mode:"square"}}

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

        it("clear should occupy whole line",()=>{
            const props={x:{base:"page",offset:16},y:{base:"page",offset:12},wrap:{mode:"clear"}}

            const doc1=test(props)
            expect(doc1.xy(`[children="hello"]`).x).toBe(pg.margin.left)
            expect(doc1.xy(`[children="world"]`).x).toBe(pg.margin.left+"hello".length)
            expect(doc1.xy(`[children="hello"]`).y).toBe(props.y.offset+size.height+baseline)

        })

        it("anchor content bigger than line/column/page should work like TopAndBottom",()=>{
            try{
                size.width=90
                const props={x:{base:"page",offset:12},y:{base:"page",offset:12},wrap:{mode:"square"}}
                const doc1=test(props)
                const y=props.y.offset+size.height+baseline
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({y,x:pg.margin.left})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({y,x:pg.margin.left+"hello".length})
            }finally{
                size.width=10
            }
        })

        it("Tight should around geometry right and left boundary",()=>{
            const content=(x,y)=>(
                <Paragraph {...{id:uuid++}}>
                    <Text id={uuid++}>hello</Text>
                    <Anchor {...{id:"anchor",x:{base:"page",x},y:{base:"page",y},wrap:{mode:"tight"}}}>
                        <Shape {...{geometry:"M10 0L0 20 20 20Z", id:uuid++}}/>
                    </Anchor>
                    <Text id={uuid++}>world</Text>
                </Paragraph>
            )
            const doc1=test(undefined,content(10,10))
            expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+baseline})

            const doc2=test(undefined,content(0,5))
            expect(doc2.xy(`[children="hello"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+baseline})
        })

        fit("table should be wrapped around anchor too",()=>{
            const doc1=test(undefined,(
                <Fragment>
                    <Paragraph {...{id:uuid++}}>
                        <Text id={uuid++}>world</Text>
                        <Anchor {...{
                            id:"anchor", 
                            x:{base:"page",x:12},y:{base:"page",y:12},
                            wrap:{mode:"square",geometry:new Shape.Path("M0 0h50v50h-50Z"), }
                        }}/>
                    </Paragraph>
                    <Table {...{id:uuid++}}>
                        <Row {...{id:uuid++, cols:[{x:10,width:40},{x:50,width:90}]}}>
                            <Cell {...{id:uuid++}}>
                                <Paragraph {...{id:uuid++}}>
                                    <Text id={uuid++}>hello</Text>
                                </Paragraph>
                            </Cell>
                            <Cell {...{id:uuid++}}>
                            </Cell>
                        </Row>
                    </Table>
                </Fragment>
            ))
            expect(doc1.xy('[data-type=table]')).toMatchObject({x:pg.margin.left,y:62})
        })

        xit("Through should around geometry boundary including inside of left and right margin",()=>{

        })

        

        xit("multiple TopAndBottom can intersect line space",()=>{

        })

        xit("multiple different mode of anhors should be supported",()=>{

        })

        describe("text",()=>{
            it("left",()=>{
                const doc1=test({wrap:{side:"left", mode:"square"},x:{base:"page",offset:16},y:{base:"page",offset:12}})
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+baseline})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+10+baseline})
            })

            it("both",()=>{
                const doc1=test({wrap:{side:"both", mode:"square"},x:{base:"page",offset:16},y:{base:"page",offset:12}})
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+baseline})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({x:16+size.width,y:pg.margin.top+baseline})
            })


            it("right",()=>{
                const doc1=test({wrap:{side:"right", mode:"square"},x:{base:"page",offset:16},y:{base:"page",offset:12}})
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:16+size.width,y:pg.margin.top+baseline})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({x:16+size.width+"hello".length,y:pg.margin.top+baseline})
            })

            it("largest at right",()=>{
                const doc1=test({wrap:{side:"largest", mode:"square"},x:{base:"page",offset:16},y:{base:"page",offset:12}})
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:16+size.width,y:pg.margin.top+baseline})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({x:16+size.width+"hello".length,y:pg.margin.top+baseline})
            })

            it("largest at left",()=>{
                const doc1=test({wrap:{side:"largest", mode:"square"},x:{base:"page",offset:50},y:{base:"page",offset:12}})
                expect(doc1.xy(`[children="hello"]`)).toMatchObject({x:pg.margin.left,y:pg.margin.top+baseline})
                expect(doc1.xy(`[children="world"]`)).toMatchObject({x:pg.margin.left+"hello".length,y:pg.margin.top+baseline})
            })
        })
    })
})
