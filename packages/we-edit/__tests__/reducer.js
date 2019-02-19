import {createState} from "../src/state"
import immutable,{Map} from "immutable"
import Reducer from "../src/input/reducer"
import {selection} from "../src/state/reducer"

describe("reducer",()=>{
    const makeState=(data={},doc={})=>{
        const content=Object.keys({"1":{},"2":{},"3":{},...data}).reduce(
            (content,k)=>content.set(k,immutable.fromJS({id:k,parent:"root",props:{},...(data[k]||{})})),
            new Map()
                .set("root",immutable.fromJS({id:"root",type:"document",children:["1","2","3"]}))
        )
        return createState(doc,content).set("_content",content.asMutable())
    }

    describe("create",()=>{

    })

    describe("insert",()=>{
        describe("text",()=>{
            const test=(content,selectionx,doc={})=>{
                const selection={cursorAt:"end",...selectionx}
                const state=makeState(content,doc).set("selection",immutable.fromJS(selection))

                const reducer=new Reducer(state)
                expect(reducer.selection).toMatchObject(selection)
                //doc.splitNode=jest.fn(({id},at)=>[{id,at},{id,at}])
                //reducer.renderChanged=jest.fn()
                return {doc,selection,reducer}
            }
            it("hello =>|",()=>{
                const {doc,reducer,selection}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                },{start:{id:"1.1",at:1},end:{id:"1.1",at:1}})
                doc.updateNode=jest.fn()
                reducer.insert("hello")
                expect(doc.updateNode.mock.calls[0][0]).toMatchObject({id:"1.1",type:"text",children:"hhelloello"})
                expect(reducer.$('#1.1').text()).toBe("hhelloello")
            })

            fit("hello =>{selection}",()=>{
                const {doc,reducer,selection}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                },{start:{id:"1.1",at:1},end:{id:"1.1",at:3}})
                doc.updateNode=jest.fn()
                doc.tailorNode=jest.fn()
                reducer.renderChanged=jest.fn()
                reducer.insert("hello")
                expect(doc.tailorNode.mock.calls[0]).toMatchObject([{id:"1.1",type:"text"},1,3])
            })
        })

        it("image",()=>{

        })
    })

    describe("update",()=>{
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

    describe("remove",()=>{

    })

    describe("copy/paste",()=>{

    })

    describe("cut/paste",()=>{

    })
})
