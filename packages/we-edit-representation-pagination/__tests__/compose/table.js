import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render,provider} from "../context"
import {define} from "./index"

let u=1
const id=()=>`_${++u}`
    
define("table compose",
({dom, testing, CONTEXT, Context, WithTextContext, WithParagraphContext, autoID})=>{
    const {Document, Section,Frame, Paragraph, Text,Table,Row,Cell, Container}=dom
    function test(content,frame={height:20}){
        console.debug=jest.fn()
        const rendered=render(
            <Document id="root" canvas={null}>
                <Section createLayout={(props,context)=>new Frame({...props,width:10,...frame},context)} id={++u}>
                    <WithParagraphContext>
                        <WithTextContext>
                            {content}
                        </WithTextContext>
                    </WithParagraphContext>
                </Section>
            </Document>
        )

        const document=rendered.getInstance()
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
            const table=doc.$(doc.page.lastLine).findFirst(`[data-type="table"]`).get(0)
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

        describe("row.nextColumn with spans",()=>{
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
                expect(doc.$page(1).text().replace(/[^\w\s]/,"")).toBe("hello")
                expect(doc.$page(1).find('[data-type="cell"]').length).toBe(3+1)
            })
        })


        describe("row span",()=>{
            const left={width:0}, Zero={left,right:left,top:left,bottom:left}
            const getRows=$page=>$page.find("[data-type=row]").toArray().map(a=>a.props["data-content"]).join(",")
            const A=(<Paragraph id={id()}><Text id={id()}></Text></Paragraph>)
                        
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

            describe("a cell{rowspan=2} cross 2 pages",()=>{
                const LineText=" ".padStart(5,"A")
                let doc=null, $page0, $page1

                beforeAll(()=>{
                    doc=test(//3 line in page
                        <Table id={id()} width={100} cols={[{x:10,width:5},{x:20,width:10},{x:30,width:10}]}>
                            <Row  id={"0"}>
                                <Cell border={Zero} id={id()} children={A}/>
                                <Cell border={Zero} id={id()} children={A}/>
                                <Cell border={Zero} id={id()} children={A}/>
                            </Row>
                            <Row  id={"1"}>
                                <Cell border={Zero} id={id()} rowSpan={2}>
                                    <Paragraph id={id()}>
                                        <Text id={id()}>
                                            {LineText}
                                            {LineText}
                                            {LineText}
                                        </Text>
                                    </Paragraph>
                                </Cell>
                                <Cell border={Zero}  id={id()}  children={A}/>
                                <Cell border={Zero}  id={id()}  children={A}/>
                            </Row>
                            <Row  id={"2"}>
                                {/*1:row spaned 1st*/}
                                <Cell border={Zero} id={id()} children={A}/>
                                <Cell border={Zero} id={id()} children={A}/>
                            </Row>
                            <Row  id={"3"}>
                                <Cell border={Zero} id={id()} children={A}/>
                                <Cell border={Zero} id={id()} children={A}/>
                                <Cell border={Zero} id={id()} children={A}/>
                            </Row>
                        </Table>,
                        {height:30}
                    )
                    $page0=doc.$page(0)
                    $page1=doc.$page(1)
                })

                it("crossed pages",()=>{
                    expect(doc.pages.length).toBe(2)
                })

                it("crossed content is correct",()=>{
                    expect($page0.text().replace(/[^A\s]/g,"")).toBe(LineText+LineText)
                    expect($page1.text().replace(/[^A\s]/g,"")).toBe(LineText)
                })

                it("row order is correct as [0,1,2],[2,3] because yield",()=>{
                    expect(getRows($page0)).toBe("0,1,2")
                    expect(getRows($page1)).toBe("2,3")
                })

                it("cell and box should be correct",()=>{
                    expect($page0.find("[data-type=cell]").length).toBe(3+3+2)
                    expect($page0.find("cell-box").length).toBe(3+3+2)

                    expect($page1.find("[data-type=cell]").length).toBe(1+3)
                    expect($page1.find("cell-box").length).toBe(3+3)
                })
            })

            describe("a cell{rowspan=2} cross 2 pages, row span start line natually end at page end",()=>{
                const LineText=" ".padStart(5,"A")
                let doc=null, $page0, $page1

                beforeAll(()=>{
                    doc=test(//2 line in page
                        <Table id={id()} width={100} cols={[{x:10,width:5},{x:20,width:10},{x:30,width:10}]}>
                            <Row  id={"0"}>
                                <Cell border={Zero} id={id()} children={A}/>
                                <Cell border={Zero} id={id()} children={A}/>
                                <Cell border={Zero} id={id()} children={A}/>
                            </Row>
                            <Row  id={"1"}>
                                <Cell border={Zero} id={id()} rowSpan={2}>
                                    <Paragraph id={id()}>
                                        <Text id={id()}>
                                            {LineText}
                                            {LineText}
                                        </Text>
                                    </Paragraph>
                                </Cell>
                                <Cell border={Zero}  id={id()}  children={A}/>
                                <Cell border={Zero}  id={id()}  children={A}/>
                            </Row>
                            <Row  id={"2"}>
                                {/*1:row spaned 1st: and rowspan end at page edge*/}
                                <Cell border={Zero} id={id()} children={A}/>
                                <Cell border={Zero} id={id()} children={A}/>
                            </Row>
                            <Row  id={"3"}>
                                <Cell border={Zero} id={id()} children={A}/>
                                <Cell border={Zero} id={id()} children={A}/>
                                <Cell border={Zero} id={id()} children={A}/>
                            </Row>
                        </Table>
                    )
                    $page0=doc.$page(0)
                    $page1=doc.$page(1)
                })

                it("crossed pages",()=>{
                    expect(doc.pages.length).toBe(2)
                })

                it("crossed content is correct",()=>{
                    expect($page0.text().replace(/[^A\s]/g,"")).toBe(LineText)
                    expect($page1.text().replace(/[^A\s]/g,"")).toBe(LineText)
                })

                it("spaned row1 in 2nd page should be yield to row2",()=>{
                    expect(getRows($page0)).toBe("0,1")
                    expect(getRows($page1)).toBe("2,3")

                    expect($page0.find("[data-type=cell]").length).toBe(3+3)
                    expect($page0.find("cell-box").length).toBe(3+3)

                    expect($page1.find("[data-type=cell]").length).toBe(3+3)
                    expect($page1.find("cell-box").length).toBe(3+3)
                })
            })

            describe("2 cells{rowspan=3,2} competition when cross page",()=>{

                describe("row span end at different row",()=>{
                    const LineText=" ".padStart(5,"A")
                    let doc=null, $page0, $page1

                    beforeAll(()=>{
                        const A=(<Paragraph id={id()}><Text id={id()}>A</Text></Paragraph>)
                        doc=test(//each page can hold 3 lines
                            <Table id={id()} width={100} cols={[{x:10,width:5},{x:20,width:10},{x:30,width:5}]}>
                                <Row  id={"0"}>
                                    <Cell  id={id()} border={Zero} rowSpan={3} >
                                        <Paragraph id={id()}>
                                            <Text id={id()}>
                                                {LineText}
                                                {LineText}
                                                {LineText}
                                                {LineText/*in 2nd page*/}
                                            </Text>
                                        </Paragraph>
                                    </Cell>
                                    <Cell border={Zero}  id={id()} colSpan={2} children={A}/>
                                    {/*col spaned*/}
                                </Row>
                                <Row  id={"1"}>
                                    {/*0 row spaned: 2nd*/}
                                    <Cell border={Zero} id={id()} colSpan={2} children={A}/>
                                    {/*col spaned*/}
                                </Row>
                                <Row  id={"2"}>
                                    {/*0 row spaned: 1st*/}
                                    <Cell border={Zero} id={id()} children={A}/>
                                    <Cell border={Zero} id={id()} rowSpan={2}>
                                        <Paragraph id={id()}>
                                            <Text id={id()}>
                                                {LineText}
                                                {LineText/*in 2nd page*/}
                                                {LineText}
                                            </Text>
                                        </Paragraph>
                                    </Cell>
                                </Row>
                                <Row  id={"3"} height={10}>
                                    <Cell border={Zero}  id={id()} children={A}/>
                                    <Cell border={Zero} id={id()} children={A}/>
                                    {/*2 row spaned: 1st*/}
                                </Row>
                                <Row  id={"4"} height={10}>
                                    <Cell border={Zero} id={id()} children={A}/>
                                    <Cell border={Zero}  id={id()} children={A}/>
                                    <Cell border={Zero} id={id()} children={A}/>
                                </Row>
                            </Table>,
                            {height:30}
                        )
                        $page0=doc.$page(0)
                        $page1=doc.$page(1)
                    })

                    it("should be 2 pages",()=>{
                        expect(doc.pages.length).toBe(2)
                    })

                    it("row order should be [0,1,2], [2,3,4] because of yield",()=>{
                        expect(getRows($page0)).toBe("0,1,2")
                        expect(getRows($page1)).toBe("2,3,4")
                    })

                    it("cell and box should be correct",()=>{
                        expect($page0.find("[data-type=cell]").length).toBe(2+1+2)
                        expect($page0.findFirst("[data-content=0]").find("cell-box").length).toBe(2)
                        expect($page0.findFirst("[data-content=1]").find("cell-box").length).toBe(1)
                        expect($page0.findFirst("[data-content=2]").find("cell-box").length).toBe(2)
                        expect($page0.findFirst("[data-content=0]").findFirst("[data-type=cell]").find(".line").length).toBe(3)
                        expect($page0.findFirst("[data-content=2]").findLast("[data-type=cell]").find(".line").length).toBe(1)
                        expect($page0.findFirst("[data-content=2]").findLast("[data-type=cell]").attr('height')).toBe(10)

                        expect($page1.find("[data-type=cell]").length).toBe(2+2+3)
                        expect($page1.findFirst("[data-content=2]").find("cell-box").length).toBe(3)
                        expect($page1.findFirst("[data-content=3]").find("cell-box").length).toBe(2)
                        expect($page1.findFirst("[data-content=4]").find("cell-box").length).toBe(3)
                        expect($page1.findFirst("[data-content=2]").findFirst("[data-type=cell]").find(".line").length).toBe(1)
                        expect($page1.findFirst("[data-content=2]").findLast("[data-type=cell]").find(".line").length).toBe(2)
                        expect($page1.findFirst("[data-content=2]").findLast("[data-type=cell]").attr('height')).toBe(20)
                    })
                })

                describe("row span end at same row",()=>{
                    const LineText=" ".padStart(5,"A")
                    let doc=null, $page0, $page1, $page2 

                    beforeAll(()=>{
                        doc=test(//each page can hold 3 lines
                            <Table id={id()} width={100} cols={[{x:10,width:5},{x:20,width:10},{x:30,width:5}]}>
                                <Row  id={"0"}>
                                    <Cell  id={id()} border={Zero} rowSpan={3} >
                                        <Paragraph id={id()}>
                                            <Text id={id()}>
                                                {LineText}
                                                {LineText}
                                                {LineText}
                                                {LineText/*in 2nd page*/}
                                            </Text>
                                        </Paragraph>
                                    </Cell>
                                    <Cell border={Zero}  id={id()} colSpan={2} children={A}/>
                                    {/*col spaned*/}
                                </Row>
                                <Row  id={"1"}>
                                    {/*0 row spaned: 2nd*/}
                                    <Cell border={Zero} id={id()} children={A}/>
                                    <Cell border={Zero} id={id()} rowSpan={2}>
                                        <Paragraph id={id()}>
                                            <Text id={id()}>
                                                {LineText}
                                                {LineText}
                                                {LineText/*in 2nd page*/}
                                                {LineText}
                                            </Text>
                                        </Paragraph>
                                    </Cell>
                                </Row>
                                <Row  id={"2"}>
                                    {/*0 row spaned: 1st*/}
                                    <Cell border={Zero} id={id()} children={A}/>
                                    {/*1 row spaned: 1st*/}
                                </Row>
                                <Row  id={"3"}>
                                    <Cell border={Zero}  id={id()} children={A}/>
                                    <Cell border={Zero} id={id()} children={A}/>
                                    <Cell border={Zero} id={id()} children={A}/>
                                </Row>
                                <Row  id={"4"}>
                                    <Cell border={Zero} id={id()} children={A}/>
                                    <Cell border={Zero}  id={id()} children={A}/>
                                    <Cell border={Zero} id={id()} children={A}/>
                                </Row>
                            </Table>,
                            {height:30}
                        )
                        $page0=doc.$page(0)
                        $page1=doc.$page(1)
                        $page2=doc.$page(2)
                    })

                    it("should be 2 pages",()=>{
                        expect(doc.pages.length).toBe(3)
                    })

                    it("row order should be [0,1,2], [2,3],[4] because of yield",()=>{
                        expect(getRows($page0)).toBe("0,1,2")
                        expect(getRows($page1)).toBe("2,3")
                        expect(getRows($page2)).toBe("4")
                    })

                    it("cell and box should be correct",()=>{
                        expect($page0.find("[data-type=cell]").length).toBe(2+2+1)
                        expect($page0.find("cell-box").length).toBe(2+2+1)

                        expect($page1.find("[data-type=cell]").length).toBe(2+3)
                        expect($page1.find("cell-box").length).toBe(3+3)
                        
                    })

                    it("2nd row span win the height competition",()=>{
                        expect($page1.findFirst("[data-type=row]").attr('height')).toBe(20)
                        expect($page1.findFirst("[data-type=row]").findFirst("[data-type=cell]").find(".line").length).toBe(1)
                        expect($page1.findFirst("[data-type=row]").findLast("[data-type=cell]").find(".line").length).toBe(2)
                    })
                })
            })


        })
    })

    xit("cell/row containers included in layouted",()=>{debugger
        const doc=test(
            <Table id={`${u++}`} width={8} cols={[{x:0,width:6},{x:0,width:6}]}>
                <Container id={id()} type="RowContainer">
                    <Row id={`${u++}`} >
                        <Container id={id()} type="CellContainer">
                            <Cell id={`${u++}`}>
                                <Paragraph id={`${u++}`}>
                                    <Text id={`${u++}`} fonts="arial" size={10}>hello</Text>
                                </Paragraph>
                            </Cell>
                        </Container>
                        <Container id={id()} type="CellContainer">
                            <Cell id={`${u++}`}/>
                        </Container>
                    </Row>
                </Container>
            </Table>
        )

        expect(doc.$page(0).find("[data-type=CellContainer]").length).toBe(2)
        expect(doc.$page(0).find("[data-type=RowContainer]").length).toBe(1)
    })
})
