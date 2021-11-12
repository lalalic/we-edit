import React, { Fragment } from "react"
import {context, $, State, render, defaultProps} from "../context"
import {Editors} from "../../src"
import {ReactQuery} from "we-edit"

describe("editor",()=>{
    defaultProps(Editors)()
    const {Document, Section,Paragraph, Text, Shape, Frame, Page, Anchor}=Editors
    
    beforeAll(()=>{
        console.info=console.debug=jest.fn()
        Document.prototype.isSelectionComposed=jest.fn(a=>true)
    })

    const test=content=>{
        const renderer=render(content)
        const doc=renderer.getInstance()
        const update=(a,fn)=>{
            return new Promise(resolve=>{
                doc.onAllChildrenComposed=jest.fn(()=>{
                    resolve(proxy)
                })
                fn && fn(proxy)
                renderer.update(a)
            })
        }

        const replace=(src,target, props)=>{
            return update(new ReactQuery(content).replace(src,target, props).root)
        }


        const proxy=new Proxy(doc,{
            get(doc,key){
                if(key=="renderer"){
                    return renderer
                }else if(key=="update"){
                    return update
                }else if(key=="replace"){
                    return replace
                }else if(key=="$$"){
                    return new ReactQuery(<svg>{doc.pages.map((a,i)=>React.cloneElement(a.createComposed2Parent(),{key:i}))}</svg>)
                }else if(key.startsWith("$")){
                    const composer=doc.getComposer(key.substring(1))
                    if(composer)
                        return composer
                }
                return Reflect.get(...arguments)
            }
        })
        return proxy
    }

    describe("cache",()=>{
        
    })

    describe("anchor",()=>{
        it("shape without content",()=>{
            const content=x=>(
                <Document hash={x}>
                    <Page hash={x} I={0}>
                        <Anchor x={x} y={x} hash={x}>
                            <Shape geometry={{width:50,height:50}}/>
                        </Anchor>
                    </Page>
                </Document>
            )
            const doc=test(content(50))
            expect(doc.pages[0].anchors[0].props.geometry).toMatchObject({x:50,y:50,width:50,height:50})
            return doc.update(content(150))
                .then(doc=>{
                    expect(doc.pages[0].anchors[0].props.geometry).toMatchObject({x:150,y:150,width:50,height:50})
                })
        })
    
        it("shape with content",()=>{
            const content=(x)=>(
                <Document hash={x}>
                    <Page I={0} hash={x}>
                        <Anchor x={x} y={x} hash={x}>
                            <Shape geometry={{width:100,height:300}}>
                                <Frame width={100} height={300} margin={10}>
                                    <Anchor x={300} y={300} id="a1">
                                        <Frame width={50} id="f1"/>
                                    </Anchor>
                                </Frame>
                            </Shape>
                        </Anchor>
                    </Page>
                </Document>
            )
            const doc=test(content(50))
            expect(doc.pages[0].anchors[0].props.geometry).toMatchObject({x:50})
            return doc
                .update(content(150))
                .then(doc=>{
                    expect(doc.pages[0].anchors[0].props.geometry).toMatchObject({x:150})
                })
        })

        it("text should layout once when update anchor",()=>{
            const content=x=>(
                <Document hash={x}>
                    <Page hash={x} I={0}>
                        <Anchor x={100} y={200} id="a1">
                            <Shape geometry={{width:50,height:50}} id="s1">
                                <Paragraph id="p1">
                                    <Text id="t1">hello</Text>
                                </Paragraph>
                            </Shape>
                        </Anchor>
                        <Anchor x={x} y={x} hash={x}>
                            <Shape geometry={{width:50,height:50}}>
                                <Paragraph>
                                    <Text>hello</Text>
                                </Paragraph>
                            </Shape>
                        </Anchor>
                    </Page>
                </Document>
            )
            const doc=test(content(50))
            expect(new ReactQuery(doc.$page.createComposed2Parent()).text().replace(/[^\w]/g,"")).toBe("hellohello")
            return doc
                .update(content(150))
                .then(doc=>{
                    expect(doc.pages.length).toBe(1)
                    expect(new ReactQuery(doc.$page.createComposed2Parent()).text().replace(/[^\w]/g,"")).toBe("hellohello")
                })
        })

        describe("nested",()=>{
            let doc
            beforeAll(()=>{
                const x=50
                doc=test(
                    <Document hash={x}>
                        <Page hash={x} I={0}>
                            <Anchor x={x} y={x} hash={x}>
                                <Shape geometry={{width:250,height:250}}>
                                    <Frame width={250} height={250}>
                                        <Anchor x={100} y={100} id="a1">
                                            <Shape geometry={{width:50,height:50}} id="s1"/>
                                        </Anchor>
                                    </Frame>
                                </Shape>
                            </Anchor>
                        </Page>
                    </Document>
                )
            })
            it("nested anchor should be later drawn",()=>{
                const composed=doc.$page.createComposed2Parent()
                const $=new ReactQuery(composed)
                const focusables=$.find("focusable")
                expect(focusables.length).toBe(2)
                expect(focusables.eq(0).attr('id')).toBe("shape")
                expect(focusables.eq(1).attr('id')).toBe("s1")
            })
        })
        
    })

    describe("numbering",()=>{
        let doc, i=1
        const numbering={style:{fonts:"arial",size:10}}
        const numberingContext={
            get:jest.fn(()=>`${i++}`),
            reset:jest.fn(()=>i=1)
        }
        const mockClear=()=>{
            numberingContext.get.mockClear()
            numberingContext.reset.mockClear()
        }
        const expects=()=>{
            expect(numberingContext.reset).toHaveBeenCalledTimes(1)
            expect(numberingContext.get).toHaveBeenCalledTimes(2)
            expect(i).toBe(3)
            mockClear()
        }
        
        describe("in same page",()=>{
            beforeEach(()=>{
                doc=test(
                    <Document numbering={numberingContext}>
                        <Page I={0}>
                            <Paragraph numbering={numbering} id={`p0`}><Text id={`t0`}>hello</Text></Paragraph>
                            <Paragraph numbering={numbering} id={`p1`}><Text id={`t1`}>hello</Text></Paragraph>
                        </Page>
                    </Document>
                )
                expects()
            })
            it("should reset and get for all paragrahs after editing list 1 or 2",()=>{
                return Promise.resolve(doc)
                    .then(()=>doc.replace('#t0',<Text id={`t0`} hash={1}>hell</Text>, {hash:1}))
                    .then(expects)
                    .then(()=>doc.replace('#t1',<Text id={`t1`} hash={2}>hell</Text>, {hash:2}))
                    .then(expects)
            })
    
            it("should reset and get all after appending or prepending list 3",()=>{
                return Promise.resolve(doc)
                    .then(()=>doc.replace('#page',
                            <Page I={0} hash={1}>
                                <Paragraph numbering={numbering} id={`p0`}><Text id={`t0`}>hello</Text></Paragraph>
                                <Paragraph numbering={numbering} id={`p1`}><Text id={`t1`}>hello</Text></Paragraph>
                                <Paragraph numbering={numbering} id={`p2`}><Text id={`t2`}>hello</Text></Paragraph>
                            </Page>, {hash:1})
                    )
                    .then(()=>{
                        expect(numberingContext.get).toHaveBeenCalledTimes(3)
                        expect(i).toBe(4)
                        mockClear()
                    })
                    .then(()=>doc.replace('#page',
                            <Page I={0} hash={2}>
                                <Paragraph numbering={numbering} id={`p2`}><Text id={`t2`}>hello</Text></Paragraph>
                                <Paragraph numbering={numbering} id={`p0`}><Text id={`t0`}>hello</Text></Paragraph>
                                <Paragraph numbering={numbering} id={`p1`}><Text id={`t1`}>hello</Text></Paragraph>
                            </Page>, {hash:2})
                    )
                    .then(()=>{
                        expect(numberingContext.get).toHaveBeenCalledTimes(3)
                        expect(i).toBe(4)
                        mockClear()
                    })
            })
    
            it("should reset and get all after prepending or appending paragraph",()=>{
                return Promise.resolve(doc)
                    .then(()=>doc.replace('#page',
                            <Page I={0} hash={1}>
                                <Paragraph id={`p2`}><Text id={`t2`}>hello</Text></Paragraph>
                                <Paragraph numbering={numbering} id={`p0`}><Text id={`t0`}>hello</Text></Paragraph>
                                <Paragraph numbering={numbering} id={`p1`}><Text id={`t1`}>hello</Text></Paragraph>
                            </Page>, {hash:1})
                    )
                    .then(expects)
                    .then(()=>doc.replace('#page',
                            <Page I={0} hash={2}>
                                <Paragraph numbering={numbering} id={`p0`}><Text id={`t0`}>hello</Text></Paragraph>
                                <Paragraph numbering={numbering} id={`p1`}><Text id={`t1`}>hello</Text></Paragraph>
                                <Paragraph id={`p2`}><Text id={`t2`}>hello</Text></Paragraph>
                            </Page>, {hash:2})
                    )
                    .then(expects)
            })
    
            it("should reset and get all after removing ",()=>{
                return Promise.resolve(doc)
                    .then(()=>doc.replace('#page',
                            <Page I={0} hash={2}>
                                <Paragraph numbering={numbering} id={`p1`}><Text id={`t1`}>hello</Text></Paragraph>
                            </Page>, {hash:2})
                    )
                    .then(()=>{
                        expect(numberingContext.get).toHaveBeenCalledTimes(1)
                        expect(i).toBe(2)
                        mockClear()
                    })
            })

            it("should reset and get all after removing numbering only",()=>{
                return Promise.resolve(doc)
                    .then(()=>doc.replace("#page",
                        <Page I={0} hash={1}>
                            <Paragraph numbering={numbering} id={`p2`}><Text id={`t2`}>hello</Text></Paragraph>
                            <Paragraph numbering={numbering} id={`p0`}><Text id={`t0`}>hello</Text></Paragraph>
                            <Paragraph numbering={numbering} id={`p1`}><Text id={`t1`}>hello</Text></Paragraph>
                        </Page>, {hash:1}))
                    .then(()=>{
                        expect(i).toBe(4)
                        mockClear()
                    })
                    .then(()=>doc.replace('#page',
                        <Page I={0} hash={2}>
                            <Paragraph numbering={numbering} id={`p2`}><Text id={`t2`}>hello</Text></Paragraph>
                            <Paragraph id={`p0`} hash={2}><Text id={`t0`}>hello</Text></Paragraph>
                            <Paragraph numbering={numbering} id={`p1`}><Text id={`t1`}>hello</Text></Paragraph>
                        </Page>, {hash:2}))
                    .then(()=>{
                        expects()
                    })
            })
            
        })

        describe("cross pages",()=>{
            beforeEach(()=>{
                doc=test(
                    <Document numbering={numberingContext}>
                        <Page I={0} id="pg0">
                            <Paragraph id="p2"><Text id="t2">h</Text></Paragraph>
                        </Page>
                        <Page I={1}>
                            <Paragraph numbering={numbering} id={`p0`}><Text id={`t0`}>hello</Text></Paragraph>
                            <Paragraph numbering={numbering} id={`p1`}><Text id={`t1`}>hello</Text></Paragraph>
                        </Page>
                        <Page I={2} id="pg2">
                            <Paragraph id="p3"><Text id="t3">h</Text></Paragraph>
                        </Page>
                    </Document>
                )
                expects()
            })
            it("should reset and get all after editing content in prev/next page",()=>{
                return Promise.resolve(doc)
                    .then(()=>doc.replace('#t2',<Text id="t2" hash={1}>hello</Text>,{hash:1}))
                    .then(expects)
                    .then(()=>doc.replace('#t3',<Text id="t3" hash={2}>hx</Text>,{hash:2}))
                    .then(expects)
            })
        })

        it("cached section should also reset and get for all",()=>{
            const doc=test(
                <Document numbering={numberingContext} content={{has:id=>true}}>
                    <Section>
                        <Paragraph numbering={numbering} id={`p0`}><Text id={`t0`}>hello</Text></Paragraph>
                        <Paragraph numbering={numbering} id={`p1`}><Text id={`t1`}>hello</Text></Paragraph>
                    </Section>
                    <Section id="s">
                        <Paragraph id="p2"><Text id="t2">hello</Text></Paragraph>
                        <Paragraph id="p3"><Text id="t3">hello</Text></Paragraph>
                    </Section>
                </Document>
            )
            return Promise.resolve(doc)
                .then(()=>{
                    expects()
                    expect(doc.pages.length).toBe(2)
                })
                .then(()=>doc.replace('#t2',<Text id="t2" hash={1}>hell</Text>,{hash:1}))
                .then(()=>expects())
        })
    })


})