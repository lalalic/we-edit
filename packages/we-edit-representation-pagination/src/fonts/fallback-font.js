import FontKit from "fontkit"
import cloneDeep from "clone"
export default function createFallbackFont(font){
    return new Promise((resolve,reject)=>{
        return 
        const subset=font.createSubset()
        subset.includeGlyph(font.glyphsForString('a')[0])

        subset.extendStructure=(Directory,CmapSubtable)=>{ 
            CmapSubtable.preEncode=function(){
                this.length=CmapSubtable.size(this)
            }
            const preEncode=Directory.preEncode
            Directory.preEncode=function(){
                try{
                    const table={
                        version: 13,//format
                        reserved:0,
                        length:0,//?
                        language: 0,
                        nGroups:1,
                        groups: [{
                            startCharCode:0x1,
                            endCharCode:0xFFFE,
                            glyphID:1,
                        }]
                    }
                    this.tables.cmap={
                        version: 0,
                        numSubtables:1,
                        tables: [
                            {
                                //windows
                                platformID: 3,
                                encodingID: 10,//platformSpecificID
                                table,
                            }
                        ]
                    }

                    this.tables.name={
                        version:0,
                        records:{
                            fontFamily:{en:"fallback"},
                            fontSubfamily:{en:"regular"},
                            fullName:{en:"fallback regular"},
                            postscriptName:{en:"we-fallback"}
                        }
                    }

                    const globals=fontMetrics(subset)
                    Object.assign(this.tables.head,{
                        xMin: globals.xMin,
                        yMin: globals.yMin,
                        xMax: globals.xMax,
                        yMax: globals.yMax
                    })

                    Object.assign(this.tables.hhea,{
                        ascent: globals.ascender,
                        descent: globals.descender,
                        advanceWidthMax: globals.advanceWidthMax,
                        minLeftSideBearing: globals.minLeftSideBearing,
                        minRightSideBearing: globals.minRightSideBearing,
                        xMaxExtent: globals.maxLeftSideBearing + (globals.xMax - globals.xMin),
                    })



                    //this.tables.post=cloneDeep(font.post)
                    //this.tables['OS/2']=cloneDeep(font['OS/2'])
                    
                    preEncode.call(this)
                }finally{
                    Directory.preEncode=preEncode
                }
            }
        }
        const stream=subset.encodeStream(), data=[]
        stream.on('data',trunk=>{
            data.push(trunk)
        })
        stream.on('end',()=>{
            resolve(data)
        })
    })
    .then(data=>{
        const fallback=FontKit.create(Buffer.concat(data))
        const source=font

        return fallback
    })
}

function fontMetrics(font){
    const xMins = [];
    const yMins = [];
    const xMaxs = [];
    const yMaxs = [];
    const advanceWidths = [];
    const leftSideBearings = [];
    const rightSideBearings = [];
    let firstCharIndex;
    let lastCharIndex = 0;
    let ulUnicodeRange1 = 0;
    let ulUnicodeRange2 = 0;
    let ulUnicodeRange3 = 0;
    let ulUnicodeRange4 = 0;

    for (let i = 0; i < font.glyphs.length; i += 1) {
        const glyph = font.font.getGlyph(font.glyphs[i]);;
        const unicode = glyph.codePoints[0] | 0;
/*
        if (firstCharIndex > unicode || firstCharIndex === undefined) {
            // ignore .notdef char
            if (unicode > 0) {
                firstCharIndex = unicode;
            }
        }

        if (lastCharIndex < unicode) {
            lastCharIndex = unicode;
        }

        const position = os2.getUnicodeRange(unicode);
        if (position < 32) {
            ulUnicodeRange1 |= 1 << position;
        } else if (position < 64) {
            ulUnicodeRange2 |= 1 << position - 32;
        } else if (position < 96) {
            ulUnicodeRange3 |= 1 << position - 64;
        } else if (position < 123) {
            ulUnicodeRange4 |= 1 << position - 96;
        } else {
            throw new Error('Unicode ranges bits > 123 are reserved for internal usage');
        }
        */
        // Skip non-important characters.
        if (glyph.name === '.notdef') continue;
        const {
            _metrics:{advanceWidth, leftBearing:leftSideBearing=0, rightBearing:rightSideBearing=0}, 
            bbox:{maxX:xMax, maxY:yMax, minX:xMin, minY:yMin}} = glyph;
        xMins.push(xMin);
        yMins.push(yMin);
        xMaxs.push(xMax);
        yMaxs.push(yMax);
        leftSideBearings.push(leftSideBearing);
        rightSideBearings.push(rightSideBearing);
        advanceWidths.push(advanceWidth);
    }

    const globals = {
        xMin: Math.min.apply(null, xMins),
        yMin: Math.min.apply(null, yMins),
        xMax: Math.max.apply(null, xMaxs),
        yMax: Math.max.apply(null, yMaxs),
        advanceWidthMax: Math.max.apply(null, advanceWidths),
        advanceWidthAvg: average(advanceWidths),
        minLeftSideBearing: Math.min.apply(null, leftSideBearings),
        maxLeftSideBearing: Math.max.apply(null, leftSideBearings),
        minRightSideBearing: Math.min.apply(null, rightSideBearings)
    };
    globals.ascender = font.font.ascent;
    globals.descender = font.font.descent;


    return globals
}

function average(widths){
    const total=widths.reduce((s,a)=>s+=a,0)
    return total/widths.length
}