import { FontManager } from "we-edit-representation-pagination";
import { Dict, Name } from "./primitives";

export default class Font extends Dict {
	static createManager(xref) {
		return new Manager(xref);
	}
	static Type = "Font";
	constructor({ family, id }) {
		super({
			Type: Name.get("Font"),
			Subtype: Name.get(Standard.is(family) ? "Type1" : "TrueType"),
			BaseFont: new Name(family),
			Encoding: new Name("WinAnsiEncoding"),
		});
		this.id = id;
		this.font = { familyName: family };
	}

	include(t) {
		return t;
	}

	isStandard(family){
		return family in Standard
	}
}

class SubsetFont extends Font {
	constructor({ font }) {
		super(...arguments);
		this.font = font;
		this.subset = font.createSubset();
        
		Object.defineProperties(this.subset, {
			cmap: {
				get: () => this.cmap,
			},
		});
		this.scale = 1000 / this.font.unitsPerEm;
		const tag = [1, 2, 3, 4, 5, 6]
			.map((i) => String.fromCharCode((this.id.charCodeAt(i) || 74) + 16))
			.join("");
		this.name = new Name(`${tag}+${font.postscriptName}`);
		this.flags = (() => {
			const familyClass =
				((this.font["OS/2"] != null
					? this.font["OS/2"].sFamilyClass
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
			return flags;
		})();
	}

	get cmap() {
		const cmapTable = {
			version: 0, //format0
			length: 262,
			language: 0,
			codeMap: new Array(256).fill(0).reduce(
				(data, _, i) => {
					data.map[i] = data.codemap[i] || 0;
					return data;
				},
				{
					codemap: this.subset.glyphs.reduce((codemap, a, i) => {
						const glyphy = this.font.getGlyph(a);
						return glyphy.codePoints.reduce(
							(map, code) => ((map[code] = i), map),
							codemap
						);
					}, {}),
					map: new Array(256),
				}
			).map,
		};
		return {
			version: 0,
			numSubtables: 3,
			tables: [
				{
					//unicode
					platformID: 0,
					encodeingID: 0,
					table: cmapTable,
				},
				{
					//mac
					platformID: 1,
					encodeingID: 0,
					table: cmapTable,
				},
				{
					//windows
					platformID: 3,
					encodeingID: 1,
					table: cmapTable,
				},
			],
		};
	}

	include(text) {
		const glyphs = this.font.glyphsForString(text);
		glyphs.forEach(glyph => {
            const gid=this.subset.includeGlyph(glyph.id)
            /*
            if(!this.widths[gid]){
                this.widths[gid]=glyph.advanceWidth * this.scale;
            }
            if(!this.unicode[gid]){
                this.unicode[gid]=glyph.codePoints
            }
            */
        });
		return text;
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

	emit(writer) {
		const xref = writer.xref;
		const {
			bbox: { minX: x0, minY: y0, maxX: x1, maxY: y1 },
			italicAngle: ItalicAngle,
			ascent,
			descent,
			capHeight = ascent,
			StemV = 40,
		} = this.font;

		const getWidths = () => {
			const scale = this.scale;
			const sortedGlyphs = this.subset.glyphs.slice(1)
				.map((a) => this.font.getGlyph(a))
				.sort((a, b) => a.codePoints[0] - b.codePoints[0]);
			const FirstChar = sortedGlyphs[0].codePoints[0];
			const LastChar =
				sortedGlyphs[sortedGlyphs.length - 1].codePoints[0];
			const code2Glyph = sortedGlyphs.reduce(
				(m, a) => ((m[`${a.codePoints[0]}`] = a), m),
				{}
			);
			const Widths = new Array(LastChar - FirstChar + 1).fill(0);
			Widths.forEach(
				(a, i) =>
					(Widths[i] = parseInt(
						(code2Glyph[`${i + FirstChar}`]?.advanceWidth || 0) *
							scale
					))
			);
			return { Widths, FirstChar, LastChar };
		};

		this.merge({
			Type: Name.get("Font"),
			Subtype: Name.get("TrueType"),
			BaseFont: this.name,
			...getWidths(),
			Encoding: Name.get("MacRomanEncoding"),
			FontDescriptor: xref.getNewRef(
				xref.getNewDict({
					/*required*/
					Type: Name.get("FontDescriptor"),
					FontName: this.name,
					Flags: this.flags,
					FontBBox: [x0, y0, x1, y1].map((a) => a * this.scale),
					ItalicAngle,
					Ascent: ascent * this.scale,
					Descent: descent * this.scale,
					CapHeight: capHeight * this.scale,
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
				})
			),
		});

		writer.writeDict(this);
	}
}

class EmbedFont extends SubsetFont {
	emit(writer) {
		const isCFF = this.subset.cff != null;
		const fontFile = writer.xref.getNewRef(writer.deflate(this.subset.encodeStream())).obj

		if (isCFF) {
			fontFile.data.Subtype = Name.get("CIDFontType0C");
		}

		const name = this.name

		const { bbox } = this.font;
		
		this.merge({
			Type: Name.get("Font"),
			Subtype: Name.get("Type0"),
			BaseFont: name,
			Encoding: Name.get("Identity-H"),
			DescendantFonts: [writer.xref.getNewRef(writer.xref.getNewDict({
                Type: Name.get("Font"),
                Subtype: Name.get("CIDFontType0"),
                BaseFont: name,
                CIDSystemInfo: writer.xref.getNewDict({
                    Registry: "Adobe",
                    Ordering: "Identity",
                    Supplement: 0,
                }),
                FontDescriptor: writer.xref.getNewRef(writer.xref.getNewDict({
                    Type: Name.get("FontDescriptor"),
                    FontName: name,
                    Flags: this.flags,
                    FontBBox: [
                        bbox.minX * this.scale,
                        bbox.minY * this.scale,
                        bbox.maxX * this.scale,
                        bbox.maxY * this.scale,
                    ],
                    ItalicAngle: this.font.italicAngle,
                    Ascent: this.ascender,
                    Descent: this.descender,
                    CapHeight: (this.font.capHeight || this.font.ascent) * this.scale,
                    XHeight: (this.font.xHeight || 0) * this.scale,
                    StemV: 0,
                    [isCFF ? "FontFile3" : "FontFile2"]: fontFile.ref
                })),
                W: [0, this.widths],
                ...(!isCFF ? {Subtype:Name.get("CIDFontType2"), CIDToGIDMap: Name.get("Identity")} : {}),
            }))],
			ToUnicode: this.toUnicodeCmap(writer),
		})

		writer.writeDict(this)
	}

    toUnicodeCmap(writer){
        const entries = [];
        for (let codePoints of this.unicode) {
          const encoded = [];
    
          // encode codePoints to utf16
          for (let value of codePoints) {
            if (value > 0xffff) {
              value -= 0x10000;
              encoded.push(toHex(((value >>> 10) & 0x3ff) | 0xd800));
              value = 0xdc00 | (value & 0x3ff);
            }
    
            encoded.push(toHex(value));
          }
    
          entries.push(`<${encoded.join(' ')}>`);
        }
    
       return writer.xref.getNewRef(writer.deflate(`\
/CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo <<
    /Registry (Adobe)
    /Ordering (UCS)
    /Supplement 0
>> def
/CMapName /Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<0000><ffff>
endcodespacerange
1 beginbfrange
<0000> <${toHex(entries.length - 1)}> [${entries.join(' ')}]
endbfrange
endcmap
CMapName currentdict /CMap defineresource pop
end
end\
`))
    }
}

class Manager {
	constructor(xref) {
		this.xref = xref;
		this.items = Object.create(null);
		let id = 0;
		this.createId = () => `F${++id}`;
	}

	get(postscriptName) {
		return this.items[postscriptName];
	}

	create(postscriptName) {
		const id = this.createId();
		const font = FontManager.byPostscriptName(postscriptName);
		const fontObj = font
			? new SubsetFont({ family: postscriptName, font, id })
			: new Font({ family: postscriptName, id });
		return (this.items[postscriptName] = this.xref.getNewRef(fontObj).obj);
	}
}

const toHex = function(num) {
    return `0000${num.toString(16)}`.slice(-4);
}

const Standard={
	is(family){
		return family in this
	},

	Courier() {
	  
	},
  
	'Courier-Bold'() {
	  
	},
  
	'Courier-Oblique'() {
	  
	},
  
	'Courier-BoldOblique'() {
	  
	},
  
	Helvetica() {
	  
	},
  
	'Helvetica-Bold'() {
	  
	},
  
	'Helvetica-Oblique'() {
	  
	},
  
	'Helvetica-BoldOblique'() {
	  
	},

	Times(){

	},
  
	'Times-Roman'() {
	  
	},
  
	'Times-Bold'() {
	  
	},
  
	'Times-Italic'() {
	  
	},
  
	'Times-BoldItalic'() {
	  
	},
  
	Symbol() {
	  
	},
  
	ZapfDingbats() {
	  
	}
  
}