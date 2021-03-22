export default class Element{
    constructor(props, page){
        this.props=props
        this.page=page
        this.children=[]
    }

    appendChild(child){
        child && this.children.push(child)
    }

    addContent(op){
        this.page && this.page.addContent(op)
    }

    toCommand(parent, more=this){
        this.ctm=[...parent.ctm]
        this.addContent("q")//save graphics state
        
        //settings
        Object.keys(this.props).forEach(k=>{
            this[`_${k}`]?.(this.props[k])
        })
        
        more?.preChildCommand?.()
      
        this.children.forEach(a=>a.toCommand(this))
        
        more?.postChildCommand?.()

        this.addContent("Q")//restore graphics state
    }
}