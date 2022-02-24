import React,{Component} from "react"
import PropTypes from "prop-types"
import {dom, ReactQuery, render} from "we-edit"
import {withContext} from "recompose"
import {Editors, Viewers} from "we-edit-representation-pagination"
import Measure from "we-edit-representation-pagination/__tests__/measure"

import Docx from "../../src/type"
import Style from "../../src/render/styles"

describe("paragraph",()=>{
    describe("tab",()=>{
        const Tab=dom.Text.Tab
        function test(text,tabs, selector='[data-type="text"][children="world"]'){
            const {Paragraph,Text,Frame}=new Docx().transform(Editors)
            const appendComposed=jest.fn()
            const composers={}
            const WithContext=withContext(
                {
                    ...Editors.Frame.contextTypes,
                    Measure: PropTypes.func,
                },
                ()=>({
                    parent:{
                        appendComposed,
                    },
                    shouldContinueCompose:()=>true,
                    Measure,
                    mount(a){
                        composers[a.props.id]=a
                    },
                    getComposer(id){
                        return composers[id]
                    }
                })
            )(({children})=>children)
            Object.assign(Style.Paragraph.Direct.prototype,{
                flat:jest.fn(()=>({})),
                flat4Character: jest.fn(()=>({})),
                inherit:jest.fn(),
            })

            return render(
                <WithContext>
                    <Frame id="frame" width={50}>
                        <Paragraph id="p" tabs={tabs} style={Object.create(Style.Paragraph.Direct.prototype)}>
                            <Text id="t" fonts="Arial" size={10}>{text}</Text>
                        </Paragraph>
                    </Frame>
                </WithContext>
            ).then(()=>{
                expect(appendComposed).toHaveBeenCalledTimes(1)
                const composed=appendComposed.mock.calls[0][0]
                const $=new ReactQuery(composed)
                const {first, parents}=$.findFirstAndParents(selector)
                return new Proxy(first,{
                    get(first,k,proxy){
                        switch(k){
                            case "x":
                                return [first.get(0),...parents].reduce((X,{props:{x=0}}={props:{}})=>X+x,0)
                            default:
                                return Reflect.get(...arguments)
                        }
                    }
                })
            })
        }
        it("left tab should push next content start at tabstop",()=>{
            return test("hello "+Tab+"world",[{pos:15}]).then(world=>{
                expect(world.x).toBe(15)
            })
        })

        it("right tab should push next content end at tabstop",()=>{
            return test("hello "+Tab+"world",[{pos:15,align:"right"}]).then(world=>{
                expect(world.x).toBe(15-5)
            })
        })

        it("center tab should push next content centered at tabstop",()=>{
            return test("hello "+Tab+"world",[{pos:15,align:"center"}]).then(world=>{
                expect(world.x).toBe(15-5/2)
            })
        })

        it("decimal tab should push point of number in next content start at tabstop",()=>{
            return test("hello "+Tab+"a 2.5 world",[{pos:15,align:"decimal"}],'[children=" world"]').then(world=>{
                expect(world.x).toBe(17)
            })
        })

        it("decimal tab should push number in next content start at tabstop",()=>{
            return test("hello "+Tab+"a 25 world",[{pos:15,align:"decimal"}],'[children=" world"]').then(world=>{
                expect(world.x).toBe(15)
            })
        })

        it("default tab is from document.defaultTab, and tabAlign in state",()=>{

        })
    })

    describe("list",()=>{
        
    })
})