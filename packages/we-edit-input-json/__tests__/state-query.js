import React from "react"
import {createState} from "we-edit"
import {Map} from "immutable"
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
    })

    it('appendTo',()=>{
        expect('appendTo' in $).toBe(true)
        $.find('page').clone().appendTo('#root')
        expect($.find('page').length).toBe(2)
    })

    it('prependTo',()=>{
        expect('prependTo' in $).toBe(true)
        $.find('page').clone().prependTo('#root')
        expect($.find('page').length).toBe(2)
    })

    it('insertBefore',()=>{
        expect('insertBefore' in $).toBe(true)
        const p=$.findFirst('paragraph').clone()
        expect(p.attr('id')).toBeDefined()
        p.insertBefore('page')
        expect($.children().length).toBe(2)
        expect($.children().first().attr('type')).toBe('paragraph')
    })

    it('insertAfter',()=>{
        expect('insertBefore' in $).toBe(true)
        const p=$.findFirst('paragraph').clone()
        expect(p.attr('id')).toBeDefined()
        p.insertAfter('page')
        expect($.children().length).toBe(2)
        expect($.children().last().attr('type')).toBe('paragraph')
    })

    it("can't insert node before/after orphan node",()=>{
        const p=$.findFirst('paragraph').clone()
        expect(()=>p.after('page')).toThrow("orphan")
        expect(()=>p.before('page')).toThrow("orphan")
    })
})