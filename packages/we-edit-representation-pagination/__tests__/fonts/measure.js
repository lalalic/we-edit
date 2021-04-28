import FontMeasure from "../../src/measure/font"

describe("measure",()=>{
    describe("font selection",()=>{
        it("ascii,chinese",()=>{
            const measure=new FontMeasure({fonts:{ascii:"FA",ea:"FB", fallback:"fallbackFont"},size:5})
            measure.fontExists=jest.fn(()=>true)
            expect(measure.getCharFontFamily("A")).toBe("FA")
            expect(measure.getCharFontFamily("中")).toBe("FB")
            expect(measure.getCharFontFamily(0xFFFE)).toBe("fallbackFont")
        })

        it("break string",()=>{
            const measure=new FontMeasure({fonts:{ascii:"FA",ea:"FB", fallback:"fallbackFont"},size:5})
            measure.fontExists=jest.fn(()=>true)
            const unknown=String.fromCharCode(0xFFFE).repeat(3)
            expect(measure.break(`AB C中间gre${unknown} at`))
                .toMatchObject(["AB C","中间","gre",unknown," at"])
        })

        it("hint priority: fonts[..]>fonts[fonts.hint]>fonts.fallback>fallbackMeasure.fonts[fonts.hint]>fallbackMeasure.fonts[...]>fallbackMeasure.fonts.fallback ",()=>{
            const FontMeasure1=FontMeasure.createFallbackFontsMeasure({ea:"FFB",acsii:"FFA",fallback:"FFF"})
            const measure=new FontMeasure1({fonts:{hint:"ea",ea:"FB",ascii:"FA",fallback:"FF"},size:5})
            measure.fontExists=jest.fn(()=>true)
            expect(measure.getCharFontFamily("A")).toBe("FA")
            expect(measure.getCharFontFamily("中")).toBe("FB")
            expect(measure.getCharFontFamily(0xFFFE)).toBe("FB")

            measure.fontExists=jest.fn(a=>a!="FB")
            expect(measure.getCharFontFamily(0xFFFE)).toBe("FF")

            measure.fontExists=jest.fn(a=>!["FB","FF"].includes(a))
            expect(measure.getCharFontFamily(0xFFFE)).toBe("FFB")
            
            measure.fontExists=jest.fn(a=>!["FB","FF","FFB"].includes(a))
            expect(measure.getCharFontFamily(0xFFFE)).toBe("FFF")
        })
    })
})