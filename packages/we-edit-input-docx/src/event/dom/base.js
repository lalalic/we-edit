export default class Editor{
    constructor(reducer){
        this.reducer=reducer
        this.file=reducer.file
    }

    $(){
        return this.file.doc.officeDocument.content(...arguments)
    }

	//find pr, if no,create it
	got(nodeName,tagContent, tagPr){
		const contentSelector=tagContent.replace(":", "\\:")
		const prSelector=tagPr.replace(":", "\\:")

		const content=this.node.closest(contentSelector)
		let pr=content.children(prSelector)
		if(pr.length==0){
			content.prepend(`<${tagPr}/>`)
			pr=content.children(prSelector)
        }
        
        if(!nodeName)
            return pr

		const selector=nodeName.replace(":", "\\:")
		let target=pr.children(selector)
		if(target.length==0){
			pr.append(`<${nodeName}/>`)
			target=pr.children(selector)
		}
		return target
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
        this.file.renderChanged(this.node)
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
}
