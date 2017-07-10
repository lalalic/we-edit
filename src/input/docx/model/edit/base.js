export default class Editor{
    constructor(file){
        this.file=file
        this.doc=doc
    }

    create(props){
        this.node=this.file.parseXml(this.template(props))
        this.apply(props)
        return this.node
    }

    update({id},changing){
        this.node=this.file.getNode(id)
        this.apply(changing)
        return this.node
    }

    apply(props, changing){

    }

    template(props){
        return ``
    }
}
