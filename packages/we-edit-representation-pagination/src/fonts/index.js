import FontKit from "fontkit"
import {default as isNode} from "is-node"
import {makeFontFace, removeFontFace} from "./font-face"
import r from 'restructure';
import cloneDeep from "clone"

/**
 * families:{[family name]: [different variations, such as plain/regular/bold/italic/oblique/bold-italic/...]}
 */
const fonts=(()=>{
    const families={}
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
                    return
                }

                !font.createObjectURL && extend(font,props)
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
                document?.dispatchEvent(new CustomEvent('fontLoaded',{detail:{font, fonts}}))
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
        }
    }
})()

const FontManager={
    get(){
        return fonts.get(...arguments)
    },

    get names(){
		return fonts.names().sort()
	},

    release(){
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
                            resolve(fonts.put(FontKit.create(Buffer.from(data))))
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
                FontKit.open(file,(err, font)=>{
                    if(err){
                        console.error(err)
                        resolve()
                    }else{
                        resolve(fonts.put(font))
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
                                        const font=FontKit.create(Buffer.from(buffer))
                                        fonts.put(font)
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
                        .then(buffer=>fonts.put(FontKit.create(Buffer.from(buffer))))
                })
        )
    },
    
    fromCache(fonts){
        return Promise.resolve({unloaded:fonts})
    },

    asService(sw="/font-service.js",scope="/fonts"){
        if (typeof(navigator)!="undefined" && 'serviceWorker' in navigator) {
            var service
            this.makeFontFace=makeFontFace
            this.removeFontFace=removeFontFace

            const noCacheCreate=FontKit.create
            FontKit.noCacheCreate=noCacheCreate
            FontKit.create=function(data){
                try{
                    const font=noCacheCreate(data)
                    if(font){
                        (font.fonts||[font]).forEach(a=>{
                            Promise.resolve(extend(a).createObjectURL()).then(src=>{
                                src && service.active.postMessage({familyName:a.fullName, src, scope})
                            })
                        })
                    }
                    return font
                }catch(e){
                    console.error(e)
                }
            }

            document.addEventListener('fontLoaded',({detail:{font}})=>{
                if(font.familyName[0]==".")
                    return 
                Promise.resolve(font.createObjectURL())
                    .then(url=>url && makeFontFace(font, `url(${url})`))  
            })

            navigator.serviceWorker.register(sw, { scope: `${scope}/` }).then(reg=> {
                service=reg
                if(reg.active) {
                    console.log(`Font Service[${sw}] worker active at ${scope}`)
                    const loadCache=new Promise((resolve,reject)=>{
                        const errorFonts=[]
                        navigator.serviceWorker.addEventListener('message',function({data:{font:data,name,done}}){
                            if(done){
                                errorFonts.length && console.error(`Load cache fonts errors: [${errorFonts.join(",")}]`)
                                resolve()
                            }else if(data){    
                                try{
                                    const font=noCacheCreate(Buffer.from(data))
                                    font && fonts.put(font)
                                }catch(e){
                                    errorFonts.push(decodeURIComponent(name))
                                }
                            }
                        })
                        service.active.postMessage({action:"fontCache"})
                    }).finally(()=>{
                        console.log(`load cache fonts: ${fonts.names().join(",")}`)
                        FontManager.createUnifiedFallbackFont?.()
                    })
                    FontManager.fromCache=()=>loadCache

                    
                    return loadCache
                }
            })
            .catch(error=>console.log(`Font Service[${sw}] failed with ` + error))
        }
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
    }
}

export default FontManager

function extend(font, props={}){
    let url
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
            return this.layout(string).advanceWidth/this.unitsPerEm * fontSize
        },

        createObjectURL(){
            if(url)
                return url
            if(!this._directoryPos)
                return url=toUrl([this.stream.buffer])

            //from font collection file
            return new Promise((resolve)=>{
                const buffer=this.stream.buffer
                const {tag, numTables,searchRange,entrySelector,rangeShift,tables}=this.directory
                const stream=new r.EncodeStream(), data=[]
                stream.on('readable',(a,b,c,chunk)=>{
                    while(null!=(chunk=stream.read())){
                        data.push(chunk)
                    }
                })
                stream.on('end',()=>{
                    resolve(url=toUrl(data))
                })

                const _preEncode=FontKit.Directory.preEncode
                const _offsetEncode=FontKit.Directory.fields.tables.type.fields.offset.encode
                try{
                    FontKit.Directory.preEncode=null
                    /**
                     * to make table offset a multiple of 4 
                     */
                    FontKit.Directory.fields.tables.type.fields.offset.encode=function(stream, val, ctx){
                        if((ctx.parent.pointerOffset % 4)!=0){
                            //it's global pointer, so use parent context
                            const len=4 - (ctx.parent.pointerOffset % 4)
                            //insert data before current pointer to make offset meet multiple 4
                            ctx.parent.pointers.push({
                                type:new r.Buffer(),
                                val:new Uint8Array(len).fill(0),
                                parent:ctx,
                            })
                            ctx.parent.pointerOffset+=len
                            //ctx.pointerSize useless, so don't sync it
                        }
                        return _offsetEncode.call(this,...arguments)
                    }
                    
                    FontKit.Directory.encode(stream,{
                        tag, numTables,searchRange,entrySelector,rangeShift,
                        tables:Object.values(tables).map(({tag,checkSum,length,offset})=>({
                            tag,checkSum,length,
                            offset: new r.VoidPointer(new r.Buffer(), buffer.slice(offset,offset+length))
                        }))
                    })
                    stream.end()
                }finally{
                    FontKit.Directory.preEncode=_preEncode
                    FontKit.Directory.fields.tables.type.fields.offset.encode=_offsetEncode
                }
            })
            
        },

        ...props
	})
}

const toUrl=data=>URL.createObjectURL(new Blob(data,{type:"application/octet-stream"}))

/**
font <generic-name>: serif, sans-serif, monospace, cursive, fantasy, math, emoji,fangsong, system-ui, ui-serif, ui-sans-serif, ui-monospace, ui-rounded, 
***NOTES***
> font family name may be localized, such as word theme font, so localized name should be translated to english name
> to keep font choosing logic same between font measure and svg measure
 */