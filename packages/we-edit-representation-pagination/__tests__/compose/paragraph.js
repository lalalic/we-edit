import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {render} from "../context"
import {define} from "./index"

define("paragraph compose",
({dom:{Paragraph, Text}, testing, CONTEXT, Context, WithTextContext, WithParagraphContext})=>{
    const TEXT="hello world"
    const test=(lineWidth=5,spacing={}, indent={},align, text=TEXT, numbering)=>{
        const context={...Context,exclusive:()=>[],...CONTEXT}
        if(testing=="editor"){
            context.numbering=()=>'*'
        }
        const nextAvailableSpace=context.parent.nextAvailableSpace=jest.fn(()=>({
            width:lineWidth,height:100
        }))
        const appendComposed=context.parent.appendComposed=jest.fn()
        const renderer=render(
            <WithParagraphContext context={context}>
                <WithTextContext>
                    <Paragraph id="1" {...{spacing,indent,align, numbering}}>
                        <Text id="0" fonts="arial" size={10}>{text}</Text>
                    </Paragraph>
                </WithTextContext>
            </WithParagraphContext>
        )
        expect(nextAvailableSpace).toHaveBeenCalled()
        expect(appendComposed).toHaveBeenCalled()
        return Object.assign(appendComposed.mock.calls.map(([line])=>line),{dom:renderer.root})
    }

    describe("indent",()=>{
        const indent=indent=>test(10,undefined,indent).map(line=>line.props.children)
        it("left",()=>{
            const lines=indent({left:1})
            expect(lines.length>0).toBe(true)
            lines.forEach(line=>expect(line.props.x).toBe(1))
        })

        it("right",()=>{
            const lines=indent({right:2})
            expect(lines.length>0).toBe(true)
            lines.forEach(line=>expect(line.props.width).toBe(10-2))
        })

        it("firstLine",()=>{
            const lines=indent({firstLine:2})
            expect(lines.length>0).toBe(true)
            expect(lines[0].props.x).toBe(2)
        })

        it("hanging",()=>{
            const lines=indent({firstLine:-2})
            expect(lines.length>0).toBe(true)
            expect(lines[0].props.x).toBe(-2)
        })
    })

    describe("spacing",()=>{
        const lineHeight=10
        it("line height(number)",()=>{
            const lines=test(5,{lineHeight:11})
            expect(lines.length>0).toBe(true)
            lines.forEach(a=>expect(a.props.height).toBe(11))
        })

        it("line height(120%)",()=>{
            const lines=test(5,{lineHeight:"120%"})
            expect(lines.length>0).toBe(true)
            lines.forEach(a=>expect(a.props.height).toBe(lineHeight*1.2))
        })


        it("top",()=>{
            const lines=test(5,{top:7})
            expect(lines[0].props.height).toBe(lineHeight+7)
        })

        it("bottom",()=>{
            const lines=test(5,{bottom:7})
            expect(lines[lines.length-1].props.height).toBe(lineHeight+7)
        })
    })

    describe("align",()=>{
        const LineWidth=20
        const align=(align,lineWidth=LineWidth,text)=>{
            let lines=test(lineWidth,undefined,undefined,align,text)
            const dom=lines.dom
            lines=lines.map(line=>line.props.children)
            expect(lines.length>0).toBe(true)
            return Object.assign(lines,{dom})
        }
        it("left",()=>{
            [align(),align("left")].forEach(([line])=>{
                const story=new ReactQuery(line).find(".story")
                expect(story.children().length).toBe(1)
                expect(story.children().eq(0).attr('x')).toBe(0)
            })
        })

        it("right",()=>{
            const [line]=align("right")
            const story=new ReactQuery(line).find(".story")
            expect(story.children().length).toBe(1)
            expect(story.children().eq(0).attr('x')).toBe(LineWidth-TEXT.length)

        })

        it("center",()=>{
            const [line]=align("center")
            const story=new ReactQuery(line).find(".story")
            expect(story.children().length).toBe(1)
            expect(story.children().eq(0).attr('x')).toBe((LineWidth-TEXT.length)/2)
        })

        it("justify: ^hello world$, last line not justify",()=>{
            const [line,last]=align("justify", 12, "hello world cool stuff")
            const story=new ReactQuery(line).find(".story")
            expect(story.children().length).toBe(4)
            expect(story.children().eq(0).attr('x')).toBe(0)
            expect(story.children().eq(1).attr('x')).toBe(5)
            expect(story.children().eq(2).attr('x')).toBe(12-5)
            //last line not justify
            expect(new ReactQuery(last).find(".story").children().length).toBe(1)
        })

        describe("<Text>  hello  world  </Text>",()=>{
            const TEXT="  hello  world   "
            const LineWidth=TEXT.length+5
            const align=(align,lineWidth=LineWidth,text=TEXT)=>{
                let lines=test(lineWidth,undefined,undefined,align,text)
                const dom=lines.dom
                lines=lines.map(line=>line.props.children)
                expect(lines.length>0).toBe(true)
                return Object.assign(lines,{dom})
            }
            it("left",()=>{
                [align(),align("left")].forEach(([line])=>{
                    const story=new ReactQuery(line).find(".story")
                    expect(story.children().length).toBe(1)
                    expect(story.children().eq(0).attr('x')).toBe(0)
                })
            })

            it("right",()=>{
                const [line]=align("right")
                const story=new ReactQuery(line).find(".story")
                expect(story.children().eq(0).attr('x')).toBe(LineWidth-TEXT.length+3)

            })

            it("center",()=>{
                const [line]=align("center")
                const story=new ReactQuery(line).find(".story")
                expect(story.children().eq(0).attr('x')).toBe((LineWidth-TEXT.length+3)/2)
            })

            it("justify",()=>{
                const lines=align("justify",14,"  Hello World Good Example  ")
                expect(lines.length).toBe(2)
                const story=new ReactQuery(lines[0]).find(".story")
                expect(story.children().eq(0).attr('x')).toBe(0)
                const whitespaces=story.find(".whitespace")
                expect(whitespaces.length).toBe(4)
                {
                    const {last,parents}=story.findLastAndParents(".whitespace")
                    expect(last.length).toBe(1)
                    expect([last.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)).toBe(14)
                }
                const texts=story.find(a=>typeof(a.props.children)=="string" && a.props.className!="whitespace")
                expect(texts.length).toBe(2)
                expect(texts.eq(1).attr('children')).toBe("World")
                {
                    const {first,parents}=story.findFirstAndParents(`[children="World"]`)
                    expect(first.length).toBe(1)
                    expect([first.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)).toBe(14-"World".length)
                }

                {//not justify the last line
                    const lastLine=new ReactQuery(lines[1])
                    expect(lastLine.find(`[data-type="text"]`).length).toBe(1)
                    const {first,parents}=lastLine.findFirstAndParents(`[data-type="text"]`)
                    expect([first.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)).toBe(0)
                }
            })
        })
    })

    describe("wordwrap",()=>{
        it("atom width>line width",()=>{
            const lines=test(4)
            expect(lines.length).toBe(2)
            expect(new ReactQuery(lines[0]).findFirst(`[data-type="text"]`).attr("children")).toMatch("hello")
            expect(new ReactQuery(lines[1]).findFirst(`[data-type="text"]`).attr("children")).toBe("world")
        })
    })

    describe("numbering",()=>{
        const numbering=numbering=>test(TEXT.length+10,undefined,undefined,undefined,undefined,numbering)
        it("*",()=>{
            const lines=numbering({label:'*', style:{fonts:"arial",size:10}})
            expect(lines.length).toBe(1)
            const line=new ReactQuery(lines[0])
            const label=line.find(".numbering")
            expect(label.length).toBe(1)
            expect(label.findFirst(`[children="*"]`).length).toBe(1)
        })

        it("label baseline same with first line",()=>{
            const lines=numbering({label:'*', style:{fonts:"arial",size:10}})
            const line=new ReactQuery(lines[0])
            const label=line.findFirstAndParents(`[children="*"]`)
            const text=line.findFirstAndParents(`[data-type="text"]`)
            expect(label.first.length).toBe(1)
            expect(text.first.length).toBe(1)

            expect([label.first.get(0),...label.parents].reduce((Y,{props:{y=0}})=>Y+y,0))
                .toBe([text.first.get(0),...text.parents].reduce((Y,{props:{y=0}})=>Y+y,0))
        })

        describe("align", ()=>{
            const LineWidth=20
            const align=(align,lineWidth=LineWidth,text,numbering={label:'*', style:{fonts:"arial",size:10}})=>{
                let lines=test(lineWidth,undefined,{left:2,firstLine:-2},align,text,numbering)
                const dom=lines.dom
                lines=lines.map(line=>line.props.children)
                expect(lines.length>0).toBe(true)
                return Object.assign(lines,{dom})
            }
            it("left",()=>{
                [align(),align("left")].forEach(([line])=>{
                    const story=new ReactQuery(line).find(".story")
                    expect(story.children().length).toBe(1)
                    expect(story.children().eq(0).attr('x')).toBe(0)
                })
            })

            it("right",()=>{
                const [line]=align("right")
                const $line=new ReactQuery(line)
                const numbering=$line.findFirstAndParents(".numbering")
                expect(numbering.first.length).toBe(1)
                expect([numbering.first.get(0), ...numbering.parents]
                    .reduce((X,{props:{x=0}})=>X+x,0))
                    .toBe(LineWidth-TEXT.length-2)

                const text=$line.findLastAndParents(`[data-type="text"]`)
                expect(text.last.length).toBe(1)
                const len=text.last.attr("children").length
                expect([text.last.get(0), ...text.parents]
                    .reduce((X,{props:{x=0}})=>X+x,0))
                    .toBe(LineWidth-len)

            })

            it("center",()=>{
                const [line]=align("center")
                const $line=new ReactQuery(line)
                const numbering=$line.findFirstAndParents(".numbering")
                expect(numbering.first.length).toBe(1)
                const leftSpace=(LineWidth-TEXT.length-2)/2
                expect([numbering.first.get(0), ...numbering.parents]
                    .reduce((X,{props:{x=0}})=>X+x,0))
                    .toBe(leftSpace)

                const text=$line.findLastAndParents(`[data-type="text"]`)
                expect(text.last.length).toBe(1)
                const len=text.last.attr("children").length
                expect([text.last.get(0), ...text.parents]
                    .reduce((X,{props:{x=0}})=>X+x,0))
                    .toBe(LineWidth-leftSpace-len)
            })

            it.each([
                [14],
                [15],
                [16]
                ])("justify with line width %d",(lineWidth)=>{
                const [line,last]=align("justify", lineWidth, "hello world cool stuff")
                expect(!!last).toBe(true)
                const story=new ReactQuery(line).find(".story")
                expect(story.find(`[data-type="text"]`)
                    .toArray()
                    .map(a=>a.props.children)
                    .join("")).toMatch(/^hello.world.$/)
                expect(story.children().length).toBe(5)
                expect(story.children().eq(0).attr('x')).toBe(0)//*
                expect(story.children().eq(1).attr('x')).toBe(2)//hello
                expect(story.children().eq(2).attr('x')).toBe(2+5)//whitespace
                expect(story.children().eq(3).attr('x')).toBe(lineWidth-5)//world
                expect(story.children().eq(4).attr('x')).toBe(lineWidth)//whitesapce
                //last line not justify
                expect(new ReactQuery(last).find(".story").children().length).toBe(1)
            })
        })
    })

    describe("empty paragraph should also append line to parent",()=>{
        it("no error",()=>{
            const [line]=test(undefined,undefined,undefined,"left","")
            expect(line.props.height).toBe(10)
        })
    })
})