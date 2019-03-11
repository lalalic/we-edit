import docx4js from "../src/docx"
import DocxDocument from "../src"
import {Paragraph} from "../src/model/edit"

describe('edit',()=>{
    let doc=null
    beforeAll(()=>{
        return docx4js.create().then(docx=>{
            docx.officeDocument.content('w\\:p').remove()
            doc=docx
        })
    })

    const createDocument=(content='<w:p><w:r><w:t>hello</w:t></w:r></w:p>')=>{
        const weDoc=new Document()
        weDoc.renderChanged=jest.fn()
        weDoc.doc=doc.clone()
        weDoc.doc.officeDocument.content('w\\:body').append(content)
        return weDoc
    }

    describe("paragraph",()=>{
        describe("numbering",()=>{
            it.each([".","decimal"])("numbering paragraph with %s",type=>{
                const weDoc=createDocument()
                const p=new Paragraph(weDoc)
                p.node=p.$('w\\:p')
                p.numFmt(type)
                expect(weDoc.doc.officeDocument.numbering).toBeTruthy()
                const level=p.node.find("w\\:numPr w\\:ilvl").attr("w:val")
                const numId=p.node.find("w\\:numPr w\\:numId").attr("w:val")
                expect(level).toBe("0")
                expect(numId).toBe("0")
                const $=weDoc.doc.officeDocument.numbering
                expect($(`w\\:num`).attr("w:numId")).toBe(numId)
                expect($(`w\\:abstractNum`).attr("w:abstractNumId")).toBe($(`w\\:num w\\:abstractNumId`).attr("w:val"))
                if(type=="."){
                    expect($(`w\\:abstractNum [w\\:ilvl="0"] w\\:lvlText`).attr("w:val")).toBe(type)
                }else if(type=="decimal"){
                    expect($(`w\\:abstractNum [w\\:ilvl="0"] w\\:numFmt`).attr("w:val")).toBe(type)
                }
            })

            it("bulletify paragraph next to a bullet paragraph",()=>{
                const weDoc=createDocument(`
                    <w:p><w:r><w:t>hello</w:t></w:r></w:p>
                    <w:p><w:r><w:t>hello</w:t></w:r></w:p>
                `)
                const numbering=(n=0,char=".")=>{
                    const p=new Paragraph(weDoc)
                    p.node=p.$('w\\:p').eq(n)
                    p.numFmt(char)
                    return p
                }

                const p0=numbering(0,".")

                const p1=numbering(1,".")

                const $=weDoc.doc.officeDocument.numbering
                expect($("w\\:abstractNum").length).toBe(1)
                expect($("w\\:num").length).toBe(1)
                expect(p0.node.find("w\\:lvl").attr("w:val")).toBe(p1.node.find("w\\:lvl").attr("w:val"))
                expect(p0.node.find("w\\:numId").attr("w:val")).toBe(p1.node.find("w\\:numId").attr("w:val"))
            })

            it("bulletify paragraph next to a numberic paragraph",()=>{
                const weDoc=createDocument(`
                    <w:p><w:r><w:t>hello</w:t></w:r></w:p>
                    <w:p><w:r><w:t>hello</w:t></w:r></w:p>
                `)
                const numbering=(n=0,char=".")=>{
                    const p=new Paragraph(weDoc)
                    p.node=p.$('w\\:p').eq(n)
                    p.numFmt(char)
                    return p
                }

                const p0=numbering(0,"decimal")

                const p1=numbering(1,".")

                const $=weDoc.doc.officeDocument.numbering
                expect($("w\\:abstractNum").length).toBe(2)
                expect($("w\\:num").length).toBe(2)
                expect(p0.node.find("w\\:numId").attr("w:val")).not.toBe(p1.node.find("w\\:numId").attr("w:val"))
            })

            it("bulletify(.) paragraph next to a (>) paragraph",()=>{
                const weDoc=createDocument(`
                    <w:p><w:r><w:t>hello</w:t></w:r></w:p>
                    <w:p><w:r><w:t>hello</w:t></w:r></w:p>
                `)
                const numbering=(n=0,char=".")=>{
                    const p=new Paragraph(weDoc)
                    p.node=p.$('w\\:p').eq(n)
                    p.numFmt(char)
                    return p
                }

                const p0=numbering(0,".")

                const p1=numbering(1,">")

                const $=weDoc.doc.officeDocument.numbering
                expect($("w\\:abstractNum").length).toBe(2)
                expect($("w\\:num").length).toBe(2)
                expect(p0.node.find("w\\:numId").attr("w:val")).not.toBe(p1.node.find("w\\:numId").attr("w:val"))
            })

            describe("change",()=>{
                it("change bullet char on a bullet paragraph",()=>{
                    const weDoc=createDocument()
                    const p=new Paragraph(weDoc)
                    p.node=p.$('w\\:p')
                    p.numFmt(".")
                    p.numFmt(">")
                    expect(p.node.find("w\\:ilvl,w\\:numId").length).toBe(2)
                    const $=weDoc.doc.officeDocument.numbering
                    expect($(`w\\:abstractNum[w\\:abstractNumId="0"]>w\\:lvl[w\\:ilvl="0"]>w\\:lvlText`).attr("w:val")).toBe(">")
                })

                it("change numberic type on a bullet paragraph",()=>{
                    const weDoc=createDocument()
                    const p=new Paragraph(weDoc)
                    p.node=p.$('w\\:p')
                    p.numFmt("decimal")

                    p.numFmt("chinese")
                    expect(p.node.find("w\\:ilvl,w\\:numId").length).toBe(2)
                    const $=weDoc.doc.officeDocument.numbering
                    expect($(`w\\:abstractNum>w\\:lvl[w\\:ilvl="0"]>w\\:numFmt`).attr("w:val")).toBe("chinese")
                })

                it("change bullet on a numeric paragraph",()=>{
                    const weDoc=createDocument()
                    const p=new Paragraph(weDoc)
                    p.node=p.$('w\\:p')
                    p.numFmt("decimal")
                    p.numFmt(">")
                    expect(p.node.find("w\\:ilvl,w\\:numId").length).toBe(2)
                    const $=weDoc.doc.officeDocument.numbering
                    expect($(`w\\:abstractNum[w\\:abstractNumId="0"]>w\\:lvl[w\\:ilvl="0"]>w\\:numFmt`).attr("w:val")).toBe("decimal")
                    expect($(`w\\:abstractNum[w\\:abstractNumId="1"]>w\\:lvl[w\\:ilvl="0"]>w\\:numFmt`).attr("w:val")).toBe("bullet")
                    expect($(`w\\:abstractNum[w\\:abstractNumId="1"]>w\\:lvl[w\\:ilvl="0"]>w\\:lvlText`).attr("w:val")).toBe(">")
                })

				describe("tab numbering p",()=>{
                    const test=()=>{
                        const weDoc=createDocument(`
                            <w:p><w:r><w:t>hello</w:t></w:r></w:p>
                            <w:p><w:r><w:t>hello</w:t></w:r></w:p>
                            <w:p><w:r><w:t>hello</w:t></w:r></w:p>
                            <w:p><w:r><w:t>hello</w:t></w:r></w:p>
                        `)
                        const numbering=(n=0,char=".")=>{
                            const p=new Paragraph(weDoc)
                            p.node=p.$('w\\:p').eq(n)
                            p.numFmt(char)
                            return p
                        }
                        return {weDoc, numbering}
                    }
                    describe("demote",()=>{
                        it("all numbering p if the p  is the first numbering, and first of document",()=>{
    						const {numbering}=test()
    						const p0=numbering(0)
    						numbering(1)
    						numbering(2)
                            numbering(3,'*')

                            const levels=p0.$('w\\:p w\\:numPr w\\:ilvl')
                            expect(levels.length).toBe(4)

                            p0.numDemote()

                            expect(levels.eq(0).attr('w:val')).toBe("1")
                            expect(levels.eq(1).attr('w:val')).toBe("1")
                            expect(levels.eq(2).attr('w:val')).toBe("1")
                            expect(levels.eq(3).attr('w:val')).toBe("0")
    					})

                        it("all numbering p if the p  is the first numbering",()=>{
    						const {numbering}=test()

    						const p1=numbering(1)
    						numbering(2)
                            numbering(3,'*')

                            const levels=p1.$('w\\:p w\\:numPr w\\:ilvl')
                            expect(levels.length).toBe(3)

                            p1.numDemote()

                            expect(levels.eq(0).attr('w:val')).toBe("1")
                            expect(levels.eq(1).attr('w:val')).toBe("1")
                            expect(levels.eq(2).attr('w:val')).toBe("0")
    					})

    					it("only target numbering p if the p  is not the first numbering",()=>{
                            const {numbering}=test()

    						numbering(1)
                            const p2=numbering(2)
                            numbering(3,'*')

                            const levels=p2.$('w\\:p w\\:numPr w\\:ilvl')
                            expect(levels.length).toBe(3)

                            p2.numDemote()

                            expect(levels.eq(0).attr('w:val')).toBe("0")
                            expect(levels.eq(1).attr('w:val')).toBe("1")
                            expect(levels.eq(2).attr('w:val')).toBe("0")
    					})
                    })
                })
            })
        })

    })
})
