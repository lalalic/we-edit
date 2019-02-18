export default class Editor{
    constructor(file){
        this.file=file
    }

    $(){
        return this.file.officeDocument.content(...arguments)
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
        let $=this.file.constructor.parseXml(this.trim(xml))
        return $.root().children().first()
    }

    create(props, reducer, target){
        this.node=this.parseXml(this.template(props))
        return this.file.attach(this.apply(props, reducer))
    }

    update({id},changing,query){
        return this.apply({id, ...changing},query)
    }

    remove({id,type}){
        return this.node.remove()
    }

    tailor(from=0,to){
        return this.node.remove()
    }

    split(at,reducer){
        const id=this.node.attr("xxid")
        return [{id,at},{id,at}]
    }

    clone(){
        const withIds=this.node.find("[xxid]").each((i,el)=>el.attribs._xxid=el.attribs.xxid)
        const cloned=this.node.clone()
        withIds.removeAttr("_xxid")
        return cloned
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

	tailer(from,to){
		return this.file.clone(this.node)
	}

    px2dxa(w){
        return w*72*20/96
    }
}
