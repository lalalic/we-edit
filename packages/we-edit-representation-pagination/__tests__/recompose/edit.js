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

    fdescribe("anchor",()=>{

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
                .update(content(150),doc=>{
                    jest.spyOn(doc,"appendComposed")
                    jest.spyOn(doc.$anchor,"appendComposed")
                    jest.spyOn(doc.$page,"appendComposed")
                    jest.spyOn(doc.$frame,"onAllChildrenComposed")
                    jest.spyOn(doc.$shape,"onAllChildrenComposed")
                    jest.spyOn(doc.$shape,"appendComposed")
                })
                .then(doc=>{
                    expect(doc.$frame.onAllChildrenComposed).toHaveBeenCalledTimes(1)
                    expect(doc.$shape.appendComposed).toHaveBeenCalledTimes(1)
                    
                    expect(doc.$shape.onAllChildrenComposed).toHaveBeenCalledTimes(1)
                    expect(doc.$anchor.appendComposed).toHaveBeenCalledTimes(1)
                    expect(doc.appendComposed).toHaveBeenCalledTimes(1)
                    expect(doc.$page.appendComposed).toHaveBeenCalledTimes(1)
                    expect(doc.pages[0].anchors[0].props.geometry).toMatchObject({x:150})
                })
        })
    })
})