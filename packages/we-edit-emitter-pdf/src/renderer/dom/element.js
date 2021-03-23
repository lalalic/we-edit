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
        this.page.addContent("".padStart(this.level," ")+op)
    }

    toCommand(parent,level=0){
        this.level=level
        this.ctm=[...parent.ctm]
        this.addContent("q")//save graphics state
        
        //settings
        Object.keys(this.props).forEach(k=>{
            this[`_${k}`]?.(this.props[k])
        })
        
        this?.preChildCommand?.()
      
        this.children.forEach(a=>a.toCommand(this,++level))
        
        this?.postChildCommand?.()

        this.addContent("Q")//restore graphics state
    }
}