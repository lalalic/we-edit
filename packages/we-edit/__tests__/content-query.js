import immutable,{Map} from "immutable"
import {createState} from "../src/state"
import {default as QueryContent} from "../src/state/selector/query"
import {default as xQueryContent} from "../src/input/reducer/xquery"

describe("content query",()=>{
    const state=(data={})=>{
        const content=Object.keys({"1":{},"2":{},"3":{},...data}).reduce(
            (content,k)=>content.set(k,immutable.fromJS({id:k,parent:"root",props:{},...(data[k]||{})})),
            new Map()
                .set("root",immutable.fromJS({id:"root",type:"document",children:["1","2","3"]}))
        )
        return createState({},content).set("_content",content.asMutable())//make it work for xQuery
    }

    describe.each([["Query", QueryContent],["Mutable Query", xQueryContent]])("%s",(name,Query)=>{
        describe("can query by",()=>{
            it("[prop]",()=>{
                const $=new Query(state({
                    "1":{props:{style:1}},
                    "2":{props:{style:2}}
                }))
                expect($.find("[style]").length).toBe(2)
                expect($.find("[style=1]").length).toBe(1)
                expect($.find("[style=2]").length).toBe(1)
            })

            it("type",()=>{
                const $=new Query(state({
                    "1":{type:"paragraph"},
                    "2":{type:"text"},
                    "3":{type:"paragraph"},
                }))
                expect($.find("paragraph").length).toBe(2)
                expect($.find("text").length).toBe(1)

            })

            it("#id",()=>{
                const $=new Query(state({
                    "1":{type:"paragraph"},
                    "2":{type:"text"},
                    "3":{type:"paragraph"},
                }))
                "1,2,3".split(",").forEach(a=>expect($.find(`#${a}`).length).toBe(1))
            })

            it("non-existance #id",()=>{
                const $=new Query(state({
                    "1":{type:"paragraph"},
                    "2":{type:"text"},
                    "3":{type:"paragraph"},
                }))
                expect($.find(`#8_1`).length).toBe(0)
            })

            it("paragraph text, >",()=>{
                const $=new Query(state({
                    "1":{type:"paragraph", children:["2"]},
                    "2":{type:"span",parent:"1",children:["2_1","2_2","2_3"]},
                    "2_1":{type:"text",parent:"2"},
                    "2_2":{type:"text1",parent:"2"},
                    "2_3":{type:"text",parent:"2"},

                    "3":{type:"span",parent:"1",children:["3_1","3_2","3_3"]},
                    "3_1":{type:"text",parent:"3"},
                    "3_2":{type:"text1",parent:"3"},
                    "3_3":{type:"text",parent:"3"}
                }))
                expect($.find(`paragraph text`).length).toBe(4)
                expect($.find(`paragraph text1`).length).toBe(2)
                expect($.find(`#1 #3_3`).length).toBe(1)
                expect($.find(`paragraph>text`).length).toBe(0)
                expect($.find(`paragraph>span`).length).toBe(2)
            })

            it(".className",()=>{
                const $=new Query(state({
                    "1":{props:{className:"paragraph"}},
                    "2":{props:{className:"text"}},
                    "3":{props:{className:"paragraph"}},
                }))
                expect($.find(".paragraph").length).toBe(2)
                expect($.find(".text").length).toBe(1)
            })

            it(",,",()=>{
                const $=new Query(state({
                    "1":{props:{className:"paragraph"}},
                    "2":{props:{className:"text"}},
                    "3":{props:{className:"paragraph"}},
                }))
                expect($.find(".paragraph,.text").length).toBe(3)
                expect($.find(".paragraph,.text,#2").length).toBe(3)
                expect($.find(".text,#2").length).toBe(1)
                expect($.find(".text,#1").length).toBe(2)
            })

            it("+",()=>{
                const $=new Query(state({
                    "1":{type:"table"},
                    "2":{type:"paragraph"},
                    "3":{type:"paragraph"}
                }))
                expect($.find("paragraph+paragraph").length).toBe(1)
                expect($.findFirst("paragraph+paragraph").attr('id')).toBe("3")

                const $1=new Query(state({
                    "1":{type:"paragraph"},
                    "2":{type:"table"},
                    "3":{type:"paragraph"}
                }))
                expect($1.find("paragraph+paragraph").length).toBe(0)
            })
        })

        describe("new Query(state,selector)",()=>{
            it("(state,#1)",()=>{
                const $=new Query(state(),"#1")
                expect($.length).toBe(1)
                expect($.get(0).get("id")).toBe("1")
            })

            it("(state,'#1,#2')",()=>{
                const $=new Query(state(),"#1,#3")
                expect($.length).toBe(2)
                expect($.get(0).get("id")).toBe("1")
                expect($.get(1).get("id")).toBe("3")
            })

        })

        describe(".attr()",()=>{
            it("*",()=>{
                expect(new Query(state({"1":{props:{x:1}}}),"*").attr("x")).toBe(1)
            })

            it("children",()=>{
                expect(new Query(state({
                    "1":{children:["f","g"]},
                    "f":{},
                    "g":{}
                }),"#1").attr("children").toJS()).toMatchObject(["f","g"])
            })

            it("type",()=>{
                expect(new Query(state({"1":{type:"good"}}),"#1").attr("type")).toBe("good")
            })

            it("parent",()=>{
                expect(new Query(state(),"#1").attr("parent")).toBe("root")
            })

            it("id",()=>{
                expect(new Query(state(),"#1").attr("id")).toBe("1")
                expect(new Query(state()).attr("id")).toBe("root")
            })
        })

        it("parent([selector]), parents([selector])",()=>{
            const $=new Query(state({
                "1":{children:["a","b"]},
                "a":{parent:"1"},
                "b":{parent:'1'}
            }),"#a")
            expect($.parent().length).toBe(1)
            expect($.parent().attr("id")).toBe("1")
            expect($.parent("notype").length).toBe(0)

            expect($.parents().length).toBe(2)
            expect($.parents().toArray()).toMatchObject(["1","root"])
            expect($.parents("#root").length).toBe(1)
        })

        it("closest([selector])(from self)",()=>{
            const $=new Query(state({
                "1":{children:["a","b"],type:"run"},
                "a":{parent:"1"},
                "b":{parent:"1"}
            }),"#a")

            expect($.closest().length).toBe(1)
            expect($.closest().attr("id")).toBe("a")
            expect($.closest("run").length).toBe(1)
            expect($.closest("run").attr("id")).toBe("1")
            expect($.closest("document").length).toBe(1)
            expect($.closest("#root").attr("id")).toBe("root")
        })

        it("closestStart",()=>{
            const $=new Query(state({
                "1":{children:["a","b"],type:"run"},
                "a":{parent:"1"},
                "b":{parent:"1"}
            }))
            expect($.find('#a').closestStart("run").is("run")).toBe(true)
            expect($.find('#a').closestStart().is("#root")).toBe(true)
            expect($.find('#b').closestStart().is("#b")).toBe(true)
        })

        it("closestEnd",()=>{
            const $=new Query(state({
                "1":{children:["a","b"],type:"run"},
                "a":{parent:"1"},
                "b":{parent:"1"}
            }))
            expect($.find('#b').closestEnd("run").is("run")).toBe(true)
            expect($.find('#b').closestEnd().is("#1")).toBe(true)
            expect($.find('#a').closestEnd().is("#a")).toBe(true)
        })

        it("findFirst/Last",()=>{
            const $=new Query(state({
                "1":{type:"paragraph"},
                "2":{type:"text"},
                "3":{type:"paragraph"},
            }))
            expect($.findFirst("paragraph").length).toBe(1)
            expect($.findLast("paragraph").length).toBe(1)

            expect($.findFirst("paragraph").attr("id")).toBe("1")
            expect($.findLast("paragraph").attr("id")).toBe("3")
        })
    })
})
