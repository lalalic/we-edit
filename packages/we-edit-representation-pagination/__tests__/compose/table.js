import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render,provider} from "../context"
import {define} from "./index"

define("table compose",
({dom, testing, CONTEXT, Context, WithTextContext, WithParagraphContext, autoID})=>{
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

    let u=1
    const section=table=>(
        <Section createLayout={(props,context)=>new Frame({...props,width:10,height:20},context)} id={0} key={0}>
            <WithParagraphContext>
                <WithTextContext>
                    {table}
                </WithTextContext>
            </WithParagraphContext>
        </Section>
    )

    describe("one column",()=>{
        it("basic",()=>{
            let page
            document.appendComposed=jest.fn(a=>page=a)
            const rendered=render(
                <WithSectionContext context={context}>
                    {section(
                        <Table id={`${u++}`} width={8} cols={[{x:0,width:6}]}>
                            <Row id={`${u++}`} >
                                <Cell id={`${u++}`}>
                                    <Paragraph id={`${u++}`}>
                                        <Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    )}
                </WithSectionContext>
            )
            expect(document.appendComposed).toHaveBeenCalledTimes(1)

            expect(page.lastLine).toBeDefined()
            const table=new ReactQuery(page.lastLine)
                .findFirst(`[data-type="table"]`)
                .get(0)
            expect(table).toBeDefined()
            expect(table.props.height).toBe(12)
        })

        it("empty cell should be ok",()=>{
            let page
            document.appendComposed=jest.fn(a=>page=a)
            const rendered=render(
                <WithSectionContext context={context}>
                    {section(
                        <Table id={`${u++}`} width={8} cols={[{x:0,width:6}]} >
                            <Row id={`${u++}`} >
                                <Cell id={`${u++}`}>
                                    <Paragraph id={`${u++}`}/>
                                </Cell>
                            </Row>
                        </Table>
                    )}
                </WithSectionContext>
            )
            expect(document.appendComposed).toHaveBeenCalledTimes(1)

            expect(page.lastLine).toBeDefined()
            const table=new ReactQuery(page.lastLine)
                .findFirst(`[data-type="table"]`)
                .get(0)
            expect(table).toBeDefined()
            expect(table.props.height).toBe(12)
        })

        it("row height can be enlarged when content height>setting height",()=>{
            let page
            document.appendComposed=jest.fn(a=>page=a)
            const rendered=render(
                <WithSectionContext context={context}>
                    {section(
                        <Table id={`${u++}`} width={8}cols={[{x:0,width:6}]}>
                            <Row id={`${u++}`} height={2}  >
                                <Cell id={`${u++}`}>
                                    <Paragraph id={`${u++}`}>
                                        <Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    )}
                </WithSectionContext>
            )
            expect(document.appendComposed).toHaveBeenCalledTimes(1)

            expect(page.lastLine).toBeDefined()
            const row=new ReactQuery(page.lastLine)
                .findFirst(`[data-type="row"]`)
            expect(row.length).toBe(1)
            expect(row.attr('height')).toBe(10+2)
        })

        it("column width can be enlarged when content width>setting width",()=>{

        })


        it("cell can be splitted into pages",()=>{
            document.appendComposed=jest.fn()
            const rendered=render(
                <WithSectionContext context={context}>
                    {section(
                        <Table id={`${u++}`} width={8} cols={[{x:0,width:7}]}>
                            <Row id={`${u++}`}  >
                                <Cell id={`${u++}`}>
                                    <Paragraph id={`${u++}`}>
                                        <Text id={`${u++}`} fonts="arial" size={10}>hello hello hello</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    )}
                </WithSectionContext>
            )
            expect(document.appendComposed).toHaveBeenCalledTimes(3)
        })

        it("nested cell can be splitted into pages",()=>{
            document.appendComposed=jest.fn()
            const rendered=render(
                <WithSectionContext context={context}>
                    {section(
                        <Table id={`${u++}`} width={10}cols={[{x:0,width:7}]} >
                            <Row id={`${u++}`} >
                                <Cell id={`${u++}`}>
                                    <Table id={`${u++}`} width={8}cols={[{x:0,width:7}]}>
                                        <Row id={`${u++}`} >
                                            <Cell id={`${u++}`}>
                                                <Paragraph id={`${u++}`}>
                                                    <Text id={`${u++}`} fonts="arial" size={10}>hello hello hello</Text>
                                                </Paragraph>
                                            </Cell>
                                        </Row>
                                    </Table>
                                </Cell>
                            </Row>
                        </Table>
                    )}
                </WithSectionContext>
            )
            expect(document.appendComposed).toHaveBeenCalledTimes(3)
        })
    })

    describe("two columns",()=>{
        it("[[hello ][hello],[hello]]",()=>{
            let u=0
            const pages=[]
            document.appendComposed=jest.fn(page=>pages.push(page))
            const rendered=render(
                <WithSectionContext context={context}>
                    {section(
                        <Table id={`${`${u++}`}`} width={10}cols={[{x:0,width:5},{x:5,width:5}]} >
                            <Row id={`${u++}`} >
                                <Cell id={`${u++}`}>
                                    <Paragraph id={`${u++}`}>
                                        <Text id={`${u++}`} fonts="arial" size={15}>hello hello</Text>
                                    </Paragraph>
                                </Cell>
                                <Cell id={`${u++}`}>
                                    <Paragraph id={`${u++}`}>
                                        <Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    )}
                </WithSectionContext>
            )
            expect(document.appendComposed).toHaveBeenCalledTimes(2)
        })
        it("[[hello],[hello ][hello]]",()=>{
            const pages=[]
            document.appendComposed=jest.fn(page=>pages.push(page))
            const rendered=render(
                <WithSectionContext context={context}>
                    {section(
                        <Table id={`${u++}`} width={10}cols={[{x:0,width:5},{x:5,width:5}]} >
                            <Row id={`${u++}`} >
                                <Cell id={`${u++}`}>
                                    <Paragraph id={`${u++}`}>
                                        <Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
                                    </Paragraph>
                                </Cell>
                                <Cell id={`${u++}`}>
                                    <Paragraph id={`${u++}`}>
                                        <Text id={`${u++}`} fonts="arial" size={15}>hello hello</Text>
                                    </Paragraph>
                                </Cell>

                            </Row>
                        </Table>
                    )}
                </WithSectionContext>
            )
            expect(document.appendComposed).toHaveBeenCalledTimes(2)
        })

        it("[[hello],[[hello ][hello]]]",()=>{
            const pages=[]
            document.appendComposed=jest.fn(page=>pages.push(page))
            const rendered=render(
                <WithSectionContext context={context}>
                    {section(
                        <Table id={`${u++}`} width={10}cols={[{x:0,width:5},{x:5,width:5}]} >
                            <Row id={`${u++}`} >
                                <Cell id={`${u++}`}>
                                    <Paragraph id={`${u++}`}>
                                        <Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
                                    </Paragraph>
                                </Cell>

                                <Cell id={`${u++}`}>
                                    <Table id={`${u++}`} width={10} cols={[{x:0,width:5},{x:5,width:5}]}>
                                        <Row id={`${u++}`} >
                                            <Cell id={`${u++}`}>
                                                <Paragraph id={`${u++}`}>
                                                    <Text id={`${u++}`} fonts="arial" size={15}>hello hello</Text>
                                                </Paragraph>
                                            </Cell>
                                            <Cell id={`${u++}`}/>
                                        </Row>
                                    </Table>
                                </Cell>

                            </Row>
                        </Table>
                    )}
                </WithSectionContext>
            )
            expect(document.appendComposed).toHaveBeenCalledTimes(2)
        })
    })

    xdescribe("span",()=>{
        function test(content){
            render(
                <WithSectionContext context={context}>
                    {section(content)}
                </WithSectionContext>
            )
            expect(document.appendComposed).toHaveBeenCalled()
            const pages=document.computed.composed
            const $page=new ReactQuery(pages[0])
            return {$page,pages}
        }

        let uid=0
        const id=()=>`_${++uid}`

        describe("col span",()=>{
            it("colspan=2",()=>{

            })

            it("colspan=2 cross page",()=>{

            })
        })

        describe("row span",()=>{
            it("rowspan=2",()=>{
                const doc=test(
                    <Table id={id()} width={100} cols={[{x:10,width:10},{x:20,width:10},{x:30,width:10}]}>
                        <Row  id={id()}><Cell  id={id()} colSpan={2}/><Cell  id={id()}/></Row>
                        <Row  id={id()}><Cell  id={id()}/><Cell  id={id()}/><Cell  id={id()}/></Row>
                    </Table>
                )
                expect(doc.$page.find('[data-type="row"]').length).toBe(2)
            })

            it("rowspan=2 cross page",()=>{

            })

            it("rowspan end at cross page",()=>{

            })
        })

        it("colspan=2 and rowspan=2",()=>{

        })

        it("colspan=2 and rowspan=2 cross page",()=>{

        })
    })
})
