import {Stream} from "we-edit"

class Browser{
    static type="browser"
    constructor({name}){
        this.name=name
        this.data=[]
    }

    write(content){
        this.data.push(content)
    }

    flush(){
        let url = window.URL.createObjectURL(new Blob([this.data.join("")]))
        let link = document.createElement("a");
        document.body.appendChild(link)
        link.download = this.name
        link.href = url;
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }
}

Stream.support(Browser)
