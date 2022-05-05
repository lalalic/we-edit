import Base from "./base"
import memoize from "memoize-one"

export default class __$1 extends Base{
    size({width,height}){
        let ext0=this.node.find("a\\:xfrm>a\\:ext")
        let inline=this.node.closest("wp\\:inline")

        const update=(x,target)=>{
            if(x){
                let cx=this.file.px2emu(x)
                let cx0=parseInt(ext0.attr(target))
                ext0.attr(target,cx)

                if(inline.length){
                    let ext1=inline.children("wp\\:extent")
                    let cx1=parseInt(ext1.attr(target))
                    ext1.attr(target,cx+cx1-cx0)
                }
            }
        }

        update(width,"cx")
        update(height,"cy")
    }

    rotate(degree){
        const rot=parseInt(degree*60000)
        const xfrm=this.node.find("a\\:xfrm")
        xfrm.attr("rot",rot)
    }

    effectExtent(props){
        return null
    }

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

    rid(rid){
        this.node.find("a\\:blip").attr("r:embed",rid)
    }

    textBox(v){
        if(v){
            this.got("wps:wsp>wps:cNvSpPr").attr('txBox',"1")
            this.got("wps:wsp>wps:txbx>w:txbxContent>w:p")
        }else{
            this.got("wps:wsp>wps:cNvSpPr").attr('txBox',"0")
            this.got("wps:wsp>wps:txbx").remove()
        }
    }

    geometry(geometry,{kind,closePath, size:{width:w,height:h}}){
        switch(kind){
            case "rect":
            case "roundRect":
                this.got("wps:wsp>wps:spPr>a:prstGeom").attr('prst',kind)
                break
            default:{
                this.got("wps:spPr>a:prstGeom").remove()
                this.got("wps:spPr>a:custGeom")
                "avLst,gdLst,ahLst,cxnLst,pathLst".split(",").forEach(a=>this.got(`a:custGeom>a:${a}`));
                this.got("a:custGeom>a:rect").attr({l:'l',r:'r',b:'b',t:'t'})
                const path=this.got('a:pathLst>a:path').attr({w:this.file.px2emu(w),h:this.file.px2emu(h)})
                const segments=geometry.segments.map(([command,a,b,c,d,e,f])=>{
                    switch(command){
                        case 'M':
                            return `<a:moveTo><a:pt x="${this.file.px2emu(a)}" y="${this.file.px2emu(b)}"/></a:moveTo>`
                        case 'L':
                            return `<a:lnTo><a:pt x="${this.file.px2emu(a)}" y="${this.file.px2emu(b)}"/></a:lnTo>`
                        case 'Q':
                            return `<a:cubicBezTo>
                                <a:pt x="${this.file.px2emu(a)}" y="${this.file.px2emu(b)}"/>
                                <a:pt x="${this.file.px2emu(c)}" y="${this.file.px2emu(d)}"/>
                                <a:pt x="${this.file.px2emu(e)}" y="${this.file.px2emu(f)}"/>
                            </a:cubicBezTo>`
                        case 'A':
                            return `<a:arcTo/>`
                        case 'Z':
                            return `<a:close/>`
                    }
                })
                closePath && segments.push("<a:close/>")
                path.append(segments.join(""))
            }
        }
    }

    remove(){
        const editor=this.constructor.Anchor.from(this)||this.constructor.Inline.from(this)
        editor.remove()
    }

    static Anchor=class Anchor extends this{
        static from(shape){
            if(shape.reducer.$target.parent("anchor").length==1){
                const editor=new this(shape.reducer)
                editor.node=shape.node
                return editor
            }
        }

        remove(){
            const r=this.node.closest("w\\:r")
            this.node.closest("mc\\:AlternateContent").remove()
            this.reducer.file.renderChanged(r)
        }

        template({offset:{x=0,y=0}={},size:{width=0,height=0}={},id,name}={}){
            ({id,name}=(a=>{
                const exists=a.map(a=>parseInt(a.attribs['id']))
                const id=Math.max(0,...exists)+1
                return {id, name:`${name} ${id}`}
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
                                                <wps:style>
                                                    <a:lnRef idx="2">
                                                        <a:schemeClr val="accent1">
                                                            <a:shade val="50000"/>
                                                        </a:schemeClr>
                                                    </a:lnRef>
                                                    <a:fillRef idx="1">
                                                        <a:schemeClr val="accent1"/>
                                                    </a:fillRef>
                                                    <a:effectRef idx="0">
                                                        <a:schemeClr val="accent1"/>
                                                    </a:effectRef>
                                                    <a:fontRef idx="minor">
                                                        <a:schemeClr val="lt1"/>
                                                    </a:fontRef>
                                                </wps:style>
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
                                <v:rect w14:anchorId="" id="" o:spid="" style=""/>
                            </w:pict>
                        </mc:Fallback>
                    </mc:AlternateContent>
                </w:r>
            `
          }
    }

    static Inline=class Inline extends this{
        static from(shape){
            if(shape.reducer.$target.parent("inline").length==1){
                const editor=new this(shape.reducer)
                editor.node=shape.node
                return editor
            }
        }

        remove(){
            const r=this.node.closest("w\\:r")
            this.node.closest("w\\:drawing").remove()
            this.reducer.file.renderChanged(r)
        }

        template(props){
            return `
            <w:drawing>
            <wp:inline distT="0" distB="0" distL="0" distR="0">
                <wp:extent cx="1636295" cy="920416"/>
                <wp:effectExtent l="0" t="0" r="0" b="0"/>
                <wp:docPr/>
                <wp:cNvGraphicFramePr>
                <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
                </wp:cNvGraphicFramePr>
                <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
                <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                    <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                        <pic:nvPicPr>
                            <pic:cNvPr/>
                            <pic:cNvPicPr/>
                        </pic:nvPicPr>
                        <pic:blipFill>
                            <a:blip r:embed="rId9"/>
                            <a:stretch>
                                <a:fillRect/>
                            </a:stretch>
                        </pic:blipFill>
                        <pic:spPr>
                            <a:xfrm>
                                <a:off x="0" y="0"/>
                                <a:ext cx="1636295" cy="920416"/>
                            </a:xfrm>
                            <a:prstGeom prst="rect">
                                <a:avLst/>
                            </a:prstGeom>
                        </pic:spPr>
                    </pic:pic>
                </a:graphicData>
                </a:graphic>
            </wp:inline>
            </w:drawing>
            `
        }
    }
}
