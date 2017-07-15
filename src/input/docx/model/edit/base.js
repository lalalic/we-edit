export default class Editor{
    constructor(file){
        this.file=file
    }

    parseXml(xml){
        let $=this.file.constructor.parseXml(xml)
        return $.root().children().first()
    }

    create(props, locationId){
        this.node=this.parseXml(this.template(props))
        let node=this.apply(props)
        return this.attachCreated(node, locationId)
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

    attachCreated(node, locationId){

    }

    template(props){
        return ``
    }

    px2dxa(w){
        return w*72*20/96
    }
}
