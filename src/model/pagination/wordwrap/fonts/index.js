import opentype from "opentype.js"

var fonts={}

export default {
    get(name){
		name=name.toLowerCase()
		if(fonts[name]){
			return fonts[name]
		}else{
			return fonts.verdana
            //throw new Error(`${name} not exists`)
        }
    },
	names(){
		return Object.keys(fonts)
	},
	fromBrowser(loader){
		return new Promise((resolve, reject)=>{
			let loaded=[], files=loader.files
			for(let i=0, file, len=files.length;i<len;i++){
				file=files[i]
				loaded.push(new Promise((resolve, reject)=>{
					let name=file.name
					let reader=new FileReader()
					reader.onload=e=>{
						try{
							let data=reader.result
							let id=name.split(".")[0].toLowerCase()
							fonts[id]=extend(opentype.parse(data))
							console.log(`${name} font loaded`)
							resolve(fonts[id])
						}catch(e){
							console.error(`${name} font loaded fail with error: ${e.message}`)
							resolve()
						}
					}
					
					reader.onerror=e=>resolve()
					reader.readAsArrayBuffer(file)
				}))
			}
			loader.value=""
			Promise.all(loaded).then(resolve, reject)	
		})
	},
	fromPath(path){
		let fs=require("fs")
		return new Promise((resolve, reject)=>{
			fs.readdir(path, (err, files)=>{
				if(err)
					reject(err)
				else {
					let all=files.filter(a=>a.endsWith(".ttf")).map(file=>new Promise((r,j)=>{
						fs.readFile(`${path}/${file}`, (err, data)=>{
							if(err){
								j(err)
							}else{
								let id=file.split(".")[0].toLowerCase()
								let buffer=nodeBufferToArrayBuffer(data)
								r(fonts[id]=extend(opentype.parse(buffer)))
							}
						})
					}))
					Promise.all(all).then(resolve,reject)
				}
			})
		})
	},
	
	load(url,id){
		return fetch(url).then(res=>res.arrayBuffer())
			.then(buffer=>fonts[id]=extend(opentype.parse(buffer)))
	}
}

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
