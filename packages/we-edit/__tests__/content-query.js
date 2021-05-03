import immutable,{Map} from "immutable"
import {createState} from "../src/state"
import {default as QueryContent} from "../src/state/selector/query"
import {default as xQuery} from "../src/input/reducer/xquery"

describe("content query",()=>{
    const state=(data={})=>{
        const content=Object.keys({"1":{},"2":{},"3":{},...data}).reduce(
            (content,k)=>content.set(k,immutable.fromJS({id:k,parent:"root",props:{},children:[],...(data[k]||{})})),
            new Map()
                .set("root",immutable.fromJS({id:"root",type:"document",children:["1","2","3"]}))
        )
        return createState({},content).set("_content",content.asMutable())//make it work for xQuery
    }

    describe.each([["Query", QueryContent],/*["Mutable Query", xQueryContent]*/])("%s",(name,Query)=>{
        describe("can query by",()=>{
            it("[prop]",()=>{
                const $=new Query(state({
                    "1":{props:{style:1}},
                    "2":{props:{style:2, xxid:"213{a/b/c.xml}"}}
                }))
                expect($.find("[style]").length).toBe(2)
                expect($.find("[style=1]").length).toBe(1)
                expect($.find("[style=2]").length).toBe(1)
                expect($.find(`[style="2"]`).length).toBe(1)
                expect($.find(`[xxid="213{a/b/c.xml}"]`).length).toBe(1)
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
                    "3":{type:"paragraph",children:["213{a/b/c.xml}"]},
                    "213{a/b/c.xml}":{type:"text",parent:"3"}
                }))
                "1,2,3".split(",").forEach(a=>expect($.find(`#${a}`).length).toBe(1))
                expect($.find(`#213{a/b/c.xml}`).length).toBe(1)
                expect($.find(`text#213{a/b/c.xml}`).length).toBe(1)
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

            it("should avoid nested by find(,{nested:false})",()=>{
                const $=new Query(state({
                    "1":{type:"paragraph", children:["2"]},
                    "2":{type:"text",parent:"1",children:["2_1","2_2","2_3"]},
                    "2_1":{type:"text",parent:"2"},
                    "2_2":{type:"text1",parent:"2"},
                    "2_3":{type:"text",parent:"2"}
                }))

                expect($.find("text").length).toBe(3)
                expect($.find("text",{nested:false}).length).toBe(1)
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

        describe("path, $.to()",()=>{
            it("can find path in same container",()=>{
                expect(new Query(state({
                    "1":{children:["a","b","c"],type:"run"},
                    "a":{parent:"1"},
                    "b":{parent:"1"},
                    "c":{parent:"1"},
                }),"#a").to('#c').toArray()).toMatchObject("a,b,c".split(","))
            })

            it("can find path cross container",()=>{
                expect(new Query(state({
                    "1":{children:["a","b","c"],type:"run"},
                    "a":{parent:"1"},
                    "b":{parent:"1"},
                    "c":{parent:"1"},
                    "2":{children:["a2","b2","c2"],type:"run"},
                    "a2":{parent:"2"},
                    "b2":{parent:"2"},
                    "c2":{parent:"2"},
                }),"#b").to('#b2').toArray()).toMatchObject("b,c,a2,b2".split(","))
            })

            it("can find path cross container",()=>{
                expect(new Query(state({
                    "1":{children:["a","b","c"],type:"run"},
                    "a":{parent:"1"},
                    "b":{parent:"1"},
                    "c":{parent:"1"},
                    "2":{children:["a2","b2","c2"],type:"run"},
                    "a2":{parent:"2"},
                    "b2":{parent:"2"},
                    "c2":{parent:"2"},
                    "3":{children:["a3","b3","c3"],type:"run"},
                    "a3":{parent:"3"},
                    "b3":{parent:"3"},
                    "c3":{parent:"3"},
                }),"#b").to('#b3').toArray()).toMatchObject("b,c,2,a3,b3".split(","))
            })
        })
    })

    describe("xQuery to modify content",()=>{
        let $,$1
        beforeEach(()=>{
            $=new xQuery(state())
            $1=$.find('#1')    
        })
            
        it("set attribute",()=>{
            expect($1.attr('name')).toBe(undefined)
            expect($1.attr('name','tester').attr('name')).toBe('tester')
        })

        it("should merge object when value is object",()=>{
            expect($1.attr('name',{firstName:"a"}).attr('name').firstName).toBeUndefined()
            expect($1.attr('name',{firstName:"a"}).attr('name').toJS()).toMatchObject({firstName:"a"})
        })

        it("should set by forceset",()=>{
            expect($1.attr('name',{firstName:"a"},true).attr('name').firstName).toBe("a")
        })

        it(".attr(k,null) to remove attribute",()=>{
            expect($1.attr('name','tester').attr('name',null).attr('name')).toBe(undefined)
        })

        it("can't before/after on orphan node(without parent)",()=>{
            const $=new xQuery(state({"1.1":{}}))
            expect(()=>$.find("1.1").before('#1')).toThrow("orphan")
            expect(()=>$.find("1.1").after('#1')).toThrow("orphan")
        })

        it("can't before/after/append/prepend on multiple nodes/places",()=>{
            const $12=$.find('#1,#2')
            expect(()=>$12.before("#3")).toThrow("multiple")
            expect(()=>$12.after("#3")).toThrow("multiple")
            expect(()=>$12.append("#3")).toThrow("multiple")
            expect(()=>$12.prepend("#3")).toThrow("multiple")
        })

        it("orphan can be appended/prepended",()=>{
            const $=new xQuery(state({"1.1":{}}))
            expect(()=>$.find('#1').append('#1.1')).not.toThrow("orphan")
            expect(()=>$.find("#1").prepend('#1.1')).not.toThrow("orphan")
        })

        describe("modification on same parent",()=>{
            it('append',()=>{
                expect($1.append('#2').append('#3').children().map((i,a)=>a.get('id')).join(",")).toBe("2,3")
                expect($.find('#root').children().length).toBe(1)
            })

            it('append multiple nodes at a time',()=>{debugger
                expect($1.append(['2','3']).children().map((i,a)=>a.get('id')).join(",")).toBe("2,3")
                expect($1.append(['3','2']).children().map((i,a)=>a.get('id')).join(",")).toBe("3,2")
                expect($1.append('#2,#3').children().map((i,a)=>a.get('id')).join(",")).toBe("2,3")
                expect($1.append('#3,#2').children().map((i,a)=>a.get('id')).join(",")).toBe("3,2")
                
                expect($.find('#root').children().length).toBe(1)
            })
    
            it('prepend',()=>{
                expect($1.prepend('#2').prepend('#3').children().map((i,a)=>a.get('id')).join(",")).toBe("3,2")
                expect($.find('#root').children().length).toBe(1)
            })

            it('prepend multple nodes at a time',()=>{
                expect($1.prepend(['3','2']).children().map((i,a)=>a.get('id')).join(",")).toBe("3,2")
                expect($1.prepend(['2','3']).children().map((i,a)=>a.get('id')).join(",")).toBe("2,3")
                expect($1.prepend('#3,#2').children().map((i,a)=>a.get('id')).join(",")).toBe("3,2")
                expect($1.prepend('#2','#3').children().map((i,a)=>a.get('id')).join(",")).toBe("2,3")
                
                expect($.find('#root').children().length).toBe(1)

            })
    
            it('after',()=>{
                expect($1.after('#2').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("1,2,3")
                expect($.find('#root').children().length).toBe(3)
                expect($.find('#2').after('#1').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("2,1,3")
            })

            it('after multple nodes at a time',()=>{
                expect($1.after(['3','2']).parent().children().map((i,a)=>a.get('id')).join(",")).toBe("1,3,2")
                expect($.find('#root').children().length).toBe(3)
                expect($.find('#2').after(['1','3']).parent().children().map((i,a)=>a.get('id')).join(",")).toBe("2,1,3")
                expect($1.after('#3,#2').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("1,3,2")
                expect($.find('#2').after('#1,#3').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("2,1,3")
            })
    
            it('before',()=>{
                expect($1.before('#2').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("2,1,3")
                expect($.find('#root').children().length).toBe(3)
                expect($.find('#2').before('#3').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("3,2,1")
            })
            it('before multiple nodes at a time',()=>{
                expect($1.before(['2','3']).parent().children().map((i,a)=>a.get('id')).join(",")).toBe("2,3,1")
                expect($.find('#root').children().length).toBe(3)
                expect($.find('#2').before(['3','1']).parent().children().map((i,a)=>a.get('id')).join(",")).toBe("3,1,2")
                
                expect($1.before('#2,#3').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("2,3,1")
                expect($.find('#2').before('#3,#1').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("3,1,2")
            })
            
        })

        describe("modification on different parent",()=>{
            let $,$1
            beforeEach(()=>{
                $=new xQuery(state({"1.1":{},"2.1":{},"3.1":{}}))
                expect($.children().length).toBe(3)
                $1=$.find('#1')
                $1.append('#1.1')
                $.find('#2').append('#2.1')
                $.find('#3').append('#3.1')
                expect($.children().length).toBe(3)
            })

            it('append',()=>{
                expect($1.children().attr('id')).toBe(`1.1`)
                expect($.find('#2.1').parent().attr('id')).toBe('2')
                expect($.find('#3.1').parent().attr('id')).toBe('3')
            })
    
            it('prepend',()=>{
                expect($1.prepend('#2.1').prepend('#3.1').children().map((i,a)=>a.get('id')).join(",")).toBe("3.1,2.1,1.1")
            })
    
            it('after',()=>{
                expect($1.after('#2').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("1,2,3")
                expect($.find('#root').children().length).toBe(3)
                expect($.find('#2').after('#1').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("2,1,3")
                
                expect($1.after("#1.1").parent().children().map((i,a)=>a.get('id')).join(",")).toBe("2,1,1.1,3")
            })
    
            it('before',()=>{
                expect($1.before('#2').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("2,1,3")
                expect($.find('#root').children().length).toBe(3)
                expect($.find('#2').before('#3').parent().children().map((i,a)=>a.get('id')).join(",")).toBe("3,2,1")

                expect($1.before("#2.1").parent().children().map((i,a)=>a.get('id')).join(",")).toBe("3,2,2.1,1")
            })
        })
    })
})


