import React from "react"
import dom from "../src/dom"

describe("normalize props",()=>{
    it("props should be normalized",()=>{
        const {props:{width,height}}=<dom.Page size="A4"/>
        expect([width,height]).toMatchObject(dom.Page.Size.A4)
    })

    it("default props should be normalized",()=>{
        const {props:{width,height}}=<dom.Page/>
        expect([width,height]).toMatchObject(dom.Page.Size[dom.Page.defaultProps.size])
    })


    it("subclass should be normalized",()=>{
        const TypedPage=class extends dom.Page{
            static normalizePropShape(props){
                props=super.normalizePropShape(props)
                return {...props, normalized:true}
            }
        }

        const {props:{width,height,normalized,size}}=<TypedPage/>
        expect({width,height,normalized,size}).toMatchObject({
            size:dom.Page.defaultProps.size,
            normalized:true,
        })

    })

    it("switched type should be normalized to target and source types",()=>{
        const n1=dom.Section.normalizePropShape=jest.fn()
        const n2=jest.spyOn(dom.Page,"normalizePropShape")
        const Type=class extends dom.Page{
            static displayName=this.switchTypeTo(dom.Section)
        }
        const n3=jest.spyOn(Type,"normalizePropShape")
        const p=<Type/>
        expect(n3).toHaveBeenCalledTimes(1)
        expect(n1).toHaveBeenCalledTimes(1)
        expect(n2).toHaveBeenCalledTimes(1)
    })
})
