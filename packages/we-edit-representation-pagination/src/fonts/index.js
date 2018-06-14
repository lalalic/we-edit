import opentype from "opentype.js"

var fonts={}

const FontManager={
    get(name){
		name=FontManager.toId(name)
		if(fonts[name]){
			return fonts[name]
		}else if(fonts[name]==null){
			throw new Error(`font[${name}] loaded with error`)
        }else{
			throw new Error(`font[${name}] not loaded`)
		}
    },
	get names(){
		return Object.keys(fonts)
			.filter(a=>!!fonts[a])
			.map(a=>fonts[a].names.fontFamily.en)
	},
	toId(name){
		return name.toLowerCase()
	},
	fromBrowser(loader, needed){
		if(needed)
			needed=needed.map(a=>FontManager.toId(a))

		return new Promise((resolve, reject)=>{
			let loaded=[], files=loader.files
			for(let i=0, file, len=files.length;i<len;i++){
				file=files[i]
				let name=file.name
				let id=FontManager.toId(name.split(".")[0])
				if(needed && !needed.includes(id)){
					continue
				}

				if(typeof(fonts[id])!=="undefined")
					continue

				loaded.push(new Promise((resolve, reject)=>{
					let reader=new FileReader()
					reader.onload=e=>{
						try{
							let data=reader.result
							fonts[id]=extend(opentype.parse(data))
							console.log(`${name} font loaded`)
							resolve(fonts[id])
						}catch(e){
							console.error(`${name} font loaded fail with error: ${e.message}`)
							fonts[id]=null
							resolve(id)
						}
					}

					reader.onerror=e=>resolve()
					reader.readAsArrayBuffer(file)
				}))
			}
			loader.value=""
			Promise.all([...loaded,Promise.resolve()]).then(resolve, reject)
		})
	},

	fromPath(path, needed){
		const fs=require("fs")
        if(needed)
			needed=needed.map(a=>FontManager.toId(a))
		const load1=file=>{
            let id=FontManager.toId(require("path").basename(file,".ttf"))
            if(needed && !needed.includes(id)){
                return null
            }

            if(typeof(fonts[id])!=="undefined")
                return null

            return new Promise((r,j)=>{
                fs.readFile(file,(err, data)=>{
                    if(err){
                        console.log(err.message)
                        fonts[id]=null
                        r(file)
                    }else{
                        try{
                            let buffer=nodeBufferToArrayBuffer(data)
                            let font=opentype.parse(buffer)

                            if(font.supported){
                                r(fonts[id]=extend(font))
                            }else{
                                console.log(`${file} format is not supported,discard it`)
                                fonts[id]=null
                                r(file)
                            }
                        }catch(e){
                            console.log(e.message)
                            fonts[id]=null
                            r(file)
                        }
                    }
                })
            })
        }

        return new Promise((resolve, reject)=>{
            if(path){
    			fs.readdir(path, (err, files)=>{
    				if(err){
    					reject(err)
    				} else {
    					Promise.all(
                            files
                            .filter(a=>a.endsWith(".ttf"))
                            .map(file=>load1(`${path}/${file}`))
                            .filter(a=>!!a)
                        )
                        .then(resolve,reject)
    				}
    			})
            }else{
                require("get-system-fonts")()
                    .then(fonts=>fonts.filter(a=>a.endsWith(".ttf")))
                    //.then(a=>(console.dir(a),a))
                    .then(fonts=>Promise.all(fonts.map(load1).filter(a=>!!a)))
                    .then(resolve,reject)
            }
		})
	},

	load(url,id){
		id=FontManager.toId(id)
		if(typeof(fonts[id])!="undefined")
			return Promise.resolve(fonts[id])

		return fetch(url)
			.then(res=>res.arrayBuffer())
			.then(buffer=>fonts[id]=extend(opentype.parse(buffer)))
			.catch(()=>{
				fonts[id]=null
				return id
			})
	}
}

export default FontManager

function extend(font){
	return Object.assign(font,{
		lineHeight(fontSize){
			const scale = 1 / this.unitsPerEm * fontSize
			return scale*(this.ascender-this.descender)
		},
		lineDescent(fontSize){
			const scale = 1 / this.unitsPerEm * fontSize;
			return -this.descender*scale
		}
	})
}


function nodeBufferToArrayBuffer(buffer) {
	var ab = new ArrayBuffer(buffer.length);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return ab;
}
