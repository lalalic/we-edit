import React from "react"
import {render, defaultProps} from "../context"
import {define} from "./index"

define("layout",({dom, CONTEXT, Context, WithTextContext, WithParagraphContext})=>{
    defaultProps(dom)()

    const {Frame, Paragraph, Text, Group}=dom
    Frame.defaultProps=Object.assign(Frame.defaultProps||{},{id:"frame"})

    const context={
        ...Context, 
        shouldContinueCompose(){
            return true
        }
    }

    const test=({text=TEXT,paragraph={},...props}, ctx={})=>{
        const appendComposed=context.parent.appendComposed=jest.fn()
        const renderer=render(
            <WithParagraphContext context={{...context, ...ctx}}>
                <WithTextContext>
                    <Frame {...props}>
                        <Paragraph {...paragraph}>
                            <Text>
                                {text}
                            </Text>
                        </Paragraph>
                    </Frame>
                </WithTextContext>
            </WithParagraphContext>   
        )
        expect(appendComposed).toHaveBeenCalled()
        return {
            dom:renderer.root,
            composed:appendComposed.mock.calls[0][0],
            frame: renderer.root.findByType(Frame).instance,
        }
    }
    const TEXT="hello world"
    describe("flow", ()=>{
        it("2 lines flow with max height", ()=>{
            const {frame}=test({width:5})
            expect(frame).toBeDefined()
            expect(frame.lines.length).toBe(2)
        })

        it("height is not enough for 2 lines, second line should be ignored",()=>{
            const {frame}=test({width:5, height:10})
            expect(frame).toBeDefined()
            expect(frame.lines.length).toBe(1)
        })

        it("exclusive areas",()=>{
            const wrap=jest.fn(), wrap1=jest.fn()
            const {frame}=test({width:100,space:{wrappees:[{props:{wrap}},{props:{wrap:wrap1}}]}})
            expect(wrap).toHaveBeenCalled()
            expect(wrap1).toHaveBeenCalled()
        })
    })

    describe("anchorable", ()=>{
        it("no wrap anchored content should not recompose",()=>{
            const {frame}=test({width:5})
            const anchor=jest.fn(()=><Group />)
            const recompose=frame.recompose=jest.fn()
            expect(frame.appendComposed(<Group {...{anchor, pagination:{},"data-anchor":1}}/>)).toBe(1)
            expect(recompose).not.toHaveBeenCalled()
        })

        it("wrapping anchored content but not dirty should not recompose",()=>{
            const {frame}=test({width:5})
            const wrap=jest.fn()
            const anchor=jest.fn(()=><Group {...{wrap}}/>)
            const recompose=frame.recompose=jest.fn()
            frame.__isDirtyIn=jest.fn(()=>false)
            expect(frame.appendComposed(<Group {...{anchor, pagination:{},"data-anchor":1}}/>)).toBe(1)
            expect(frame.__isDirtyIn).toHaveBeenCalled()
            expect(recompose).not.toHaveBeenCalled()
        })

        it("recompose after excluding composed area",()=>{
            const {frame}=test({width:5})
            const wrap=jest.fn()
            frame.__isDirtyIn=jest.fn(()=>true)
            const anchor=jest.fn(()=><Group {...{wrap}}/>)
            const recompose=frame.recompose=jest.fn(()=>()=>1)
            frame.appendComposed(<Group {...{anchor, pagination:{},"data-anchor":1}}/>)
            expect(recompose).toHaveBeenCalled()
        })
    })

    describe("orphan-widow",()=>{
        const prev={}
        let frame, prevLayout
        beforeEach(()=>{
            frame=test({width:5}).frame

            prev.shouldKeepLinesWith=jest.fn(()=>true)
            prev.rollbackLines=jest.fn()
            prev.orphanCount=jest.fn()

            prevLayout=context.parent.context.prevLayout=jest.fn(()=>prev)
            frame.isEmpty=jest.fn(()=>true)
        })

        afterEach(()=>{
            context.parent.context={}
        })

        it("keepLines should rollback all paragraph lines in prev",()=>{
            const count=frame.lines.length
            prev.orphanCount=jest.fn(()=>count)
            
            const rollbacks=frame.appendComposed(<Group {...{pagination:{keepLines:true}}}/>)
            expect(prevLayout).toHaveBeenCalled()
            
            expect(prev.rollbackLines).toHaveBeenCalledWith(count)
            expect(rollbacks).toBe(count+1)
        })

        it("1 orphan line (but not only) should be rollback",()=>{
            prev.orphanCount=jest.fn(()=>1)
            prev.lines=[1,2]
            const rollbacks=frame.appendComposed(<Group {...{pagination:{orphan:true}}}/>)
            expect(prevLayout).toHaveBeenCalled()
            expect(prev.rollbackLines).toHaveBeenCalledWith(1)
            expect(rollbacks).toBe(1+1)
        })

        it("1 orphan line (and only 1 line in prev) should be rollback",()=>{
            prev.orphanCount=jest.fn(()=>1)
            prev.lines=[1]
            expect(()=>
                frame.appendComposed(<Group {...{pagination:{orphan:true}}}/>)
            ).toThrowError("prev.shouldKeepWithNext is not a function")
            expect(prevLayout).toHaveBeenCalled()
            expect(prev.rollbackLines).not.toHaveBeenCalledWith()
        })

        it("last widow line should trigger prev rollback 1 line, prev leaves left line length >1",()=>{
            prev.orphanCount=jest.fn(()=>3)
            prev.lines=[1,2,3,4,5]
            frame.appendComposed(<Group {...{pagination:{widow:true,last:true}}}/>)
            expect(prev.rollbackLines).toHaveBeenCalledWith(1)
            expect(prev.rollbackLines).toHaveBeenCalledTimes(1)
        })

        it("prev 2 orphan lines should be with widow",()=>{
            prev.orphanCount=jest.fn(()=>2)
            prev.lines=[1,2,3,4,5]
            frame.appendComposed(<Group {...{pagination:{widow:true,last:true, orphan:true}}}/>)
            expect(prev.rollbackLines).toHaveBeenCalledTimes(2)
        })

        xit("widow 2: NOT SUPPORT YET",()=>{

        })

        xit("orphan 2: NOT SUPPORT YET",()=>{

        })
    })

    describe("columns",()=>{
        it("2 columns with unlimited height, but only 1 column with 2 lines", ()=>{
            const {frame}=test({cols:[{x:0,width:5},{x:6,width:5}]})
            expect(frame).toBeDefined()
            expect(frame.columns[0].lines.length).toBe(2)
            expect(frame.columns[1]).toBeFalsy()
        })

        it("2 columns with 1 line height, each column has 1 line", ()=>{
            const {frame}=test({cols:[{x:0,width:5,height:10},{x:6,width:5,height:10}]})
            expect(frame).toBeDefined()
            expect(frame.columns[0].lines.length).toBe(1)
            expect(frame.columns[1].lines.length).toBe(1)
        })

        describe("balance", ()=>{
            const balance=cols=>{
                const composers={}
                const {frame}=test(
                    {cols,balance:true,text:"hello hello hello hello hello hello"},
                    {   
                        mount(a){
                            composers[a.props.id]=a
                        },
                        getComposer(id){
                            return composers[id]
                        }
                    }
                )
                return frame.columns.map(a=>a.lines.length).join(",")
            }
            it("2 even balance",()=>{
                expect(balance([{x:0,width:5},{x:6,width:5}])).toBe("3,3")
            })

            it("3 even balance",()=>{
                expect(balance([{x:0,width:5},{x:6,width:5},{x:6,width:5}])).toBe("2,2,2")
            })

            it("2 odd balance",()=>{
                expect(balance([{x:0,width:5},{x:6,width:12}])).toBe("2,2")
            })
        })
    })


})