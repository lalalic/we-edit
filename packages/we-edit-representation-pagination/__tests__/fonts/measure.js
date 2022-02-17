jest.mock("../../src/fonts")
import FontManager from "../../src/fonts"
import FontMeasure from "../../src/measure/font"

describe("measure",()=>{
    describe("font selection",()=>{
        it(`{ascii:"FA",ea:"FB", fallback:"fallbackFont"} make A for FA, 中 for FB, 0xFFFE for fallbakfont`,()=>{
            const measure=new FontMeasure({fonts:{ascii:"FA",ea:"FB", fallback:"fallbackFont"},size:5})
            measure.fontExists=jest.fn(()=>true)
            expect(measure.getCharFontFamily("A")).toBe("FA")
            expect(measure.getCharFontFamily("中")).toBe("FB")
            expect(measure.getCharFontFamily(0xFFFE)).toBe("fallbackFont")
        })

        it('{ascii:"FA",ea:"FB", fallback:"fallbackFont"} should break `AB C中间gre0xFFFE at` to ["AB C","中间","gre",oxFFFE," at"]',()=>{
            const measure=new FontMeasure({fonts:{ascii:"FA",ea:"FB", fallback:"fallbackFont"},size:5})
            measure.fontExists=jest.fn(()=>true)
            const unknown=String.fromCharCode(0xFFFE).repeat(3)
            expect(measure.break(`AB C中间gre${unknown} at`))
                .toMatchObject(["AB C","中间","gre",unknown," at"])
        })

        fdescribe("priority: fonts[..]>fonts.fallback>fallbackMeasure.fonts[...]>fallbackMeasure.fonts.fallback ",()=>{
            const FontMeasure1=FontMeasure.createMeasureClassWithFallbackFonts({ea:"FFB",acsii:"FFA",fallback:"FFF"})
            let measure=null
            beforeEach(()=>measure=new FontMeasure1({fonts:{ea:"FB",ascii:"FA",fallback:"FF"},size:5}))

            it("segments",()=>{
                measure.fontExists=jest.fn(()=>true)
                expect(measure.getCharFontFamily("A")).toBe("FA")
                expect(measure.getCharFontFamily("中")).toBe("FB")
                expect(measure.getCharFontFamily(0xFFFE)).toBe("FF")
            })

            it("current fallback",()=>{
                measure.fontExists=jest.fn(a=>a!="FB")
                expect(measure.getCharFontFamily("中")).toBe("FF")
            })


            it("system fallback segment",()=>{
                measure.fontExists=measure.fallbackFontsMeasure.fontExists=jest.fn(a=>!["FB","FF"].includes(a))
                expect(measure.getCharFontFamily("中")).toBe("FFB")
            })

            it("system fallback",()=>{
                measure.fontExists=measure.fallbackFontsMeasure.fontExists=jest.fn(a=>!["FB","FF","FFB"].includes(a))
                expect(measure.getCharFontFamily(0xFFFE)).toBe("FFF")
            })

            it("cache",()=>{
                measure.fontExists=jest.fn(()=>true)
                expect(measure.getCharFontFamily("中")).toBe("FB")
                expect(measure.getCharFontFamily("A")).toBe("FA")
                measure.fontExists.mockClear()
                expect(measure.getCharFontFamily("中")).toBe("FB")
                expect(measure.getCharFontFamily("A")).toBe("FA")
                expect(measure.fontExists).toHaveBeenCalledTimes(0)
            })
        })

        it.each([
            ["{fallback:'FA'}",{fallback:'FA'}],
            ["fonts:FA","FA"]
        ])("%s should always select FA for any character", (test, fonts)=>{
            const measure=new FontMeasure({fonts,size:5})
            measure.fontExists=jest.fn(()=>true)
            expect(measure.getCharFontFamily("A")).toBe("FA")
            expect(measure.getCharFontFamily("中")).toBe("FA")
            expect(measure.getCharFontFamily(0xFFFE)).toBe("FA")
        })

        
        describe("style selection",()=>{
            const font={lineHeight:()=>10,lineDescent:()=>5,stringWidth:jest.fn(),postscriptName:"A"}
            function test(style,...args){
                FontManager.get=jest.fn(()=>font)
                const measure=new FontMeasure({fonts:{ascii:"Arial"},...style},...args)
                measure.fontExists=jest.fn(()=>true)
                const defaultStyle=measure.defaultStyle
                expect(defaultStyle).toMatchObject({fontFamily:"Arial","data-postscriptname":"A",height:10,descent:5,})
                expect(FontManager.get).toHaveBeenCalled()
                return measure
            }

            it("mergid, postscriptname are defined in defaultstyle",()=>{
                const measure=test()
                expect(measure.defaultStyle["data-postscriptname"]).toBeTruthy()
                expect(measure.defaultStyle["data-mergeid"]).toBeTruthy()
            })

            it("{bold} select bold font",()=>{
                test({bold:true})
                expect(FontManager.get.mock.calls[0]).toMatchObject(["Arial",{bold:true}])
            })
    
            it("{italic} select italic font",()=>{
                test({italic:true})
                expect(FontManager.get.mock.calls[0]).toMatchObject(["Arial",{italic:true}])
            })
    
            it("{bold,italic} select bold and italic font",()=>{
                test({bold:true,italic:true})
                expect(FontManager.get.mock.calls[0]).toMatchObject(["Arial",{bold:true,italic:true}])
            })

            it("underline=single|true|...",()=>{
                let measure=test({underline:"single",size:10})
                expect(measure.defaultStyle).toMatchObject({descent:5, underline:{kind:"single",pos:2.5,thick:1}})
                measure.lineHeight=jest.fn(()=>({underlinePos:10,underlineThick:5}))
                expect(measure.defaultStyle).toMatchObject({underline:{kind:"single",pos:10,thick:5}})

                measure=test({size:10})
                expect('underline' in measure.defaultStyle).not.toBe(true)
            })
    
            it("vertAlign=superscript|subscript",()=>{
                let measure=test({vertAlign:"superscript",size:10})
                expect(parseInt(measure.defaultStyle.fontSize)<10).toBe(true)
                expect(parseInt(measure.defaultStyle.y)<10).toBe(true)

                measure=test({vertAlign:"subscript",size:10})
                expect(parseInt(measure.defaultStyle.fontSize)<10).toBe(true)
                expect('y' in measure.defaultStyle).not.toBe(true)
            })

            describe("cache",()=>{
                it("same family,size,bold,italic should get same measure",()=>{
                    const style={fonts:"Arial",size:11}
                    let regular, bold, italic, boldItalic, underline, vertAlign
                    expect(regular=test(style,true)).toBe(test(style,true))
                    expect(bold=test({...style,bold:true},true)).toBe(test({...style,bold:true},true))
                    expect(italic=test({...style,italic:true},true)).toBe(test({...style,italic:true},true))
                    expect(boldItalic=test({...style,bold:true,italic:true},true)).toBe(test({...style,bold:true,italic:true},true))
                    
                    expect(italic).not.toBe(regular)
                    expect(bold).not.toBe(regular)
                    expect(regular).not.toBe(test({...style,size:12},true))

                    expect(regular).not.toBe(underline=test({...style,underline:"single"},true))
                    expect(regular).not.toBe(vertAlign=test({...style,vertAlign:"subscript"},true))
                    expect(vertAlign).not.toBe(test({...style,vertAlign:"superscript"},true))

                    expect(regular.cache).toBe(vertAlign.cache)
                    expect(regular.cache).toBe(underline.cache)
                })
            })
        })
    })
})