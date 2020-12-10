import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import define from "./index"

define("position", ({dom:{Document,Paragraph, Text, Image, Table, Row, Cell,Container, Frame,Anchor,Shape},
    TESTING, render, mockQuery,size,uuid,Positioning,Responsible})=>{

    const test=(a,b,pageXY={x:0,y:0})=>{
        const {renderer}=render(a,b)
        const responsible=renderer.root.findByType(Responsible).instance
        responsible.positioning.pageXY=jest.fn(()=>pageXY)
        return {
            position(){
                return responsible.positioning.position(...arguments)
            },
            extendWord(){
                return responsible.positioning.extendWord(...arguments)
            }
        }
    }

    describe("in page paragraph",()=>{
        it("t|ext at=0,1,4",()=>{
            const MarginLeft=10
            const p=test(
                <Paragraph id={`${++uuid}`}>
                    <Text id="0">text</Text>
                </Paragraph>,
                {page:{margin:{left:MarginLeft}}}
            )
            expect(p.position({id:"0",at:0})).toMatchObject({x:MarginLeft+0,y:0})
            expect(p.position({id:"0",at:1})).toMatchObject({x:MarginLeft+1,y:0})
            expect(p.position({id:"0",at:4})).toMatchObject({x:MarginLeft+4,y:0})
        })

        it("t|ext at=0,1,4 in second page",()=>{
            const p=test(<Paragraph id={`${++uuid}`}><Text id="0">text</Text></Paragraph>,undefined,{x:30,y:10})
            expect(p.position({id:"0",at:0})).toMatchObject({x:30+0,y:10})
            expect(p.position({id:"0",at:1})).toMatchObject({x:30+1,y:10})
            expect(p.position({id:"0",at:4})).toMatchObject({x:30+4,y:10})
        })

        it("hello</Text>T|ext at=0,1,4",()=>{
            const p=test(<Paragraph id={`${`${++uuid}`}`}><Text id="1">hello</Text><Text id="0">text</Text></Paragraph>)
            expect(p.position({id:"0",at:0})).toMatchObject({x:5+0,y:0})
            expect(p.position({id:"0",at:1})).toMatchObject({x:5+1,y:0})
            expect(p.position({id:"0",at:4})).toMatchObject({x:5+4,y:0})
        })

        it("Text|image(lower than text)Text",()=>{
            const p=test(<Paragraph id={`${++uuid}`}><Text id="1">text</Text><Image id="0" {...{width:2,height:2}}/><Text id="2">text</Text></Paragraph>)
            expect(p.position({id:"0",at:0})).toMatchObject({x:4+0,y:7})
            expect(p.position({id:"0",at:1})).toMatchObject({x:4+2,y:7})
        })

        it("Text|image(heigher than text)Text",()=>{
            const p=test(<Paragraph id={`${++uuid}`}><Text id="1">text</Text><Image id="0" {...{width:2,height:12}}/><Text id="2">text</Text></Paragraph>)
            expect(p.position({id:"0",at:0})).toMatchObject({x:4+0,y:0})
            expect(p.position({id:"0",at:1})).toMatchObject({x:4+2,y:0})
        })

        it("image",()=>{
            const p=test(<Paragraph id={`${++uuid}`}><Image id="0" {...{width:2,height:20}}/></Paragraph>)
            expect(p.position({id:"0",at:0})).toMatchObject({x:0,y:0})
            expect(p.position({id:"0",at:1})).toMatchObject({x:2,y:0})
        })

        it("paragraph start/end",()=>{
            const p=test(<Paragraph id="0"><Text id="1">text</Text></Paragraph>)
            expect(p.position({id:"0",at:0})).toMatchObject({x:0,y:0})
            expect(p.position({id:"0",at:1})).toMatchObject({x:4,y:0})
        })

        it("empty paragraph start/end",()=>{
            const p=test(<Paragraph id="0"></Paragraph>)
            expect(p.position({id:"0",at:0})).toMatchObject({x:0,y:0})
            expect(p.position({id:"0",at:1})).toMatchObject({x:0,y:0})
        })

        it("empty paragraph start/end",()=>{
            const p=test(<Paragraph id="0"><Container id="2"><Text id="1"></Text></Container></Paragraph>)
            expect(p.position({id:"0",at:0})).toMatchObject({x:0,y:0})
            expect(p.position({id:"0",at:1})).toMatchObject({x:0,y:0})
            expect(p.position({id:"1",at:0})).toMatchObject({x:0,y:0})
        })

        it("paragraph with indent",()=>{
            expect(test(
                <Paragraph id={`${++uuid}`} indent={{left:1}}>
                    <Text id="0">hello world</Text>
                </Paragraph>
            ).position({id:"0",at:7})).toMatchObject({x:1+7,y:0})

            expect(test(
                <Paragraph id={"1"} indent={{left:5}}>
                    <Text id="0">hello world</Text>
                </Paragraph>
            ).position({id:"1",at:1})).toMatchObject({x:5+"hello world".length,y:0})

            expect(test(
                <Paragraph id={`${++uuid}`} indent={{right:5}}>
                    <Text id="0">hello world</Text>
                </Paragraph>,
                {page:{width:10}}
            ).position({id:"0",at:7})).toMatchObject({x:1,y:10})

            expect(test(
                <Paragraph id={`${++uuid}`} indent={{firstLine:3}}>
                    <Text id="0">hello world</Text>
                </Paragraph>,
                {page:{width:10}}
            ).position({id:"0",at:1})).toMatchObject({x:1+3,y:0})
        })

        it("paragraph with numbering",()=>{
            expect(test(
                <Paragraph id={`${++uuid}`}
                    numbering={{
						style:{fonts:"arial",size:10},
                        label:'*'
                    }}
                    indent={{left:1,}}>
                    <Text id="0">hello world</Text>
                </Paragraph>
            ).position({id:"0",at:7})).toMatchObject({x:1+7,y:0})
        })

        it("cursor at beginning of empty numbering paragraph should behind numbering",()=>{
            const doc=test(
                <Paragraph id={`paragraph`}
                    numbering={{
						style:{fonts:"arial",size:10},
                        label:'*'
                    }}
                    indent={{left:2,hanging:1,firstLine:-1}}/>
            )
            expect(doc.position({id:"paragraph",at:0})).toMatchObject({x:2,y:0})
        })

        xit("line start/end",()=>{

        })

        it("text is empty",()=>{
            const p=test(
                <Paragraph id={`${++uuid}`}>
                    <Text id="1">hello</Text>
                    <Text id="2"></Text>
                    <Text id="0">text</Text>
                </Paragraph>)
            expect(p.position({id:"1",at:1})).toMatchObject({x:1,y:0,height:10})
            expect(p.position({id:"2",at:0})).toMatchObject({x:5+0,y:0,height:10})
        })

        it("empty container",()=>{
            const p=test(
                <Paragraph id={`${++uuid}`}>
                    <Text id="1">hello</Text>
                    <Container id="2">
                        <Text id="3"></Text>
                    </Container>
                    <Text id="0">text</Text>
                </Paragraph>)
            expect(p.position({id:"1",at:1})).toMatchObject({x:1,y:0,height:10})
            expect(p.position({id:"3",at:0})).toMatchObject({x:5+0,y:0,height:10})
            expect(p.position({id:"2",at:0})).toMatchObject({x:5+0,y:0})
        })
    })

    it("shape",()=>{
        const doc=test(
                <Paragraph id={"1"}>
                    <Shape id={"0"} {...{width:3,height:5, outline:{width:4}}}/>
                    <Text id={"2"}>text</Text>
                </Paragraph>)
        const y=0
        expect(doc.position({id:"0",at:0})).toMatchObject({x:0,y,height:10})
        expect(doc.position({id:"0",at:1})).toMatchObject({x:3+4,y,height:10})
        expect(doc.position({id:"2",at:0})).toMatchObject({x:3+4,y,height:10})
    })

    describe("in frame",()=>{
        it("without anchored",()=>{
            const p=test(
                <Frame id={`${++uuid}`}  {...{width:100,height:200}}>
                    <Paragraph id={`${++uuid}`}>
                        <Text id="0">text</Text>
                    </Paragraph>
                </Frame>,undefined,{x:30,y:10})
            expect(p.position({id:"0",at:0})).toMatchObject({x:30+0,y:10})
            expect(p.position({id:"0",at:1})).toMatchObject({x:30+1,y:10})
            expect(p.position({id:"0",at:4})).toMatchObject({x:30+4,y:10})
        })

        it("anchored",()=>{
            const offset={x:10,y:20}
            const p=test(
                <Frame id={`3`}  {...{width:100,height:200,...offset}}>
                    <Paragraph id={`1`}>
                        <Text id="0">text</Text>
                    </Paragraph>
                </Frame>,undefined,{x:30,y:10})
            expect(p.position({id:"0",at:0})).toMatchObject({x:offset.x+30+0,y:offset.y+10})
            expect(p.position({id:"0",at:1})).toMatchObject({x:offset.x+30+1,y:offset.y+10})
            expect(p.position({id:"0",at:4})).toMatchObject({x:offset.x+30+4,y:offset.y+10})
        })
    })

    describe("extend word",()=>{
        it("extend single word",()=>{
            expect(test(<Paragraph id={`${++uuid}`}><Text id="1">hello</Text></Paragraph>)
                    .extendWord("1",0)
                ).toMatchObject({start:{id:"1",at:0},end:{id:"1",at:5}})
        })

        it("extend two word",()=>{
            const p=test(
                <Paragraph id={`${++uuid}`}>
                    <Text id="1">hello world</Text>
                </Paragraph>
            )
            expect(p.extendWord("1",0)).toMatchObject({start:{id:"1",at:0},end:{id:"1",at:5}})
            expect(p.extendWord("1",7)).toMatchObject({start:{id:"1",at:6},end:{id:"1",at:11}})
        })

        it("extend two word",()=>{
            const p=test(
                <Paragraph id={`${++uuid}`}>
                    <Text id="1">hello wor</Text>
                    <Text id="2">ld good night</Text>
                    <Container id={`${++uuid}`}><Text id="3">hello wor</Text></Container>
                    <Container id={`${++uuid}`}><Text id="4">ld good night</Text></Container>
                </Paragraph>
            )
            expect(p.extendWord("1",7)).toMatchObject(p.extendWord("2",0))
            expect(p.extendWord("3",7)).toMatchObject(p.extendWord("4",0))
        })
    })

    describe("wrap", ()=>{
        it("TopAndBottom",()=>{
            const doc=test(
                    <Paragraph id={uuid++}>
                        <Text id={"0"}>text</Text>
                        <Anchor id={"2"}
                            wrap={{mode:"TopAndBottom"}}
                            x={{base:"page",offset:0}} y={{base:"page",offset:0}}>
                            <Image id={"3"} {...{width:2,height:10}}/>
                        </Anchor>
                        <Text id={"1"}>text</Text>
                    </Paragraph>
                )
            expect(doc.position({id:"0",at:1})).toMatchObject({x:1,y:10})
        })
    })
})
