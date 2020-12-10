import Base from "./base"
import {Field} from "../../render/dom/field"

export default class TOC extends Base{
    numpages({canvas}){
        const reducer=this.reducer
        const toc=reducer.$('#ToC')
        toc.find('fieldBegin[command=PAGEREF]').each((i,field,$)=>{
            const tocId=Field.create(field.getIn(['props','instr'])).parameters[0]
            const bookmark=reducer._content.find(a=>a.get('type')=="bookmarkBegin" && a.getIn(['props','name'])==tocId)
            const {topFrame}=canvas.positioning.position({id:bookmark.get('id'),at:0},true)
            const display=Field.create("PAGE").execute({
                selection:{
                    props:type=>{
                        switch(type){
                            case 'page':
                                return {topFrame}
                            case 'section':
                                return {pgNumType:canvas.getContent(bookmark.get('id')).closest('section').attr('pgNumType')?.toJS()}
                        }
                    }
                }
            })
            reducer.file
                .getNode(field.get('id')).forwardUntil("w\\:fldChar[w\\:fldCharType=end]","w\\:t")
                .text(display)
        })
    }

    whole(){
        const $toc=this.reducer.$('#ToC')
        const next=$toc.forwardFirst('paragraph')
        const instr=this.reducer.file.getNode('ToC')
            .forwardUntil('w\\:fldChar[w\\:fldCharType=separate]','w\\:instrText')
            .text()
        this.reducer.remove_toc()
        this.reducer.cursorAt(next.attr('id'),0)
        this.reducer.create_toc({instr})
    }

    static template1({page="",tocid,level,text}){
        return `
            <w:p>
                <w:pPr>
                    <w:pStyle w:val="TOC${level}"/>
                    <w:tabs>
                        <w:tab w:val="right" w:leader="dot" w:pos="9350"/>
                    </w:tabs>
                    <w:rPr>
                        <w:b w:val="0"/>
                        <w:bCs w:val="0"/>
                        <w:i w:val="0"/>
                        <w:iCs w:val="0"/>
                        <w:noProof/>
                        <w:lang w:val="en-CN"/>
                    </w:rPr>
                </w:pPr>
                <w:hyperlink w:anchor="_Toc${tocid}" w:history="1">
                    <w:r w:rsidRPr="005E466A">
                        <w:rPr>
                            <w:rStyle w:val="Hyperlink"/>
                            <w:noProof/>
                        </w:rPr>
                        <w:t>
                            ${text}
                        </w:t>
                    </w:r>
                    <w:r>
                        <w:rPr>
                            <w:noProof/>
                            <w:webHidden/>
                        </w:rPr>
                        <w:tab/>
                    </w:r>
                    <w:r>
                        <w:rPr>
                            <w:noProof/>
                            <w:webHidden/>
                        </w:rPr>
                        <w:fldChar w:fldCharType="begin"/>
                    </w:r>
                    <w:r>
                        <w:rPr>
                            <w:noProof/>
                            <w:webHidden/>
                        </w:rPr>
                        <w:instrText xml:space="preserve"> PAGEREF _Toc${tocid} \h </w:instrText>
                    </w:r>
                    <w:r>
                        <w:rPr>
                            <w:noProof/>
                            <w:webHidden/>
                        </w:rPr>
                    </w:r>
                    <w:r>
                        <w:rPr>
                            <w:noProof/>
                            <w:webHidden/>
                        </w:rPr>
                        <w:fldChar w:fldCharType="separate"/>
                    </w:r>
                    <w:r>
                        <w:rPr>
                            <w:rFonts w:hint="eastAsia"/>
                            <w:noProof/>
                            <w:webHidden/>
                        </w:rPr>
                        <w:t>${page}</w:t>
                    </w:r>
                    <w:r>
                        <w:rPr>
                            <w:noProof/>
                            <w:webHidden/>
                        </w:rPr>
                        <w:fldChar w:fldCharType="end"/>
                    </w:r>
                </w:hyperlink>
            </w:p>
        `
    }

    static template(headings){
        return this.prototype.trim(`
            <w:sdt>
                <w:sdtPr>
                    <w:id w:val="-${Date.now()}"/>
                    <w:docPartObj>
                        <w:docPartGallery w:val="Table of Contents"/>
                        <w:docPartUnique/>
                    </w:docPartObj>
                </w:sdtPr>
                <w:sdtEndPr>
                </w:sdtEndPr>
                <w:sdtContent>
                    <w:p>
                        <w:pPr>
                            <w:pStyle w:val="TOCHeading"/>
                        </w:pPr>
                        <w:r>
                            <w:t>
                                Table of Contents
                            </w:t>
                        </w:r>
                    </w:p>
                    ${headings.join("\r\n")}
                    <w:p>
                        <w:r>
                            <w:rPr>
                                <w:b/>
                                <w:bCs/>
                                <w:noProof/>
                            </w:rPr>
                            <w:fldChar w:fldCharType="end"/>
                        </w:r>
                    </w:p>
                </w:sdtContent>
            </w:sdt>
        `)
    }

    static field(instr){
        return this.prototype.trim(`
            <w:r>
                <w:rPr>
                    <w:b w:val="0"/>
                    <w:bCs w:val="0"/>
                </w:rPr>
                <w:fldChar w:fldCharType="begin"/>
            </w:r>
            <w:r>
                <w:instrText xml:space="preserve"> ${instr} </w:instrText>
            </w:r>
            <w:r>
                <w:rPr>
                    <w:b w:val="0"/>
                    <w:bCs w:val="0"/>
                </w:rPr>
                <w:fldChar w:fldCharType="separate"/>
            </w:r>
        `)
    }
}