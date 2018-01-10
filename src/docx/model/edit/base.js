export default class Editor{
    constructor(file){
        this.file=file
    }

    parseXml(xml){
        let $=this.file.constructor.parseXml(xml)
        return $.root().children().first()
    }

    create(props, reducer){
        this.node=this.parseXml(this.template(props))
        return this.apply(props, reducer)
    }

    update({id},changing){
        this.node=this.file.getNode(id)
        return this.apply({id, ...changing})
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

    attachCreated(node, locationId){

    }

    template(props){
        return ``
    }

    px2dxa(w){
        return w*72*20/96
    }
}
