import FontMeasure from "./font"
import memoize from "memoize-one"



/**
 * Map all loaded fonts to browser font face, which is a must in browser, because
 * * browser and we-edit layout engine should use same font for view and layouting
 * 
 * then we can use svg measure in browser to get typeface metrics, height, width, baseline
 * Browser has its own font selection strategy, which may result in different layout between editing and publishing
 * some metrics can't be given from svg measure, such as kerning, 
 * some issues:
 *  TTC must be extracted to single font
 *  hyphenation, can't be supported
 */
export default class HybridMeasure extends FontMeasure{
    static displayName="SVG Measure"
    
    fontExists(family, char){
        const font=super.fontExists(...arguments)
        if(font){
            return font
        }

        if(document.fonts.check(`16px "${family}"`,char)){
            return {fontFamily:family, src:"local"}
        }
    }

    lineHeight(size=this.size){
        if(this.font){
            return super.lineHeight(...arguments)
        }
        if(!tester){
			const container=document.createElement("div")
			container.style="position:absolute;top:-1000px"
			document.body.appendChild(container)
			container.innerHTML=`<svg viewBox="0 0 ${100} ${100}" xmlns="http://www.w3.org/2000/svg"><text>Ä</text></svg>`
			tester=container.querySelector('text')
            tester.setStyle=memoize(style=>tester.style=style)
		}
		tester.setStyle(this.cssStyle(size))
        tester.firstChild.data="Ä"
        const {height,y, baseline=-y}=tester.getBBox()
        return {height,descent:height-baseline}
    }

    cssStyle(size=this.size){
        return `white-space:pre;
            font-family:${this.fontFamily};
            font-size:${size}px;
            font-weight:${this.style.bold ? "bold" : "normal"};
            font-style:${this.style.italic ? "italic" : "normal"};
            `
    }

    _stringWidth(word){
        if(this.font){
            return super._stringWidth(word)
        }
        tester.setStyle(this.cssStyle(this.size))
        tester.firstChild.data=word
        return tester.getBBox().width
    }

    static Fonts=[
        // Windows 10
        'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets', 'Impact', 'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode', 'Malgun Gothic', 'Marlett', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Historic', 'Segoe UI Emoji', 'Segoe UI Symbol', 'SimSun', 'Sitka', 'Sylfaen', 'Symbol', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Yu Gothic',
        // macOS
        'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next', 'Avenir Next Condensed', 'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter', 'Cochin', 'Comic Sans MS', 'Copperplate', 'Courier', 'Courier New', 'Didot', 'DIN Alternate', 'DIN Condensed', 'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'Impact', 'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo', 'Microsoft Sans Serif', 'Monaco', 'Noteworthy', 'Optima', 'Palatino', 'Papyrus', 'Phosphate', 'Rockwell', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand', 'Tahoma', 'Times', 'Times New Roman', 'Trattatello', 'Trebuchet MS', 'Verdana', 'Zapfino',
      ]

    static requireFonts(service, fonts, detectFonts=this.Fonts){
        detectFonts=Array.from(new Set(detectFonts)).sort()
        return document.fonts.ready
                .then(()=>Promise.all(detectFonts.map(a=>document.fonts.load(`16px "${a}"`))))
                .then(()=>globalThis.fonts=detectFonts.filter(a=>document.fonts.check(`16px "${a}"`)))
                .then(()=>super.requireFonts(service, Array.from(new Set([...fonts])))
                    .then(({FontManager,unloaded})=>{
                        const locals=[]
                        if(unloaded && unloaded.length){
                            return Promise.all(unloaded.map(a=>{
                                const font=`16px "${a}"`
                                return document.fonts.load(font)
                                    .then(
                                        ()=>{
                                            if(!document.fonts.check(font)){
                                                return a
                                            }
                                            locals.push(a)
                                        },
                                        ()=>a
                                    )
                            })).then(unloaded=>{
                                if(locals.length>0){
                                    console.info(`found browser local fonts: ${locals.join(",")}`)
                                }
                                return {FontManager,unloaded:unloaded.filter(a=>!!a)}
                            })
                        }
                    })
                )
    }
}
let tester=null


