import Base from "we-edit-representation-pagination/edit/Section"


export default class extends Base{
    nextAvailableSpace(required={}){
        return {width: this.context.parent.viewport.width, height:Number.MAX_VALUE}
    }
}
