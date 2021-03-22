import {FontManager} from "we-edit-representation-pagination"
import {Dict, Name} from "./primitives"

export default class Font extends Dict{
    static createManager(xref){
        return new Manager(xref)
    }
    static Type="Font"
    constructor({family, id}){
        super({
            Type:Name.get("Font"),
            Subtype:Name.get("Type1"),
            BaseFont: new Name(family),
            Encoding: new Name("MacRomanEncoding"),  
        })
        this.id=id
        this.font={familyName:family}
    }

    include(t){
        return t
    }
}

class SubsetFont extends Font{
    constructor({font}){
        super(...arguments)
        this.font=font
        this.subset=font.createSubset()
        this.subset.glyphs[0]===0 && this.subset.glyphs.splice(0,1);
            
        Object.defineProperties(this.subset,{
            cmap:{
                get:()=>this.cmap
            }
        })
        this.scale = 1000 / this.font.unitsPerEm
        const tag=[1, 2, 3, 4, 5, 6].map(i => String.fromCharCode((this.id.charCodeAt(i) || 74) + 16)).join('')
        this.name=new Name(`${tag}+${font.postscriptName}`)
        this.flags=(
            ()=>{
                const familyClass =
                ((this.font['OS/2'] != null
                    ? this.font['OS/2'].sFamilyClass
                    : undefined) || 0) >> 8;
                let flags = 0;
                if (this.font.post.isFixedPitch) {
                    flags |= 1 << 0;
                }
                if (1 <= familyClass && familyClass <= 7) {
                    flags |= 1 << 1;
                }
                flags |= 1 << 2; // assume the font uses non-latin characters
                if (familyClass === 10) {
                    flags |= 1 << 3;
                }
                if (this.font.head.macStyle.italic) {
                    flags |= 1 << 6;
                }
                return flags
            }
        )();
    }

    get cmap(){
        const cmapTable={
            version: 0,//format0
            length: 262,
            language: 0,
            codeMap:new Array(256).fill(0)
                .reduce((data,_,i)=>{
                    data.map[i]=data.codemap[i]||0
                    return data
                },
                {
                    codemap:this.subset.glyphs.reduce((codemap,a,i)=>{
                        const glyphy=this.font.getGlyph(a)
                        return glyphy.codePoints.reduce((map,code)=>(map[code]=i,map),codemap)
                      },{}),
                    map:new Array(256),
                }).map, 
        }
        return {
            version: 0,
            numSubtables: 3,
            tables:[
                {//unicode
                    platformID:0,
                    encodeingID: 0,
                    table:cmapTable,
                },
                {//mac
                    platformID:1,
                    encodeingID: 0,
                    table:cmapTable,
                },
                {//windows
                    platformID:3,
                    encodeingID: 1,
                    table:cmapTable,
                },
            ]
        }
    }

    include(text){
        const glyphs=this.font.glyphsForString(text)
        glyphs.forEach(a=>this.subset.includeGlyph(a))
        return text
    }

    /**
     * subset font has some required information
     * 1. cmap need table for unicode, windows, and mactosh, otherwise some reader can't correctly map
     * mactosh need operatorID=1
     * 2. stream.Length1 needed
     * 3. Font and FontDescriptor need required fields
     * 4. BaseName: Tag+PostscriptName
     * @param {*} stream 
     */

    emit(writer){
        const xref=writer.xref
        const {
            bbox:{minX:x0,minY:y0,maxX:x1,maxY:y1}, 
            italicAngle:ItalicAngle, 
            ascent,
            descent,
            capHeight=ascent,
            StemV=40,
        }=this.font
        

        const getWidths=()=>{
            const scale = this.scale
            const sortedGlyphs=this.subset.glyphs
                .map(a=>this.font.getGlyph(a))
                .sort((a,b)=>a.codePoints[0]-b.codePoints[0])
            const FirstChar=sortedGlyphs[0].codePoints[0]
            const LastChar=sortedGlyphs[sortedGlyphs.length-1].codePoints[0]
            const code2Glyph=sortedGlyphs.reduce((m,a)=>(m[`${a.codePoints[0]}`]=a, m),{})
            const Widths=new Array(LastChar-FirstChar+1).fill(0)
            Widths.forEach((a,i)=>Widths[i]=parseInt((code2Glyph[`${i+FirstChar}`]?.advanceWidth||0)*scale))
            return {Widths, FirstChar, LastChar}
        }
    
        this.merge({
            Type:Name.get("Font"),
            Subtype:Name.get("TrueType"),
            BaseFont:this.name,
            ...getWidths(),
            Encoding: Name.get("MacRomanEncoding"),
            FontDescriptor:xref.getNewRef(xref.getNewDict({
                /*required*/
                Type: Name.get("FontDescriptor"),
                FontName: this.name,
                Flags:this.flags,
                FontBBox: [x0,y0,x1,y1].map(a=>a*this.scale),
                ItalicAngle,
                Ascent: ascent*this.scale,
                Descent: descent*this.scale,
                CapHeight: capHeight* this.scale,
                StemV,
                FontFile2: xref.getNewRef(
                    writer.deflate(this.subset.encodeStream())
                ),

                /*optional */
                //XHeight: xHeight* this.scale,
                //FontWeight:weight,
                //Leading,
                //AvgWidth:parseInt(Widths.reduce((w,a)=>w+a,0)/Widths.length/this.scale),
                //MaxWidth:parseInt(Math.max(...Widths)/this.scale),
            })),
        })

        writer.writeDict(this)
    }
}

class Manager{
    constructor(xref){
        this.xref=xref
        this.items=Object.create(null)
        let id=0
        this.createId=()=>`F${++id}`
    }

    get(family){
        return this.items[family]
    }

    create(family){
        const id=this.createId()
        const font=FontManager.get(family)
        const fontObj=font ? new SubsetFont({family,font,id}) : new Font({family,id})
        return this.items[family]=this.xref.getNewRef(fontObj).obj
    }
}