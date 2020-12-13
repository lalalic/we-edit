import PropTypes from "prop-types"
export default (A)=>class __$1 extends A{
    static displayName=`templateable-${A.displayName}`
    static childContextTypes={
        ...super.childContextTypes,
        getComposedTemplate: PropTypes.func
    }

    constructor(){
        super(...arguments)
        this.computed.templates=[]
        this.getComposedTemplate=this.getComposedTemplate.bind(this)
    }

    getComposedTemplate(xhref){
        return this.computed.templates.find(a=>a.props.xhref==xhref)
    }

    getChildContext(){
        return {
            ...super.getChildContext(),
            getComposedTemplate:this.getComposedTemplate,
        }
    }

    appendComposed(){
        const {xhref}=arguments[0].props
        if(xhref){
            const i=this.computed.templates.findIndex(a=>a.props.xhref==xhref)
            if(i==-1){
                this.computed.templates.push(arguments[0])
            }else{
                this.computed.templates.splice(i,1,arguments[0])
            }
            return
        }
        return super.appendComposed(...arguments)
    }
}
