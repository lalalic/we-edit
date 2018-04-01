import Stream from "stream"

class Browser extends Stream{
    static type="browser"
    constructor({name, target}){
        super()
        this.on("end",()=>{
            if(name){
                this.download(name)
            }else if(target){
                this.preview(target)
            }
        })
    }

    download(name){
        let url = window.URL.createObjectURL(new Blob([this.data.join("")]))
        let link = document.createElement("a");
        document.body.appendChild(link)
        link.download = name
        link.href = url;
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }

    preview(target){
        let iframe=document.querySelector("#"+target)
        iframe.src=window.URL.createObjectURL(new Blob([]))
    }
}

Stream.support(Browser)
