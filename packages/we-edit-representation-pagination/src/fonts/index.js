import FontKit from "fontkit"
import {default as isNode} from "is-node"
import {makeFontFace, removeFontFace} from "./font-face"
import arial from "!!file-loader?name=[name].[ext]!./Arial.ttf"
import fontservice from "!!file-loader?name=[name].[ext]!./font-service.js"
import {Blob} from "buffer"

/**
 * families:{[family name]: [different variations, such as plain/regular/bold/italic/oblique/bold-italic/...]}
 */
const fonts=(()=>{
    const families=Object.create(null)
    const postscriptNames=Object.create(null)
    return {
        get(name,{bold,italic}={}){
            const found=this.family(name)
            if(!found)
                return
            if(found.length==1)
                return found[0]

            found.sort((a,b)=>a.bold||0+a.italic||0-b.bold||0-b.italic||0)

            let bolds=found.filter(a=>a.bold)
            let italics=found.filter(a=>a.italic)

            if(bold && italic){
                const bi=bolds.find(a=>italics.includes(a))
                if(bi){
                    return bi
                }
            }

            if(bold){
                if(!italic){
                    bolds=bolds.filter(a=>!italics.includes(a))
                }
                if(bolds.length){
                    return bolds[0]
                }
            }

            if(italic){
                if(!bold){
                    italics=italics.filter(a=>!bolds.includes(a))
                }
                if(italics.length){
                    return italics[0]
                }
            }

            return found[0]
        },

        put(font,props){
            const put=font=>{
                const key=font.familyName.toLowerCase()
                const family=((fonts)=>{
                    if(!fonts){
                        fonts=[]
                        Object.values(font.name.records.fontFamily).forEach(key=>families[key.toLowerCase()]=fonts)
                    }
                    return fonts
                })(families[key]);
                if(family.find(a=>a.fullName==font.fullName)){
                    return font
                }
                postscriptNames[font.postscriptName]=font

                extend(font,props)
                const {fullName="",familyName="",subfamilyName=""}=font
                const uuid=`${fullName},${familyName},${subfamilyName}`
                if(/bold/i.test(uuid))
                    font.bold=1
                if(/italic/i.test(uuid))
                    font.italic=1
                if(/oblique/i.test(uuid))
                    font.oblique=1
                family.push(font)
                console.debug(`font[${fullName}] loaded`)
                makeFontFace(font)
                return font
            }

            if(font.fonts)
                return font.fonts.filter(a=>a.familyName).map(put)

            return put(font)
        },

        names(){
            return Array.from(new Set(Object.values(families))).map(([font])=>font.familyName)
        },

        family(name){
            const key=name.toLowerCase()
            if(key in families){
                return families[key]
            }
        },

        byPostscriptName(postscriptName){
            return postscriptNames[postscriptName]
        },

        release(){
            Object.keys(families).forEach(k=>delete families[k])
            Object.keys(postscriptNames).forEach(k=>delete families[k])
        }
    }
})()

var service=null

