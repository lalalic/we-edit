import React,{Fragment} from "react"
import TestRender from "react-test-renderer"

import {Viewers, Editors} from "../src"
import Responsible from "../src/composed/responsible"
import Positioning from "../src/composed/positioning"
import Locator from "../src/composed/locator"
import provider from "./context"
import ReactDOM from "react-dom"
ReactDOM.createPortal=jest.fn()

const {Document, Section, Container,Frame, Paragraph, Text, Image,Anchor, Table, Row, Cell}=Editors

describe("positioning",()=>{
    beforeAll(()=>{
		Paragraph.defaultProps.defaultStyle={
			fonts:"arial",
			size:12
		}
        Text.defaultProps=Object.assign(
            Text.defaultProps||{},
            {
                fonts:"arial",
                size:12
            }
        )

		Locator.prototype.shouldComponentUpdate=jest.fn(a=>true)
        Locator.prototype.render=jest.fn()
        Document.prototype.shouldContinueCompose=jest.fn(a=>true)
	})

    const Page=class extends Frame{
		render(){
			const {props:{i:key,width,height,margin}}=this
			return React.cloneElement(super.createComposed2Parent(),{key:`${++uuid}`,width,height,margin})
		}
	}

	const store=(state)=>({
            activeDocStore:{
				subscribe(){},
				dispatch(){},
				getState(){
					return {
						get(){
							return {
                        			equals({start,end}){
                        				return false
                        			},
                        			toJS(){
                        				return {start:{},end:{}}
                        			},
                        			hashCode(){
                        				return "1234"
                        			},
                                    ...state
                        		}
						}
					}
				}
			}
		})

	const StoreContext=provider(Document,store())
    const SectionContext=provider(Section,{ModelTypes:Editors})
	const TextContext=provider(Text,{
			Measure:class{
				height=10
				defaultStyle={height:10,descent:1}
				widthString(x,text){
					return x
				}

				stringWidth(text){
					return text.length
				}
			}
		})
	var uuid=10000
	const size={width:20,height:500}
	const pgGap=12

    const render=(content,{state,page={}}={})=>{
            const renderer=TestRender.create(
                <StoreContext context={store(state)}>
                    <TextContext>
                        <Document id="root" viewport={{width:500,height:500,node:{scrollTop:0}}}>
                            <SectionContext>
                                <Section id={`${++uuid}`} create={(a,b)=>new Page({...a,...size,...page},b)}>
                                {content}
                                </Section>
                            </SectionContext>
                        </Document>
                    </TextContext>
                </StoreContext>
            )

            const doc=renderer.root.findByType(Document).instance
            const responsible=renderer.root.findByType(Responsible).instance
            return {
                renderer,
                doc,
                responsible,
                get(id){
                    debugger
                    return doc.getComposer(id)
                }
            }
    }

    describe("Navigatable", ()=>{

		describe("cursor",()=>{

			describe("next cursorable", ()=>{
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
					const p=render(<Paragraph id={`${++uuid}`}><Text id={"0"}>text</Text><Image id="-1"/></Paragraph>)
						.get("0")
						.nextCursorable("0",3)
					expect(p).toEqual({id:"-1",at:0})
				})

                it("text|->Image",()=>{
					const p=render(<Paragraph id={`${++uuid}`}><Text id={"0"}>text</Text><Image id="-1"/></Paragraph>)
						.get("0")
						.nextCursorable("0",4)
					expect(p).toEqual({id:"-1",at:0})
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
					expect(p).toEqual({id:"1",at:1})
				})

				it("<paragraph>|image</paragraph>",()=>{
					const p=render(<Paragraph id={"1"}><Image id={"0"}/></Paragraph>)
						.get("0")
						.nextCursorable("0",0)
					expect(p).toEqual({id:"1",at:1})
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
				})

                it("tex|t<AnchorImage/>text",()=>{
                    const p=render(
                            <Paragraph id={uuid++}>
                                <Text id={"0"}>text</Text>
                                <Anchor id={"2"}
                                    wrap={{mode:"Square"}}
                                    x={{base:"page",offset:0}} y={{base:"page",offset:0}}>
                                    <Image id={"3"} size={{width:2,height:10}}/>
                                </Anchor>
                                <Text id={"1"}>text</Text>
                            </Paragraph>
                        )
                        .get("0")
                        .nextCursorable("0",3)
                    expect(p).toEqual({id:"1",at:0})
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

			describe("prev cursorable", ()=>{
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
                    Paragraph.prototype.query=jest.fn(()=>{
                        return {
                            backwardFirst(){
                                return {
                                    attr(){
                                        return "-1"
                                    }
                                }
                            }
                        }
                    })
                    expect(doc.get("-3").prevCursorable("-3",0)).toMatchObject({id:"-1",at:1})
                })

                it("text<AnchorImage/>|text",()=>{
                    const p=render(
                            <Paragraph id={uuid++}>
                                <Text id={"0"}>text</Text>
                                <Anchor id={"2"}
                                    wrap={{mode:"Square"}}
                                    x={{base:"page",offset:0}} y={{base:"page",offset:0}}>
                                    <Image id={"3"} size={{width:2,height:10}}/>
                                </Anchor>
                                <Text id={"1"}>text</Text>
                            </Paragraph>
                        )
                        .get("1")
                        .prevCursorable("1",0)
                    expect(p).toEqual({id:"0",at:3})
                })

                describe("table",()=>{
                    const prevParagraphId="-1"
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
                                        <Paragraph id={uuid++}>
                                            <Text id={"1"}>text</Text>
                                        </Paragraph>
                                    </Cell>
                                </Row>
                            </Table>
                        )
                        expect(doc.get("1").prevCursorable("1",0)).toMatchObject({id:prevParagraphId,at:1})
                    })
                    it("Row->Row",()=>{
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


        describe("line up/down",()=>{
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
                        return pages[0].lines
                    },
                    nextLine(){
                        return responsible.positioning.nextLine(...arguments)
                    },
                    prevLine(){
                        return responsible.positioning.prevLine(...arguments)
                    }
                }
            }

            describe("next line",()=>{
                it("Text->Text",()=>{
                    const p=test(
                        <Paragraph id={uuid++}>
                            <Text id="0">text </Text>
                            <Text id="1">hello</Text>
                        </Paragraph>
                    )
                    expect(p.lines.length).toBe(2)
                    expect(p.nextLine("0",0)).toMatchObject({id:"1",at:0})
                    expect(p.nextLine("0",1)).toMatchObject({id:"1",at:1})
                    expect(p.nextLine("0",4)).toMatchObject({id:"1",at:4})
                })

                it("Text-><page>Text</page>",()=>{
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
                })

                xit("Text->Image(width=2)->Text",()=>{
                    const p=test(
                        <Paragraph id={uuid++}>
                            <Text id="0">text </Text>
                            <Image id="2" size={{width:2,height:2}}/>
                            <Text id="1">hello</Text>
                        </Paragraph>
                    )
                    expect(p.lines.length).toBe(3)
                    expect(p.nextLine("0",0)).toMatchObject({id:"2",at:0})
                    expect(p.nextLine("0",1)).toMatchObject({id:"2",at:0})
                    expect(p.nextLine("0",2)).toMatchObject({id:"2",at:1})

                    expect(p.nextLine("2",0)).toMatchObject({id:"1",at:0})
                    expect(p.nextLine("2",1)).toMatchObject({id:"1",at:0})
                })

                it("Text->Image(width=7)->Text",()=>{
                    const p=test(
                        <Paragraph id={uuid++}>
                            <Text id="0">text </Text>
                            <Image id="2" size={{width:7,height:2}}/>
                            <Text id="1">hello</Text>
                        </Paragraph>
                    )
                    expect(p.lines.length).toBe(3)
                    expect(p.nextLine("0",0)).toMatchObject({id:"2"})
                    expect(p.nextLine("0",1)).toMatchObject({id:"2"})
                    expect(p.nextLine("0",2)).toMatchObject({id:"2"})

                    expect(p.nextLine("2",0)).toMatchObject({id:"1",at:0})
                    expect(p.nextLine("2",1)).toMatchObject({id:"1",at:0})
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
                        new Array(4).fill(0).forEach((a,i)=>expect(p.nextLine("0",i)).toMatchObject({id:"1",at:i}))
                    })

                    it("paragraph=>table(3 cells)",()=>{
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
                })
            })

            describe("prev line",()=>{
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
                })

                it("Text<-Image(width=7)<-Text",()=>{
                    const p=test(
                        <Paragraph id={uuid++}>
                            <Text id="0">text </Text>
                            <Image id="2" size={{width:7,height:2}}/>
                            <Text id="1">hello</Text>
                        </Paragraph>
                    )
                    expect(p.lines.length).toBe(3)
                    expect(p.prevLine("2",0)).toMatchObject({id:"0",at:0})
                    expect(p.prevLine("2",1)).toMatchObject({id:"0",at:0})

                    expect(p.prevLine("1",0)).toMatchObject({id:"2"})
                    expect(p.prevLine("1",1)).toMatchObject({id:"2"})
                    expect(p.prevLine("1",5)).toMatchObject({id:"2"})
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

                    it("paragraph=>table",()=>{
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

    })

    describe("position",()=>{
        const test=(a,b,pageXY={x:0,y:0})=>{
            Positioning.prototype.pageXY=jest.fn(()=>pageXY)
            Positioning.prototype.asViewportPoint=jest.fn(p=>p)

            const {renderer}=render(a,b)
            const responsible=renderer.root.findByType(Responsible).instance
            return {
                position(){
                    return responsible.positioning.position(...arguments)
                }
            }
        }

        it("t|ext at=0,1,4",()=>{
            const p=test(<Paragraph id={`${++uuid}`}><Text id="0">text</Text></Paragraph>)
            expect(p.position("0",0)).toMatchObject({x:0,y:0})
            expect(p.position("0",1)).toMatchObject({x:1,y:0})
            expect(p.position("0",4)).toMatchObject({x:4,y:0})
        })

        it("t|ext at=0,1,4 in second page",()=>{
            const p=test(<Paragraph id={`${++uuid}`}><Text id="0">text</Text></Paragraph>,undefined,{x:30,y:10})
            expect(p.position("0",0)).toMatchObject({x:30+0,y:10})
            expect(p.position("0",1)).toMatchObject({x:30+1,y:10})
            expect(p.position("0",4)).toMatchObject({x:30+4,y:10})
        })

        it("hello</Text>T|ext at=0,1,4",()=>{
            const p=test(<Paragraph id={`${`${++uuid}`}`}><Text id="1">hello</Text><Text id="0">text</Text></Paragraph>)
            expect(p.position("0",0)).toMatchObject({x:5+0,y:0})
            expect(p.position("0",1)).toMatchObject({x:5+1,y:0})
            expect(p.position("0",4)).toMatchObject({x:5+4,y:0})
        })

        it("Text|image(lower than text)Text",()=>{
            const p=test(<Paragraph id={`${++uuid}`}><Text id="1">text</Text><Image id="0" size={{width:2,height:2}}/><Text id="2">text</Text></Paragraph>)
            const y=10-1-2//y=line.height-descent-image.height
            expect(p.position("0",0)).toMatchObject({x:4+0,y})
            expect(p.position("0",1)).toMatchObject({x:4+2,y})
        })

        it("Text|image(heigher than text)Text",()=>{
            const p=test(<Paragraph id={`${++uuid}`}><Text id="1">text</Text><Image id="0" size={{width:2,height:12}}/><Text id="2">text</Text></Paragraph>)
            const y=0
            expect(p.position("0",0)).toMatchObject({x:4+0,y})//y=line.height-descent-image.height
            expect(p.position("0",1)).toMatchObject({x:4+2,y})
        })

        it("image",()=>{
            const p=test(<Paragraph id={`${++uuid}`}><Image id="0" size={{width:2,height:20}}/></Paragraph>)
            expect(p.position("0",0)).toMatchObject({x:0,y:0})
            expect(p.position("0",1)).toMatchObject({x:2,y:0})
        })

        it("paragraph start/end",()=>{
            const p=test(<Paragraph id="0"><Text id="1">text</Text></Paragraph>)
            expect(p.position("0",0)).toMatchObject({x:0,y:0})
            expect(p.position("0",1)).toMatchObject({x:4,y:0})
        })

        it("empty paragraph start/end",()=>{
            const p=test(<Paragraph id="0"></Paragraph>)
            expect(p.position("0",0)).toMatchObject({x:0,y:0})
            expect(p.position("0",1)).toMatchObject({x:0,y:0})
        })

        it("empty paragraph start/end",()=>{
            const p=test(<Paragraph id="0"><Container id="2"><Text id="1"></Text></Container></Paragraph>)
            expect(p.position("0",0)).toMatchObject({x:0,y:0})
            expect(p.position("0",1)).toMatchObject({x:0,y:0})
            expect(p.position("1",0)).toMatchObject({x:0,y:0})
        })

        it("paragraph with indent",()=>{
            expect(test(
                <Paragraph id={`${++uuid}`} indent={{left:1}}>
                    <Text id="0">hello world</Text>
                </Paragraph>
            ).position("0",7)).toMatchObject({x:1+7,y:0})

            expect(test(
                <Paragraph id={"1"} indent={{left:5}}>
                    <Text id="0">hello world</Text>
                </Paragraph>
            ).position("1",1)).toMatchObject({x:5+"hello world".length,y:0})

            expect(test(
                <Paragraph id={`${++uuid}`} indent={{right:5}}>
                    <Text id="0">hello world</Text>
                </Paragraph>,
                {page:{width:10}}
            ).position("0",7)).toMatchObject({x:1,y:10})

            expect(test(
                <Paragraph id={`${++uuid}`} indent={{firstLine:3}}>
                    <Text id="0">hello world</Text>
                </Paragraph>,
                {page:{width:10}}
            ).position("0",1)).toMatchObject({x:1+3,y:0})
        })

        it("paragraph with numbering",()=>{
            expect(test(
                <Paragraph id={`${++uuid}`}
                    numbering={{
                        label:<Text id="numbering">*</Text>
                    }}
                    indent={{left:1}}>
                    <Text id="0">hello world</Text>
                </Paragraph>
            ).position("0",7)).toMatchObject({x:1+7,y:0})
        })

        xit("line start/end",()=>{

        })
	})

    describe("range", ()=>{
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
                expect(doc.getRangeRects({id:"0",at:0},{id:"0",at:i})).toMatchObject([{left:0,top:0,right:i,bottom:10}]))

                new Array(4).fill(0).forEach((a,i)=>
                    expect(doc.getRangeRects({id:"0",at:1},{id:"0",at:i+1})).toMatchObject([{left:1,top:0,right:i+1,bottom:10}]))
        })

        it("text in second page",()=>{
            const doc=test(<Paragraph id={"1"}><Text id={"0"}>text</Text></Paragraph>,{x:10,y:20})
            new Array(5).fill(0).forEach((a,i)=>
                expect(doc.getRangeRects({id:"0",at:0},{id:"0",at:i})).toMatchObject([{left:10+0,top:20+0,right:10+i,bottom:20+10}]))

                new Array(4).fill(0).forEach((a,i)=>
                    expect(doc.getRangeRects({id:"0",at:1},{id:"0",at:i+1})).toMatchObject([{left:10+1,top:20+0,right:10+i+1,bottom:20+10}]))

        })

        it("no error",()=>{
            const doc=test(<Paragraph id={"1"}><Text id={"0"}>text</Text></Paragraph>)
            expect(doc.getRangeRects({id:"0",at:0},{id:"0",at:-1})).toMatchObject([{left:0,top:0,right:0,bottom:10}])
            expect(doc.getRangeRects({id:"0",at:-3},{id:"0",at:0})).toMatchObject([{left:0,top:0,right:0,bottom:10}])
            expect(doc.getRangeRects({id:"0",at:0},{id:"0",at:10})).toMatchObject([])

            expect(doc.getRangeRects({id:"notexist",at:-3},{id:"0",at:0})).toMatchObject([])
        })

        it("paragraph",()=>{
            const doc=test(<Paragraph id={"1"}><Text id={"0"}>text</Text></Paragraph>)
            expect(doc.getRangeRects({id:"1",at:0},{id:"1",at:1})).toMatchObject([{left:0,top:0,right:5,bottom:10}])
            expect(doc.getRangeRects({id:"0",at:2},{id:"1",at:1})).toMatchObject([{left:2,top:0,right:5,bottom:10}])
        })

        it("paragraph with indent",()=>{
            const doc=test(<Paragraph id={"1"} indent={{left:2}}><Text id={"0"}>text</Text></Paragraph>)
            expect(doc.getRangeRects({id:"1",at:0},{id:"1",at:1})).toMatchObject([{left:0+2,top:0,right:5+2,bottom:10}])
            expect(doc.getRangeRects({id:"0",at:2},{id:"1",at:1})).toMatchObject([{left:2+2,top:0,right:5+2,bottom:10}])
        })

        it("paragraph with indent in second page",()=>{
            const doc=test(<Paragraph id={"1"} indent={{left:2}}><Text id={"0"}>text</Text></Paragraph>, {x:10,y:20})
            expect(doc.getRangeRects({id:"1",at:0},{id:"1",at:1})).toMatchObject([{left:10+0+2,top:20+0,right:10+5+2,bottom:20+10}])
            expect(doc.getRangeRects({id:"0",at:2},{id:"1",at:1})).toMatchObject([{left:10+2+2,top:20+0,right:10+5+2,bottom:20+10}])
        })
    })

	describe("around",()=>{
		beforeEach(()=>{
			Positioning.prototype.asCanvasPoint=jest.fn(({left,top})=>({x:left,y:top}))
		})
		const test=content=>{
            const {responsible}=render(content)
            responsible.positioning.pageXY=jest.fn(()=>({x:0,y:0}))
            return {
                responsible,
                click(clientX,clientY,shiftKey=false){
                    responsible.onClick({clientX,clientY,shiftKey})
                }
            }
        }
		it("image",()=>{
			const doc=test(
				<Paragraph id={"1"}>
					<Text id={"0"}>text</Text>
					<Image id="2" size={{width:5,height:20}}/>
					<Text id={"3"}>text</Text>
				</Paragraph>
			)
			const around=jest.spyOn(doc.responsible.positioning,"around")
			new Array(5).fill(0).forEach((a,x)=>{
				new Array(20).fill(0).forEach((a,y)=>{
					doc.click(4+x,y)
					expect(around).toHaveLastReturnedWith({id:"2"})
				})
			})


			doc.click(1,10)
			expect(around).toHaveLastReturnedWith({id:"0",at:1})

			doc.click(10,10)
			expect(around).toHaveLastReturnedWith({id:"3",at:1})

		})

	})
})
