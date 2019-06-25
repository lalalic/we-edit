import Input from "../src/input/index"

export default function tck(TypedDocument,file, debug=false){
    const data=require("fs").readFileSync(file)
    describe("event based reducer", ()=>{
        var editor=null

        function getBlocks(){
            const tables=editor.$("table")
            const ps=editor.$("paragraph").not(tables.find("paragraph"))
            return tables.add(ps)
        }

        function leaveOnlyFirst(a){
            const blocks=getBlocks()
            const first=editor.$().findFirst(a)
            blocks.not(first).toArray().forEach(id=>{
                editor.file.getNode(id).remove()
                editor.$(`#${id}`).remove()
            })
            expect(getBlocks().length).toBe(1)
            return first
        }

        beforeEach(()=>{
            Input.get=jest.fn(()=>TypedDocument)
            return Input.parse({data}).then(doc=>{
                const reducer=doc.buildReducer()
                const state=reducer()
                doc.onChange=jest.fn(function(){
                    editor=new TypedDocument.Reducer(...arguments)
                    editor.debug=debug
                })
                reducer(state,{})
            }).catch(e=>{
                console.error(e)
            })
        })

        afterEach(()=>{
            editor=null
        })

        describe("seperation",()=>{
            describe('text',()=>{
                beforeEach(()=>{
                    expect(editor.$().findFirst('text').text().length>=5).toBe(true)
                })

                const seperate=(start,end)=>{
                    const texts=editor.$('text')
                    const first=texts.first()
                    const text=first.text()
                    const id=first.attr('id')
                    editor.cursorAt(id,start,id,end||text.length)
                    editor.seperateSelection()
                    return {textLength:texts.length, text}
                }
                
                it("seperate a text should create 2 more text",()=>{
                    const start=1, end=2
                    const {textLength,text}=seperate(start,end)
                    expect(editor.$('text').length).toBe(textLength+2)
                    const $target=editor.$target
                    expect($target.text()).toBe(text.substring(start,end))
                    const next=$target.forwardFirst("text")
                    expect(next.text()).toBe(text.substring(end,text.length))
                    const prev=$target.backwardFirst("text")
                    expect(prev.text()).toBe(text.substring(0,start))
                })
    
                it("seperate a text at beginning should create 1 more text forward",()=>{
                    const start=0, end=2
                    const {textLength,text}=seperate(start,end)
                    expect(editor.$('text').length).toBe(textLength+1)
                    const $target=editor.$target
                    expect($target.text()).toBe(text.substring(start,end))
                    const next=$target.forwardFirst("text")
                    expect(next.text()).toBe(text.substring(end,text.length))
                })

                it("seperate a text at end should create 1 more text backward",()=>{
                    const start=1
                    const {textLength,text}=seperate(start)
                    expect(editor.$('text').length).toBe(textLength+1)
                    const $target=editor.$target
                    expect($target.text()).toBe(text.substring(start))
                    const next=$target.backwardFirst("text")
                    expect(next.text()).toBe(text.substring(0,start))
                })

                it("seperate a whole text at end should not change anything",()=>{
                    const start=0
                    const {textLength,text}=seperate(start)
                    expect(editor.$('text').length).toBe(textLength)
                    const $target=editor.$target
                    expect($target.text()).toBe(text)
                })
            })

            describe("inline container",()=>{
                it("seperate whole inline container should not change anyting",()=>{
                    const container=editor.$().findFirst("paragraph * text").parent()
                    expect(container.length>0).toBe(true)
                    const id=container.attr('id')
                    editor.cursorAt(id,0, id,1)
                    const sel0=editor.selection
                    const next=editor.$target.forwardFirst(), prev=editor.$target.backwardFirst()
                    editor.seperateSelection()
                    expect(editor.selection).toMatchObject(sel0)
                    expect(editor.$target.forwardFirst().attr('id')).toBe(next.attr('id'))
                    expect(editor.$target.backwardFirst().attr('id')).toBe(prev.attr('id'))
                })
            })
        })

        describe("remove selection",()=>{
            const removeSelection=()=>editor.remove()
            it("remove text should not change structure",()=>{
                const texts=editor.$("text")
                const textLength=texts.length
                expect(textLength>0).toBe(true)
                const $first=texts.first()
                const id=$first.attr('id'), text=$first.text()
                expect(text.length>3).toBe(true)
                editor.cursorAt(id,1,id,2)
                removeSelection()
                expect(editor.$('text').length).toBe(textLength)
                expect(editor.selection).toMatchObject({start:{id,at:1}, end:{id,at:1}})
                expect(editor.$target.text()).toBe(text.substring(0,1)+text.substring(1+1))
            })

            it("remove whole text should not change structure",()=>{
                const texts=editor.$("text")
                const textLength=texts.length
                expect(textLength>0).toBe(true)
                const $first=texts.first()
                const id=$first.attr('id'), text=$first.text()
                expect(text.length>3).toBe(true)
                editor.cursorAt(id,0,id,text.length)
                debugger
                removeSelection()
                expect(editor.$('text').length).toBe(textLength-1)
                expect(editor.$(`#${id}`).length).toBe(0)
            })

            it("remove inline container",()=>{
                const $container=editor.$().findFirst("paragraph * text").parent()
                expect($container.length>0).toBe(true)
                const id=$container.attr('id')
                editor.cursorAt(id,0,id,1)
                removeSelection()
                expect(editor.$(`#${id}`).length).toBe(0)
            })

            it("remove the only paragraph should leave an empty paragraph",()=>{
                const p=leaveOnlyFirst("paragraph")
                expect(p.length).toBe(1)
                expect(editor.$("paragraph").text().length>0).toBe(true)
                const id=p.attr('id')
                editor.cursorAt(id,0,id,1,undefined,false)
                removeSelection()
                expect(editor.$("paragraph").length).toBe(1)
                expect(editor.$("paragraph").text().length).toBe(0)
            })
        })

        describe("backspace",()=>{
            const backspace=()=>editor.backspace()
            it("backspace text should remove a char",()=>{
                const first=editor.$().findFirst("text")
                const len=first.text().length
                editor.cursorAt(first.attr('id'), 2)
                backspace()
                expect(first.text().length).toBe(len-1)
                expect(editor.selection.start).toMatchObject({id:first.attr('id'),at:1})
            })

            it("backspace at beginning of anything up to document should do anything",()=>{
                const first=leaveOnlyFirst("paragraph").findFirst("text")
                const text=first.text()
                editor.cursorAt(first.attr('id'),0)
                backspace()
                expect(first.text()).toBe(text)
            })

            it("backspace at beginning of text should remove prev's content",()=>{
                const first=editor.$().findFirst("text")
                const len=first.text().length
                expect(len>1).toBe(true)
                const second=first.forwardFirst("text")
                expect(second.closest("paragraph").attr('id')).toBe(first.closest("paragraph").attr("id"))
                editor.cursorAt(second.attr('id'),0)
                backspace()
                expect(first.text().length).toBe(len-1)
            })

            it("backspace at end of image should remove image",()=>{
                const images=editor.$("image")
                expect(images.length>0).toBe(true)
                const image=images.first()
                editor.cursorAt(image.attr('id'),1)
                backspace()
                expect(editor.$("image").length).toBe(images.length-1)
            })

            it("backspace at first up to to cell should do nothing",()=>{
                const table=editor.$().findFirst('table')
                expect(table.length).toBe(1)
                const first=table.findFirst("cell text")
                expect(first.length).toBe(1)
                editor.cursorAt(first.attr('id'),0)
                const selection=editor.selection
                backspace()
                expect(editor.selection).toMatchObject(selection)
            })
        })

        describe("delete",()=>{
            it("delete at text should remove char at cursor,and cursor postion should not be changed",()=>{
                const first=editor.$().findFirst("text")
                const len=first.text().length
                editor.cursorAt(first.attr('id'), 2)
                editor.delete()
                expect(first.text().length).toBe(len-1)
                expect(editor.selection.start).toMatchObject({id:first.attr('id'),at:2})
            })

            it("delete at end of up to paragraph should merge next paragraph",()=>{
                const ps=editor.$("paragraph")
                const $next=editor.$().findFirst("paragraph+paragraph")
                expect($next.length>0).toBe(true)
                const $p=$next.prev("paragraph")
                const text=$p.findLast(editor.cursorable)
                expect(text.is("text")).toBe(true)
                editor.cursorAtEnd(text.attr('id'))
                editor.delete()
                expect(editor.$("paragraph").length).toBe(ps.length-1)
            })

            it("delete at end of paragraph should merge next paragraph",()=>{
                const ps=editor.$("paragraph")
                const $next=editor.$().findFirst("paragraph+paragraph")
                expect($next.length>0).toBe(true)
                const $p=$next.prev("paragraph")
                editor.cursorAt($p.attr('id'),1)
                editor.delete()
                expect(editor.$("paragraph").length).toBe(ps.length-1)
            })

            it("delete at end of last paragraph should do nothing",()=>{
                
            })

            it("delete at end of text should delete forward",()=>{
                debugger
                const first=editor.$().findFirst("text")
                editor.cursorAtEnd(first.attr('id'))
                const $next=editor.$target.forwardFirst(editor.cursorable)
                expect($next.attr('type')).toBe("text")
                const text=$next.text()
                editor.delete()
                expect($next.text().length).toBe(text.length-1)
                expect(editor.selection.start).toMatchObject({id:$next.attr('id'),at:0})
            })
        })

        describe("enter",()=>{
            const enter=()=>editor.enter()
            it("enter at text should split text up to paragraph",()=>{
                const ps=editor.$("paragraph")
                const first=editor.$().findFirst("text")
                expect(first.text().length>3).toBe(true)
                editor.cursorAt(first.attr('id'),2)
                enter()
                expect(editor.$("paragraph").length).toBe(ps.length+1)
                expect(editor.$().findFirst("text").text().length).toBe(2)
            })

            it("enter at first table cell and the table is the first of document should create new paragraph before table",()=>{
                expect(editor.$('table').length>0).toBe(true)
                const table=leaveOnlyFirst('table')
                const first=table.findFirst('cell paragraph text')
                expect(first.length).toBe(1)
                editor.cursorAt(first.attr('id'),0)
                enter()
                const blocks=getBlocks()
                expect(blocks.length).toBe(2)
                expect(editor.$target.forwardFirst(table).attr('id')).toBe(table.attr('id'))
            })

            it("enter at end of image should put image at first paragraph,cursor at second paragraph",()=>{
                const ps=editor.$('paragraph')
                const image=editor.$().findFirst("image")
                expect(image.length).toBe(1)
                editor.cursorAt(image.attr('id'),1)
                const $p=editor.$target.closest("paragraph")
                enter()
                expect(editor.$("paragraph").length).toBe(ps.length+1)
                expect(editor.$(image).length).toBe(1)
                expect(editor.selection.start.id).not.toBe(image.attr('id'))
                expect(editor.$target.closest("paragraph").findFirst(image).length).toBe(0)
            })
        })

        describe("cursor move",()=>{
            it("forward in text should move cursor at next char",()=>{
                const first=editor.$().findFirst("text")
                editor.cursorAt(first.attr('id'),0)
                editor.forward()
                expect(editor.selection.start).toMatchObject({at:1})
            })

            it("forward at end of text should move to first of next cursorable",()=>{
                
            })

            it("forward at  end of  paragraph's last should go to end of paragraph",()=>{
                
            })
        })
    }) 
}

it("input event tck loaded",()=>{})