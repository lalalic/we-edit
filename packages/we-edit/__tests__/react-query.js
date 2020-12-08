import React from "react"
import ReactQuery from "../src/tools/react-query"
import {fromJS, isKeyed, Record} from "immutable"

describe("react query", ()=>{
    fdescribe("immutable implementation",()=>{
        it("immutable",()=>{
            
            const $=<div><span>hello</span><i d="1">good</i></div>

            const Component=Record({key:null,ref:null, type: null, props:{}})
            const imu=fromJS($, (k, v)=>{
                debugger
                switch(k){
                    case "children":{
                        if(typeof(v)=="string"){
                            return v
                        }
                        if(isKeyed(v)){
                            return Component(v)
                        }
                        return v.toList()
                    }
                    case "props":
                        return v.toMap()
                    case "":
                        return Component(v)

                }
                return v
            })
            debugger
        })

        
    })

    describe("can query by ",()=>{
        it("any prop",()=>{
            const $=new ReactQuery(<div><span>hello</span><i d="1">good</i></div>)   
            expect($.findFirst(`[d="1"]`).length).toBe(1)
        })

        it(".className", ()=>{
            const first=new ReactQuery(<div><span className="good">hello</span><i d="1">good</i></div>)
                .findFirst(`.good`)
            expect(first.length).toBe(1)
        })

        it("#id",()=>{
            const first=new ReactQuery(<div><span id="good">hello</span><i d="1">good</i></div>)
                .findFirst(`#good`)
            expect(first.length).toBe(1)
        })

        it("type/displayName",()=>{
            const first=new ReactQuery(<div><span className="good">hello</span><i d="1">good</i></div>)
                .findFirst(`i`)
            expect(first.length).toBe(1)
        })

        it('type.className',()=>{
            const first=new ReactQuery(<div><span className="good">hello</span><i d="1">good</i></div>)
                .findFirst(`span.good`)
            expect(first.length).toBe(1)
        })

        it("*", ()=>{
            const $=new ReactQuery(<div><i d="1">good</i><span className="good"><span>hello</span><i>bad</i></span></div>)
            expect($.findFirst("*").attr('type')).toBe('div')  
        })

        it("[d=1]",()=>{
            const $=new ReactQuery(<div><i d="1">good</i><span className="good"><span>hello</span><i>bad</i></span></div>)
            expect($.findFirst("[d=1]").attr('type')).toBe('i')  
        })

        it("[d='1 2']",()=>{
            const $=new ReactQuery(<div><i d="1 2" a=".+-sd">good</i><span className="good"><span>hello</span><i>bad</i></span></div>)
            expect($.findFirst("[d='1 2']").attr('type')).toBe('i')  
            expect($.findFirst("[a='.+-sd']").attr('type')).toBe('i')  
        })

        xit("unions not supported yet: >< +~",()=>{
            expect("unions supported").toBe(true)
        })
    })

    describe(".findFirst",()=>{
        it("true to stop immediately",()=>{
            const paths=[]
            const first=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good">good</i></div>)
                .findFirst(a=>{
                    paths.push(a)
                    if(a.props.className=="good"){
                        return true
                    }
                })
            expect(first.length).toBe(1)
            expect(paths.length).toBe(2)
        })

        it("false to avoid go deep",()=>{
            const paths=[]
            const first=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
                .findFirst(a=>{
                    paths.push(a)
                    if(a.type=="span"){
                        return false
                    }
                })
            expect(first.length).toBe(0)
            expect(paths.length).toBe(3)
        })

        it("found should not be changed/cloned",()=>{
            const root=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
            expect(root.findFirst("span").get(0)).toBe(root.findFirst("span").get(0))
            expect(root.findFirst("i").get(0)).toBe(root.findFirst("i").get(0))
        })

        describe("findFirstAndParents",()=>{
            it("true to stop immediately",()=>{
                const paths=[]
                const {first}=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good">good</i></div>)
                    .findFirstAndParents(a=>{
                        paths.push(a)
                        if(a.props.className=="good"){
                            return true
                        }
                    })
                expect(first.length).toBe(1)
                expect(paths.length).toBe(2)
            })

            it("false to avoid go deep",()=>{
                const paths=[]
                const {first}=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
                    .findFirstAndParents(a=>{
                        paths.push(a)
                        if(a.type=="span"){
                            return false
                        }
                    })
                expect(first.length).toBe(0)
                expect(paths.length).toBe(3)
            })

            it("{first,parents}",()=>{
                const $=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
                Array.from(["i.good",a=>a.type=="i"&&a.props.className=="good"||undefined]).forEach(test=>{
                    const {first,parents}=$.findFirstAndParents(test)
                    expect(first.length).toBe(1)
                    expect(parents.length).toBe(2)
                })
            })
        })
    })

    describe(".findLast",()=>{
        it("true to stop immediately",()=>{
            const paths=[]
            const last=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good">good</i></div>)
                .findLast(a=>{
                    paths.push(a)
                    if(a.props.className=="good"){
                        return true
                    }
                })
            expect(last.length).toBe(1)
            expect(paths.length).toBe(2)
        })

        it("false to avoid go deep",()=>{
            const paths=[]
            const last=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
                .findLast(a=>{
                    paths.push(a)
                    if(a.type=="span"){
                        return false
                    }
                })
            expect(last.length).toBe(0)
            expect(paths.length).toBe(3)
        })

        it("found should not be changed/cloned",()=>{
            const root=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
            expect(root.findLast("span").get(0)).toBe(root.findLast("span").get(0))
            expect(root.findLast("i").get(0)).toBe(root.findLast("i").get(0))
        })

        describe("findLastAndParents",()=>{
            it("true to stop immediately",()=>{
                const paths=[]
                const {last}=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
                    .findLastAndParents(a=>{
                        paths.push(a)
                        if(a.props.className=="good2"){
                            return true
                        }
                    })
                expect(last.length).toBe(1)
                expect(paths.length).toBe(2)
            })

            it("false to avoid go deep",()=>{
                const paths=[]
                const {last}=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
                    .findLastAndParents(a=>{
                        paths.push(a)
                        if(a.type=="span"){
                            return false
                        }
                    })
                expect(last.length).toBe(0)
                expect(paths.length).toBe(3)
            })

            it("{last,parents}",()=>{
                const $=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
                Array.from([
                    "i.good",
                    a=>a.type=="i"&&a.props.className=="good"||undefined,
                ]).forEach(test=>{
                    const {last,parents}=$.findLastAndParents(test)
                    expect(last.length).toBe(1)
                    expect(parents.length).toBe(2)
                })
            })
        })
    })

    describe("find",()=>{
        it("always find all",()=>{
            const is=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
                .find("i")
            expect(is.length).toBe(2)
        })

        it("always iterate all, true can't control",()=>{
            const is=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
                .find(a=>{
                    if(a.type=="span" || a.type=="i"){
                        return true
                    }
                })
            expect(is.length).toBe(3)
        })

        it("always iterate all, false can't control",()=>{
            const is=new ReactQuery(<div><span className="good"><i className="good">hello</i></span><i className="good2">good</i></div>)
                .find(a=>{
                    if(a.type=="span"){
                        return false
                    }
                    return a.type=="i"
                })
            expect(is.length).toBe(2)
        })
    })

    describe("replace",()=>{
        it("single child",()=>{
            const root=new ReactQuery(
                <div>
                    <span className="good">
                        <i className="good">hello</i>
                    </span>
                </div>
            )
            const span=root.findFirst("span")

            expect(span.length).toBe(1)
            const replaced=root.replace(span,<b/>)
            expect(root.find(".good").length).toBe(2)
            expect(replaced.find(".good").length).toBe(0)

            expect(root.find("b").length).toBe(0)
            expect(replaced.find('b').length).toBe(1)

            expect(root.find("i").length).toBe(1)
            expect(replaced.find("i").length).toBe(0)
        })
        it("one of children",()=>{
            const root=new ReactQuery(
                <div>
                    <span className="good">
                        <i className="good">hello</i>
                    </span>
                    <i className="good2">good</i>
                </div>
            )
            const span=root.findFirst("span")

            expect(span.length).toBe(1)
            const replaced=root.replace(span,<b/>)
            expect(root.find(".good").length).toBe(2)
            expect(replaced.find(".good").length).toBe(0)

            expect(root.find("b").length).toBe(0)
            expect(replaced.find('b').length).toBe(1)

            expect(root.find("i").length).toBe(2)
            expect(replaced.find("i").length).toBe(1)
        })

        it("grand children",()=>{
            const root=new ReactQuery(
                <div>
                    <span className="good">
                        <i className="good">hello</i>
                    </span>
                    <i className="good2">good</i>
                </div>
            )
            const iGood=root.findFirst("i.good")

            expect(iGood.length).toBe(1)
            const replaced=root.replace(iGood,<b/>)
            expect(root.find(".good").length).toBe(2)
            expect(replaced.find(".good").length).toBe(1)

            expect(root.find("b").length).toBe(0)
            expect(replaced.find('b').length).toBe(1)

            expect(root.find("i").length).toBe(2)
            expect(replaced.find("i").length).toBe(1)
        })
    })
})
