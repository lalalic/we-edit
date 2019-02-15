import {createState} from "../src/state"
import immutable,{Map} from "immutable"
import Reducer from "../src/input/reducer"
import {selection} from "../src/state/reducer"


describe("reducer",()=>{
    const makeState=(data={})=>{
        const content=Object.keys({"1":{},"2":{},"3":{},...data}).reduce(
            (content,k)=>content.set(k,immutable.fromJS({id:k,parent:"root",props:{},...(data[k]||{})})),
            new Map()
                .set("root",immutable.fromJS({id:"root",type:"document",children:["1","2","3"]}))
        )
        return createState({},content).set("_content",content.asMutable())
    }

    describe("create",()=>{

    })

    describe("insert",()=>{

    })

    describe("update",()=>{
        describe("text",()=>{
            fit("selection should not be changed",()=>{
                const selection={start:{id:"1.1",at:1},end:{id:"1.1",at:1},cursorAt:"end"}
                const state=makeState({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                }).set("selection",immutable.fromJS({start:{id:"1.1",at:1},end:{id:"1.1",at:1},cursorAt:"end"}))

                const reducer=new Reducer(state)
                debugger
                reducer.update({text:{size:5}})
                //expect(reducer.selection).toMatchObject(selection)
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
