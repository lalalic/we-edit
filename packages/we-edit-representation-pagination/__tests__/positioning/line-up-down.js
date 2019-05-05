import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import define from "./index"

define("line", ({dom:{Document,Paragraph, Text, Image, Table, Row, Cell,Container, Frame,Anchor,Shape},
    TESTING, render, mockQuery,size,uuid,Positioning,Responsible})=>{

    const test=(a,state={page:{width:5}})=>{
        Positioning.prototype.pageXY=jest.fn(()=>({x:0,y:0}))
        Positioning.prototype.asViewportPoint=jest.fn(p=>p)

        const {renderer}=render(a,state)
        const doc=renderer.root.findByType(Document).instance
        const pages=doc.computed.composed
        const responsible=renderer.root.findByType(Responsible).instance
        return {
            pages,
            get lines(){
                if(TESTING=="in shape" || TESTING=="in table"){
                    return doc.getComposer("container").current.lines
                }
                return pages[0].lines
            },
            position(){
                return responsible.positioning.position(...arguments)
            },
            nextLine(){
                return responsible.positioning.nextLine(...arguments)
            },
            prevLine(){
                return responsible.positioning.prevLine(...arguments)
            }
        }
    }

    describe("down",()=>{
        it("Text->Text",()=>{
            const p=test(
                <Paragraph id={"3"}>
                    <Text id="0">text </Text>
                    <Text id="1">hello</Text>
                </Paragraph>
            )
            expect(p.lines.length).toBe(2)
            debugger
            expect(p.nextLine("0",0)).toMatchObject({id:"1",at:0})
            expect(p.nextLine("0",1)).toMatchObject({id:"1",at:1})
            expect(p.nextLine("0",4)).toMatchObject({id:"1",at:4})
        })

        it("Text-><page>Text</page>",()=>{
            if(!"in shape,in table".includes(TESTING)){
                const p=test(
                    <Paragraph id={uuid++}>
                        <Text id="0">text </Text>
                        <Text id="1">hello</Text>
                    </Paragraph>,
                    {page:{width:5,height:10}}
                )
                expect(p.pages.length).toBe(2)
                expect(p.lines.length).toBe(1)
                expect(p.nextLine("0",0)).toMatchObject({id:"1",at:0})
                expect(p.nextLine("0",1)).toMatchObject({id:"1",at:1})
                expect(p.nextLine("0",4)).toMatchObject({id:"1",at:4})
            }
        })

        it("Text->Image(width=2)->Text",()=>{
            const p=test(
                <Paragraph id={uuid++}>
                    <Text id="0">text </Text>
                    <Image id="2" {...{width:2,height:2}}/>
                    <Text id="1">hello</Text>
                </Paragraph>
            )
            expect(p.lines.length).toBe(3)
            expect(p.nextLine("0",0)).toMatchObject({id:"2"})
            expect(p.nextLine("0",1)).toMatchObject({id:"2"})
            expect(p.nextLine("0",2)).toMatchObject({id:"2"})

            expect(p.nextLine("2",0)).toMatchObject({id:"1",at:0})
            expect(p.nextLine("2",1)).toMatchObject({id:"1",at:2})
        })

        it("Text->Image(width=7)->Text",()=>{
            const p=test(
                <Paragraph id={uuid++}>
                    <Text id="0">text </Text>
                    <Image id="2" {...{width:7,height:2}}/>
                    <Text id="1">hello</Text>
                </Paragraph>
            )
            expect(p.lines.length).toBe(3)
            expect(p.nextLine("0",0)).toMatchObject({id:"2"})
            expect(p.nextLine("0",1)).toMatchObject({id:"2"})
            expect(p.nextLine("0",2)).toMatchObject({id:"2"})

            expect(p.nextLine("2",0)).toMatchObject({id:"1",at:0})
            expect(p.nextLine("2",1)).toMatchObject({id:"1",at:5})
        })

        describe("table",()=>{
            const zero={sz:0}
            const border={left:zero,right:zero,top:zero,bottom:zero}
            it("paragraph=>table",()=>{
                const p=test(
                    <Fragment>
                        <Paragraph id="2">
                            <Text id={"0"}>text</Text>
                        </Paragraph>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++} border={border}>
                                    <Paragraph id="3">
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(p.nextLine("0",0)).toMatchObject({id:"1",at:0})
                expect(p.nextLine("0",1)).toMatchObject({id:"1",at:1})
                expect(p.nextLine("0",2)).toMatchObject({id:"1",at:2})
                expect(p.nextLine("0",3)).toMatchObject({id:"1",at:3})
            })

            it("paragraph=>table(3 cells)",()=>{
                if(TESTING=="in table"){
                    return
                }
                
                const p=test(
                    <Fragment>
                        <Paragraph id={uuid++}>
                            <Text id={"0"}>texttexttext</Text>
                        </Paragraph>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:4},{x:4,width:4},{x:8,width:4}]}>
                                <Cell id={uuid++} border={border}>
                                    <Paragraph id={uuid++}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                                <Cell id={uuid++} border={border}>
                                    <Paragraph id={uuid++}>
                                        <Text id={"2"}>text</Text>
                                    </Paragraph>
                                </Cell>
                                <Cell id={uuid++} border={border}>
                                    <Paragraph id={uuid++}>
                                        <Text id={"3"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(p.lines.length).toBe(2)
                expect(p.nextLine("0",1)).toMatchObject({id:"1",at:1})
                expect(p.nextLine("0",4+1)).toMatchObject({id:"2",at:1})
                expect(p.nextLine("0",4+4+1)).toMatchObject({id:"3",at:1})
            })

            it("row cell-> row cell",()=>{
                const p=test(
                    <Fragment>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:4},{x:4,width:4}]}>
                                <Cell id={"1.1.1"} border={border}>
                                    <Paragraph id={"1.1"}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                                <Cell id={"2.1.1"} border={border}>
                                    <Paragraph id={"2.1"}>
                                        <Text id={"2"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>

                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:4},{x:4,width:4}]}>
                                <Cell id={"3.1.1"} border={border}>
                                    <Paragraph id={"3.1"}>
                                        <Text id={"3"}>text</Text>
                                    </Paragraph>
                                </Cell>
                                <Cell id={"4.1.1"} border={border}>
                                    <Paragraph id={"4.1"}>
                                        <Text id={"4"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(p.nextLine("2",1)).toMatchObject({id:"4",at:1})
                expect(p.nextLine("1",1)).toMatchObject({id:"3",at:1})
            })
        })
    })

    describe("up",()=>{
        it("Text<-Text",()=>{
            const p=test(
                <Paragraph id={uuid++}>
                    <Text id="0">text </Text>
                    <Text id="1">hello</Text>
                </Paragraph>
            )
            expect(p.lines.length).toBe(2)
            expect(p.prevLine("1",0)).toMatchObject({id:"0",at:0})
            expect(p.prevLine("1",1)).toMatchObject({id:"0",at:1})
            expect(p.prevLine("1",4)).toMatchObject({id:"0",at:4})
        })

        it("Text<-<page>Text</page>",()=>{
            if(!"in table,in shape".includes(TESTING)){
                const p=test(
                    <Paragraph id={uuid++}>
                        <Text id="0">text </Text>
                        <Text id="1">hello</Text>
                    </Paragraph>,
                    {page:{width:5,height:10}}
                )
                expect(p.pages.length).toBe(2)
                expect(p.prevLine("1",0)).toMatchObject({id:"0",at:0})
                expect(p.prevLine("1",1)).toMatchObject({id:"0",at:1})
                expect(p.prevLine("1",4)).toMatchObject({id:"0",at:4})
            }
        })

        it("Text<-Image(width=7)<-Text",()=>{
            const p=test(
                <Paragraph id={uuid++}>
                    <Text id="0">text </Text>
                    <Image id="2" {...{width:7,height:2}}/>
                    <Text id="1">hello</Text>
                </Paragraph>
            )
            expect(p.lines.length).toBe(3)
            expect(p.prevLine("1",0)).toMatchObject({id:"2"})
            expect(p.prevLine("1",1)).toMatchObject({id:"2"})
            expect(p.prevLine("1",5)).toMatchObject({id:"2"})

            expect(p.prevLine("2",0)).toMatchObject({id:"0",at:0})
            expect(p.prevLine("2",1)).toMatchObject({id:"0",at:5})


        })

        describe("table",()=>{
            const zero={sz:0}
            const border={left:zero,right:zero,top:zero,bottom:zero}
            it("paragraph=>table",()=>{
                const p=test(
                    <Fragment>
                        <Paragraph id={uuid++}>
                            <Text id={"0"}>text</Text>
                        </Paragraph>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:5}]}>
                                <Cell id={uuid++} border={border}>
                                    <Paragraph id={uuid++}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                new Array(4).fill(0).forEach((a,i)=>expect(p.prevLine("1",i)).toMatchObject({id:"0",at:i}))
            })

            it("row cell<- row cell",()=>{
                const p=test(
                    <Fragment>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:4},{x:4,width:4}]}>
                                <Cell id={"1.1.1"} border={border}>
                                    <Paragraph id={"1.1"}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                                <Cell id={"2.1.1"} border={border}>
                                    <Paragraph id={"2.1"}>
                                        <Text id={"2"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>

                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:4},{x:4,width:4}]}>
                                <Cell id={"3.1.1"} border={border}>
                                    <Paragraph id={"3.1"}>
                                        <Text id={"3"}>text</Text>
                                    </Paragraph>
                                </Cell>
                                <Cell id={"4.1.1"} border={border}>
                                    <Paragraph id={"4.1"}>
                                        <Text id={"4"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(p.prevLine("4",1)).toMatchObject({id:"2",at:1})
                expect(p.prevLine("3",1)).toMatchObject({id:"1",at:1})
            })

            it("paragraph<=table(3 cells)",()=>{
                if(TESTING=="in table"){
                    return
                }
                const p=test(
                    <Fragment>
                        <Paragraph id={uuid++}>
                            <Text id={"0"}>texttexttexttext</Text>
                        </Paragraph>
                        <Table id={uuid++} width={10}>
                            <Row id={uuid++} cols={[{x:0,width:4},{x:4,width:8},{x:8,width:12}]}>
                                <Cell id={uuid++} border={border}>
                                    <Paragraph id={uuid++}>
                                        <Text id={"1"}>text</Text>
                                    </Paragraph>
                                </Cell>
                                <Cell id={uuid++} border={border}>
                                    <Paragraph id={uuid++}>
                                        <Text id={"2"}>text</Text>
                                    </Paragraph>
                                </Cell>
                                <Cell id={uuid++} border={border}>
                                    <Paragraph id={uuid++}>
                                        <Text id={"3"}>text</Text>
                                    </Paragraph>
                                </Cell>
                            </Row>
                        </Table>
                    </Fragment>
                )
                expect(p.prevLine("1",1)).toMatchObject({id:"0",at:1})
                expect(p.prevLine("2",1)).toMatchObject({id:"0",at:4+1})
                expect(p.prevLine("3",1)).toMatchObject({id:"0",at:4+4+1})
            })
        })
    })
})
