import TTFFont from "ttfjs"

var fonts={}

export default {
    get(name){
		name=name.toLowerCase()
		if(fonts[name]){
			return fonts[name]
		}else{
            throw new Error(`${name} not exists`)
        }
    }
}

export function loadFont(loader){
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
						fonts[id]=new TTFFont(data)
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
}
