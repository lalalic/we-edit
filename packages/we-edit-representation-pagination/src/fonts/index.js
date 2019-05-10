import FontKit from "fontkit"

const fonts=new (class{
    constructor(){
        this.families={}
    }

    get(name,{bold,italic}={}){
        const found=this.families[name.toLowerCase()]
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
        if(font.familyName){
            font=extend(font,props)
            const {fullName="",familyName="",subfamilyName=""}=font
            const uuid=`${fullName},${familyName},${subfamilyName}`
            if(/bold/i.test(uuid))
                font.bold=1
            if(/italic/i.test(uuid))
                font.italic=1
            const name=font.familyName.toLowerCase()
            const family=(this.families[name]=this.families[name]||[])
            if(!family.find(a=>a.fullName==font.fullName)){
                family.push(font)
            }
            return font
        }
    }

    names(){
        return Object.keys(this.families)
			.map(k=>this.families[k][0].familyName)
			.filter(a=>!!a)
    }
})()

const FontManager={
    get(name){
        const found=fonts.get(...arguments)
		if(found){
			return found
		}else if(found==null){
			throw new Error(`font[${name}] loaded with error`)
        }else{
			throw new Error(`font[${name}] not loaded`)
		}
    },

    get names(){
		return fonts.names().sort()
	},

    release(){
        fonts.families={}
        return this
    },

	fromBrowser(loader, needed){
        const load1=file=>{
            return new Promise(resolve=>{
                Object.assign(new FileReader(),{
                    onload({target:{result:data}}){
                        try{
                            const font=FontKit.create(Buffer.from(data))
                            if(!font){
                                resolve()
                            }else if(font.fonts){
                                resolve(Array.from(font.fonts).map(font=>fonts.put(font,{path:file.name})))
                            } else{
    							resolve(fonts.put(font,{path:file.name}))
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
        })
	},

    fromPath(path){
        const load1=file=>{
            return new Promise(resolve=>{
                FontKit.open(file,(err, font)=>{
                    if(err){
                        resolve()
                    }else if(font.fonts){
                        resolve(Array.from(font.fonts).map(font=>fonts.put(font,{path:file})))
                    }else{
                        resolve(fonts.put(font,{path:file}))
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

	load(service,id){
        try{
            const found=this.get(id)
    		if(typeof(found)!="undefined")
    			return Promise.resolve(found)
        }catch(e){

        }

		let dataRetrieved,props={}
		if(typeof(service)=="string"){
            dataRetrieved=fetch(props.path=`${service}/${id}`)
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
			.catch((e)=>{
				console.error(`font[${id}]:${e.message}`)
				return id
			})
	}
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

function extend(font){
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
        }
	})
}
