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

    update(props,changing){
        this.node=this.fild.getNode(props.id)
        this.apply(...arguments)
        return this.node
    }

    apply(props, changing){

    }

    template(props){
        return ``
    }
}
