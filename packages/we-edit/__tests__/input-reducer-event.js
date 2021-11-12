import React from "react"
import Events from "../src/input/reducer/xml"
import {createState} from "../src/state"
import Immutable from "immutable"
import cheerio from "cheerio"

describe("input reducer event",()=>{
    function test(doc){
        const $=cheerio.load(`<document id="root">${doc}</document>`)
        const nodes={}, ids={}
        const toState=(node,parent)=>{
            const {name:type, attribs:{id=`${type}${ids[type]=(ids[type]||0)+1}`, ...props}}=node
            const children=($node=>{
                $node.attr('id',id)
                if(type=="text"){
                    return $node.text()
                }
                const children=$node.children().toArray()
                return children
            })($(node));
            return nodes[id]={
                id,type,parent,
                children: typeof(children)!="object" ? children : children.map(child=>toState(child,id).id),
                props:{id, ...props}
            }
        }
        toState($('#root').get(0))
        const content=Immutable.fromJS(nodes)
        return new Events(
            createState({
                    getNode:id=>$(`#${id}`),
                    $,
                },
                content
            ).set('_content',content)
        )
    }

    afterEach(()=>jest.restoreAllMocks())

    describe("enter",()=>{
        it.each([
            [`<paragraph x="1"><text>hello</text><text>world</text></paragraph>`],
            [`<paragraph x="1"><text>hello</text><text/><text>world</text></paragraph>`],
            [`<paragraph x="1"><text>hello</text><text/><text/><text>world</text></paragraph>`],
            [`<paragraph x="1"><r><text>hello</text></r><r><text>world</text></r></paragraph>`],
        ])("should copy source paragraph's all attributes:%s",(xml)=>{
            const doc=test(xml)
            doc.cursorAt('text2',0)
            const renderChanged=doc.file.renderChanged=jest.fn((clonedP)=>{
                expect(doc.file.$('paragraph').length).toBe(2)
                expect(clonedP.attr('x')).toBe("1")
                expect(["hello","world"]).toContain(clonedP.text())
                throw new Error('stop')
            })
            expect(()=>doc.enter()).toThrow('stop')
            expect(renderChanged).toHaveBeenCalled()
        })
    })

    describe("backspace",()=>{
        it("backward one at a time when cursor at beginning of text",()=>{
            const doc=test(`
                    <paragraph>
                        <text></text>
                        <text></text>
                        <text id="t1">hello</text>
                    </paragraph>
            `)
            doc.cursorAt('t1',0)
            const emit=jest.spyOn(doc,'emit')
            jest.spyOn(doc,'backspace_at_beginning_of_up_to_paragraph').mockImplementation(jest.fn())
            doc.backspace()
            expect(emit).toHaveBeenCalledTimes(3)
            expect(emit.mock.calls[0][1]).toContain("at_beginning_of_text")
            expect(emit.mock.calls[1][1]).toContain("at_beginning_of_text")
            expect(emit.mock.calls[2][1]).toContain("at_beginning_of_up_to_paragraph")
        })

        it("backward one at a time when cursor at beginning of inline container",()=>{
            const doc=test(`
                    <paragraph>
                        <r><text/></r>
                        <r><text/></r>
                        <r><text id="t1">hello</text></r>
                    </paragraph>
            `)
            doc.cursorAt('t1',0)
            const emit=jest.spyOn(doc,'emit')
            jest.spyOn(doc,'backspace_at_beginning_of_up_to_paragraph').mockImplementation(jest.fn())
            doc.backspace()
            expect(emit).toHaveBeenCalledTimes(3)
            expect(emit.mock.calls[0][1]).toContain("at_beginning_of_text")
            expect(emit.mock.calls[1][1]).toContain("at_beginning_of_r")
            expect(emit.mock.calls[2][1]).toContain("at_beginning_of_up_to_paragraph")
        })
    })

    describe('seperation',()=>{
        
    })
})