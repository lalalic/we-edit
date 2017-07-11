export default class Editor{
    constructor(file,doc){
        this.file=file
        this.doc=doc
    }

    create(props){
        this.node=this.file.parseXml(this.template(props))
        return this.apply(props)
    }

    update({id},changing){
        this.node=this.file.getNode(id)
        return this.apply({id, ...changing})
    }

    apply(props){
        Object.keys(props)
            .forEach(k=>{
                if(this[k]){
                    this[k](props[k], props)
                }
            })
        return this.node
    }

    template(props){
        return ``
    }
}
