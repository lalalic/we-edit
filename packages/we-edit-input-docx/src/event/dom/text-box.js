import Shape from "./shape"

export default class TextBox extends Shape{
    offset({x,y}){
        const anchor=this.node.closest('wp\\:anchor')
        if(anchor.attr("simplePos")=="0"){
            const $x=anchor.find("wp\\:positionH>wp\\:posOffset")
            const $y=anchor.find("wp\\:positionV>wp\\:posOffset")
            $x.text(this.reducer.file.px2emu(x))
            $y.text(this.reducer.file.px2emu(y))
        }else if(anchor.attr("simplePos")=="1"){
            const simplePos=anchor.find("wp\\:simplePos")
            simplePos.attr('x', this.reducer.file.px2emu(x))
            simplePos.attr('y', this.reducer.file.px2emu(y))
        }
    }



    template({offset:{x=0,y=0}={},size:{width=0,height=0}={},id,name}={}){
        ({id,name}=(a=>{
            const exists=a.map(a=>parseInt(a.attribs['id']))
            const id=Math.max(0,...exists)+1
            return {id, name:`text box ${id}`}
        })(this.reducer.file.doc.officeDocument.content().find('wp\\:docPr')));

        return `
            <w:r>
                <mc:AlternateContent>
                    <mc:Choice Requires="wps">
                        <w:drawing>
                            <wp:anchor distT="0" distB="0" distL="114300" distR="114300" simplePos="0" relativeHeight="251659264" behindDoc="0" locked="0" layoutInCell="1" allowOverlap="1" wp14:anchorId="1FE5F8EB" wp14:editId="5B7FF217">
                                <wp:simplePos x="0" y="0"/>
                                <wp:positionH relativeFrom="column">
                                    <wp:posOffset>
                                        ${x}
                                    </wp:posOffset>
                                </wp:positionH>
                                <wp:positionV relativeFrom="paragraph">
                                    <wp:posOffset>
                                        ${y}
                                    </wp:posOffset>
                                </wp:positionV>
                                <wp:extent cx="${width}" cy="${height}"/>
                                <wp:effectExtent l="0" t="0" r="8255" b="13335"/>
                                <wp:wrapNone/>
                                <wp:docPr id="${id}" name="${name}"/>
                                <wp:cNvGraphicFramePr/>
                                <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
                                    <a:graphicData uri="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">
                                        <wps:wsp>
                                            <wps:cNvSpPr txBox="1"/>
                                            <wps:spPr>
                                                <a:xfrm>
                                                    <a:off x="0" y="0"/>
                                                    <a:ext cx="${width}" cy="${height}"/>
                                                </a:xfrm>
                                                <a:prstGeom prst="rect">
                                                    <a:avLst/>
                                                </a:prstGeom>
                                                <a:solidFill>
                                                    <a:schemeClr val="lt1"/>
                                                </a:solidFill>
                                                <a:ln w="6350">
                                                    <a:solidFill>
                                                        <a:prstClr val="black"/>
                                                    </a:solidFill>
                                                </a:ln>
                                            </wps:spPr>
                                            <wps:txbx>
                                                <w:txbxContent>
                                                    <w:p w14:paraId="778287C3" w14:textId="77777777" w:rsidR="004A534D" w:rsidRDefault="004A534D"/>
                                                </w:txbxContent>
                                            </wps:txbx>
                                            <wps:bodyPr rot="0" spcFirstLastPara="0" vertOverflow="overflow" horzOverflow="overflow" vert="horz" wrap="square" lIns="91440" tIns="45720" rIns="91440" bIns="45720" numCol="1" spcCol="0" rtlCol="0" fromWordArt="0" anchor="t" anchorCtr="0" forceAA="0" compatLnSpc="1">
                                                <a:prstTxWarp prst="textNoShape">
                                                    <a:avLst/>
                                                </a:prstTxWarp>
                                                <a:noAutofit/>
                                            </wps:bodyPr>
                                        </wps:wsp>
                                    </a:graphicData>
                                </a:graphic>
                            </wp:anchor>
                        </w:drawing>
                    </mc:Choice>
                    <mc:Fallback>
                        <w:pict>
                            <v:shapetype w14:anchorId="1FE5F8EB" id="_x0000_t202" coordsize="21600,21600" o:spt="202" path="m,l,21600r21600,l21600,xe">
                                <v:stroke joinstyle="miter"/>
                                <v:path gradientshapeok="t" o:connecttype="rect"/>
                            </v:shapetype>
                            <v:shape id="${name}" o:spid="_x0000_s1026" type="#_x0000_t202" style="position:absolute;margin-left:204.9pt;margin-top:49.55pt;width:127.4pt;height:41pt;z-index:251659264;visibility:visible;mso-wrap-style:square;mso-wrap-distance-left:9pt;mso-wrap-distance-top:0;mso-wrap-distance-right:9pt;mso-wrap-distance-bottom:0;mso-position-horizontal:absolute;mso-position-horizontal-relative:text;mso-position-vertical:absolute;mso-position-vertical-relative:text;v-text-anchor:top" fillcolor="white [3201]" strokeweight=".5pt">
                                <v:textbox>
                                    <w:txbxContent>
                                        <w:p w14:paraId="778287C3" w14:textId="77777777" w:rsidR="004A534D" w:rsidRDefault="004A534D"/>
                                    </w:txbxContent>
                                </v:textbox>
                            </v:shape>
                        </w:pict>
                    </mc:Fallback>
                </mc:AlternateContent>
            </w:r>
        `
    }
}