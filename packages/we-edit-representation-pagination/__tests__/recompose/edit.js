import React from "react"
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
        const proxy=new Proxy(doc,{
            get(doc,key){
                if(key=="update"){
                    return update
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
            return doc
                .update(content(150))
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

    describe("paragraph",()=>{
        it("should create numbering label again even use cached",()=>{
            const createNumberingAtom=jest.spyOn(Paragraph.prototype,"createNumberingAtom")
            Paragraph.prototype.updateCalculationWhenUseCached()
            expect(createNumberingAtom).toHaveBeenCalled()
        })
    })
})