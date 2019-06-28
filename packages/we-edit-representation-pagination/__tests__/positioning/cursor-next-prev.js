import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import define from "./index"

define("cursor", ({dom:{Paragraph, Text, Image, Table, Row, Cell,Container, Frame,Anchor,Shape}, render, mockQuery,size,uuid})=>{
    xdescribe("next", ()=>{
        it("text",()=>{
            const p=render(<Paragraph id={"-1"}><Text id={"0"}>text</Text></Paragraph>).get("-1")
            expect(p.nextCursorable()).toEqual({id:"0",at:0})
        })

        it("image",()=>{
            const p=render(<Paragraph id={"-1"}><Image id={"0"}/></Paragraph>).get("-1")
            expect(p.nextCursorable()).toEqual({id:"0",at:0})
        })

        it("t|ext",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Text id={"0"}>text</Text></Paragraph>)
                .get("0")
                .nextCursorable("0",1)
            expect(p).toEqual({id:"0",at:2})
        })

        it("|text",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Text id={"0"}>text</Text></Paragraph>)
                .get("0")
                .nextCursorable("0",0)
            expect(p).toEqual({id:"0",at:1})
        })

        it("tex|tImage",()=>{
            const doc=render(<Paragraph id={`${++uuid}`}><Text id={"0"}>text</Text><Image id="-1"/></Paragraph>)
            expect(doc.get("0").nextCursorable("0",4)).toMatchObject({id:"-1",at:0})
            expect(doc.get("0").nextCursorable("0",3)).toMatchObject({id:"-1",at:0})
        })

        it("|imageText",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Image id="-1"/><Text id={"0"}>text</Text></Paragraph>)
                .get("-1")
                .nextCursorable("-1",0)
            expect(p).toEqual({id:"0",at:0})
        })

        it("image|=>Text",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Image id="-1"/><Text id={"0"}>text</Text></Paragraph>)
                .get("-1")
                .nextCursorable("-1",1)
            expect(p).toEqual({id:"0",at:0})
        })

        it("|imageImage",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Image id="-1"/><Image id="-2"/></Paragraph>)
                .get("-1")
                .nextCursorable("-1",0)
            expect(p).toEqual({id:"-2",at:0})
        })

        it("tex|t<container/>Image",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Text id={"0"}>text</Text><Container id="-2"/><Image id="-1"/></Paragraph>)
                .get("0")
                .nextCursorable("0",3)
            expect(p).toEqual({id:"-1",at:0})
        })

        it("tex|t<container/><container/>Image",()=>{
            const p=render(
                        <Paragraph id={`${++uuid}`}>
                          <Text id={"0"}>text</Text>
                          <Container id="-2"/>
                          <Container id="-3"/>
                          <Image id="-1"/>
                        </Paragraph>
                    )
                .get("0")
                .nextCursorable("0",3)
            expect(p).toEqual({id:"-1",at:0})
        })

        it("tex|t<container><container/></container>Image",()=>{
            const p=render(
                <Paragraph id={`${++uuid}`}>
                      <Text id={"0"}>text</Text>
                      <Container id="-2">
                        <Container id="-3"/>
                      </Container>
                      <Image id="-1"/>
                </Paragraph>
                )
                .get("0")
                .nextCursorable("0",3)
            expect(p).toEqual({id:"-1",at:0})
        })

        it("<paragraph>tex|t</paragraph>",()=>{
            const p=render(<Paragraph id={"1"}><Text id={"0"}>text</Text></Paragraph>)
                .get("0")
                .nextCursorable("0",3)
            expect(p).toEqual({id:"0",at:4})
        })

        it("<paragraph>|image</paragraph>",()=>{
            const p=render(<Paragraph id={"1"}><Image id={"0"}/></Paragraph>)
                .get("0")
                .nextCursorable("0",0)
            expect(p).toEqual({id:"1",at:1})
        })

        it("shape",()=>{
            const doc=render(
                    <Paragraph id={"1"}>
                        <Shape id={"0"} {...{width:5,height:5, outline:{width:4}}}/>
                        <Text id={"2"}>text</Text>
                    </Paragraph>)
            expect(doc.get("0").nextCursorable("0",0)).toMatchObject({id:"2",at:0})
            expect(doc.get("0").nextCursorable("0",1)).toMatchObject({id:"2",at:0})
        })

        it("<paragraph>text|</paragraph><paragraph>text</paragraph>",()=>{
            const doc=render(
                <Container id={`${++uuid}`}>
                    <Paragraph id={"-1"}><Text id={"0"}>text</Text></Paragraph>
                    <Paragraph id={"-2"}><Text id={"-3"}>text</Text></Paragraph>
                </Container>
            )

            Paragraph.prototype.query=jest.fn(()=>{
                return {
                    forwardFirst(){
                        return {
                            attr(){
                                return "-2"
                            }
                        }
                    }
                }
            })
            expect(doc.get("-1").nextCursorable("-1",1)).toMatchObject({id:"-3",at:0})
            expect(doc.get("0").nextCursorable("0",4)).toMatchObject({id:"-3",at:0})
        })

        it("tex|t<AnchorImage/>text",()=>{
            const p=render(
                    <Paragraph id={uuid++}>
                        <Text id={"0"}>text</Text>
                        <Anchor id={"2"}
                            wrap={{mode:"Square"}}
                            x={{base:"page",offset:0}} y={{base:"page",offset:0}}>
                            <Image id={"3"} {...{width:2,height:10}}/>
                        </Anchor>
                        <Text id={"1"}>text</Text>
                    </Paragraph>
                )
                .get("0")
                .nextCursorable("0",3)
            expect(p).toEqual({id:"1",at:0})
        })

        describe("frame",()=>{
            it("<paragraph>tex|t</paragraph>",()=>{
                const p=render(
                            <Frame id={`${++uuid}`}  {...{width:100,height:200}}>
                              <Paragraph id={"1"}>
                                <Text id={"0"}>text</Text>
                              </Paragraph>
                            </Frame>
                        )
                    .get("0")
                    .nextCursorable("0",3)
                expect(p).toEqual({id:"0",at:4})
            })

            it("<paragraph>tex|t</paragraph>",()=>{
                const p=render(
                            <Frame id={`${++uuid}`}  {...{width:100,height:200, x:10, y:20}}>
                                  <Paragraph id={"1"}>
                                    <Text id={"0"}>text</Text>
                                  </Paragraph>
                            </Frame>
                        )
                    .get("0")
                    .nextCursorable("0",3)
                expect(p).toEqual({id:"0",at:4})
            })
        })

        describe("table",()=>{
            const nextParagraphId="-1"
            beforeEach(()=>{
                Paragraph.prototype.query=jest.fn(()=>{
                    return {
                        forwardFirst(){
                            return {
                                attr(){
                                    return nextParagraphId
                                }
                            }
                        }
                    }
                })
            })

            it("paragraph=>Table",()=>{
                const doc=render(
                    <Fragment>
                        <Paragraph id={"2"}>
                            <Text id={"0"}>text</Text>
                        </Paragraph>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={nextParagraphId}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(doc.get("2").nextCursorable("2",1)).toMatchObject({id:"1",at:0})
            })

            it("paragraph=>nested Table",()=>{
                const doc=render(
                    <Fragment>
                        <Paragraph id={"2"}>
                            <Text id={"0"}>text</Text>
                        </Paragraph>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Table id={uuid++} width={10}>
                                        <Row id={uuid++} cols={[{x:0,width:5}]}>
                                            <Cell id={uuid++}>
                                                <Paragraph id={nextParagraphId}>
                                                    <Text id={"1"}>text</Text>
                                                </Paragraph>
                                            </Cell>
                                        </Row>
                                    </Table>
                                    <Paragraph id={uuid++}>
                                        <Text id={"3"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(doc.get("2").nextCursorable("2",1)).toMatchObject({id:"1",at:0})
            })
            it("Table->Paragraph",()=>{
                const doc=render(
                    <Fragment>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={"2"}>
                                        <Text id={"0"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                        <Paragraph id={nextParagraphId}>
                            <Text id={"1"}>text</Text>
                        </Paragraph>
                    </Fragment>
                )
                expect(doc.get("2").nextCursorable("2",1)).toMatchObject({id:"1",at:0})
            })

            it("Cell->Cell",()=>{
                const doc=render(
                    <Table id={uuid++} width={10}>
                        <Row id={uuid++} cols={[{x:0,width:5},{x:5,width:5}]}>
                            <Cell id={uuid++}>
                                <Paragraph id="-0">
                                    <Text id={"0"}>text</Text>
                                </Paragraph>
                            </Cell>
                            <Cell id={uuid++}>
                                <Paragraph id={nextParagraphId}>
                                    <Text id={"1"}>text</Text>
                                </Paragraph>
                            </Cell>
                        </Row>
                    </Table>
                )
                expect(doc.get("-0").nextCursorable("-0",1)).toMatchObject({id:"1",at:0})
                expect(doc.get("0").nextCursorable("0",4)).toMatchObject({id:"1",at:0})
            })

            it("Row->Row",()=>{
                const doc=render(
                    <Fragment>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={"-0"}>
                                        <Text id={"0"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={nextParagraphId}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(doc.get("-0").nextCursorable("-0",1)).toMatchObject({id:"1",at:0})
            })

            it("table->table",()=>{
                const doc=render(
                    <Fragment>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={"-0"}>
                                        <Text id={"0"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={nextParagraphId}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(doc.get("-0").nextCursorable("-0",1)).toMatchObject({id:"1",at:0})
            })
        })
    })

    xdescribe("prev", ()=>{
        it("text",()=>{
            const p=render(<Paragraph id={"-1"}><Text id={"0"}>text</Text></Paragraph>).get("-1")
            expect(p.prevCursorable()).toEqual({id:"-1",at:1})
        })

        it("image",()=>{
            const p=render(<Paragraph id={"-1"}><Image id={"0"}/></Paragraph>).get("-1")
            expect(p.prevCursorable()).toEqual({id:"-1",at:1})
        })

        it("t|ext",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Text id={"0"}>text</Text></Paragraph>)
                .get("0")
                .prevCursorable("0",1)
            expect(p).toEqual({id:"0",at:0})
        })

        it("text|Image",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Text id={"0"}>text</Text><Image id="-1"/></Paragraph>)
                .get("-1")
                .prevCursorable("-1",0)
            expect(p).toEqual({id:"0",at:3})
        })

        it("image|Text",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Image id="-1"/><Text id={"0"}>text</Text></Paragraph>)
                .get("0")
                .prevCursorable("0",0)
            expect(p).toEqual({id:"-1",at:0})
        })

        it("image|Image",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Image id="-1"/><Image id="-2"/></Paragraph>)
                .get("-2")
                .prevCursorable("-2",0)
            expect(p).toEqual({id:"-1",at:0})
        })

        it("text<container/>|Image",()=>{
            const p=render(<Paragraph id={`${++uuid}`}><Text id={"0"}>text</Text><Container id="-2"/><Image id="-1"/></Paragraph>)
                .get("-1")
                .prevCursorable("-1",0)
            expect(p).toEqual({id:"0",at:3})
        })

        it("text<container/><container/>|Image",()=>{
            const p=render(
                        <Paragraph id={`${++uuid}`}>
                          <Text id={"0"}>text</Text>
                          <Container id="-2"/>
                          <Container id="-3"/>
                          <Image id="-1"/>
                        </Paragraph>
                    )
                .get("-1")
                .prevCursorable("-1",0)
            expect(p).toEqual({id:"0",at:3})
        })

        it("text<container><container/></container>|Image",()=>{
            const p=render(
                <Paragraph id={`${++uuid}`}>
                      <Text id={"0"}>text</Text>
                      <Container id="-2">
                        <Container id="-3"/>
                      </Container>
                      <Image id="-1"/>
                </Paragraph>
                )
                .get("-1")
                .prevCursorable("-1",0)
            expect(p).toEqual({id:"0",at:3})
        })


        it("<paragraph>image|</paragraph>",()=>{
            const p=render(<Paragraph id={"1"}><Image id={"0"}/></Paragraph>)
                .get("1")
                .prevCursorable("1",1)
            expect(p).toEqual({id:"0",at:0})
        })

        it("<paragraph>imageText|</paragraph>",()=>{
            const p=render(<Paragraph id={"1"}><Image id={"0"}/><Text id={"2"}>text</Text></Paragraph>)
                .get("1")
                .prevCursorable("1",1)
            expect(p).toEqual({id:"2",at:3})
        })

        it("<paragraph>|text</paragraph>",()=>{
            const doc=render(
                <Container id={`${++uuid}`}>
                    <Paragraph id={"-1"}><Text id={"-1"}>text</Text></Paragraph>
                    <Paragraph id={"-2"}><Text id={"-3"}>text</Text></Paragraph>
                </Container>
            )
            mockQuery("backwardFirst", "-1")
            expect(doc.get("-3").prevCursorable("-3",0)).toMatchObject({id:"-1",at:1})
        })

        it("text<AnchorImage/>|text",()=>{
            const p=render(
                    <Paragraph id={uuid++}>
                        <Text id={"0"}>text</Text>
                        <Anchor id={"2"}
                            wrap={{mode:"Square"}}
                            x={{base:"page",offset:0}} y={{base:"page",offset:0}}>
                            <Image id={"3"} {...{width:2,height:10}}/>
                        </Anchor>
                        <Text id={"1"}>text</Text>
                    </Paragraph>
                )
                .get("1")
                .prevCursorable("1",0)
            expect(p).toEqual({id:"0",at:3})
        })

        describe("empty paragraph",()=>{
            it("p<- empty p",()=>{
                const p=render(
                    <Container id="0">
                        <Paragraph id={"1"}>
                            <Text id={"2"}></Text>
                        </Paragraph>
                        <Paragraph id={"3"}>
                            <Text id={"4"}></Text>
                        </Paragraph>
                    </Container>
                )
                mockQuery("backwardFirst","1")
                expect(p.get("3").prevCursorable("3",0)).toEqual({id:"1",at:1})
                expect(p.get("3").prevCursorable("3",1)).toEqual({id:"1",at:1})
                expect(p.get("4").prevCursorable("4",0)).toEqual({id:"1",at:1})
            })
        })

        describe("frame",()=>{
            it("t|ext",()=>{
                const p=render(
                    <Frame id={`${++uuid}`}  {...{width:100,height:200, x:10, y:20}}>
                        <Paragraph id={`${++uuid}`}>
                            <Text id={"0"}>text</Text>
                        </Paragraph>
                    </Frame>)
                    .get("0")
                    .prevCursorable("0",1)
                expect(p).toEqual({id:"0",at:0})
            })
        })

        describe("table",()=>{
            const prevParagraphId="-10xc"
            beforeEach(()=>{
                Paragraph.prototype.query=jest.fn(()=>{
                    return {
                        backwardFirst(){
                            return {
                                attr(){
                                    return prevParagraphId
                                }
                            }
                        }
                    }
                })
            })

            it("paragraph<=Table",()=>{
                const doc=render(
                    <Fragment>
                        <Paragraph id={prevParagraphId}>
                            <Text id={"0"}>text</Text>
                        </Paragraph>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={uuid++}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(doc.get("1").prevCursorable("1",0)).toMatchObject({id:prevParagraphId,at:1})
            })

            it("paragraph<=nested Table",()=>{
                const doc=render(
                    <Fragment>
                        <Paragraph id={prevParagraphId}>
                            <Text id={"0"}>text</Text>
                        </Paragraph>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Table id={uuid++} width={10}>
                                        <Row id={uuid++} cols={[{x:0,width:5}]}>
                                            <Cell id={uuid++}>
                                                <Paragraph id={uuid++}>
                                                    <Text id={"1"}>text</Text>
                                                </Paragraph>
                                            </Cell>
                                        </Row>
                                    </Table>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(doc.get("1").prevCursorable("1",0)).toMatchObject({id:prevParagraphId,at:1})
            })
            it("Table<-Paragraph",()=>{
                const doc=render(
                    <Fragment>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={prevParagraphId}>
                                        <Text id={"0"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                        <Paragraph id={uuid++}>
                            <Text id={"1"}>text</Text>
                        </Paragraph>
                    </Fragment>
                )
                expect(doc.get("1").prevCursorable("1",0)).toMatchObject({id:prevParagraphId,at:1})
            })

            it("Cell<-Cell",()=>{
                const doc=render(
                    <Table id={uuid++} width={10}>
                        <Row id={uuid++} cols={[{x:0,width:5},{x:5,width:5}]}>
                            <Cell id={uuid++}>
                                <Paragraph id={prevParagraphId}>
                                    <Text id={"0"}>text</Text>
                                </Paragraph>
                            </Cell>
                            <Cell id={uuid++}>
                                <Paragraph id={"-1"}>
                                    <Container id="-2">
                                        <Text id={"1"}>text</Text>
                                    </Container>
                                </Paragraph>
                            </Cell>
                        </Row>
                    </Table>
                )
                expect(doc.get("1").prevCursorable("1",0))
                    .toMatchObject({id:prevParagraphId,at:1})
                expect(doc.get("-1").prevCursorable("-1",0))
                    .toMatchObject({id:prevParagraphId,at:1})
                expect(doc.get("-2").prevCursorable("-2",0))
                    .toMatchObject({id:prevParagraphId,at:1})
            })
            it("Row<-Row",()=>{
                const doc=render(
                    <Fragment>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={prevParagraphId}>
                                        <Text id={"0"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={uuid++}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(doc.get("1").prevCursorable("1",0)).toMatchObject({id:prevParagraphId,at:1})
            })

            it("table->table",()=>{
                const doc=render(
                    <Fragment>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={prevParagraphId}>
                                        <Text id={"0"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++}>
                                    <Paragraph id={uuid++}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(doc.get("1").prevCursorable("1",0)).toMatchObject({id:prevParagraphId,at:1})
            })
        })
    })
})
