import PropTypes from "prop-types"
export default (A)=>class __$1 extends A{
    static displayName=`templateable-${A.displayName}`
    static childContextTypes={
        ...A.childContextTypes,
        getComposedTemplate: PropTypes.func
    }

    constructor(){
        super(...arguments)
        this.computed.templates=[]
        this.getComposedTemplate=this.getComposedTemplate.bind(this)
    }

    getComposedTemplate(xhref){
        return this.computed.templates[xhref]
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
            this.computed.templates[xhref]=arguments[0]
            return
        }
        return super.appendComposed(...arguments)
    }
}
