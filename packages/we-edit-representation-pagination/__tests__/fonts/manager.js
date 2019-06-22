import FontManager from "../../src/fonts"

describe("font manager",()=>{
	it("can load all fonts from a folder",()=>{
        return FontManager.fromPath(__dirname)
            .then(fonts=>{
                expect(fonts.length>0).toBe(true)
            })
	})

    it("can load system fonts",()=>{
        return FontManager.fromPath()
            .then(fonts=>{
                expect(fonts.length>0).toBe(true)
            })
    },2000)



    describe("font",()=>{
        beforeAll(()=>{
            return FontManager.release().fromPath(__dirname)
        })

        it("loaded family",()=>{
            expect(FontManager.names.length).toBe(1)
        })

        it("get bold only font",()=>{
            const font=FontManager.get("verdana",{bold:true})
            expect(font).toBeDefined()
            expect(!!font.bold).toBe(true)
            expect(!!font.italic).not.toBe(true)
        })

        it("get italic only font",()=>{
            const font=FontManager.get("verdana",{italic:true})
            expect(font).toBeDefined()
            expect(!!font.bold).not.toBe(true)
            expect(!!font.italic).toBe(true)
        })

        it("get regular font",()=>{
            const font=FontManager.get("verdana")
            expect(font).toBeDefined()
            expect(!!font.bold).not.toBe(true)
            expect(!!font.italic).not.toBe(true)
        })

        it("get bold italic font",()=>{
            const font=FontManager.get("verdana",{italic:true,bold:true})
            expect(font).toBeDefined()
            expect(!!font.bold).toBe(true)
            expect(!!font.italic).toBe(true)
        })

    	it("can get line height and descent given size",()=>{
            const font=FontManager.get("verdana",{italic:true,bold:true})
            expect(font).toBeDefined()
            expect(font.lineHeight(12)>0).toBe(true)
            expect(font.lineDescent(12)>0).toBe(true)
    	})

    	it("can width string",()=>{
            const font=FontManager.get("verdana")
            expect(font.stringWidth("hello",12)>0).toBe(true)
    	})

    	it("can get subset without duplicated",()=>{
            const font=FontManager.get("verdana")
            const subset=font.createSubset();
            font.glyphsForString("helllllo").forEach(a=>{
                subset.includeGlyph(a)
            })
            expect(subset.glyphs.length).toBe(1+4)
        })
    })
})
