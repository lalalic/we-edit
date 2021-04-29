import React from "react"
import _Text from "../../src/dom/text"

describe("text compose", ()=>{
    class Text extends _Text{
        static defaultProps={
            ...super.defaultProps,
            id:"text",
            fonts:{ascii:"Arial"},
            size:10
        }
    }
    const measure={}
        
    const render=({type, props},context)=>{
        const text=new type(props,{parent:{appendComposed:jest.fn()},Measure:()=>measure,...context})
        text.render()
        text.composed=text.context.parent.appendComposed.mock.calls.map(a=>a[0])
        return text
    }

    beforeEach(()=>{
        measure.break=jest.fn(a=>a)
        measure.stringWidth=jest.fn(a=>a.length)
        measure.defaultStyle={fontFamily:"A","data-mergeid":"sss","data-postscriptname":"adf"}    
    })
    
    it("should append to parent with styles", ()=>{
        const text=render(<Text {...{children:"hello"}}/>)
        expect(text.context.parent.appendComposed).toHaveBeenCalledTimes(1)
        expect(text.composed.length).toBe(1)
        expect(text.composed[0].props).toMatchObject({children:"hello",...measure.defaultStyle})
    })
    
    it("'hello world' should append 3 times as [hello, ' ', world]",()=>{
        const text=render(<Text {...{children:"hello world"}}/>)
        expect(text.context.parent.appendComposed).toHaveBeenCalledTimes(3)
        expect(text.composed.length).toBe(3)
    })

    it("whitespace should have .whitespace, with minWidth=0",()=>{
        const text=render(<Text {...{children:" "}}/>)
        expect(text.composed[0].props).toMatchObject({className:"whitespace",minWidth:0})
    })

    it("tokenizer at begin and end, whitespace seperated",()=>{
        const text=render(<Text {...{children:"ez  gd"}}/>)
        expect(text.composed.length).toBe(4)
        expect(text.composed[0].props).toMatchObject({tokenizeOpportunity:"ez"})
        expect(text.composed[1].props.tokenizeOpportunity).toBeFalsy()
        expect(text.composed[2].props.tokenizeOpportunity).toBeFalsy()
        expect(text.composed[3].props).toMatchObject({tokenizeOpportunity:"gd"})
    })

    it("page-break should stop page layout immediately",()=>{
        const text=render(<Text {...{children:`hel${Text.PageBreak}l${Text.Tab}o${Text.LineBreak}e`}}/>)
        expect(text.composed.length).toBe(7)
        expect(text.composed[1].props).toMatchObject({children:Text.PageBreak,tokenizeOpportunity:Text.PageBreak})
        expect(text.composed[3].props).toMatchObject({children:Text.Tab,tokenizeOpportunity:Text.Tab})
        expect(text.composed[5].props).toMatchObject({children:Text.LineBreak,tokenizeOpportunity:Text.LineBreak})
    })
})