const FontManager={
    get(){
        return fonts.get(...arguments)
    },

    byPostscriptName(postscriptName){
        return fonts.byPostscriptName(postscriptName)
    },

    get names(){
		return fonts.names().sort()
	},

    load(data,cache=true){
        const font=FontKit.create(Buffer.from(data))
        if(font){//cache data
            const familyName=(font.fonts||[font])[0].familyName
            cache && service?.active.postMessage({familyName, data, scope:new URL(service.scope).pathname})
            return fonts.put(font)
        }
    },

    release(){
        fonts.release()
        return this
    },

    /**
     * load fonts from a file input
     * @param {*} input 
     */
	fromInput(input){
        const load1=file=>{
            return new Promise(resolve=>{
                Object.assign(new FileReader(),{
                    onload({target:{result:data}}){
                        try{
                            resolve(FontManager.load(data))
						}catch(e){
							resolve()
						}
                    },
                    onerror:e=>resolve()
                }).readAsArrayBuffer(file)
            })
        }
        return Promise.all(Array.from(input.files).map(load1))
        .then(fonts=>{
            input.value=""
        })
	},

    /**
     * load all fonts from
     * path:
     * system: 
     */
    fromLocal(path){
        const load1=file=>{
            return new Promise(resolve=>{
                require('fs').readFile(file,(err, data)=>{
                    if(err){
                        console.error(err)
                        resolve()
                    }else{
                        try{
                            resolve(FontManager.load(data,false))
                        }catch(e){
                            resolve()
                        }
                    }
                })
            })
        }

        return new Promise((resolve, reject)=>{
                if(path){
                    require("fs").readdir(path, (err, files)=>{
                        if(err){
                            reject(err)
                        } else {
                            return Promise
                                .all(files.map(file=>load1(`${path}/${file}`)))
                                .then(resolve,reject)
                        }
                    })
                }else{
                    require("get-system-fonts")()
                        .then(fonts=>Promise.all(fonts.map(load1)))
                        .then(resolve,reject)
                }
            })
    },

    /**
     * load fonts data from url
     * API: 
     *  ** root example: /fonts
     *  ** ../fonts should require all possible fonts, ["Arial", "Time New Roman",...]
     *  ** ../fonts/(font family name) to load specified font family data
     * @param {*} service 
     */
    fromRemote(service, required){
        return fetch(service)
            .then(res=>res.status!=200 ? "" : res.text())
            .then(list=>{
                try{
                    return JSON.parse(list).filter(a=>!!a).map(a=>a.trim())
                }catch(e){
                    return list.split(",").filter(a=>!!a).map(a=>a.trim())
                }
            })
            .then(supported=>required?.length ? supported.filter(a=>required.includes(a)) : supported)
            .then(supported=>supported.filter(a=>!fonts.family(a)))
            .then(list=>{
                return Promise.all(
                    list.map(a=>{
                        return fetch(`${service}/${a}`).then(res=>{
                                if(res.ok){
                                    return res.arrayBuffer().then(buffer=>{
                                        FontManager.load(buffer)
                                    })
                                }
                            })

                    })
                )
            })
    },

    /**
     * load fonts from a function
     * @param {*} service 
     * @param {*} id 
     */
    fromFn(service,required=[]){
        return Promise.all(
            required.filter(a=>!fonts.family(a))
                .map(a=>{
                    return service(a)
                        .then(buffer=>FontManager.load(buffer))
                })
        )
    },
    
    fromCache(fonts){
        return Promise.resolve({unloaded:fonts})
    },

    asService(sw="/font-service.js",scope="/fonts"){
        if (!(typeof(navigator)!="undefined" && 'serviceWorker' in navigator)){
            console.warn('Font Service not supported because no navigator.serviceWorker')
            return 
        }
        
        const register=navigator.serviceWorker.register(sw, { scope: `${scope}/` })
            .then(reg=>reg.update())
            .then(reg=>{
                if(!reg.active) 
                    return 
                service=reg
                console.log(`Font Service[${sw}] at ${scope}`)

                return new Promise((resolve,reject)=>{
                    const errorFonts=[]
                    navigator.serviceWorker.addEventListener('message',function({data:{font:data,name,done}}){
                        if(done){
                            errorFonts.length && console.warn(`Failed to cache fonts [${errorFonts.join(",")}]`)
                            resolve()
                        }else if(data){    
                            try{
                                FontManager.load(data,false)
                            }catch(e){
                                errorFonts.push(decodeURIComponent(name))
                            }
                        }
                    })
                    service.active.postMessage({action:"fontCache"})
                }).finally(()=>{
                    console.log(`Loaded cache fonts: ${fonts.names().join(",")}`)
                    FontManager.createUnifiedFallbackFont?.()
                })
            })
            .catch(error=>console.warn(`Font Service[${sw}] failed: ` + error))
        FontManager.fromCache=()=>register
        return register
    },

    requireFonts(service,fonts=[]){
		const allAlreadyLoaded=fonts.reduce((loaded,k)=>loaded && !!FontManager.get(k),true)

		if(allAlreadyLoaded){
			return Promise.resolve(done({loaded:fonts}))
		}
        
        const done=()=>{
			const unloaded=fonts.filter(a=>!FontManager.get(a))
			const loaded=fonts.filter(a=>!unloaded.includes(a))
			return {loaded,unloaded, FontManager}
        }
        
        
		if(isNode && typeof(service)=="string" && require("fs").existsSync(service)){
			return FontManager
				.fromPath(service, fonts)
				.then(done,done)
		}

        return FontManager.fromCache()
            .then(()=>{
                const {unloaded}=done()
				if(unloaded.length==0)
					return fonts
				switch(typeof(service)){
					case "string"://url
						return FontManager.fromRemote(service, unloaded)
					case "function":
						return FontManager.fromFn(service,unloaded)
					default:
						return fonts
				}
			}).then(done,done)
    },

    createUnifiedFallbackFont(){
        return null
        return globalThis.fetch(arial)
            .then(res=>res.arrayBuffer())
            .then(data=>FontManager.load(data))
            .then(font=>{
                return new Promise((resolve,reject)=>{
                    const subset=font.createSubset()
                    const cmapTable = {
                        version: 13, //format0
                        language: 0,
                        nGroups:1,
                        //length:
                        groups: [{
                            startCharCode:1,
                            endCharCode:0xFFFFFFFF,
                            glyphID:0,
                        }]
                    }
                    subset.cmap={
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
                    }
                    const name="fallback"
                    subset.name={
                        version:0,
                        count:3,
                        stringOffset:0,
                        records:[
                            {
                                platformID: 0,
                                encodingID: 4,
                                languageID: 0,
                                nameID:     1,
                                string: name,
                                length:  name.length,
                            },
                            {
                                platformID: 0,
                                encodingID: 4,
                                languageID: 0,
                                nameID:     4,
                                string: name,
                                length:  name.length,
                            },
                            {
                                platformID: 0,
                                encodingID: 4,
                                languageID: 0,
                                nameID:     6,
                                string: name,
                                length:  name.length,
                            },
                        ]
                    }
debugger
                    const stream=subset.encodeStream(), data=[]
                    stream.on('data',trunk=>{
                        data.push(trunk)
                    })
                    stream.on('end',()=>{
                        const size=data.reduce((s,a)=>s+a.length,0)
                        const buffer=data.reduce((buffer,a)=>{
                            a.forEach(c=>buffer.push(c))
                            return buffer
                        },new Array(size))
                        resolve(buffer)
                    })
                }).then(data=>{
                    debugger
                    const name="Fallback", names=["familyName","postscriptName","fullName"]
                    const font=FontKit.create(Buffer.from(data))
                    return new Proxy(font,{
                        get(font,key){
                            if(names.includes(key))
                                return name
                            return Reflect.get(...arguments)
                        }
                    })
                })
                .then(font=>makeFontFace(font))
            })
    },
    makeFontFace, 
    removeFontFace
}

export default FontManager

function extend(font, props={}){
    return Object.assign(font,{
		lineHeight(fontSize){
			const scale = 1 / this.unitsPerEm * fontSize
			return scale*(this.ascent-this.descent+this.lineGap)
		},
		lineDescent(fontSize){
			const scale = 1 / this.unitsPerEm * fontSize;
			return -this.descent*scale
		},

        stringWidth(string,fontSize){
            if(this.isMonospace)
                return this.monoWidth*fontSize
            return this.layout(string).advanceWidth/this.unitsPerEm * fontSize
        },

        ...props
	})
}

/**
font <generic-name>: serif, sans-serif, monospace, cursive, fantasy, math, emoji,fangsong, system-ui, ui-serif, ui-sans-serif, ui-monospace, ui-rounded, 
***NOTES***
> font family name may be localized, such as word theme font, so localized name should be translated to english name
> to keep font choosing logic same between font measure and svg measure
 */