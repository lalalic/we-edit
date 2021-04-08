import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render,provider} from "../context"
import {define} from "./index"

let u=1
const id=()=>`_${++u}`
    
define("table compose",
({dom, testing, CONTEXT, Context, WithTextContext, WithParagraphContext, autoID})=>{
    const {Section,Frame, Paragraph, Text,Table,Row,Cell}=dom
    const WithSectionContext=provider(Section,{ModelTypes:dom})
    const PageHeight=20
    function test(content){
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

        render(
            <WithSectionContext context={context}>
                <Section createLayout={(props,context)=>new Frame({...props,width:10,height:PageHeight},context)} id={++u}>
                    <WithParagraphContext>
                        <WithTextContext>
                            {content}
                        </WithTextContext>
                    </WithParagraphContext>
                </Section>
            </WithSectionContext>
        )
        const pages=document.computed.composed
        return {
            pages,
            page:pages[0],
            $page:i=>new ReactQuery(pages[i].createComposed2Parent()),
            $:a=>new ReactQuery(a),
        }
    }

    describe("one column",()=>{
        it("basic",()=>{
            const doc=test(
                <Table id={`${u++}`} width={8} cols={[{x:0,width:6}]}>
                    <Row id={`${u++}`} >
                        <Cell id={`${u++}`}>
                            <Paragraph id={`${u++}`}>
                                <Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
                            </Paragraph>
                        </Cell>
                    </Row>
                </Table>
            )
            expect(doc.pages.length).toBe(1)

            expect(doc.page.lastLine).toBeDefined()
            const table=doc.$(doc.page.lastLine)
                .findFirst(`[data-type="table"]`)
                .get(0)
            expect(table).toBeDefined()
            expect(table.props.height).toBe(12)
        })

        it("empty cell should be ok",()=>{
            const doc=test(
                <Table id={`${u++}`} width={8} cols={[{x:0,width:6}]} >
                    <Row id={`${u++}`} >
                        <Cell id={`${u++}`}>
                            <Paragraph id={`${u++}`}/>
                        </Cell>
                    </Row>
                </Table>
            )
            expect(doc.pages.length).toBe(1)

            expect(doc.page.lastLine).toBeDefined()
            const table=doc.$(doc.page.lastLine)
                .findFirst(`[data-type="table"]`)
                .get(0)
            expect(table).toBeDefined()
            expect(table.props.height).toBe(12)
        })

        it("row height can be enlarged when content height>setting height",()=>{
            const doc=test(
                <Table id={`${u++}`} width={8}cols={[{x:0,width:6}]}>
                    <Row id={`${u++}`} minHeight={2}  >
                        <Cell id={`${u++}`}>
                            <Paragraph id={`${u++}`}>
                                <Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
                            </Paragraph>
                        </Cell>
                    </Row>
                </Table>
            )
            expect(doc.pages.length).toBe(1)

            expect(doc.page.lastLine).toBeDefined()
            const row=doc.$(doc.page.lastLine)
                .findFirst(`[data-type="row"]`)
            expect(row.length).toBe(1)
            expect(row.attr('height')).toBe(10+2)
        })

        it("column width can be enlarged when content width>setting width",()=>{

        })


        it("cell can be splitted into pages",()=>{
            const doc=test(
                <Table id={`${u++}`} width={8} cols={[{x:0,width:7}]}>
                    <Row id={`${u++}`}  >
                        <Cell id={`${u++}`}>
                            <Paragraph id={`${u++}`}>
                                <Text id={`${u++}`} fonts="arial" size={10}>hello hello hello</Text>
                            </Paragraph>
                        </Cell>
                    </Row>
                </Table>
            )
            expect(doc.pages.length).toBe(3)
        })

        it("nested cell can be splitted into pages",()=>{
            const doc=test(
                <Table id={`table0`} width={10}cols={[{x:0,width:7}]} >
                    <Row id={`row0`} >
                        <Cell id={`cell0`}>
                            <Table id={`table1`} width={8}cols={[{x:0,width:7}]}>
                                <Row id={`row1`} >
                                    <Cell id={`cell1`}>
                                        <Paragraph id={`${u++}`}>
                                            <Text id={`${u++}`} fonts="arial" size={10}>hello hello hello</Text>
                                        </Paragraph>
                                    </Cell>
                                </Row>
                            </Table>
                        </Cell>
                    </Row>
                </Table>
            )
            expect(doc.pages.length).toBe(3)
        })
    })

    describe("two columns",()=>{
        it("[[hello ][hello],[hello]]",()=>{
            const doc=test(
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
            )
            expect(doc.pages.length).toBe(2)
        })
        it("[[hello],[hello ][hello]]",()=>{
            const doc=test(
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
            )
            expect(doc.pages.length).toBe(2)
        })

        it("[[hello],[[hello ][hello]]]",()=>{
            const doc=test(
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
            )
            expect(doc.pages.length).toBe(2)
        })
    })

    describe("span",()=>{
        describe("col span",()=>{
            it("colspan=2 should create less cells",()=>{
                const doc=test(
                    <Table id={id()} width={100} cols={[{x:10,width:10},{x:20,width:10},{x:30,width:10}]}>
                        <Row  id={id()} minHeight={10}><Cell  id={id()} colSpan={2}/><Cell  id={id()}/></Row>
                        <Row  id={id()} minHeight={10}><Cell  id={id()}/><Cell  id={id()}/><Cell  id={id()}/></Row>
                    </Table>
                )
                expect(doc.pages.length).toBe(1)
                expect(doc.$page(0).find('[data-type="cell"]').length).toBe(5)
            })

            it("colspan=2 cross page",()=>{
                const doc=test(
                    <Table id={id()} width={100} cols={[{x:10,width:6},{x:20,width:10},{x:30,width:10}]}>
                        <Row  id={id()}>
                            <Cell  id={"cell"} colSpan={2}>
                                <Paragraph>
                                    <Text>hello world hello</Text>
                                </Paragraph>
                            </Cell>
                            <Cell  id={id()}/>
                        </Row>
                        <Row  id={id()}><Cell  id={id()}/><Cell  id={id()}/><Cell  id={id()}/></Row>
                    </Table>
                )
                expect(doc.pages.length).toBe(2)
                expect(doc.$page(0).find('[data-type="cell"]').length).toBe(2)
                expect(doc.$page(0).text()).toBe("hello world ")
                expect(doc.$page(1).text()).toBe("hello"+Paragraph.defaultProps.End)
                expect(doc.$page(1).find('[data-type="cell"]').length).toBe(3+1)
            })
        })

        describe("column location",()=>{
            const id="a0", id1="a1"
            function next(cols,id){
                const row=new Row({},{cols:()=>cols})
                const columns=row.getColumns(cols)
                const col=columns[id]
                return {
                    col,
                    i:columns.indexOf(col)
                }
            }

            it.each([
                [[{},{}],id1,0],
                [[{id},{}],id,0],
                [[{id},{}],id1,1],
                [[{id},{id,colSpan:2},{},{}],id1,3],
                [[{id},{id,colSpan:2},{},{id,colSpan:2},{},{}],id1,5],

                [[{rowSpan:2}, {}],id,1],
                [[{rowSpan:2,beginRowSpan:true}, {}],id,0],
                [[{id},{rowSpan:2,beginRowSpan:true}, {}],id1,1],
                
                [[{id},{rowSpan:2}, {}],id1,2],
                [[{id},{rowSpan:2,colSpan:3}, {},{}],id1,2],
                [[{id},{rowSpan:2,colSpan:100}, {},{}],id1,2,"colSpan ignored on not beginRowSpan"],
                //[[{id},{rowSpan:2,colSpan:100,id}, {},{}],id1,2,"colSpan ignored on not beginRowSpan"],

                [[{id},{rowSpan:2,beginRowSpan:true,colSpan:2}, {},{},{}],id1,1],
                [[{id},{rowSpan:2,beginRowSpan:true,colSpan:2,id}, {},{},{}],id1,3],

            ])(`%j[%s]=>%i : %s`,(cols,id, i)=>{
                expect(next(cols,id).i).toBe(i)
            })

            it("rowSpan => cols on rows",()=>{
                const id=()=>`_${++u}`
                const push=jest.spyOn(Table.Page.prototype,"push")
                const cols=[{x:5, width:10},{x:20,width:10},{x:35, width:10},{x:45,width:10}]
                try{
                    test(
                        <Table id={id()} cols={cols} width={80}>
                            <Row id={id()}><Cell  id={id()}/><Cell  id={id()}/><Cell  id={id()}/><Cell  id={id()}/></Row> 
                            <Row id={id()}>
                                <Cell  id={id()}/>
                                <Cell  id={id()} rowSpan={2}/>
                                <Cell  id={id()}/>
                            </Row> 
                            <Row id={id()}><Cell  id={id()}/><Cell  id={id()}/><Cell  id={id()}/></Row> 
                            <Row id={id()}><Cell  id={id()}/><Cell  id={id()}/><Cell  id={id()}/><Cell  id={id()}/></Row> 
                        </Table>
                    )
                    
                    const rows=push.mock.calls.map(a=>a[0])
                    expect(rows.length).toBe(4)
                    expect(rows[0].cols).toMatchObject(cols)
                    expect(rows[1].cols[1]).toMatchObject({rowSpan:2,beginRowSpan:true})
                    expect(rows[2].cols[1]).toMatchObject({rowSpan:1})
                    expect(rows[2].cols[1].beginRowSpan).toBeFalsy()
                    expect(rows[3].cols[1].rowSpan).toBeFalsy()
                }finally{
                    push.mockRestore()
                }
            })
        })

        describe("row span",()=>{
            it("rowspan=2",()=>{
                const doc=test(
                    <Table id={id()} width={100} cols={[{x:10,width:10},{x:20,width:10},{x:30,width:10}]}>
                        <Row  id={id()}><Cell  id={id()} rowSpan={2}/><Cell  id={id()}/></Row>
                        <Row  id={id()}><Cell  id={id()}/></Row>
                    </Table>
                )
                const $page0=doc.$page(0)
                expect($page0.find('[data-type="row"]').length).toBe(2)
                expect($page0.find('[data-type="cell"]').length).toBe(3)
            })

            it("rowspan=2 cross page, and reshape to next row",()=>{
                const LineText=" ".padStart(5,"A")
                const left={width:0}, Zero={left,right:left,top:left,bottom:left}
                const doc=test(
                    <Table id={id()} width={100} cols={[{x:10,width:5},{x:20,width:10},{x:30,width:10}]}>
                        <Row  id={"0"} height={8}><Cell border={Zero} id={id()}/><Cell border={Zero} id={id()}/><Cell border={Zero} id={id()}/></Row>
                        <Row  id={"1"}>
                            <Cell  id={id()} rowSpan={2} border={Zero}>
                                <Paragraph id={id()}>
                                    <Text id={id()}>{LineText}{LineText}</Text>
                                </Paragraph>
                            </Cell>
                            <Cell border={Zero}  id={id()}/>
                        </Row>
                        <Row  id={"2"}><Cell border={Zero} id={id()}/><Cell border={Zero} id={id()}/></Row>
                        <Row  id={"3"} height={10}><Cell border={Zero} id={id()}/><Cell border={Zero}  id={id()}/><Cell border={Zero} id={id()}/></Row>
                    </Table>
                )
                expect(doc.pages.length).toBe(2)
                const $page0=doc.$page(0), $page1=doc.$page(1)
                expect($page0.text()).toBe(LineText)
                expect($page0.find("[data-type=row]").toArray().map(a=>a.props["data-content"]).join(",")).toBe("0,1,2")
                expect($page0.find("[data-type=cell]").length).toBe(3+2+2)

                expect($page1.text()).toBe(LineText+Paragraph.defaultProps.End)
                expect($page1.find("[data-type=row]").toArray().map(a=>a.props["data-content"]).join(",")).toBe("2,3")
                expect($page1.find("[data-type=cell]").length).toBe(3+1)
                
            })
        })
    })
})
