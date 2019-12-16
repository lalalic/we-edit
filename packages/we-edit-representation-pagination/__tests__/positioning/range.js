import React,{Fragment} from "react"

import define from "./index"

define("range", ({dom:{Document,Paragraph, Text, Image, Table, Row, Cell,Container, Frame,Anchor,Shape},
    TESTING, render, mockQuery,size,uuid,Positioning,Responsible})=>{

    const test=(content,pageXY={x:0,y:0})=>{
        const {responsible}=render(content)
        responsible.positioning.pageXY=jest.fn(()=>pageXY)
        return {
            responsible,
            getRangeRects(){
                return responsible.positioning.getRangeRects(...arguments)
            }
        }
    }

    it("text",()=>{
        const doc=test(<Paragraph id={"1"}><Text id={"0"}>text</Text></Paragraph>)
        
        new Array(5).fill(0).forEach((a,i)=>
            expect(doc.getRangeRects({id:"0",at:0},{id:"0",at:i})).toMatchObject(i==0 ? [] :[{left:0,top:0,right:i,bottom:10}]))

            new Array(4).fill(0).forEach((a,i)=>
                expect(doc.getRangeRects({id:"0",at:1},{id:"0",at:i+1})).toMatchObject(i==0 ? [] : [{left:1,top:0,right:i+1,bottom:10}]))
    })

    it("inline container",()=>{
        const doc=test(
            <Paragraph id={"1"}>
                <Container id="inline">
                    <Text id={"0"}>text</Text>
                </Container>
                <Text id={"2"}>text</Text>
            </Paragraph>)
        expect(doc.getRangeRects({id:"inline",at:0},{id:"inline",at:1})).toMatchObject([{left:0,top:0,right:4,bottom:10}])
    })

    it("text in second page",()=>{
        const doc=test(<Paragraph id={"1"}><Text id={"0"}>text</Text></Paragraph>,{x:10,y:20})
        new Array(5).fill(0).forEach((a,i)=>
            expect(doc.getRangeRects({id:"0",at:0},{id:"0",at:i})).toMatchObject(i==0 ? [] : [{left:10+0,top:20+0,right:10+i,bottom:20+10}]))

            new Array(4).fill(0).forEach((a,i)=>
                expect(doc.getRangeRects({id:"0",at:1},{id:"0",at:i+1})).toMatchObject(i==0 ? []: [{left:10+1,top:20+0,right:10+i+1,bottom:20+10}]))

    })

    it("no error",()=>{
        const doc=test(<Paragraph id={"1"}><Text id={"0"}>text</Text></Paragraph>)
        console.error=jest.fn()
        expect(doc.getRangeRects({id:"0",at:0},{id:"0",at:-1})).toMatchObject([])
        expect(doc.getRangeRects({id:"0",at:-3},{id:"0",at:0})).toMatchObject([])
        expect(doc.getRangeRects({id:"0",at:0},{id:"0",at:10})).toMatchObject([])
        expect(doc.getRangeRects({id:"notexist",at:-3},{id:"0",at:0})).toMatchObject([])
    })

    it("paragraph",()=>{
        const doc=test(<Paragraph id={"1"}><Text id={"0"}>text</Text></Paragraph>)
        expect(doc.getRangeRects({id:"1",at:0},{id:"1",at:1})).toMatchObject([{left:0,top:0,right:4,bottom:10}])
        expect(doc.getRangeRects({id:"0",at:2},{id:"1",at:1})).toMatchObject([{left:2,top:0,right:4,bottom:10}])
    })

    it("paragraph with indent",()=>{
        const doc=test(<Paragraph id={"1"} indent={{left:2}}><Text id={"0"}>text</Text></Paragraph>)
        expect(doc.getRangeRects({id:"1",at:0},{id:"1",at:1})).toMatchObject([{left:0+2,top:0,right:4+2,bottom:10}])
        expect(doc.getRangeRects({id:"0",at:2},{id:"1",at:1})).toMatchObject([{left:2+2,top:0,right:4+2,bottom:10}])
    })

    it("paragraph with indent&firstLine",()=>{
        const doc=test(<Paragraph id={"1"} indent={{left:2, firstLine:2}}><Text id={"0"}>text</Text></Paragraph>)
        expect(doc.getRangeRects({id:"1",at:0},{id:"1",at:1})).toMatchObject([{left:0+2+2,top:0,right:4+2+2,bottom:10}])
        expect(doc.getRangeRects({id:"0",at:2},{id:"1",at:1})).toMatchObject([{left:2+2+2,top:0,right:4+2+2,bottom:10}])
    })

    it("paragraph with indent in second page",()=>{
        const doc=test(<Paragraph id={"1"} indent={{left:2}}><Text id={"0"}>text</Text></Paragraph>, {x:10,y:20})
        expect(doc.getRangeRects({id:"1",at:0},{id:"1",at:1})).toMatchObject([{left:10+0+2,top:20+0,right:10+4+2,bottom:20+10}])
        expect(doc.getRangeRects({id:"0",at:2},{id:"1",at:1})).toMatchObject([{left:10+2+2,top:20+0,right:10+4+2,bottom:20+10}])
    })

    it("paragraph with indent, second line should always starts from indent",()=>{
        const doc=test(
            <Paragraph id={`${++uuid}`} indent={{left:9}}>
                <Text id="0">hello world cool</Text>
            </Paragraph>
        ,{x:0,y:0})
        const rects=doc.getRangeRects({id:"0",at:1},{id:"0",at:13})
        expect(rects.length).toBe(2)
        //expect(rects[0]).toMatchObject({left:9+1,right:9+11})
        expect(rects[1]).toMatchObject({left:9,right:9+1})
    })

    it("paragraph with numbering, first line should not start from numbering label",()=>{
        const doc=test(
            <Paragraph id={`${++uuid}`}
                numbering={{
                    style:{fonts:"arial",size:10},
                    label:'*'
                }}
                indent={{left:9, firstLine:-5}}>
                <Text id="0">hello world cool</Text>
            </Paragraph>
        ,{x:0,y:0})
        const rects=doc.getRangeRects({id:"0",at:1},{id:"0",at:13})
        expect(rects.length).toBe(2)
        expect(rects[0]).toMatchObject({left:9+1,right:9+12})
        expect(rects[1]).toMatchObject({left:9,right:9+1})
    })

    it("paragraph in container",()=>{
        const doc=test(
            <Container id="2">
                <Paragraph id={"1"}>
                    <Text id={"0"}>text</Text>
                </Paragraph>
            </Container>
        )
        doc.responsible.positioning.getContent=jest.fn(id=>({
            findFirst:type=>({attr:()=>type=="paragraph" && id=="2" ? "1" : null}),
            findLast:type=>({attr:()=>type=="paragraph" && id=="2" ? "1" : null}),
        }))
        expect(doc.getRangeRects({id:"1",at:0},{id:"1",at:1})).toMatchObject([{left:0,top:0,right:4,bottom:10}])
        expect(doc.getRangeRects({id:"2",at:0},{id:"2",at:1})).toMatchObject([{left:0,top:0,bottom:10}])
    })

    describe("table",()=>{
        var doc
        const zero={sz:0}
        const border={left:zero,right:zero,top:zero,bottom:zero}
        beforeEach(()=>{
            doc=test(
                <Fragment>
                    <Paragraph id={`${++uuid}p0`}><Text id={`${++uuid}t0`}>hello</Text></Paragraph>
                    <Table id="table" width={100}>
                        <Row id={`row`} cols={[{x:0,width:40},{x:60,width:40}]}>
                            <Cell  id={`${++uuid}c`} border={border}>
                                <Paragraph id={`pfirst`}>
                                    <Text id={`${++uuid}t`}>text</Text>
                                </Paragraph>
                            </Cell>
                            <Cell  id={`cell`} border={border}>
                                <Paragraph id={`${++uuid}p`}>
                                    <Text id={`${++uuid}t`}>text</Text>
                                </Paragraph>
                            </Cell>
                        </Row>
                        <Row id={`row1`} cols={[{x:0,width:40},{x:60,width:40}]}>
                            <Cell  id={`${++uuid}c`} border={border}>
                                <Paragraph id={`${++uuid}p`}>
                                    <Text id={`${++uuid}t`}>text</Text>
                                </Paragraph>
                            </Cell>
                            <Cell  id={`${++uuid}c`} border={border}>
                                <Paragraph id={`plast`}>
                                    <Text id={`${++uuid}t`}>text</Text>
                                </Paragraph>
                            </Cell>
                        </Row>
                    </Table>
                    <Paragraph id={`${++uuid}p0`}><Text id={`${++uuid}t0`}>hello</Text></Paragraph>
                </Fragment>
            )
            doc.responsible.positioning.getContent=jest.fn(id=>({
                findFirst:type=>({attr:()=>type=="paragraph" && "pfirst"}),
                findLast:type=>({attr:()=>type=="paragraph" && "plast"}),
            }))
            
        })

        it("table",()=>{ 
            expect(doc.getRangeRects({id:"table",at:0},{id:"table",at:1}))
                .toMatchObject([
                    {left:0,top:10,right:100,bottom:20},
                    {left:0,top:20,right:100,bottom:30},
                ])
        })

        it("cell", ()=>{
            expect(doc.getRangeRects({id:"cell",at:0},{id:"cell",at:1}))
                .toMatchObject( [{left:60,top:10,right:100,bottom:20}])
        })
    
        it("row ",()=>{
            expect(doc.getRangeRects({id:"row",at:0},{id:"row",at:1}))
                .toMatchObject([ {left:0,top:10,right:100,bottom:20}])
        })    
    })
})
