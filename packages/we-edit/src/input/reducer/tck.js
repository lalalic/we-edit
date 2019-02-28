import {createState} from "../../state"
import immutable,{Map} from "immutable"
import Reducer from "."

//Technology Compatibility Kit for document reducer
export default function(TypedDocument){
    const makeState=(data={})=>{
        const content=Object.keys({"1":{},"2":{},"3":{},...data}).reduce(
            (content,k)=>content.set(k,immutable.fromJS({id:k,parent:"root",props:{},...(data[k]||{})})),
            new Map()
                .set("root",immutable.fromJS({id:"root",type:"document",children:["1","2","3"]}))
        )
        const _content=content.asMutable()
        const doc=new TypedDocument(content,_content,{immutable,test})
        return createState(doc,content).set("_content",_content)
    }

    const test=(content,selectionx={})=>{
        const selection={cursorAt:"end",...selectionx}
        const state=makeState(content).set("selection",immutable.fromJS(selection))
        const reducer=new Reducer(state)
        expect(reducer.selection).toMatchObject(selection)
        const composer={
            nextCursorable(){

            },
            prevCursorable(){

            }
        }
        const responsible={
            getComposer(){
                return composer
            }
        }
        return {selection,reducer, composer,responsible}
    }

    describe("utils",()=>{
        it("cursorAt",()=>{
            const {reducer}=test()
            expect(reducer.cursorAt("1",1)).toMatchObject({start:{id:"1",at:1},end:{id:"1",at:1}})
            expect(reducer.cursorAt("1",2,"2",3)).toMatchObject({start:{id:"1",at:2},end:{id:"2",at:3}})
        })

        describe("clone",()=>{
            it("t(ex)t",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"text",parent:"1"},
                })
                reducer.cursorAt("1_1",1,"1_1",3)
                const cloned=reducer.clone()
                expect(cloned.attr('type')).toBe('text')
                expect(cloned.text()).toBe("ex")
            })

            it("image",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"image",parent:"1"},
                })
                reducer.cursorAt("1_1",0,"1_1",1)
                expect(reducer.clone().attr('type')).toBe('image')

                reducer.cursorAt("1_1",0)
                expect(reducer.clone().attr('type')).toBe('image')
            })

            it("<p><r><d><t>hello</t></d></r><t>(world</t></p><p><r><d><t>hello</t></d></r><t>)world</t></p>",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"container0",children:["1_1_1"],parent:"1"},
                    "1_1_1":{type:"container1", children:["1_1_1_1"],parent:"1_1"},
                    "1_1_1_1":{type:"text",children:"hello",parent:"1_1_1"},
                    "1_2":{type:"text",children:"world",parent:"1"},

                    "2":{type:"paragraph",children:["2_1","2_2"]},
                    "2_1":{type:"container0",children:["2_1_1"],parent:"2"},
                    "2_1_1":{type:"container1", children:["2_1_1_1"],parent:"2_1"},
                    "2_1_1_1":{type:"text",children:"hello",parent:"2_1_1"},
                    "2_2":{type:"text",children:"world",parent:"2"},
                })

                reducer.cursorAt("1_1_1_1",0,"2_2",0)
                const cloned=reducer.clone()
                expect(cloned.length).toBe(2)

                expect(cloned.eq(0).text()).toBe("helloworld")
                expect(cloned.eq(1).text()).toBe("hello")

                expect(cloned.eq(0).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("container0,container1").length).toBe(2)

                expect(cloned.eq(1).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("container0,container1").length).toBe(2)
            })

            fit("<p><r><d><t>hello</t></d></r><t>w(orld</t></p><p><r><d><t>hello</t></d></r><t>w)orld</t></p>",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"container0",children:["1_1_1"],parent:"1"},
                    "1_1_1":{type:"container1", children:["1_1_1_1"],parent:"1_1"},
                    "1_1_1_1":{type:"text",children:"hello",parent:"1_1_1"},
                    "1_2":{type:"text",children:"world",parent:"1"},

                    "2":{type:"paragraph",children:["2_1","2_2"]},
                    "2_1":{type:"container0",children:["2_1_1"],parent:"2"},
                    "2_1_1":{type:"container1", children:["2_1_1_1"],parent:"2_1"},
                    "2_1_1_1":{type:"text",children:"hello",parent:"2_1_1"},
                    "2_2":{type:"text",children:"world",parent:"2"},
                })

                reducer.cursorAt("1_1_1_1",1,"2_2",1)
                const cloned=reducer.clone()
                expect(cloned.length).toBe(2)

                expect(cloned.eq(0).text()).toBe("elloworld")
                expect(cloned.eq(1).text()).toBe("hellow")

                expect(cloned.eq(0).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("container0,container1").length).toBe(2)

                expect(cloned.eq(1).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("container0,container1").length).toBe(2)
            })

            it("<p><r><d><t>hello</t></d></r><t>w(orld</t></p><p/><p><r><d><t>hello</t></d></r><t>w)orld</t></p>",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"container0",children:["1_1_1"],parent:"1"},
                    "1_1_1":{type:"container1", children:["1_1_1_1"],parent:"1_1"},
                    "1_1_1_1":{type:"text",children:"hello",parent:"1_1_1"},
                    "1_2":{type:"text",children:"world",parent:"1"},

                    "2":{type:"paragraph",children:["2_1"]},
                    "2_1":{type:"text",children:"world",parent:"2"},


                    "3":{type:"paragraph",children:["3_1","3_2"]},
                    "3_1":{type:"container0",children:["3_1_1"],parent:"3"},
                    "3_1_1":{type:"container1", children:["3_1_1_1"],parent:"3_1"},
                    "3_1_1_1":{type:"text",children:"hello",parent:"3_1_1"},
                    "3_2":{type:"text",children:"world",parent:"3"},
                })

                reducer.cursorAt("1_1_1_1",1,"3_2",1)
                const cloned=reducer.clone()
                expect(cloned.length).toBe(3)
                expect(cloned.filter('paragraph').length).toBe(3)

                expect(cloned.eq(0).text()).toBe("elloworld")
                expect(cloned.eq(2).text()).toBe("hellow")

                expect(cloned.eq(0).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("container0,container1").length).toBe(2)

                expect(cloned.eq(2).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("container0,container1").length).toBe(2)
            })
        })

        describe("seperateSelection",()=>{
            it("T(ex)t",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"text",parent:"1"},
                })
                reducer.cursorAt("1_1",1, "1_1",3)
                reducer.seperateSelection()
                const texts=reducer.$('text')
                expect(texts.length).toBe(3)
                expect(texts.eq(0).text()).toBe('t')
                expect(texts.eq(1).text()).toBe('ex')
                expect(texts.eq(2).text()).toBe('t')

                const id=texts.eq(1).attr('id')
                expect(reducer.selection).toMatchObject({start:{id,at:0},end:{id,at:2}})
            })

            it("T(extHe)llo",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"text",children:"text",parent:"1"},
                    "1_2":{type:"text",children:"Hello",parent:"1"},
                })
                reducer.cursorAt("1_1",1, "1_2",2)
                reducer.seperateSelection()
                const texts=reducer.$('text')
                expect(texts.length).toBe(4)

                expect(texts.eq(0).text()).toBe('t')
                expect(texts.eq(1).text()).toBe('ext')
                expect(texts.eq(2).text()).toBe('He')
                expect(texts.eq(3).text()).toBe('llo')
                expect(texts.eq(3).attr('id')).toBe("1_2")


                const start=texts.eq(1)
                const end=texts.eq(2)
                expect(reducer.selection).toMatchObject({start:{id:start.attr("id"),at:0},end:{id:end.attr('id'),at:2}})
            })

            it("<run><text>T(ext</text></run><run><text>He)llo</text></run>",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"container0",children:["1_1_0"],parent:"1"},
                    "1_1_0":{type:"text",children:"text",parent:"1_1"},
                    "1_2":{type:"container0",children:["1_2_0"],parent:"1"},
                    "1_2_0":{type:"text",children:"Hello",parent:"1_2"},
                })
                reducer.cursorAt("1_1_0",1, "1_2_0",2)
                reducer.seperateSelection()
                const texts=reducer.$('text')
                expect(texts.length).toBe(4)
                expect(reducer.$("container0").length).toBe(2)

                expect(texts.eq(0).text()).toBe('t')
                expect(texts.eq(1).text()).toBe('ext')
                expect(texts.eq(2).text()).toBe('He')
                expect(texts.eq(3).text()).toBe('llo')
                expect(texts.eq(3).attr('id')).toBe("1_2_0")


                const start=texts.eq(1)
                const end=texts.eq(2)
                expect(reducer.selection).toMatchObject({start:{id:start.attr("id"),at:0},end:{id:end.attr('id'),at:2}})
            })
        })
    })


    describe("remove",()=>{
        describe("forward",()=>{
            it("t|ext",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1_1",1)
                composer.nextCursorable=jest.fn(()=>({id:"1_1",at:2}))
                reducer.remove({responsible})
                expect(reducer.$("#1_1").text()).toBe("txt")
                expect(reducer.file.getNode("1_1").children).toBe("txt")
                expect(reducer.selection).toMatchObject({start:{id:"1_1",at:1},end:{id:"1_1",at:1}})
            })

            it("<p>text|</p>",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1",1)
                composer.nextCursorable=jest.fn(()=>({id:"1",at:1}))
                reducer.remove({responsible})
                expect(reducer.$("#1_1").text()).toBe("text")
                expect(reducer.file.getNode("1_1").children).toBe("text")
                expect(reducer.selection).toMatchObject({start:{id:"1",at:1},end:{id:"1",at:1}})
            })

            it("tex|tHello",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"text",children:"text",parent:"1"},
                    "1_2":{type:"text",children:"Hello",parent:"1"}
                })
                reducer.cursorAt("1_1",3)
                composer.nextCursorable=jest.fn(()=>({id:"1_2",at:0}))
                reducer.remove({responsible})
                expect(reducer.$("#1_1").text()).toBe("tex")
                expect(reducer.file.getNode("1_1").children).toBe("tex")
                expect(reducer.selection).toMatchObject({start:{id:"1_2",at:0},end:{id:"1_2",at:0}})
            })

            it("|image",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"image",parent:"1"},
                    "1_2":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1_1",0)
                composer.nextCursorable=jest.fn(()=>({id:"1_2",at:0}))
                reducer.remove({responsible})
                expect(reducer.$("#1_1").length).toBe(0)
                expect(reducer.file.getNode("1_1")).toBeFalsy()
                expect(reducer.selection).toMatchObject({start:{id:"1_2",at:0},end:{id:"1_2",at:0}})
            })

            it("|<anchor>image</anchor>",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"anchor",parent:"1",children:["1_1_1"]},
                    "1_1_1":{type:"image",parent:"1_1"},
                    "1_2":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1_1",0)
                composer.nextCursorable=jest.fn(()=>({id:"1_2",at:0}))
                reducer.remove({responsible})
                expect(reducer.$("#1_1,#1_1_1").length).toBe(0)
                expect(reducer.file.getNode("1_1")).toBeFalsy()
                expect(reducer.file.getNode("1_1_1")).toBeFalsy()
                expect(reducer.selection).toMatchObject({start:{id:"1_2",at:0},end:{id:"1_2",at:0}})
            })

            it("<p>|</p><p/>",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"text",parent:"1"},
                    "2":{type:"paragraph",children:["2_1"]},
                    "2_1":{type:"text",children:"text",parent:"2"},
                })
                reducer.cursorAt("1",1)
                composer.nextCursorable=jest.fn(()=>({id:"2_1",at:0}))
                reducer.remove({responsible})
                expect(reducer.$('#2').length).toBe(0)
                expect(reducer.file.getNode('2')).toBeFalsy()
                expect(reducer.$('#1').children().toArray()).toMatchObject(["1_1","2_1"])
                expect(reducer.selection).toMatchObject({start:{id:"2_1",at:0},end:{id:"2_1",at:0}})
            })
        })

        describe("backword",()=>{
            it("t|ext",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1_1",1)
                composer.prevCursorable=jest.fn(()=>({id:"1_1",at:0}))
                reducer.remove({backspace:true,responsible})
                expect(reducer.$("#1_1").text()).toBe("ext")
                expect(reducer.file.getNode("1_1").children).toBe("ext")
                expect(reducer.selection).toMatchObject({start:{id:"1_1",at:0},end:{id:"1_1",at:0}})
            })

            it("|text",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1_1",0)
                composer.prevCursorable=jest.fn(()=>({id:"1_1",at:0}))
                reducer.remove({backspace:true,responsible})
                expect(reducer.$("#1_1").text()).toBe("text")
                expect(reducer.file.getNode("1_1").children).toBe("text")
                expect(reducer.selection).toMatchObject({start:{id:"1_1",at:0},end:{id:"1_1",at:0}})
            })

            it("image|Text",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"image",parent:"1"},
                    "1_2":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1_2",0)
                composer.prevCursorable=jest.fn(()=>({id:"1_1",at:0}))
                composer.nextCursorable=jest.fn(()=>{
                    expect(reducer.selection).toMatchObject({start:{id:"1_1",at:0}})
                    return {id:"1_2",at:0}
                })
                reducer.remove({backspace:true,responsible})
                expect(reducer.$("#1_1").length).toBe(0)
                expect(reducer.file.getNode("1_1")).toBeFalsy()
                expect(reducer.selection).toMatchObject({start:{id:"1_2",at:0},end:{id:"1_2",at:0}})
            })

            it("<p/><p>|</p>",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"text",parent:"1"},
                    "2":{type:"paragraph",children:["2_1"]},
                    "2_1":{type:"text",children:"text",parent:"2"},
                })
                reducer.cursorAt("2_1",0)
                composer.prevCursorable=jest.fn(()=>({id:"1",at:1}))
                composer.nextCursorable=jest.fn(()=>{
                    expect(reducer.selection).toMatchObject({start:{id:"1",at:1}})
                    return {id:"2_1",at:0}
                })
                reducer.remove({backspace:true,responsible})
                expect(reducer.$("#2").length).toBe(0)
                expect(reducer.file.getNode("2")).toBeFalsy()
                expect(reducer.$("#1").children().toArray()).toMatchObject(["1_1","2_1"])
                expect(reducer.selection).toMatchObject({start:{id:"2_1",at:0},end:{id:"2_1",at:0}})
            })
        })

        describe("selection",()=>{
            it("t(ex)t",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1_1",1,"1_1",3)
                composer.nextCursorable=jest.fn(()=>({id:"1",at:1}))
                reducer.remove({responsible})
                expect(reducer.$('#1_1').text()).toBe("tt")
                expect(reducer.file.getNode("1_1").children).toBe("tt")
                expect(reducer.selection).toMatchObject({start:{id:"1_1",at:1},end:{id:"1_1",at:1}})
            })

            it("t(ext)Hello",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"text",children:"text",parent:"1"},
                    "1_2":{type:"text",children:"hello",parent:"1"}
                })
                reducer.cursorAt("1_1",1,"1_2",0)
                composer.prevCursorable=jest.fn(()=>({id:"1_1",at:3}))
                composer.nextCursorable=jest.fn(()=>({id:"1_2",at:0}))
                reducer.remove({responsible})

                expect(reducer.$('#1_1').text()).toBe("t")
                expect(reducer.file.getNode("1_1").children).toBe("t")
                expect(reducer.selection).toMatchObject({start:{id:"1_2",at:0},end:{id:"1_2",at:0}})
            })

            it("t(extHe)llo",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"text",children:"text",parent:"1"},
                    "1_2":{type:"text",children:"hello",parent:"1"}
                })
                reducer.cursorAt("1_1",1,"1_2",2)
                composer.nextCursorable=jest.fn(()=>({id:"1_2",at:0}))
                reducer.remove({responsible})
                const texts=reducer.$('text')
                expect(texts.length).toBe(2)

                expect(reducer.$('#1_1').text()).toBe("t")
                expect(reducer.file.getNode("1_1").children).toBe("t")
                const cursor=texts.eq(1)
                expect(cursor.text()).toBe("llo")
                expect(reducer.file.getNode(cursor.attr('id')).children).toBe("llo")
                const id=cursor.attr('id')
                expect(reducer.selection).toMatchObject({start:{id,at:0},end:{id,at:0}})
            })

            it("(text)Hello",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"text",children:"text",parent:"1"},
                    "1_2":{type:"text",children:"hello",parent:"1"}
                })
                reducer.cursorAt("1_1",0,"1_2",0)
                composer.prevCursorable=jest.fn(()=>({id:"1_1",at:3}))
                composer.nextCursorable=jest.fn(()=>({id:"1_2",at:0}))
                reducer.remove({responsible})

                expect(reducer.$('#1_1').text()).toBe("")
                expect(reducer.file.getNode("1_1").children).toBe("")
                expect(reducer.selection).toMatchObject({start:{id:"1_2",at:0},end:{id:"1_2",at:0}})
            })

            it("(Image)Hello",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1_1","1_2"]},
                    "1_1":{type:"image",parent:"1"},
                    "1_2":{type:"text",children:"hello",parent:"1"}
                })
                reducer.cursorAt("1_1",0,"1_1",1)
                composer.nextCursorable=jest.fn(()=>({id:"1_2",at:0}))
                reducer.remove({responsible})

                expect(reducer.$('#1_1').length).toBe(0)
                expect(reducer.file.getNode("1_1")).toBeFalsy()
                expect(reducer.selection).toMatchObject({start:{id:"1_2",at:0},end:{id:"1_2",at:0}})
            })
        })
    })


    describe("create",()=>{
        it("image on |text",()=>{
            const {reducer}=test({
                "1":{type:"paragraph",children:["1_1"]},
                "1_1":{type:"text",children:"hello",parent:"1"}
            })
            reducer.cursorAt("1_1",0)
            reducer.create({type:'image'})
            const children=reducer.$('#1').children()
            expect(children.length).toBe(2)
            expect(children.eq(0).attr('type')).toBe("image")
            expect(children.eq(1).text()).toBe("hello")
            const cursor={id:children.eq(0).attr('id'),at:0}
            expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
        })

        it("image on T|ext",()=>{
            const {reducer}=test({
                "1":{type:"paragraph",children:["1_1"]},
                "1_1":{type:"text",children:"hello",parent:"1"}
            })
            reducer.cursorAt("1_1",1)
            reducer.create({type:'image'})
            const children=reducer.$('#1').children()
            expect(children.eq(0).text()).toBe("h")
            expect(children.eq(2).text()).toBe("ello")
            expect(children.eq(1).attr('type')).toBe("image")
            const cursor={id:children.eq(1).attr('id'),at:0}
            expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
        })

        it("image on T(ex)t",()=>{
            const {reducer}=test({
                "1":{type:"paragraph",children:["1_1"]},
                "1_1":{type:"text",children:"Text",parent:"1"}
            })
            reducer.cursorAt("1_1",1,"1_1",3)
            reducer.create({type:'image'})
            const children=reducer.$('#1').children()
            expect(children.eq(0).text()).toBe("T")
            expect(children.eq(2).text()).toBe("t")
            expect(children.eq(1).attr('type')).toBe("image")
            const cursor={id:children.eq(1).attr('id'),at:0}
            expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
        })
    })

    describe("insert",()=>{
        describe("text",()=>{
			describe("on text",()=>{
				it("hello =>h|ello",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1_1"]},
						"1_1":{type:"text",children:"hello",parent:"1"}
					})
					reducer.cursorAt("1_1",1)
					reducer.insert("hello")
					expect(reducer.$('#1_1').text()).toBe("hhelloello")
					expect(reducer.file.getNode("1_1").children).toBe("hhelloello")
					const cursor={id:"1_1",at:1+5}
					expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
				})


				it("hello =>h(el)lo",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1_1"]},
						"1_1":{type:"text",children:"hello",parent:"1"}
					})
					reducer.cursorAt("1_1",1,"1_1",3)
					reducer.insert("hello")

					expect(reducer.$("#1_1").text()).toBe("hhellolo")
					expect(reducer.file.getNode("1_1").children).toBe("hhellolo")
					const cursor={id:"1_1",at:1+5}
					expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
				})

				it("hello => h(ello</>Te)xt",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1_1","1_2"]},
						"1_1":{type:"text",children:"hello",parent:"1"},
						"1_2":{type:"text",children:"Text",parent:"1"},
					})
					reducer.cursorAt("1_1",1,"1_2",2)
					reducer.insert("hello")

					expect(reducer.$('text').length).toBe(2)

					expect(reducer.$("#1_1").text()).toBe("h")
					expect(reducer.file.getNode("1_1").children).toBe("h")
					expect(reducer.$('#1_2').text()).toBe("helloxt")
					expect(reducer.file.getNode('1_2').children).toBe("helloxt")

					const cursor={id:"1_2",at:5}
					expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
				})

				it("hello\\rworld=>t|ext",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1_1"]},
						"1_1":{type:"text",children:"text",parent:"1"},
					})
					const p0=reducer.$('paragraph')
					reducer.cursorAt("1_1",1)
					reducer.insert("hello\rworld")
					const p1=reducer.$('paragraph')
					expect(p1.length-p0.length).toBe(1)
					expect(p1.eq(0).find('text').text()).toBe('thello')
					expect(p1.eq(1).find('text').text()).toBe('worldext')
				})

				it("hello\\rmy\\rworld=>t|ext",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1_1"]},
						"1_1":{type:"text",children:"text",parent:"1"},
					})
					const p0=reducer.$('paragraph')
					reducer.cursorAt("1_1",1)
					reducer.insert("hello\rmy\rworld")
					const p1=reducer.$('paragraph')
					expect(p1.length-p0.length).toBe(2)
					expect(p1.eq(0).find('text').text()).toBe('thello')
					expect(p1.eq(1).find('text').text()).toBe('my')
					expect(p1.eq(2).find('text').text()).toBe('worldext')
				})

                it("hello\\rmy\\rworld=>t|ext with structure",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1_0"]},
                        "1_0":{type:"container0", children:["1_1"],parent:"1"},
						"1_1":{type:"text",children:"text",parent:"1_0"},
					})
					const p0=reducer.$('paragraph')
					reducer.cursorAt("1_1",1)
					reducer.insert("hello\rmy\rworld")
					const p1=reducer.$('paragraph')
					expect(p1.length-p0.length).toBe(2)
					expect(p1.eq(0).find('text').text()).toBe('thello')
					expect(p1.eq(1).find('text').text()).toBe('my')
					expect(p1.eq(2).find('text').text()).toBe('worldext')

                    p1.toArray().forEach(p=>expect(reducer.$('#'+p).find("container0").length).toBe(1))
				})
			})

			describe("at object beginning",()=>{
				it("hello=>|imageHello",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1_0","1_1"]},
						"1_0":{type:"image",parent:"1"},
						"1_1":{type:"text",children:"hello",parent:"1"},
					})
					reducer.cursorAt("1_0",0)
					reducer.insert("hello")
					const texts=reducer.$('text')
					expect(texts.length).toBe(2)
					expect(texts.eq(0).text()).toBe("hello")
					expect(reducer.$('#1').children().toArray()).toMatchObject([texts.eq(0).attr('id'),"1_0","1_1"])
					const cursor={id:texts.eq(0).attr('id'),at:5}
					expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
				})

				it("hello=>|<shape/>Hello",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1_0","1_1"]},
						"1_0":{type:"shape",parent:"1"},
						"1_1":{type:"text",children:"hello",parent:"1"},
					})
					reducer.cursorAt("1_0",0)
					reducer.insert("hello")
					const texts=reducer.$('text')
					expect(texts.length).toBe(2)
					expect(texts.eq(0).text()).toBe("hello")
					expect(reducer.$('#1').children().toArray()).toMatchObject([texts.eq(0).attr('id'),"1_0","1_1"])
					const cursor={id:texts.eq(0).attr('id'),at:5}
					expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
				})
			})

            describe("at end of paragraph",()=>{
                it("h=><p><text>hello|</text></p>",()=>{
                    const {reducer,selection}=test({
                        "1":{type:"paragraph",children:["1_1"]},
                        "1_1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                    })

                    reducer.cursorAt("1_1",5)
                    reducer.insert("a")
                    expect(reducer.$('#1_1').text()).toBe("helloa")
                    expect(reducer.selection).toMatchObject({start:{id:"1_1",at:6}})
                })

                it("h=><p>hello|</p>",()=>{
                    const {reducer,selection}=test({
                        "1":{type:"paragraph",children:["1_1"]},
                        "1_1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                    })

                    reducer.cursorAt("1",1)
                    reducer.insert("a")
                    expect(reducer.$('#1_1').text()).toBe("helloa")
                    expect(reducer.selection).toMatchObject({start:{id:"1_1",at:6}})
                })

                it("** h=><p><image>|</p>",()=>{
                    const {reducer,selection}=test({
                        "1":{type:"paragraph",children:["1_1"]},
                        "1_1":{type:"image",parent:"1"}
                    })

                    reducer.cursorAt("1",1)
                    reducer.insert("a")
                    const text=reducer.$('text')
                    expect(text.length).toBe(1)
                    expect(text.text()).toBe("a")
                    //expect(reducer.$('#1').children().toArray()).toMatchObject(["1_1",text.attr('id')])
                    expect(reducer.selection).toMatchObject({start:{id:text.attr('id'),at:1}})
                })
            })
        })

        describe("contents",()=>{
            describe('at beginning',()=>{
                it("<t>hello</t> -> |Text",()=>{
                    const {reducer}=test({
                        "1":{type:"paragraph",children:["1_1"]},
                        "1_1":{type:"text",children:"text",parent:"1"},
                    })
                    reducer.cursorAt("1_1",0)
                    reducer.insert([{type:"text",children:"hello"}])
                    const texts=reducer.$('#1 text')
                    expect(texts.length).toBe(2)
                    expect(texts.eq(0).text()).toBe("hello")
                    expect(texts.eq(1).text()).toBe("text")
                })

                it("<t>hello</t> -> |<image/>",()=>{
                    const {reducer}=test({
                        "1":{type:"paragraph",children:["1_1"]},
                        "1_1":{type:"image",parent:"1"},
                    })
                    reducer.cursorAt("1_1",0)
                    reducer.insert([{type:"text",children:"hello"}])
                    const texts=reducer.$('#1 text')
                    expect(texts.length).toBe(1)
                    expect(reducer.$('#1').children().toArray()).toMatchObject([texts.eq(0).attr('id'),"1_1"])
                })
            })

            describe("inline text",()=>{
                it("<t>hello</t> -> <t>T|ext</t>",()=>{
                    const {reducer}=test({
                        "1":{type:"paragraph",children:["1_1"]},
                        "1_1":{type:"text",children:"text",parent:"1"},
                    })
                    reducer.cursorAt("1_1",1)
                    reducer.insert([{type:"text",children:"hello"}])
                    const texts=reducer.$('#1 text')
                    expect(texts.length).toBe(3)
                    expect(texts.eq(0).text()).toBe("t")
                    expect(texts.eq(1).text()).toBe("hello")
                    expect(texts.eq(2).text()).toBe("ext")
                })

                it("<t>hello</t> -> <r><t>T|ext</t></r>",()=>{
                    const {reducer}=test({
                        "1":{type:"paragraph",children:["1_1"]},
                        "1_1":{type:"container0",children:["1_1_1"],parent:"1"},
                        "1_1_1":{type:"text",children:"text",parent:"1_1"},
                    })
                    reducer.cursorAt("1_1_1",1)
                    reducer.insert([{type:"text",children:"hello"}])
                    const texts=reducer.$('#1 text')
                    expect(texts.length).toBe(3)
                    expect(texts.eq(0).text()).toBe("t")
                    expect(texts.eq(1).text()).toBe("hello")
                    expect(texts.eq(2).text()).toBe("ext")
                    expect(reducer.$('#1 container0').length).toBe(2)
                })
            })
        })

    })

    describe("update",()=>{
        describe("text",()=>{
            it("cursor",()=>{
                const {reducer,selection}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                })

                reducer.cursorAt("1_1",1)
                reducer.update({text:{size:5}})
                expect(reducer.$('#1_1').attr('size')).toBe(5)
                expect(reducer.selection).toMatchObject(selection)
            })

            it("inline text selection",()=>{
                const {reducer,selection}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                })

                reducer.cursorAt("1_1",1,"1_1",3)
                reducer.update({text:{size:5}})
                const texts=reducer.$('text')
                expect(texts.length).toBe(3)
                expect(texts.eq(0).attr('size')).toBe(1)
                expect(texts.eq(1).attr('size')).toBe(5)
                expect(texts.eq(2).attr('size')).toBe(1)

                expect(reducer.selection).toMatchObject({start:{id:texts.eq(1).attr('id'),at:0}})
            })

            it("cross text selection",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1"]},
                    "1_1":{type:"text",children:"hello",parent:"1",props:{size:1}},
                    "2":{type:"paragraph",children:["2_1"]},
                    "2_1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                })

                reducer.cursorAt("1_1",1,"2_1",3)
                reducer.update({text:{size:5}})
                const texts=reducer.$('text')
                expect(texts.length).toBe(4)
                expect(texts.eq(0).attr('size')).toBe(1)
                expect(texts.eq(1).attr('size')).toBe(5)
                expect(texts.eq(2).attr('size')).toBe(5)
                expect(texts.eq(3).attr('size')).toBe(1)

                expect(reducer.selection).toMatchObject({start:{id:texts.eq(1).attr('id'),at:0}, end:{id:texts.eq(2).attr('id'),at:3}})
            })

			it("textImagetext",()=>{
				const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1","1_2","1_3"]},
                    "1_1":{type:"text",children:"hello",parent:"1",props:{size:1}},
					"1_2":{type:"image",parent:"1"},
					"1_3":{type:"text",children:"hello",parent:"1",props:{size:2}},

                    "2":{type:"paragraph",children:["2_1"]},
                    "2_1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                })

                reducer.cursorAt("1_1",1,"2_1",3)
                reducer.update({text:{size:5}})
                const texts=reducer.$('text')
                expect(texts.length).toBe(5)
                expect(texts.eq(0).attr('size')).toBe(1)
                expect(texts.eq(1).attr('size')).toBe(5)
                expect(texts.eq(2).attr('size')).toBe(5)
                expect(texts.eq(3).attr('size')).toBe(5)
                expect(texts.eq(4).attr('size')).toBe(1)

                expect(reducer.selection).toMatchObject({start:{id:texts.eq(1).attr('id'),at:0}, end:{id:texts.eq(3).attr('id'),at:3}})
			})
			it("<paragraph/>",()=>{
				const {reducer}=test({
                    "1":{type:"paragraph",children:["1_1","1_2","1_3"]},
                    "1_1":{type:"text",children:"hello",parent:"1",props:{size:1}},
					"1_2":{type:"image",parent:"1"},
					"1_3":{type:"text",children:"hello",parent:"1",props:{size:2}},

                    "2":{type:"paragraph",children:["2_1"]},
                    "2_1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                })

                reducer.cursorAt("1",0,"1",1)
                reducer.update({text:{size:5}})
                expect(reducer.$('#1 text').length).toBe(2)
                expect(reducer.$('#1_1').attr('size')).toBe(5)
                expect(reducer.$('#1_3').attr('size')).toBe(5)
                expect(reducer.$('#2_1').attr('size')).toBe(1)
                expect(reducer.selection).toMatchObject({start:{id:"1",at:0},end:{id:"1",at:1}})
			})
        })
    })
}
