import React from "react"
import TestRender from "react-test-renderer"

import {Viewers, Editors} from "../src"
import Responsible from "../src/composed/responsible"
import Positioning from "../src/composed/positioning"
import Locator from "../src/composed/locator"
import provider from "./context"
import ReactDOM from "react-dom"
ReactDOM.createPortal=jest.fn()

const {Document, Section, Container,Frame, Paragraph, Text, Image}=Editors

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
			return React.cloneElement(super.createComposed2Parent(),{key:++uuid,width,height,margin})
		}
	}

	const store=(state)=>({activeDocStore:{
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
	const TextContext=provider(Text,{
			Measure:class{
				height=10
				defaultStyle={height:10,descent:1}
				widthString(x,text){
					return text.substring(0,x)
				}

				stringWidth(text){
					return text.length
				}
			}
		})
	var uuid=10000
	const size={width:20,height:500}
	const pgGap=12

    const render=(content,state)=>{
            const renderer=TestRender.create(
                <StoreContext context={store(state)}>
                    <TextContext>
                        <Document id="root" viewport={{width:500,height:500,node:{scrollTop:0}}}>
                            <Section id={++uuid} create={(a,b)=>new Page({...a,...size},b)}>
                            {content}
                            </Section>
                        </Document>
                    </TextContext>
                </StoreContext>
            )

            const doc=renderer.root.findByType(Document).instance
            return {
                renderer,
                doc,
                get(id){
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
					const p=render(<Paragraph id={++uuid}><Text id={"0"}>text</Text></Paragraph>)
						.get("0")
						.nextCursorable("0",1)
					expect(p).toEqual({id:"0",at:2})
				})

				it("|text",()=>{
					const p=render(<Paragraph id={++uuid}><Text id={"0"}>text</Text></Paragraph>)
						.get("0")
						.nextCursorable("0",0)
					expect(p).toEqual({id:"0",at:1})
				})

				it("tex|tImage",()=>{
					const p=render(<Paragraph id={++uuid}><Text id={"0"}>text</Text><Image id="-1"/></Paragraph>)
						.get("0")
						.nextCursorable("0",3)
					expect(p).toEqual({id:"-1",at:0})
				})

				it("|imageText",()=>{
					const p=render(<Paragraph id={++uuid}><Image id="-1"/><Text id={"0"}>text</Text></Paragraph>)
						.get("-1")
						.nextCursorable("-1",0)
					expect(p).toEqual({id:"0",at:0})
				})

				it("|imageImage",()=>{
					const p=render(<Paragraph id={++uuid}><Image id="-1"/><Image id="-2"/></Paragraph>)
						.get("-1")
						.nextCursorable("-1",0)
					expect(p).toEqual({id:"-2",at:0})
				})

				it("tex|t<container/>Image",()=>{
					const p=render(<Paragraph id={++uuid}><Text id={"0"}>text</Text><Container id="-2"/><Image id="-1"/></Paragraph>)
						.get("0")
						.nextCursorable("0",3)
					expect(p).toEqual({id:"-1",at:0})
				})

				it("tex|t<container/><container/>Image",()=>{
					const p=render(
								<Paragraph id={++uuid}>
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
						<Paragraph id={++uuid}>
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
					const nextParagraphCursorable=Paragraph.prototype.nextParagraphCursorable=jest.fn()
					const p=render(
						<Container id={++uuid}>
							<Paragraph id={"-1"}><Text id={"0"}>text</Text></Paragraph>
							<Paragraph id={"-2"}><Text id={"-3"}>text</Text></Paragraph>
						</Container>
					)
						.get("-1")
						.nextCursorable("-1",1)
					expect(nextParagraphCursorable).toBeCalled()
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
                    const p=render(<Paragraph id={++uuid}><Text id={"0"}>text</Text></Paragraph>)
                        .get("0")
                        .prevCursorable("0",1)
                    expect(p).toEqual({id:"0",at:0})
                })

                it("|text",()=>{
    				const prevParagraphCursorable=Paragraph.prototype.prevParagraphCursorable=jest.fn()
                    const p=render(<Paragraph id={"1"}><Text id={"0"}>text</Text></Paragraph>)
                        .get("0")
                        .prevCursorable("0",0)
                    expect(prevParagraphCursorable).toHaveBeenCalled()
                })

                it("text|Image",()=>{
                    const p=render(<Paragraph id={++uuid}><Text id={"0"}>text</Text><Image id="-1"/></Paragraph>)
                        .get("-1")
                        .prevCursorable("-1",0)
                    expect(p).toEqual({id:"0",at:3})
                })

                it("image|Text",()=>{
                    const p=render(<Paragraph id={++uuid}><Image id="-1"/><Text id={"0"}>text</Text></Paragraph>)
                        .get("0")
                        .prevCursorable("0",0)
                    expect(p).toEqual({id:"-1",at:0})
                })

                it("image|Image",()=>{
                    const p=render(<Paragraph id={++uuid}><Image id="-1"/><Image id="-2"/></Paragraph>)
                        .get("-2")
                        .prevCursorable("-2",0)
                    expect(p).toEqual({id:"-1",at:0})
                })

                it("text<container/>|Image",()=>{
                    const p=render(<Paragraph id={++uuid}><Text id={"0"}>text</Text><Container id="-2"/><Image id="-1"/></Paragraph>)
                        .get("-1")
                        .prevCursorable("-1",0)
                    expect(p).toEqual({id:"0",at:3})
                })

                it("text<container/><container/>|Image",()=>{
                    const p=render(
                                <Paragraph id={++uuid}>
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
                        <Paragraph id={++uuid}>
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

                it("<paragraph>|text</paragraph>",()=>{
                    const prevParagraphCursorable=Paragraph.prototype.prevParagraphCursorable=jest.fn()
                    const paragraph=render(
                        <Container id={++uuid}>
                            <Paragraph id={"-2"}><Text id={"-3"}>text</Text></Paragraph>
                        </Container>
                    )
                        .get("-3")
                    paragraph.prevCursorable("-3",0)
                    expect(prevParagraphCursorable).toHaveBeenCalledTimes(1)
    				paragraph.prevCursorable("-2",0)
    				expect(prevParagraphCursorable).toHaveBeenCalledTimes(2)

                })
            })
		})
	})

    describe("position",()=>{
        const test=a=>{
            Positioning.prototype.pageXY=jest.fn(()=>({x:0,y:0}))
            Positioning.prototype.asViewportPoint=jest.fn(p=>p)

            const {renderer}=render(a)
            const responsible=renderer.root.findByType(Responsible).instance
            return {
                position(){
                    //debugger
                    return responsible.positioning.position(...arguments)
                }
            }
        }

        it("t|ext at=0,1,4",()=>{
            const p=test(<Paragraph id={++uuid}><Text id="0">text</Text></Paragraph>)
            expect(p.position("0",0)).toMatchObject({x:0,y:0})
            expect(p.position("0",1)).toMatchObject({x:1,y:0})
            expect(p.position("0",4)).toMatchObject({x:4,y:0})
        })

        it("hello</Text>T|ext at=0,1,4",()=>{
            const p=test(<Paragraph id={`${++uuid}`}><Text id="1">hello</Text><Text id="0">text</Text></Paragraph>)
            expect(p.position("0",0)).toMatchObject({x:5+0,y:0})
            expect(p.position("0",1)).toMatchObject({x:5+1,y:0})
            expect(p.position("0",4)).toMatchObject({x:5+4,y:0})
        })

        it("Text|image(lower than text)Text",()=>{
            const p=test(<Paragraph id={++uuid}><Text id="1">text</Text><Image id="0" size={{width:2,height:2}}/><Text id="2">text</Text></Paragraph>)
            const y=10-1-2
            expect(p.position("0",0)).toMatchObject({x:4+0,y})//y=line.height-descent-image.height
            expect(p.position("0",1)).toMatchObject({x:4+2,y})
        })

        it("Text|image(heigher than text)Text",()=>{
            const p=test(<Paragraph id={++uuid}><Text id="1">text</Text><Image id="0" size={{width:2,height:12}}/><Text id="2">text</Text></Paragraph>)
            const y=0
            expect(p.position("0",0)).toMatchObject({x:4+0,y})//y=line.height-descent-image.height
            expect(p.position("0",1)).toMatchObject({x:4+2,y})
        })

        it("image",()=>{
            const p=test(<Paragraph id={++uuid}><Image id="0" size={{width:2,height:2}}/></Paragraph>)
            expect(p.position("0",0)).toMatchObject({x:0,y:0})
            expect(p.position("0",1)).toMatchObject({x:2,y:0})
        })

        it("paragraph start/end",()=>{
            const p=test(<Paragraph id="0"><Text id="1">text</Text></Paragraph>)
            //expect(p.position("0",0)).toMatchObject({x:0,y:0})
            expect(p.position("0",1)).toMatchObject({x:4,y:0})
        })
	})
})
