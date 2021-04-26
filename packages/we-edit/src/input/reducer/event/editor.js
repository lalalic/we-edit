export default class Editor{
    constructor(reducer, node){
        this.reducer=reducer
        this.file=reducer.file
        this.node=node||this.reducer.target
    }

    /**
     * 1. create in file, and append to target
     * 2. render to content, and append to $target
     * @param {*} props 
     */
    create(props){
        const content=this.template(props)
        this.reducer.target.append(content)

        const {id}=this.file.renderChanged(content)
        this.$target.append("#"+id)
        
        this.node=this.file.getNode(id)
        this.update(props)
        return this.node
    }

    update(props){
        this.apply(props)
        this.node && this.file.renderChanged(this.node)
    }

    apply(changing){
        for(let k in changing){
            this[k]?.(changing[k], changing)
        }
        return this.node
    }

    template(props){
        return ``
    }
}