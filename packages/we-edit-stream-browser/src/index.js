import {Writable} from "stream"
import {Stream} from "we-edit"

/**
* options:
* name: only for download
* target: show on iframe/window
*/
class Browser extends Writable{
    static type="browser"
    constructor({name, target,format,windowFeatures}){
        super({})
		this.format=format
		this.data=[]
        this.on("finish",()=>{
            if(name){
                this.download(name.indexOf(".")!=-1 ? name : `${name}.${format}`)
            }else {
                this.preview(target,windowFeatures)
            }
        })
    }
	
	_write(chunk, enc, next){
		this.data.push(chunk)
		next()
	}

    download(name){
        let url = window.URL.createObjectURL(this.blob)
        let link = document.createElement("a");
        document.body.appendChild(link)
        link.download = name
        link.href = url;
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }

    preview(target,windowFeatures){
		let src=window.URL.createObjectURL(this.blob)
		if(windowFeatures){
			window.open(src,target||"we-edit-previewer",windowFeatures)
		}else{
			let a=document.createElement("a")
			let body=document.querySelector('body')
			a.href=src
			a.target=target||"we-edit-previewer"
			body.appendChild(a)
			a.click()
			body.removeChild(a)
		}
    }
	
	get blob(){
		switch(this.format){
		case 'svg':
			return new Blob(["<html><body>",...this.data, "</body></html>"],{type:"text/html"})
		break
		case 'pdf':
			return new Blob(this.data, {type:"application/pdf"})
		}
	}
}

Stream.support(Browser)
