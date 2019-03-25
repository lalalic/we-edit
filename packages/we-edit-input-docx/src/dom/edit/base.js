export default class Editor{
    constructor(file){
        this.file=file
    }

    $(){
        return this.file.doc.officeDocument.content(...arguments)
    }

	//find pr, if no,create it
	got(nodeName,tagContent, tagPr){
		let contentSelector=tagContent.replace(":", "\\:")
		let prSelector=tagPr.replace(":", "\\:")

		let content=this.node.closest(contentSelector)
		let pr=content.children(prSelector)
		if(pr.length==0){
			content.prepend(`<${tagPr}/>`)
			pr=content.children(prSelector)
		}

		let selector=nodeName.replace(":", "\\:")
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

    parseXml(xml){
        let $=this.file.doc.constructor.parseXml(this.trim(xml))
        return $.root().children().first()
    }

    create(props,position){
        this.node=this.parseXml(this.template(props))
        return this.file.attach(this.apply(props),false)
    }

    update({id},changing){
        this.apply({id, ...changing})
        this.file.renderChanged(this.node)
    }

    remove({id,type}){
        return this.node.remove()
    }

    split(at,firstKeepId){
        const id=this.node.attr("xxid")
        return [{id,at},{id,at}]
    }

    clone(){
        return this.node.clone()
    }

    empty(){
        this.node.empty()
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
