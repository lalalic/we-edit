import docx4js from "../src/docx"
import {Paragraph} from "../src/event/dom"

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
            const test=(content=1)=>{
                const weDoc=createDocument(
                    typeof(content)=="string" ? content : new Array(content).fill('<w:p><w:r><w:t>hello</w:t></w:r></w:p>').join("")
                )
                const numbering=(n=0, props=props)=>{
                    const p=new Paragraph({file:weDoc})
                    p.node=p.$('w\\:p').eq(n)
                    p.numbering(props)
                    return p
                }

                const level=(p,numPr=p.got("w:numPr"))=>{
                    const $=p.file.doc.officeDocument.numbering
                    const numId=numPr.children("w\\:numId").attr("w:val")
                    const level=parseInt(numPr.children("w\\:ilvl").attr("w:val")||0)
                    const aNumId=$(`w\\:num[w\\:numId="${numId}"]>w\\:abstractNumId`).attr("w:val")
                    return $(`w\\:abstractNum[w\\:abstractNumId="${aNumId}"]>w\\:lvl[w\\:ilvl="${level}"]`)
                }

                return {numbering, level}
            }

            it.each([
                ["bullet",{format:"bullet",label:"."}],
                ["bullet",{format:"bullet",label:"*"}],
                ["decimal",{format:"decimal",label:"%1."}],
                ["chinese",{format:"chinese",label:"%1",start:5}],
            ])("create %s",(name,props)=>{
                const {numbering,level}=test()
                const p0=numbering(0,props)
                expect(level(p0).find("w\\:lvlText").attr("w:val")).toBe(props.label)
                expect(level(p0).find("w\\:numFmt").attr("w:val")).toBe(props.format)
                if(props.start){
                    expect(parseInt(level(p0).find("w\\:start").attr("w:val"))).toBe(props.start)
                }
            })

            it.each([
                ["bullet(.-->*)",{format:"bullet",label:"."}, {label:"*"}],
                ["bullet-->decimal",{format:"bullet",label:"*"}, {format:"decimal",label:"%1."}],
                ["decimal-->bullet",{format:"decimal",label:"%1."},{format:"bullet",label:"*"}],
                ["chinese-->decimal",{format:"chinese",label:"%1",start:5}, {format:"decimal",label:"%1."}],
            ])("change %s",(name,origin, props)=>{
                const {numbering,level}=test()
                const p0=numbering(0,origin)
                numbering(0,props)
                expect(level(p0).find("w\\:lvlText").attr("w:val")).toBe(props.label)
                expect(level(p0).find("w\\:numFmt").attr("w:val")).toBe(props.format||origin.format)
                if(props.start||origin.start){
                    expect(parseInt(level(p0).find("w\\:start").attr("w:val"))).toBe(props.start||origin.start)
                }
            })

            it.each([
                ["bullet(*) with bullet(*)",{format:"bullet",label:"*"},{format:"bullet",label:"*"},true],
                ["bullet(*) with bullet()",{format:"bullet",label:"*"},{format:"bullet"},true],
                ["bullet(*) with decimal()",{format:"bullet",label:"*"},{format:"decimal"},false],
                ["bullet(*) with decimal(%1)",{format:"bullet",label:"*"},{format:"decimal",label:"%1"},false],
                ["decimal(%1) with decimal(%1.)",{format:"decimal",label:"%1"},{format:"decimal",label:"%1."},false],
            ])("follow %s",(name,prev, props,same)=>{
                const {numbering,level}=test(4)
                const p1=numbering(1,prev)
                const p2=numbering(2,props)
                const numId1=p1.got("w:numPr").find("w\\:numId").attr("w:val")
                const numId2=p2.got("w:numPr").find("w\\:numId").attr("w:val")
                expect(numId1==numId2).toBe(same)
            })

            describe("demote",()=>{
                it("first numbering, indent of all level increased",()=>{
                    const {numbering}=test(4)
                    const p0=numbering(0,{format:"bullet",label:"*"})
                    p0.node.children("w\\:pPr")
                        .remove()
                        .appendTo(p0.$(`w\\:p`))

                    const $=p0.file.doc.officeDocument.numbering
                    const inds=$(`w\\:lvl w\\:ind`).map((i,el)=>parseInt(el.attribs["w:left"])).get()
                    p0.numDemote()
                    const levels=p0.$('w\\:p w\\:numPr w\\:ilvl')
                    new Array(4).fill(0).forEach((a,i)=>expect(levels.eq(i).attr('w:val')).toBe("0"))
                    const changedInds=$(`w\\:lvl w\\:ind`).map((i,el)=>parseInt(el.attribs["w:left"])).get()
                    expect(inds.reduce((good,ind,i)=>good&&changedInds[i]>ind,true)).toBe(true)
                })

                it("second numbering, only second demoted",()=>{
                    const {numbering}=test(4)
                    const p0=numbering(0,{format:"bullet",label:"*"})
                    p0.node.children("w\\:pPr")
                        .remove()
                        .appendTo(p0.$(`w\\:p`))

                    p0.node=p0.node.next()
                    p0.numDemote()

                    const levels=p0.$('w\\:p w\\:numPr w\\:ilvl')
                    expect(levels.length).toBe(4)
                    expect(levels.eq(1).attr('w:val')).toBe("1")
                    ;[0,2,3].forEach(i=>expect(levels.eq(i).attr('w:val')).toBe("0"))
                })

                it("second numbering following next level, only second demote",()=>{
                    const {numbering}=test(4)
                    const p0=numbering(0,{format:"bullet",label:"*"})
                    p0.node.children("w\\:pPr")
                        .remove()
                        .appendTo(p0.$(`w\\:p`))

                    p0.node=p0.node.next().next()
                    p0.numDemote()//p2 demoted

                    p0.node=p0.node.prev()
                    p0.numDemote()

                    const levels=p0.$('w\\:p w\\:numPr w\\:ilvl')
                    expect(levels.length).toBe(4)
                    expect(levels.eq(1).attr('w:val')).toBe("1")
                    expect(levels.eq(2).attr('w:val')).toBe("1")
                    ;[0,3].forEach(a=>expect(levels.eq(a).attr('w:val')).toBe("0"))
                })

                it("to max level then extend abstractNum to multiple level",()=>{
                    const {numbering}=test(4)
                    const p0=numbering(0,{format:"bullet",label:"*"})
                    const $=p0.file.doc.officeDocument.numbering
                    $(`w\\:lvl`).not(`[w\\:ilvl="0"]`).remove()
                    expect($(`w\\:lvl`).length).toBe(1)

                    const p1=numbering(1,{format:"bullet",label:"*"})
                    debugger
                    p1.numDemote()
                    expect($(`w\\:lvl`).length>1).toBe(true)
                })

                it("level 9 not work",()=>{
                    const {numbering}=test(4)
                    const p0=numbering(0,{format:"bullet",label:"*"})
                    const p1=numbering(1,{format:"bullet",label:"*"})
                    p1.node.find("w\\:ilvl").attr('w:val',"8")

                    p1.numDemote()
                    expect(p1.node.find("w\\:ilvl").attr('w:val')).toBe("8")
                })
            })

            describe("promote",()=>{
                it("first numbering, indent of all level decreased",()=>{
                    const {numbering}=test(4)
                    const p0=numbering(0,{format:"bullet",label:"*"})
                    p0.node.children("w\\:pPr")
                        .remove()
                        .appendTo(p0.$(`w\\:p`))

                    const $=p0.file.doc.officeDocument.numbering
                    const inds=$(`w\\:lvl w\\:ind`).map((i,el)=>parseInt(el.attribs["w:left"])).get()

                    p0.numPromote()
                    const levels=p0.$('w\\:p w\\:numPr w\\:ilvl')
                    new Array(4).fill(0).forEach((a,i)=>expect(levels.eq(i).attr('w:val')).toBe("0"))
                    const changedInds=$(`w\\:lvl w\\:ind`).map((i,el)=>parseInt(el.attribs["w:left"])).get()
                    expect(inds.reduce((good,ind,i)=>good&&changedInds[i]<ind,true)).toBe(true)
                })

                it("first numbering, first indent==hanging, nothing changed",()=>{
                    const {numbering}=test(4)
                    const p0=numbering(0,{format:"bullet",label:"*"})
                    p0.node.children("w\\:pPr")
                        .remove()
                        .appendTo(p0.$(`w\\:p`))

                    const $=p0.file.doc.officeDocument.numbering
                    $(`w\\:lvl w\\:ind`).eq(0).attr("w:left","360").attr("w:hanging","360")
                    const inds=$(`w\\:lvl w\\:ind`).map((i,el)=>parseInt(el.attribs["w:left"])).get()

                    p0.numPromote()
                    const levels=p0.$('w\\:p w\\:numPr w\\:ilvl')
                    new Array(4).fill(0).forEach((a,i)=>expect(levels.eq(i).attr('w:val')).toBe("0"))
                    const changedInds=$(`w\\:lvl w\\:ind`).map((i,el)=>parseInt(el.attribs["w:left"])).get()
                    expect(inds.reduce((good,ind,i)=>good&&changedInds[i]==ind,true)).toBe(true)
                })

                it("second numbering, only second promoted",()=>{
                    const {numbering}=test(4)
                    const p0=numbering(0,{format:"bullet",label:"*"})
                    p0.node.children("w\\:pPr")
                        .remove()
                        .appendTo(p0.$(`w\\:p`))

                    p0.node.nextAll().find("w\\:ilvl").attr("w:val","1")
                    var levels=p0.$('w\\:p w\\:numPr w\\:ilvl')
                    expect(levels.eq(0).attr('w:val')).toBe("0")
                    ;[1,2,3].forEach(a=>expect(levels.eq(a).attr('w:val')).toBe("1"))

                    p0.node=p0.node.next()
                    p0.numPromote()

                    levels=p0.$('w\\:p w\\:numPr w\\:ilvl')
                    expect(levels.length).toBe(4)
                    ;[0,1].forEach(a=>expect(levels.eq(a).attr('w:val')).toBe("0"))
                    ;[2].forEach(a=>expect(levels.eq(a).attr('w:val')).toBe("1"))
                })

                it("level 1 not work",()=>{
                    const {numbering}=test(4)
                    const p0=numbering(0,{format:"bullet",label:"*"})
                    const p1=numbering(1,{format:"bullet",label:"*"})

                    p1.numPromote()
                    expect(p1.node.find("w\\:ilvl").attr('w:val')).toBe("0")
                })
            })

            it("tab numbering",()=>{
                const {numbering}=test(2)
                const p0=numbering(0,{format:"bullet",label:"*"})
                p0.numDemote=jest.fn()
                p0.tab({})
                expect(p0.numDemote).toHaveBeenCalled()
                p0.numPromote=jest.fn()
                p0.tab({shiftKey:true})
                expect(p0.numPromote).toHaveBeenCalled()

                p0.node=p0.node.next()
                var ind=parseInt(p0.got("w:ind").attr("w:left"))||0
                p0.tab({})
                expect(parseInt(p0.got("w:ind").attr("w:left"))>ind).toBe(true)
                ind=parseInt(p0.got("w:ind").attr("w:left"))||0
                p0.tab({})
                expect(parseInt(p0.got("w:ind").attr("w:left"))>ind).toBe(true)

                ind=parseInt(p0.got("w:ind").attr("w:left"))||0
                p0.tab({shiftKey:true})
                expect(parseInt(p0.got("w:ind").attr("w:left"))<ind).toBe(true)
                ind=parseInt(p0.got("w:ind").attr("w:left"))||0
                p0.tab({shiftKey:true})
                expect(parseInt(p0.got("w:ind").attr("w:left"))<ind).toBe(true)

                p0.tab({shiftKey:true})
                p0.tab({shiftKey:true})
                expect(parseInt(p0.got("w:ind").attr("w:left"))==0).toBe(true)
                p0.tab({shiftKey:true})
                expect(parseInt(p0.got("w:ind").attr("w:left"))==0).toBe(true)
            })
        })

        it.each([
            [1,2,false],[1,2],[9,9],
            [1,1,true],[4,3,true],[9,8,true]
        ])("tab Heading%d->Heading%d with shiftKey:%s",(pre,pro,shiftKey=undefined)=>{
            const weDoc=createDocument(
                new Array(9).fill(0)
                    .map((a,i)=>`<w:p><w:pPr><w:pStyle w:val="Heading${i+1}"/></w:pPr><w:r><w:t>hello</w:t></w:r></w:p>`)
                    .join("")
            )
            const p=new Paragraph({file:weDoc})
            p.node=p.$("w\\:p").eq(pre-1)
            debugger
            p.tab({shiftKey})
            expect(p.node.find("w\\:pStyle").attr("w:val")).toBe(`Heading${pro}`)
        })
    })
})
