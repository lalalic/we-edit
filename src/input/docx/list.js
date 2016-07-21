import Model from './any'
import Style from "./style"


export default class extends Model{
    visit(){
        super.visit()
        const {contentProps:props}=this

        props.level=this.wordModel.getLevel()
        props.numId=this.wordModel.getNumberingId()
    }
}
