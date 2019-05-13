import FontKit from "fontkit"

const fonts=new (class{
    constructor(){
        this.families={}
    }

    get(name,{bold,italic}={}){
        const found=this.family(name)
        if(found){
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
        }
    }

    put(font,props){
        if(!font.familyName){
            return
        }
        const key=font.familyName.toLowerCase()
        const family=(this.families[key]=this.families[key]||[])
        if(family.find(a=>a.fullName==font.fullName)){
            return
        }

        font=extend(font,props)
        const {fullName="",familyName="",subfamilyName=""}=font
        const uuid=`${fullName},${familyName},${subfamilyName}`
        if(/bold/i.test(uuid))
            font.bold=1
        if(/italic/i.test(uuid))
            font.italic=1
        const name=font.familyName.toLowerCase()
        console.log(`font[${font.familyName}] loaded`)
        family.push(font)
        return font
    }

    names(){
        return Object.keys(this.families)
			.map(k=>this.families[k][0].familyName)
			.filter(a=>!!a)
    }

    family(name){
        return this.families[name.toLowerCase()]
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
        this.iterateLocal(a=>URL.releaseObjectURL(a.src))
        fonts.families={}
        return this
    },

    iterateLocal(f){
        fonts.names().forEach(k=>{
            fonts.family(k).forEach(a=>{
                if(a.src && a.src.startsWith("blob:")){
                    f(a)
                }
            })
        })
    },

	fromBrowser(loader){
        const load1=file=>{
            return new Promise(resolve=>{
                const src=URL.createObjectURL(file)
                Object.assign(new FileReader(),{
                    onload({target:{result:data}}){
                        try{
                            const font=FontKit.create(Buffer.from(data))
                            if(!font){
                                resolve()
                            }else if(font.fonts){
                                resolve(Array.from(font.fonts).map(font=>fonts.put(font,{src})))
                            } else{
    							resolve(fonts.put(font,{src}))
                            }
						}catch(e){
							resolve()
						}
                    },
                    onerror:e=>resolve()
                }).readAsArrayBuffer(file)
            })
        }
		return Promise.all(Array.from(loader.files).map(load1)).then(fonts=>{
            loader.value=""
            return flat(fonts)
        }).finally(makeWebFont)
	},

    fromPath(path){
        const load1=file=>{
            return new Promise(resolve=>{
                FontKit.open(file,(err, font)=>{
                    if(err){
                        resolve()
                    }else if(font.fonts){
                        resolve(Array.from(font.fonts).map(font=>fonts.put(font,{src:file})))
                    }else{
                        resolve(fonts.put(font,{src:file}))
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
                            Promise.all(files.map(file=>load1(`${path}/${file}`)))
                            .then(fonts=>resolve(flat(fonts)),reject)
                        }
                    })
                }else{
                    require("get-system-fonts")()
                        .then(fonts=>Promise.all(fonts.map(load1).filter(a=>!!a)))
                        .then(fonts=>resolve(flat(fonts)),reject)
                }
            })
    },

    fromRemote(service){
        return fetch(service)
            .then(res=>res.text())
            .then(list=>{
                let fonts
                try{
                    fonts=JSON.parse(list)
                }catch(e){
                    fonts=list.split(",")
                }
                return fonts.filter(a=>!!a).map(a=>a.trim())
            })
            .then(list=>{
                return Promise.all(
                    list.map(a=>{
                        const src=`${service}/${a}`
                        return fetch(src).then(res=>{
            					if(res.ok){
            						return res.arrayBuffer().then(buffer=>fonts.put(FontKit.create(Buffer.from(buffer)),{src}))
            					}
            				})

                    })
                )
            })
            .finally(makeWebFont)
    },

	load(service,id){
        try{
            const found=this.get(id)
    		if(typeof(found)!="undefined")
    			return Promise.resolve(found)
        }catch(e){

        }

		let dataRetrieved,props={}
		if(typeof(service)=="string"){
            dataRetrieved=fetch(props.src=`${service}/${id}`)
				.then(res=>{
					if(!res.ok){
						throw new Error(res.statusText)
					}
					return res.arrayBuffer()
				})
		}else{
			dataRetrieved=service(id)
		}

		return dataRetrieved
			.then(buffer=>fonts.put(FontKit.create(Buffer.from(buffer)),props))
			.catch()
	},

    asService(sw="/font-service.js",scope=""){
        if (typeof(navigator)!="undefined" && 'serviceWorker' in navigator) {
            var service
            const _fromBrowser=FontManager.fromBrowser
            FontManager.fromBrowser=function(){
                return _fromBrowser.call(FontManager,...arguments)
                  .finally(()=>FontManager.iterateLocal(({familyName, src})=>{
                      try{
                          service.active.postMessage({familyName, src, scope})
                      }catch(e){
                          console.error(e)
                      }
                  }))
            }

            navigator.serviceWorker.register(`${sw}`, { scope: `${scope}/` }).then(function(reg) {
                service=reg
                if(reg.active) {
                    console.log(`Font Service[${sw}] worker active`);
                }
            }).catch(function(error) {
                console.log(`Font Service[${sw}] failed with ` + error);
            });
        }
    },
}

export default FontManager

function flat(fonts){
    return fonts.reduce((clt,a)=>{
        if(Array.isArray(a)){
            clt.splice(clt.length,0,...a)
        }else if(a){
            clt.push(a)
        }
        return clt
    },[])
}

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
            return this.layout(string).advanceWidth/this.unitsPerEm * fontSize
        },
        ...props
	})
}

var webFonts=null
function makeWebFont(){
    if(!webFonts){
        webFonts=document.createElement("style")
        webFonts.id="we_edit_web_fonts"
        document.body.appendChild(webFonts)
    }
    const loaded=Array.from(webFonts.sheet.rules).map(a=>a.style.fontFamily)
    fonts.names().filter(a=>!loaded.includes(a))
        .forEach(k=>{
            const font=fonts.get(k)
            const {familyName, src}=font
            if(src && familyName){
                webFonts.sheet.addRule('@font-face',`font-family:"${familyName}";src: local("${familyName}"), url("${src}");`)
            }
        })
}
