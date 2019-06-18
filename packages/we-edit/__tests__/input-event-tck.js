import Input from "../src/input/index"

export default function tck(TypedDocument,file){
    const data=require("fs").readFileSync(file)
    describe("event based reducer", ()=>{
        var editor=null, conditions=null
        beforeEach(()=>{
            Input.get=jest.fn(()=>TypedDocument)
            return Input.parse({data}).then(doc=>{
                const reducer=doc.buildReducer()
                const state=reducer()
                doc.onChange=jest.fn(function(){
                    editor=new TypedDocument.Reducer(...arguments)
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
                let container
                beforeEach(()=>{
                    container=editor.$().findFirst("text").parent()
                    expect(container.attr('type')).not.toBe("paragraph")
                })

                it("seperate whole inline container should not change anyting",()=>{
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
            it("remove text should not change structure",()=>{
                const texts=editor.$("text")
                const textLength=texts.length
                expect(textLength>0).toBe(true)
                const $first=texts.first()
                const id=$first.attr('id'), text=$first.text()
                expect(text.length>5).toBe(true)
                editor.cursorAt(id,1,id,2)
                editor.remove()
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
                expect(text.length>5).toBe(true)
                editor.cursorAt(id,0,id,text.length)
                editor.remove()
                expect(editor.$('text').length).toBe(textLength-1)
                expect(editor.$(`#${id}`).length).toBe(0)
            })

            it("remove inline container",()=>{
                const texts=editor.$("text")
                const textLength=texts.length
                expect(textLength>0).toBe(true)
                const $first=texts.first().parent()
                const id=$first.attr('id'), text=$first.text()
                expect(text.length>5).toBe(true)
                editor.cursorAt(id,0,id,1)
                editor.remove()
                expect(editor.$('text').length).toBe(textLength-1)
                expect(editor.$(`#${id}`).length).toBe(0)
            })

            it("remove the only paragraph should leave an empty paragraph",()=>{

            })
        })

        describe("backspace",()=>{
            it("backspace at beginning of anything up to document should do anything",()=>{

            })

            it("backspace at beginning of text should remove prev's content",()=>{

            })
        })

        describe("enter",()=>{
            it("enter at first table cell and the table is the first of document should create new paragraph before table",()=>{

            })

            it("enter at text should split text up to paragraph",()=>{

            })
        })
    }) 
}

it("input event tck loaded",()=>{})