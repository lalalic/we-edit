import selector from "we-edit/state/selector"


export default class Selection{
    constructor(state){
        this.selection=selector.getSelection(state)
        this.$=selector.createQuery(state)

        this.routes=[]
    }

    isApplicable(type){
        return this.routes.includes(type)
    }


    getStyle(type){
        
    }
}
