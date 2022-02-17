export default class Editor{
    constructor(reducer){
        this.reducer=reducer
        this.file=reducer.file
    }

    $(){
        return this.file.doc.officeDocument.content(...arguments)
    }

	/**
     * find or create a>b>c>d
     * @param {*} nodeName 
     * @param {*} tagContent 
     * @param {*} tagPr 
     * @returns 
     */
	got(nodeName,tagContent, tagPr){
        const [first,...nodes]=[tagContent,tagPr,nodeName].filter(a=>!!a).join(">").split(">")
        const elFirst=this.node[tagContent ? "closest" : "find"](first.replace(":","\\:")).eq(0)
        return nodes.reduce((current,node)=>{
            let next=current.children(node.replace(":","\\:")).eq(0)
            if(next.length)
                return next
            return current.append(`<${node}/>`).children().last()
        },elFirst)
	}

	trim(xml){
		return xml.replace(/>\s+/g,">").replace(/\s+</g,"<")
	}

    create(props){
        const content=this.template(props)
        const $=this.file.doc.constructor.parseXml(this.trim(content))
        this.node=$.root().children().first()
        this.apply(props)
    }

    update(changing){
        this.apply(changing)
        if(this.node){
            this.file.renderChanged(this.node)
        }
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

    toColor(color){
        if(color[0]=="#")
            return color.substr(1)
        return color
    }
}
