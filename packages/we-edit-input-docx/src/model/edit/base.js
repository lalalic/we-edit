export default class Editor{
    constructor(file){
        this.file=file
    }
	
	trim(xml){
		return xml.replace(/>\s+/g,">").replace(/\s+</g,"<")
	}

    parseXml(xml){
        let $=this.file.constructor.parseXml(this.trim(xml))
        return $.root().children().first()
    }

    create(props, query){
        this.node=this.parseXml(this.template(props))
        return this.apply(props, query)
    }

    update({id},changing,query){
        this.node=this.file.getNode(id)
        return this.apply({id, ...changing},query)
    }

    apply(changing){
        Object.keys(changing)
            .forEach(k=>{
                if(this[k]){
                    this[k](changing[k], changing)
                }
            })
        return this.node
    }

    template(props){
        return ``
    }

    px2dxa(w){
        return w*72*20/96
    }
}
