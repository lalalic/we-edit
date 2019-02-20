import {createState} from "../src/state"
import immutable,{Map} from "immutable"
import Reducer from "../src/input/reducer"
import Input from "../src/input"
import {selection} from "../src/state/reducer"

describe("reducer",()=>{
    class StateDocument extends Input.Editable{
        constructor(content){
            super()
            this.doc=content.toJS()
        }

        render(){

        }

        renderNode(){

        }

        renderChanged(id){

        }

        getNode(id){
            return this.doc[id]
        }

        cloneNode({id}){
            const {children,...cloned}=this.getNode(id)

        }

        updateNode(){

        }

        splitNode(node){

        }

        tailorNode({id},from,to){
            const node=this.getNode(id)
            switch(node.type){
                case "text":
                    node.children=node.children.substring(0,from)+node.children.substring(to)
                    this.renderChanged(node)
                    break
                default:
                    this.removeNode(arguments[0])
                    this.renderChanged(node.parent)
            }
        }
    }

    const makeState=(data={})=>{
        const content=Object.keys({"1":{},"2":{},"3":{},...data}).reduce(
            (content,k)=>content.set(k,immutable.fromJS({id:k,parent:"root",props:{},...(data[k]||{})})),
            new Map()
                .set("root",immutable.fromJS({id:"root",type:"document",children:["1","2","3"]}))
        )
        const doc=new StateDocument(content)
        return createState(doc,content).set("_content",content.asMutable())
    }

    describe("utils",()=>{
        const test=(content,selectionx={})=>{
            const selection={cursorAt:"end",...selectionx}
            const state=makeState(content).set("selection",immutable.fromJS(selection))
            const reducer=new Reducer(state)
            expect(reducer.selection).toMatchObject(selection)
            return {selection,reducer}
        }

        it("cursorAt",()=>{
            const {reducer}=test()
            expect(reducer.cursorAt("1",1)).toMatchObject({start:{id:"1",at:1},end:{id:"1",at:1}})
            expect(reducer.cursorAt("1",2,"2",3)).toMatchObject({start:{id:"1",at:2},end:{id:"2",at:3}})
        })


    })


    describe("remove",()=>{
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

            return {selection,reducer,responsible,composer,doc:reducer.file}
        }
        describe("forward",()=>{
            fit("t|ext",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",1)
                composer.nextCursorable=jest.fn(()=>({id:"1.1",at:2}))
                reducer.remove({responsible})
                expect(reducer.$(`#1.1`).text()).toBe("txt")
                expect(reducer.file.getNode("1.1").text()).toBe("txt")
                expect(reducer.selection).toMatchObject({start:{id:"1.1",at:1},end:{id:"1.1",at:1}})
            })

            it("text|",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",4)
                composer.nextCursorable=jest.fn(()=>({id:"1.1",at:4}))
                reducer.remove({responsible})
                expect(reducer.$(`#1.1`).text()).toBe("text")
                expect(reducer.selection).toMatchObject({start:{id:"1.1",at:4},end:{id:"1.1",at:4}})
            })

            it("tex|tHello",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"text",children:"text",parent:"1"},
                    "1.2":{type:"text",children:"Hello",parent:"1"}
                })
                reducer.cursorAt("1.1",3)
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                reducer.remove({responsible})
                expect(reducer.$(`#1.1`).text()).toBe("tex")
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            it("|image",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"image",parent:"1"},
                    "1.2":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",0)
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                doc.removeNode=jest.fn()
                reducer.remove({responsible})
                expect(doc.removeNode.mock.calls[0][0]).toMatchObject({id:"1.1"})
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            it("|<anchor>image</anchor>",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"anchor",parent:"1",children:["1.1.1"]},
                    "1.1.1":{type:"image",parent:"1.1"},
                    "1.2":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",0)
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                doc.removeNode=jest.fn()
                reducer.remove({responsible})
                expect(doc.removeNode.mock.calls[0][0]).toMatchObject({id:"1.1"})
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            xit("t(ex)t",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",1,"1.1",3)
                composer.nextCursorable()
                reducer.remove({responsible})
            })
        })

        xdescribe("backword",()=>{
            it("t|ext",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",1)
                composer.prevCursorable=jest.fn(()=>({id:"1.1",at:0}))
                reducer.remove({responsible})
                expect(reducer.$(`#1.1`).text()).toBe("ext")
                expect(reducer.selection).toMatchObject({start:{id:"1.1",at:0},end:{id:"1.1",at:0}})
            })

            it("text|",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",4)
                composer.nextCursorable=jest.fn(()=>({id:"1.1",at:4}))
                reducer.remove({responsible})
                expect(reducer.$(`#1.1`).text()).toBe("text")
                expect(reducer.selection).toMatchObject({start:{id:"1.1",at:4},end:{id:"1.1",at:4}})
            })

            it("|image",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"image",parent:"1"},
                    "1.2":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",0)
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                doc.removeNode=jest.fn()
                reducer.remove({responsible})
                expect(doc.removeNode.mock.calls[0][0]).toMatchObject({id:"1.1"})
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            it("|<anchor>image</anchor>",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"anchor",parent:"1",children:["1.1.1"]},
                    "1.1.1":{type:"image",parent:"1.1"},
                    "1.2":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",0)
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                doc.removeNode=jest.fn()
                reducer.remove({responsible})
                expect(doc.removeNode.mock.calls[0][0]).toMatchObject({id:"1.1"})
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            xit("t(ex)t",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",1,"1.1",3)
                composer.nextCursorable()
                reducer.remove({responsible})
            })
        })
    })


    describe("create",()=>{

    })

    xdescribe("insert",()=>{
        describe("text",()=>{
            const test=(content,selectionx)=>{
                const selection={cursorAt:"end",...selectionx}
                const state=makeState(content).set("selection",immutable.fromJS(selection))
                const reducer=new Reducer(state)
                expect(reducer.selection).toMatchObject(selection)
                return {selection,reducer}
            }
            it("hello =>|",()=>{
                const {doc,reducer,selection}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                },{start:{id:"1.1",at:1},end:{id:"1.1",at:1}})
                const updateNode=StateDocument.prototype.updateNode=jest.fn()
                reducer.insert("hello")
                expect(updateNode.mock.calls[0][0]).toMatchObject({id:"1.1",type:"text",children:"hhelloello"})
                expect(reducer.$('#1.1').text()).toBe("hhelloello")
            })

            it("hello =>{selection}",()=>{
                const {reducer,selection}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                },{start:{id:"1.1",at:1},end:{id:"1.1",at:3}})
                reducer.insert("hello")
                expect(reducer.$(`#${1.1}`).text()).toBe("hhellolo")
            })
        })
    })

    xdescribe("update",()=>{
        describe("text",()=>{
            const test=(content,selectionx,doc={})=>{
                const selection={cursorAt:"end",...selectionx}
                const state=makeState(content,doc).set("selection",immutable.fromJS(selection))

                const reducer=new Reducer(state)
                expect(reducer.selection).toMatchObject(selection)
                doc.updateNode=jest.fn()
                doc.splitNode=jest.fn(({id},at)=>[{id,at},{id,at}])
                reducer.renderChanged=jest.fn()
                reducer.update({text:{size:5}})
                return {doc,selection,reducer}
            }
            it("cursor",()=>{
                const {doc,reducer,selection}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}},
                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                },{start:{id:"1.1",at:1},end:{id:"1.1",at:1}})

                expect(doc.updateNode).toHaveBeenCalledTimes(1)
                expect(doc.updateNode).toHaveBeenCalledWith({id:"1.1",type:"text"},{size:5})
                expect(reducer.renderChanged).toHaveBeenCalledWith("1")
                expect(reducer.selection).toMatchObject(selection)
            })

            it("inline text selection",()=>{
                const {doc,reducer,selection}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}},
                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                },{start:{id:"1.1",at:1},end:{id:"1.1",at:3}})

                expect(doc.updateNode).toHaveBeenCalledTimes(1)
                expect(doc.updateNode).toHaveBeenCalledWith({id:"1.1",type:"text"},{size:5})
                expect(reducer.renderChanged).toHaveBeenCalledWith("1")

                expect(reducer.selection).toMatchObject(selection)
            })

            it("cross text selection",()=>{
                const {doc,selection,reducer}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}},
                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                },{start:{id:"1.1",at:1},end:{id:"2.1",at:3},cursorAt:"end"})

                expect(doc.updateNode.mock.calls.map(([{id}])=>id)).toEqual(expect.arrayContaining(["1.1","2.1"]))
                expect(reducer.renderChanged.mock.calls.map(([id])=>id)).toEqual(expect.arrayContaining(["1","2"]))

                expect(reducer.selection).toMatchObject(selection)
            })

			it("textImagetext",()=>{
				const {doc,reducer,selection}=test({
                    "1":{type:"paragraph",children:["1.1","1.2","1.3"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}},
					"1.2":{type:"image",parent:"1"},
					"1.3":{type:"text",children:"hello",parent:"1",props:{size:2}},

                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                },{start:{id:"1.1",at:1},end:{id:"2.1",at:3}})

                expect(doc.updateNode.mock.calls.map(([{id}])=>id)).toEqual(expect.arrayContaining(["1.1","1.3","2.1"]))
                expect(reducer.renderChanged.mock.calls.map(([id])=>id)).toEqual(expect.arrayContaining(["1","2"]))

				expect(reducer.selection).toMatchObject(selection)
			})
			it("<paragraph/>",()=>{
				const {doc,selection,reducer}=test({
                    "1":{type:"paragraph",children:["1.1","1.2","1.3"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}},
					"1.2":{type:"image",parent:"1"},
					"1.3":{type:"text",children:"hello",parent:"1",props:{size:2}},

                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                },{start:{id:"2",at:0},end:{id:"2",at:1}})

                expect(doc.updateNode).toHaveBeenCalledTimes(1)
                expect(doc.updateNode.mock.calls[0][0]).toMatchObject({id:"2.1"})
                expect(reducer.renderChanged).toHaveBeenCalledWith("2")
                expect(reducer.selection).toMatchObject(selection)
			})
        })
    })

    describe("copy/paste",()=>{

    })

    describe("cut/paste",()=>{

    })
})
