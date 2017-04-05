import opentype from "opentype.js"

var fonts={}

export default {
    get(name){
		name=name.toLowerCase()
		if(fonts[name]){
			return fonts[name]
		}else{
            throw new Error(`${name} not exists`)
        }
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
							fonts[id]=opentype.parse(data)
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
					let all=files.map(file=>new Promise((r,j)=>{
						fs.readFile(`${path}/${file}`, (err, data)=>{
							if(err){
								j(error)
							}else{
								let id=file.split(".")[0].toLowerCase()
								r(fonts[id]=opentype.parse(data))
							}
						})
					}))
					Promise.all(...all).then(resolve,reject)
				}
			})
		})
	}
}
