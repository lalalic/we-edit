import React from "react"
import {createState} from "we-edit"
import Events from "../src/event"
import JSXDocument from "../src/type/jsx"
describe('construct state',()=>{
    let $=null
    beforeEach(()=>{
        const document=new JSXDocument()
        document.doc=(
            <document>
                <page>
                    <paragraph>
                        <text>hello</text>
                    </paragraph>
                    <paragraph>
                        <text>hello</text>
                        <text>world</text>
                    </paragraph>
                </page>
            </document>
        )
        const content={}
        document.render((type,props,children,node)=>{
            const id=document.makeId(node)
            content[id]={type:type.displayName,id, props,children}
            Array.isArray(children) && children.forEach(a=>content[a].parent=id)
            return id
        },{})
        let state=createState(document).mergeIn(['content'],content)
        state=state.set('_content',state.get('content').asMutable())
        const root=new Events(state).$('#root')
        expect(root.length).toBe(1)
        expect('clone' in root).toBe(true)
        expect(root.find('paragraph').length).toBe(2)
        $=root
    })

    describe('clone',()=>{
        it('text content should be cloned',()=>{
            const raw=$.findFirst('text')
            const cloned=raw.clone()
            expect(cloned.length).toBe(1)
            expect(cloned.text()).toBe(raw.text())
        })

        it("source not changed",()=>{
            const raw=$.findFirst('text')
            const cloned=raw.clone().text("hello world")
            expect(cloned.text()).not.toBe(raw.text())
        })
        
        it("deep cloned, and child-parent constructed",()=>{
            const raw=$.find('page')
            expect($.find('page').length).toBe(1)
            const cloned=raw.clone()
            expect(cloned.attr('type')).toBe('page')
            expect($.children().length).toBe(1)
            $.append(cloned)
            expect($.children().length).toBe(2)
            expect($.find('page').length).toBe(2)
            expect($.find('paragraph').length).toBe(4)
            expect($.find('text').length).toBe(6)
        })

        it("root of cloned has no parent",()=>{
            const raw=$.findFirst('text')
            const cloned=raw.clone()
            expect(cloned.attr('parent')).toBeFalsy()
        })

        it("cloned(without parent) can be cloned",()=>{
            const text=$.findFirst('text')
            const text1=text.clone()
            const text2=text1.clone()
            expect(text2.text()).toBe(text.text())
            expect($.find('text').length+2).toBe($.append(text1).append(text2).find('text').length)
        })

        it("can clone multiple nodes",()=>{
            const texts=$.find('text')
            expect(texts.length>1).toBe(true)
            const cloned=texts.clone()
            expect(texts.length==cloned.length).toBe(true)
            expect($.find('text').length+cloned.length).toBe($.append(cloned).find('text').length)
        })

        it("clone(false), not deep",()=>{
            const p=$.findFirst('paragraph')
            expect(p.clone(false).children().length).toBe(0)
            expect(p.clone(true).children().length).toBe(p.children().length)
            expect(p.clone().children().length).toBe(p.children().length)
        })
    })

    it('a node appendTo',()=>{
        expect('appendTo' in $).toBe(true)
        $.find('page').clone().appendTo('#root')
        expect($.find('page').length).toBe(2)
    })

    it('a node prependTo',()=>{
        expect('prependTo' in $).toBe(true)
        $.find('page').clone().prependTo('#root')
        expect($.find('page').length).toBe(2)
    })

    it('a node insertBefore',()=>{
        expect('insertBefore' in $).toBe(true)
        const p=$.findFirst('paragraph').clone()
        expect(p.attr('id')).toBeDefined()
        p.insertBefore('page')
        expect($.children().length).toBe(2)
        expect($.children().first().attr('type')).toBe('paragraph')
    })

    it('a node insertAfter',()=>{
        expect('insertBefore' in $).toBe(true)
        const p=$.findFirst('paragraph').clone()
        expect(p.attr('id')).toBeDefined()
        p.insertAfter('page')
        expect($.children().length).toBe(2)
        expect($.children().last().attr('type')).toBe('paragraph')
    })

    it("can't insert node before/after orphan node",()=>{
        const p=$.findFirst('paragraph').clone()
        expect(()=>$.find('text').insertAfter(p)).toThrow("orphan")
        expect(()=>$.find('text').insertBefore(p)).toThrow("orphan")
    })

    it("can't insert node to multiple place",()=>{
        const $1=$.findFirst('text'),$23=$.find('paragraph')
        expect(()=>$1.insertAfter($23)).toThrow("multiple")
        expect(()=>$1.insertBefore($23)).toThrow("multiple")
        expect(()=>$1.prependTo($23)).toThrow("multiple")
        expect(()=>$1.appendTo($23)).toThrow("multiple")
    })

    it('multiples nodes appendTo',()=>{
        expect('appendTo' in $).toBe(true)
        $.find('page').clone().children().appendTo('#root')
        expect($.children().length).toBe(3)
    })

    it('multiples nodes prependTo',()=>{
        expect('prependTo' in $).toBe(true)
        $.find('page').clone().children().prependTo('#root')
        expect($.children().length).toBe(3)
    })

    it('multiples nodes insertBefore',()=>{
        expect('insertBefore' in $).toBe(true)
        const p=$.findFirst('paragraph').clone()
        expect(p.attr('id')).toBeDefined()
        p.add(p.clone()).insertBefore('page')
        expect($.children().length).toBe(3)
        expect($.children().first().attr('type')).toBe('paragraph')
    })

    it('multiples nodes insertAfter',()=>{
        expect('insertBefore' in $).toBe(true)
        const p=$.findFirst('paragraph').clone()
        expect(p.attr('id')).toBeDefined()
        p.add(p.clone()).insertAfter('page')
        expect($.children().length).toBe(3)
        expect($.children().last().attr('type')).toBe('paragraph')
    })
})